import { inject, Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutRequest } from '../models/checkout.models';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  /**
   * Simula el envío del pedido al backend.
   * TODO: sustituir por HttpClient.post('/api/orders', payload).
   * Para tarjeta, integrar Stripe Elements antes de confirmar el pago.
   */
  submitOrder(payload: CheckoutRequest): Observable<void> {
    return timer(1500).pipe(map(() => undefined));
  }
}
