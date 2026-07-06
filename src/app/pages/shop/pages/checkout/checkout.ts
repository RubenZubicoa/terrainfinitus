import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentMethod } from '../../../../core/models/checkout.models';
import { CartService } from '../../../../core/services/cart.service';
import { CheckoutService } from '../../../../core/services/checkout.service';
import { CurrentUserService } from '../../../../core/services/current-user-service';
import { NotificationService } from '../../../../core/services/notification.service';
import { StripePayment } from '../../../../shared/components/stripe-payment/stripe-payment';

const PAYMENT_METHODS: readonly PaymentMethod[] = ['card', 'transfer', 'bizum', 'paypal'];

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
  private readonly checkoutService = inject(CheckoutService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly notificationService = inject(NotificationService);

  protected readonly paymentMethods = PAYMENT_METHODS;
  protected readonly cartServiceRef = this.cartService;
  protected readonly loading = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    paymentMethod: this.fb.nonNullable.control<PaymentMethod>('card', Validators.required),
  });

  ngOnInit(): void {
    if (this.cartService.isEmpty()) {
      void this.router.navigate(['/tienda-boutique/carrito']);
      return;
    }

    this.prefillFromUser();
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

  protected onSubmit(): void {
    if (this.form.invalid || this.cartService.isEmpty()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const personalData = {
      name: this.form.controls.name.value,
      lastName: this.form.controls.lastName.value,
      email: this.form.controls.email.value,
      phone: this.form.controls.phone.value,
      address: this.form.controls.address.value,
    };

    const payload = {
      personalData,
      paymentMethod: this.form.controls.paymentMethod.value,
      items: this.cartService.items().map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      subtotal: this.cartService.subtotal(),
    };

    this.checkoutService.submitOrder(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.cartService.clear();
        this.notificationService.show('shop.checkout.success', 'success');
        void this.router.navigate(['/tienda-boutique/carrito']);
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.show('shop.checkout.error', 'error');
      },
    });
  }

  private prefillFromUser(): void {
    const user = this.currentUserService.user();
    if (!user) {
      return;
    }

    this.form.patchValue({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  }
}
