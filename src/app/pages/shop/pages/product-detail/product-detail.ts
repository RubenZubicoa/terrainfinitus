import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { getProductById, getRelatedProducts } from '../../data/products.data';
import {
  getCategoryListingPath,
  getCategoryTitleKey,
  getShopCategoryBasePath,
  resolveCategoryFromUrl,
} from '../../data/shop-paths';

const HIGHLIGHT_KEYS = [
  'shop.detail.highlights.quality',
  'shop.detail.highlights.glutenFree',
  'shop.detail.highlights.origin',
  'shop.detail.highlights.shipping',
] as const;

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink, TranslateModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly cartService = inject(CartService);
  private readonly notificationService = inject(NotificationService);

  readonly highlightKeys = HIGHLIGHT_KEYS;

  private readonly productId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('productId') ?? '')),
    { initialValue: '' },
  );

  private readonly routeCategory = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => resolveCategoryFromUrl(this.router.url)),
      startWith(resolveCategoryFromUrl(this.router.url)),
    ),
    { initialValue: resolveCategoryFromUrl(this.router.url) },
  );

  readonly product = computed(() => {
    const id = this.productId();
    const current = id ? getProductById(id) : undefined;
    if (!current || current.category !== this.routeCategory()) {
      return undefined;
    }
    return current;
  });

  readonly relatedProducts = computed(() => {
    const id = this.productId();
    return id ? getRelatedProducts(id) : [];
  });

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
