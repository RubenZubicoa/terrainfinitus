import { CurrencyPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { CurrentUserService } from '../../../../core/services/current-user-service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TokenService } from '../../../../core/services/token-service';
import { ALL_ROOM_TYPES, getHotelById, getRoomById } from '../../data/rooms.data';
import {
  BOOKING_PAYMENT_METHODS,
  BookingPaymentMethod,
  CreateBooking,
} from '../../models/booking.models';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-room-detail',
  imports: [CurrencyPipe, FormsModule, RouterLink, TranslateModule],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.scss',
})
export class RoomDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly bookingService = inject(BookingService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly tokenService = inject(TokenService);
  private readonly notificationService = inject(NotificationService);

  private readonly roomId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('roomId') ?? '')),
    { initialValue: '' },
  );

  readonly paymentMethods = BOOKING_PAYMENT_METHODS;
  readonly today = new Date().toISOString().split('T')[0];

  readonly checkIn = signal('');
  readonly checkOut = signal('');
  readonly paymentMethod = signal<BookingPaymentMethod>('card');
  readonly selectedImageIndex = signal(0);
  readonly submitting = signal(false);

  readonly isAuthenticated = this.tokenService.isAuthenticated;

  readonly hasStayDates = computed(() => {
    const checkIn = this.checkIn();
    const checkOut = this.checkOut();
    return !!checkIn && !!checkOut && checkIn < checkOut;
  });

  readonly dateRangeInvalid = computed(() => {
    const checkIn = this.checkIn();
    const checkOut = this.checkOut();
    return !!checkIn && !!checkOut && checkIn >= checkOut;
  });

  readonly nights = computed(() => {
    if (!this.hasStayDates()) {
      return 0;
    }
    const start = new Date(this.checkIn()).getTime();
    const end = new Date(this.checkOut()).getTime();
    return Math.max(0, Math.round((end - start) / (1000 * 60 * 60 * 24)));
  });

  readonly stayTotal = computed(() => {
    const currentRoom = this.room();
    if (!currentRoom || !this.hasStayDates()) {
      return 0;
    }
    return currentRoom.pricePerNight * this.nights();
  });

  readonly canSubmit = computed(
    () =>
      this.hasStayDates() &&
      !this.dateRangeInvalid() &&
      this.isAuthenticated() &&
      !!this.room() &&
      !this.submitting(),
  );

  readonly room = computed(() => {
    const id = this.roomId();
    return id ? getRoomById(id) : undefined;
  });

  readonly hotel = computed(() => {
    const currentRoom = this.room();
    return currentRoom ? getHotelById(currentRoom.hotelId) : undefined;
  });

  readonly roomTypeLabel = computed(() => {
    const currentRoom = this.room();
    if (!currentRoom) return '';
    return ALL_ROOM_TYPES.find((t) => t.id === currentRoom.type)?.labelKey ?? '';
  });

  readonly unitNumberLabel = computed(() => {
    const currentRoom = this.room();
    if (!currentRoom) return 'rooms.roomNumber';
    return currentRoom.type === 'bungalow' ? 'rooms.bungalowNumber' : 'rooms.roomNumber';
  });

  readonly selectedImage = computed(() => {
    const currentRoom = this.room();
    if (!currentRoom) return null;
    return currentRoom.images[this.selectedImageIndex()] ?? currentRoom.images[0] ?? null;
  });

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const checkIn = params.get('checkIn') ?? '';
      const checkOut = params.get('checkOut') ?? '';
      if (checkIn) {
        this.checkIn.set(checkIn);
      }
      if (checkOut) {
        this.checkOut.set(checkOut);
      }
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  paymentMethodLabelKey(method: BookingPaymentMethod): string {
    return `shop.checkout.paymentMethods.${method}`;
  }

  goToLogin(): void {
    const room = this.room();
    const query: string[] = [];
    if (this.checkIn()) {
      query.push(`checkIn=${encodeURIComponent(this.checkIn())}`);
    }
    if (this.checkOut()) {
      query.push(`checkOut=${encodeURIComponent(this.checkOut())}`);
    }
    const path = room ? `/habitaciones/${room.id}` : '/habitaciones';
    const returnUrl = query.length ? `${path}?${query.join('&')}` : path;
    void this.router.navigate(['/login'], { queryParams: { returnUrl } });
  }

  submitBooking(): void {
    const room = this.room();
    const user = this.currentUserService.user();

    if (!room || !this.hasStayDates() || this.dateRangeInvalid()) {
      return;
    }

    if (!this.isAuthenticated() || !user) {
      this.notificationService.show('rooms.form.loginRequired', 'error');
      this.goToLogin();
      return;
    }

    const payload: CreateBooking = {
      userId: user.uuid,
      roomId: room.id,
      startDate: new Date(this.checkIn()),
      endDate: new Date(this.checkOut()),
      price: this.stayTotal(),
      status: 'pending',
      currency: 'EUR',
      paymentMethod: this.paymentMethod(),
      paymentStatus: 'pending',
      paymentDate: new Date(),
    };

    this.submitting.set(true);
    this.bookingService.createBooking(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.notificationService.show('rooms.form.success', 'success');
        void this.router.navigate(['/habitaciones'], {
          queryParams: { hotel: room.hotelId },
        });
      },
      error: () => {
        this.submitting.set(false);
        this.notificationService.show('rooms.form.error', 'error');
      },
    });
  }
}
