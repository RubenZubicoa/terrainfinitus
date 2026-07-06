import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { getProductById, getRelatedProducts } from '../../data/products.data';

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

  readonly highlightKeys = HIGHLIGHT_KEYS;

  private readonly productId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('productId') ?? '')),
    { initialValue: '' },
  );

  readonly product = computed(() => {
    const id = this.productId();
    return id ? getProductById(id) : undefined;
  });

  readonly relatedProducts = computed(() => {
    const id = this.productId();
    return id ? getRelatedProducts(id) : [];
  });

  readonly backRoute = computed(() => {
    const current = this.product();
    if (!current) return '/tienda-boutique/gourmet';
    if (current.category === 'merchandising') {
      return '/tienda-boutique/merchandising';
    }
    if (current.gourmetSection) {
      return `/tienda-boutique/gourmet#${current.gourmetSection}`;
    }
    return '/tienda-boutique/gourmet';
  });

  readonly detailRoutePrefix = computed(() => {
    const current = this.product();
    if (!current) return '/tienda-boutique/gourmet';
    return current.category === 'merchandising'
      ? '/tienda-boutique/merchandising'
      : '/tienda-boutique/gourmet';
  });
}
