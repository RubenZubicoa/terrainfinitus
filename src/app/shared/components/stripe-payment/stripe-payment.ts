import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stripe-payment',
  imports: [TranslateModule],
  templateUrl: './stripe-payment.html',
  styleUrl: './stripe-payment.scss',
})
export class StripePayment {}
