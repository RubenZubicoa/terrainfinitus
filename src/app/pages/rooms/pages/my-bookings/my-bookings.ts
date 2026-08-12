import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CurrentUserService } from '../../../../core/services/current-user-service';
import { TokenService } from '../../../../core/services/token-service';
import { getHotelById, getRoomById } from '../../data/rooms.data';
import { Booking } from '../../models/booking.models';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-my-bookings',
  imports: [CurrencyPipe, DatePipe, RouterLink, TranslateModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss',
})
export class MyBookings implements OnInit {
  private readonly router = inject(Router);
  private readonly bookingService = inject(BookingService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly tokenService = inject(TokenService);

  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly bookings = signal<Booking[]>([]);

  ngOnInit(): void {
    const user = this.currentUserService.user();
    if (!this.tokenService.isAuthenticated() || !user) {
      void this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/reservas' },
      });
      return;
    }

    this.loadBookings(user.uuid);
  }

  protected roomNameKey(roomId: string): string | null {
    return getRoomById(roomId)?.nameKey ?? null;
  }

  protected hotelNameKey(roomId: string): string | null {
    const room = getRoomById(roomId);
    if (!room) {
      return null;
    }
    return getHotelById(room.hotelId)?.nameKey ?? null;
  }

  protected roomDetailLink(roomId: string): string[] {
    return ['/habitaciones', roomId];
  }

  protected statusKey(status: string): string {
    const normalized = status.trim().toLowerCase();
    const known = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (known.includes(normalized)) {
      return `myBookings.status.${normalized}`;
    }
    return 'myBookings.status.unknown';
  }

  protected paymentMethodKey(method: string): string {
    const normalized = method.trim().toLowerCase();
    const known = ['card', 'transfer', 'bizum', 'paypal'];
    if (known.includes(normalized)) {
      return `shop.checkout.paymentMethods.${normalized}`;
    }
    return method;
  }

  protected paymentStatusKey(status: string): string {
    const normalized = status.trim().toLowerCase();
    const known = ['pending', 'paid', 'failed', 'refunded'];
    if (known.includes(normalized)) {
      return `myBookings.paymentStatus.${normalized}`;
    }
    return 'myBookings.paymentStatus.unknown';
  }

  private loadBookings(userId: string): void {
    this.loading.set(true);
    this.error.set(false);

    this.bookingService
      .getBookingsByUserId(userId)
      .pipe(
        catchError(() => {
          this.error.set(true);
          return of([] as Booking[]);
        }),
      )
      .subscribe((bookings) => {
        const sorted = [...bookings].sort((a, b) => {
          const aTime = a.createdAt
            ? Date.parse(a.createdAt)
            : new Date(a.startDate).getTime();
          const bTime = b.createdAt
            ? Date.parse(b.createdAt)
            : new Date(b.startDate).getTime();
          return bTime - aTime;
        });
        this.bookings.set(sorted);
        this.loading.set(false);
      });
  }
}
