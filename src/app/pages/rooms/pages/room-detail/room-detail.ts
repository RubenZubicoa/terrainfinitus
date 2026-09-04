import { CurrencyPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, map, of } from 'rxjs';
import { CurrentUserService } from '../../../../core/services/current-user-service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TokenService } from '../../../../core/services/token-service';
import { ALL_ROOM_TYPES, getHotelById, getRoomById } from '../../data/rooms.data';
import {
  isRoomRangeAvailable,
  toDateKey,
  unavailableDatesInMonth,
} from '../../models/booking-availability';
import {
  BOOKING_PAYMENT_METHODS,
  Booking,
  BookingPaymentMethod,
  CreateBooking,
} from '../../models/booking.models';
import { BookingService } from '../../services/booking.service';

export interface CalendarDay {
  key: string;
  day: number;
  inMonth: boolean;
  past: boolean;
  unavailable: boolean;
  selectedStart: boolean;
  selectedEnd: boolean;
  inRange: boolean;
  disabled: boolean;
}

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
  private readonly translate = inject(TranslateService);

  private readonly roomId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('roomId') ?? '')),
    { initialValue: '' },
  );

  readonly paymentMethods = BOOKING_PAYMENT_METHODS;
  readonly today = toDateKey(new Date());
  readonly weekDayKeys = [
    'rooms.calendar.weekdays.mon',
    'rooms.calendar.weekdays.tue',
    'rooms.calendar.weekdays.wed',
    'rooms.calendar.weekdays.thu',
    'rooms.calendar.weekdays.fri',
    'rooms.calendar.weekdays.sat',
    'rooms.calendar.weekdays.sun',
  ] as const;

  readonly checkIn = signal('');
  readonly checkOut = signal('');
  readonly guests = signal(1);
  readonly paymentMethod = signal<BookingPaymentMethod>('card');
  readonly selectedImageIndex = signal(0);
  readonly submitting = signal(false);
  readonly roomBookings = signal<Booking[]>([]);
  readonly bookingsLoading = signal(true);
  readonly calendarMonth = signal(this.currentMonthStart());

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

  readonly datesUnavailable = computed(() => {
    const room = this.room();
    if (!room || !this.hasStayDates()) {
      return false;
    }
    return !isRoomRangeAvailable(
      this.roomBookings(),
      room.id,
      this.checkIn(),
      this.checkOut(),
    );
  });

  readonly guestsInvalid = computed(() => {
    const room = this.room();
    const count = this.guests();
    if (!Number.isFinite(count) || count < 1) {
      return true;
    }
    if (room && count > room.capacity) {
      return true;
    }
    return false;
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
      !this.datesUnavailable() &&
      !this.guestsInvalid() &&
      this.isAuthenticated() &&
      !!this.room() &&
      !this.submitting() &&
      !this.bookingsLoading(),
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

  readonly calendarTitle = computed(() => {
    const month = this.calendarMonth();
    const formatter = new Intl.DateTimeFormat(this.translate.getCurrentLang() || 'es', {
      month: 'long',
      year: 'numeric',
    });
    return formatter.format(month);
  });

  readonly calendarDays = computed((): CalendarDay[] => {
    const room = this.room();
    const monthDate = this.calendarMonth();
    const year = monthDate.getFullYear();
    const monthIndex = monthDate.getMonth();
    const firstWeekday = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const unavailable = room
      ? unavailableDatesInMonth(this.roomBookings(), room.id, year, monthIndex)
      : new Set<string>();

    const checkIn = this.checkIn();
    const checkOut = this.checkOut();
    const days: CalendarDay[] = [];

    for (let i = 0; i < firstWeekday; i++) {
      days.push({
        key: `pad-start-${i}`,
        day: 0,
        inMonth: false,
        past: true,
        unavailable: false,
        selectedStart: false,
        selectedEnd: false,
        inRange: false,
        disabled: true,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const key = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const past = key < this.today;
      const isUnavailable = unavailable.has(key);
      days.push({
        key,
        day,
        inMonth: true,
        past,
        unavailable: isUnavailable,
        selectedStart: key === checkIn,
        selectedEnd: key === checkOut,
        inRange: !!checkIn && !!checkOut && key > checkIn && key < checkOut,
        disabled: past || isUnavailable,
      });
    }

    while (days.length % 7 !== 0) {
      days.push({
        key: `pad-end-${days.length}`,
        day: 0,
        inMonth: false,
        past: true,
        unavailable: false,
        selectedStart: false,
        selectedEnd: false,
        inRange: false,
        disabled: true,
      });
    }

    return days;
  });

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const checkIn = params.get('checkIn') ?? '';
      const checkOut = params.get('checkOut') ?? '';
      const guestsParam = params.get('guests');
      if (checkIn) {
        this.checkIn.set(checkIn);
        this.calendarMonth.set(this.monthFromKey(checkIn));
      }
      if (checkOut) {
        this.checkOut.set(checkOut);
      }
      if (guestsParam) {
        const parsed = Number(guestsParam);
        if (Number.isFinite(parsed) && parsed >= 1) {
          this.guests.set(parsed);
        }
      }
    });

    this.loadRoomBookings();
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  onGuestsChange(value: string | number): void {
    const parsed = typeof value === 'number' ? value : Number(value);
    this.guests.set(Number.isFinite(parsed) ? parsed : 1);
  }

  paymentMethodLabelKey(method: BookingPaymentMethod): string {
    return `shop.checkout.paymentMethods.${method}`;
  }

  previousMonth(): void {
    const current = this.calendarMonth();
    this.calendarMonth.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  }

  nextMonth(): void {
    const current = this.calendarMonth();
    this.calendarMonth.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  selectCalendarDay(day: CalendarDay): void {
    if (!day.inMonth || day.disabled) {
      if (day.unavailable) {
        this.notificationService.show('rooms.form.dayUnavailable', 'error');
      }
      return;
    }

    const room = this.room();
    if (!room) {
      return;
    }

    const checkIn = this.checkIn();
    const checkOut = this.checkOut();

    if (!checkIn || (checkIn && checkOut) || day.key <= checkIn) {
      this.checkIn.set(day.key);
      this.checkOut.set('');
      return;
    }

    if (!isRoomRangeAvailable(this.roomBookings(), room.id, checkIn, day.key)) {
      this.notificationService.show('rooms.form.unavailable', 'error');
      return;
    }

    this.checkOut.set(day.key);
  }

  clearDates(): void {
    this.checkIn.set('');
    this.checkOut.set('');
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
    if (this.guests() > 0) {
      query.push(`guests=${encodeURIComponent(String(this.guests()))}`);
    }
    const path = room ? `/habitaciones/${room.id}` : '/habitaciones';
    const returnUrl = query.length ? `${path}?${query.join('&')}` : path;
    void this.router.navigate(['/login'], { queryParams: { returnUrl } });
  }

  submitBooking(): void {
    const room = this.room();
    const user = this.currentUserService.user();

    if (
      !room ||
      !this.hasStayDates() ||
      this.dateRangeInvalid() ||
      this.guestsInvalid()
    ) {
      return;
    }

    if (this.datesUnavailable()) {
      this.notificationService.show('rooms.form.unavailable', 'error');
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
      guests: this.guests(),
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
      error: (error: { status?: number }) => {
        this.submitting.set(false);
        if (error?.status === 409 || error?.status === 400) {
          this.notificationService.show('rooms.form.unavailable', 'error');
          this.loadRoomBookings();
          return;
        }
        this.notificationService.show('rooms.form.error', 'error');
      },
    });
  }

  private loadRoomBookings(): void {
    const roomId = this.roomId();
    this.bookingsLoading.set(true);

    this.bookingService
      .getBookings()
      .pipe(
        catchError(() => of([] as Booking[])),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((bookings) => {
        this.roomBookings.set(
          roomId ? bookings.filter((booking) => booking.roomId === roomId) : [],
        );
        this.bookingsLoading.set(false);

        if (this.hasStayDates() && this.datesUnavailable()) {
          this.checkOut.set('');
        }
      });
  }

  private currentMonthStart(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  private monthFromKey(dateKey: string): Date {
    const [year, month] = dateKey.split('-').map(Number);
    return new Date(year, month - 1, 1);
  }
}
