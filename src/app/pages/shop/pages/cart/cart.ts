import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../../../core/services/cart.service';
import { getProductDetailLink, getShopCategoryBasePath } from '../../data/shop-paths';
import { ProductCategory } from '../../../../shared/models/product.models';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, TranslateModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected readonly cartService = inject(CartService);

  protected productRoute(productId: string, category: ProductCategory): string[] {
    return getProductDetailLink(category, productId);
  }

  protected categoryPath(category: ProductCategory): string {
    return getShopCategoryBasePath(category);
  }

  protected categoryLabelKey(category: ProductCategory): string {
    return `shop.cart.categories.${category}`;
  }
}
