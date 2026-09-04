import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../../core/services/cart.service';
import { CurrentUserService } from '../../../core/services/current-user-service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, RouterLink, TranslateModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  readonly products = input.required<readonly Product[]>();
  readonly listAriaKey = input('shop.productListAria');
  readonly emptyKey = input('shop.empty');
  readonly detailRoutePrefix = input<string | null>(null);
  readonly viewDetailsKey = input('shop.detail.viewDetails');
  readonly priceDigits = input('1.0-0');
  readonly enableCart = input(true);

  protected readonly cartService = inject(CartService);
  protected readonly currentUserService = inject(CurrentUserService);
  private readonly notificationService = inject(NotificationService);

  protected addToCart(product: Product): void {
    this.cartService.addItem(product);
    this.notificationService.show('shop.cart.added', 'success', 2500);
  }
}
