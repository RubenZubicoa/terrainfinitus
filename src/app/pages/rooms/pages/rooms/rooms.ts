import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HOTELS, INITIAL_RESERVATIONS, ROOMS } from '../../data/rooms.data';
import {
  BookingDraft,
  HotelId,
  Reservation,
  ReservationStatus,
} from '../../models/room.models';

const EMPTY_DRAFT = (): BookingDraft => ({
  roomId: '',
  guestName: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
  notes: '',
});

@Component({
  selector: 'app-rooms',
  imports: [CurrencyPipe, FormsModule, RouterLink, TranslateModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  private readonly route = inject(ActivatedRoute);

  readonly hotels = HOTELS;
  readonly allRooms = ROOMS;

  readonly selectedHotelId = signal<HotelId>('peralejos');
  readonly reservations = signal<Reservation[]>([...INITIAL_RESERVATIONS]);
  readonly selectedRoomId = signal<string | null>(null);
  readonly editingReservationId = signal<string | null>(null);
  readonly formError = signal<string | null>(null);

  readonly draft = signal<BookingDraft>(EMPTY_DRAFT());

  readonly hotelRooms = computed(() =>
    this.allRooms.filter((room) => room.hotelId === this.selectedHotelId()),
  );

  readonly hotelReservations = computed(() =>
    this.reservations().filter((res) => res.hotelId === this.selectedHotelId()),
  );

  readonly activeReservationsCount = computed(
    () =>
      this.reservations().filter((res) => res.status !== 'cancelled').length,
  );

  readonly selectedHotel = computed(
    () => this.hotels.find((hotel) => hotel.id === this.selectedHotelId()) ?? this.hotels[0],
  );

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const hotelId = params.get('hotel') as HotelId | null;
      const roomId = params.get('reservar');

      if (hotelId && this.hotels.some((hotel) => hotel.id === hotelId)) {
        this.selectedHotelId.set(hotelId);
      }

      if (roomId && this.allRooms.some((room) => room.id === roomId)) {
        this.selectRoom(roomId);
        queueMicrotask(() =>
          document.getElementById('rooms-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        );
      }
    });
  }

  selectHotel(hotelId: HotelId): void {
    this.selectedHotelId.set(hotelId);
    this.resetForm();
  }

  selectRoom(roomId: string): void {
    this.selectedRoomId.set(roomId);
    this.draft.update((current) => ({ ...current, roomId }));
    this.formError.set(null);
  }

  startBooking(roomId: string): void {
    this.selectRoom(roomId);
    this.editingReservationId.set(null);
    document.getElementById('rooms-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  editReservation(reservation: Reservation): void {
    this.editingReservationId.set(reservation.id);
    this.selectedRoomId.set(reservation.roomId);
    this.draft.set({
      roomId: reservation.roomId,
      guestName: reservation.guestName,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      guests: reservation.guests,
      notes: reservation.notes,
    });
    this.formError.set(null);
    document.getElementById('rooms-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  cancelReservation(id: string): void {
    this.reservations.update((list) =>
      list.map((res) => (res.id === id ? { ...res, status: 'cancelled' as ReservationStatus } : res)),
    );
    if (this.editingReservationId() === id) {
      this.resetForm();
    }
  }

  submitBooking(): void {
    const draft = this.draft();
    const validationError = this.validateDraft(draft);
    if (validationError) {
      this.formError.set(validationError);
      return;
    }

    const editingId = this.editingReservationId();
    if (editingId) {
      this.reservations.update((list) =>
        list.map((res) =>
          res.id === editingId
            ? {
                ...res,
                roomId: draft.roomId,
                guestName: draft.guestName.trim(),
                checkIn: draft.checkIn,
                checkOut: draft.checkOut,
                guests: draft.guests,
                notes: draft.notes.trim(),
                status: 'confirmed' as ReservationStatus,
              }
            : res,
        ),
      );
    } else {
      const reservation: Reservation = {
        id: `res-${Date.now()}`,
        hotelId: this.selectedHotelId(),
        roomId: draft.roomId,
        guestName: draft.guestName.trim(),
        checkIn: draft.checkIn,
        checkOut: draft.checkOut,
        guests: draft.guests,
        notes: draft.notes.trim(),
        status: 'confirmed',
      };
      this.reservations.update((list) => [reservation, ...list]);
    }

    this.resetForm();
  }

  resetForm(): void {
    this.editingReservationId.set(null);
    this.selectedRoomId.set(null);
    this.draft.set(EMPTY_DRAFT());
    this.formError.set(null);
  }

  roomById(roomId: string) {
    return this.allRooms.find((room) => room.id === roomId);
  }

  statusClass(status: ReservationStatus): string {
    return `rooms-reservation__status--${status}`;
  }

  private validateDraft(draft: BookingDraft): string | null {
    if (!draft.roomId) return 'rooms.errors.roomRequired';
    if (!draft.guestName.trim()) return 'rooms.errors.guestRequired';
    if (!draft.checkIn || !draft.checkOut) return 'rooms.errors.datesRequired';
    if (draft.checkOut <= draft.checkIn) return 'rooms.errors.invalidDates';
    if (draft.guests < 1) return 'rooms.errors.guestsRequired';

    const room = this.roomById(draft.roomId);
    if (room && draft.guests > room.capacity) return 'rooms.errors.capacityExceeded';

    return null;
  }
}
