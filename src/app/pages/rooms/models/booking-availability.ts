import { Booking } from './booking.models';

/** Normaliza una fecha a clave `YYYY-MM-DD` (día civil). */
export function toDateKey(value: Date | string): string {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function rangesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
): boolean {
  return startA < endB && endA > startB;
}

export function isActiveBooking(booking: Booking): boolean {
  const status = (booking.status ?? '').toLowerCase();
  return status !== 'cancelled' && status !== 'canceled';
}

/** Reservas activas de una habitación. */
export function bookingsForRoom(bookings: readonly Booking[], roomId: string): Booking[] {
  return bookings.filter((booking) => booking.roomId === roomId && isActiveBooking(booking));
}

/**
 * Comprueba si el rango [checkIn, checkOut) está libre para la habitación.
 * El día de salida no ocupa la noche (intervalo semiabierto).
 */
export function isRoomRangeAvailable(
  bookings: readonly Booking[],
  roomId: string,
  checkIn: string,
  checkOut: string,
): boolean {
  if (!checkIn || !checkOut || checkIn >= checkOut) {
    return false;
  }

  return !bookingsForRoom(bookings, roomId).some((booking) =>
    rangesOverlap(toDateKey(booking.startDate), toDateKey(booking.endDate), checkIn, checkOut),
  );
}

/**
 * Un día está ocupado si forma parte de alguna noche reservada
 * (startDate inclusive, endDate exclusive).
 */
export function isDateUnavailable(
  bookings: readonly Booking[],
  roomId: string,
  dateKey: string,
): boolean {
  return bookingsForRoom(bookings, roomId).some((booking) => {
    const start = toDateKey(booking.startDate);
    const end = toDateKey(booking.endDate);
    return dateKey >= start && dateKey < end;
  });
}

/** Conjunto de fechas ocupadas en un mes (YYYY-MM). */
export function unavailableDatesInMonth(
  bookings: readonly Booking[],
  roomId: string,
  year: number,
  monthIndex: number,
): ReadonlySet<string> {
  const unavailable = new Set<string>();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (isDateUnavailable(bookings, roomId, key)) {
      unavailable.add(key);
    }
  }

  return unavailable;
}

export function addDays(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day + days);
  return toDateKey(date);
}
