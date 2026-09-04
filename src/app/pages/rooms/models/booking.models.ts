export interface BookingDB {
  _id: string;
  userId: string;
  roomId: string;
  startDate: Date;
  endDate: Date;
  guests: number;
  price: number;
  status: string;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  uuid: string;
  userId: string;
  roomId: string;
  startDate: Date;
  endDate: Date;
  guests: number;
  price: number;
  status: string;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: Date;
  createdAt?: string;
}

/** Payload para crear una reserva (el backend asigna el id). */
export type CreateBooking = Omit<Booking, 'uuid' | 'createdAt'>;

export type BookingPaymentMethod = 'card' | 'transfer' | 'bizum' | 'paypal';

export const BOOKING_PAYMENT_METHODS: readonly BookingPaymentMethod[] = [
  'card',
  'transfer',
  'bizum',
  'paypal',
];

export function mapBookingDBToBooking(bookingDB: BookingDB): Booking {
  return {
    uuid: bookingDB._id,
    userId: bookingDB.userId,
    roomId: bookingDB.roomId,
    startDate: bookingDB.startDate,
    endDate: bookingDB.endDate,
    guests: bookingDB.guests,
    price: bookingDB.price,
    status: bookingDB.status,
    currency: bookingDB.currency,
    paymentMethod: bookingDB.paymentMethod,
    paymentStatus: bookingDB.paymentStatus,
    paymentDate: bookingDB.paymentDate,
    createdAt: bookingDB.createdAt
      ? new Date(bookingDB.createdAt).toISOString()
      : undefined,
  };
}
