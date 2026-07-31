import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, filter, map, of, startWith, switchMap } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Product } from '../../../../shared/models/product.models';
import {
  getCategoryListingPath,
  getCategoryTitleKey,
  getShopCategoryBasePath,
  resolveCategoryFromUrl,
} from '../../data/shop-paths';
import { Gourmet as GourmetService } from '../../services/gourmet';

const HIGHLIGHT_KEYS = [
  'shop.detail.highlights.quality',
  'shop.detail.highlights.glutenFree',
  'shop.detail.highlights.origin',
  'shop.detail.highlights.shipping',
] as const;

const RELATED_PRODUCTS_LIMIT = 4;

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink, TranslateModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly gourmetService = inject(GourmetService);
  protected readonly cartService = inject(CartService);
  private readonly notificationService = inject(NotificationService);

  readonly highlightKeys = HIGHLIGHT_KEYS;

  private readonly routeCategory = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => resolveCategoryFromUrl(this.router.url)),
      startWith(resolveCategoryFromUrl(this.router.url)),
    ),
    { initialValue: resolveCategoryFromUrl(this.router.url) },
  );

  readonly product = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('productId') ?? ''),
      switchMap((id) => {
        if (!id || resolveCategoryFromUrl(this.router.url) !== 'gourmet') {
          return of(undefined);
        }

        return this.gourmetService.getProductById(id).pipe(
          catchError(() => of(undefined)),
        );
      }),
    ),
    { initialValue: undefined },
  );

  readonly relatedProducts = toSignal(
    toObservable(this.product).pipe(
      switchMap((product) => {
        if (!product?.gourmetSection) {
          return of([] as Product[]);
        }

        return this.gourmetService.getProductsBySection(product.gourmetSection).pipe(
          map((products) =>
            products.filter((item) => item.id !== product.id).slice(0, RELATED_PRODUCTS_LIMIT),
          ),
          catchError(() => of([] as Product[])),
        );
      }),
    ),
    { initialValue: [] as Product[] },
  );

  readonly categoryTitleKey = computed(() => {
    const current = this.product();
    return getCategoryTitleKey(current?.category ?? this.routeCategory());
  });

  readonly backRoute = computed(() => {
    const current = this.product();
    if (!current) {
      return getShopCategoryBasePath(this.routeCategory());
    }
    return getCategoryListingPath(current.category, current.gourmetSection);
  });

  readonly detailRoutePrefix = computed(() => {
    const current = this.product();
    return getShopCategoryBasePath(current?.category ?? this.routeCategory());
  });

  protected addToCart(): void {
    const current = this.product();
    if (!current) {
      return;
    }
    this.cartService.addItem(current.id);
    this.notificationService.show('shop.cart.added', 'success', 2500);
  }
}
