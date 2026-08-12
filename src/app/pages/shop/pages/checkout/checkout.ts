import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentMethod } from '../../../../core/models/checkout.models';
import { CartService } from '../../../../core/services/cart.service';
import { CurrentUserService } from '../../../../core/services/current-user-service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TokenService } from '../../../../core/services/token-service';
import { Product } from '../../../../shared/models/product.models';
import { StripePayment } from '../../../../shared/components/stripe-payment/stripe-payment';
import { AddGourmetOrder } from '../../models/GourmetOrder';
import { GourmetOrderService } from '../../services/gourmet-order';

const PAYMENT_METHODS: readonly PaymentMethod[] = ['card', 'transfer', 'bizum', 'paypal'];
const DEFAULT_ORDER_STATUS = 'pending';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink, TranslateModule, StripePayment],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly gourmetOrderService = inject(GourmetOrderService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly tokenService = inject(TokenService);
  private readonly notificationService = inject(NotificationService);

  protected readonly paymentMethods = PAYMENT_METHODS;
  protected readonly cartServiceRef = this.cartService;
  protected readonly currentUser = this.currentUserService.user;
  protected readonly isAuthenticated = this.tokenService.isAuthenticated;
  protected readonly loading = signal(false);

  protected readonly gourmetItems = computed(() =>
    this.cartService.items().filter((item) => item.product.category === 'gourmet'),
  );

  protected readonly gourmetSubtotal = computed(() =>
    this.gourmetItems().reduce((total, item) => total + this.lineTotal(item.product, item.quantity), 0),
  );

  protected readonly form = this.fb.nonNullable.group({
    paymentMethod: this.fb.nonNullable.control<PaymentMethod>('card', Validators.required),
  });

  ngOnInit(): void {
    if (this.cartService.isEmpty()) {
      void this.router.navigate(['/tienda-boutique/carrito']);
      return;
    }

    if (!this.isAuthenticated()) {
      void this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/tienda-boutique/checkout' },
      });
    }
  }

  protected paymentMethodLabelKey(method: PaymentMethod): string {
    return `shop.checkout.paymentMethods.${method}`;
  }

  protected paymentInstructionsKey(method: PaymentMethod): string | null {
    if (method === 'card') {
      return null;
    }
    return `shop.checkout.paymentInstructions.${method}`;
  }

  protected isCardPayment(): boolean {
    return this.form.controls.paymentMethod.value === 'card';
  }

  protected unitPrice(product: Product): number {
    if (this.currentUserService.isProfessional() && product.professionalPrice != null) {
      return product.professionalPrice;
    }
    return product.price;
  }

  protected lineTotal(product: Product, quantity: number): number {
    return this.unitPrice(product) * quantity;
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.currentUserService.user();
    if (!this.isAuthenticated() || !user) {
      this.notificationService.show('shop.checkout.loginRequired', 'error');
      void this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/tienda-boutique/checkout' },
      });
      return;
    }

    const gourmetItems = this.gourmetItems();
    if (gourmetItems.length === 0) {
      this.notificationService.show('shop.checkout.noGourmetItems', 'error');
      return;
    }

    this.loading.set(true);

    const products = gourmetItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: this.unitPrice(item.product),
    }));

    const payload: AddGourmetOrder = {
      userId: user.uuid,
      products,
      totalPrice: products.reduce((total, line) => total + line.price * line.quantity, 0),
      status: DEFAULT_ORDER_STATUS,
    };

    this.gourmetOrderService.createGourmetOrder(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.cartService.removeItemsByCategory('gourmet');
        this.notificationService.show('shop.checkout.success', 'success');
        void this.router.navigate(['/tienda-boutique/carrito']);
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.show('shop.checkout.error', 'error');
      },
    });
  }
}
