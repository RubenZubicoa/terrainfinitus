export type PaymentMethod = 'card' | 'transfer' | 'bizum' | 'paypal';

export interface CheckoutPersonalData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface CheckoutRequest {
  personalData: CheckoutPersonalData;
  paymentMethod: PaymentMethod;
  items: Array<{ productId: string; quantity: number }>;
  subtotal: number;
}
