import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  getHotelRooms,
  getRoomTypeGroups,
  HOTELS,
  INITIAL_RESERVATIONS,
  isRoomAvailable,
  ROOMS,
} from '../../data/rooms.data';
import { HotelId, Room, RoomType } from '../../models/room.models';

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
  readonly activeReservationsCount = INITIAL_RESERVATIONS.filter(
    (res) => res.status !== 'cancelled',
  ).length;

  readonly selectedHotelId = signal<HotelId>('peralejos');
  readonly expandedTypes = signal<ReadonlySet<RoomType>>(new Set());

  readonly checkIn = signal('');
  readonly checkOut = signal('');
  readonly today = new Date().toISOString().split('T')[0];

  readonly hasDateRange = computed(() => {
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
    if (!this.hasDateRange()) {
      return 0;
    }
    const start = new Date(this.checkIn()).getTime();
    const end = new Date(this.checkOut()).getTime();
    return Math.max(0, Math.round((end - start) / (1000 * 60 * 60 * 24)));
  });

  readonly roomTypeGroups = computed(() => getRoomTypeGroups(this.selectedHotelId()));

  readonly flatRooms = computed(() => getHotelRooms(this.selectedHotelId()));

  readonly visibleFlatRooms = computed(() => this.visibleRooms(this.flatRooms()));

  readonly visibleRoomTypeGroups = computed(() =>
    this.roomTypeGroups()
      .map((group) => ({
        ...group,
        totalRooms: group.rooms.length,
        rooms: this.visibleRooms(group.rooms),
      }))
      .filter((group) => !this.hasDateRange() || group.rooms.length > 0),
  );

  readonly isFlatCatalog = computed(() => this.selectedHotel().catalogLayout === 'flat');

  readonly isPreparationCatalog = computed(() => this.selectedHotel().catalogLayout === 'preparation');

  readonly selectedHotel = computed(
    () => this.hotels.find((hotel) => hotel.id === this.selectedHotelId()) ?? this.hotels[0],
  );

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const hotelId = params.get('hotel') as HotelId | null;
      if (hotelId && this.hotels.some((hotel) => hotel.id === hotelId)) {
        this.selectHotel(hotelId);
      }
    });
  }

  selectHotel(hotelId: HotelId): void {
    this.selectedHotelId.set(hotelId);
    this.expandedTypes.set(new Set());
  }

  toggleType(type: RoomType): void {
    this.expandedTypes.update((current) => {
      const next = new Set(current);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }

  isTypeExpanded(type: RoomType): boolean {
    return this.expandedTypes().has(type);
  }

  clearDates(): void {
    this.checkIn.set('');
    this.checkOut.set('');
  }

  isRoomAvailable(roomId: string): boolean {
    if (!this.hasDateRange()) {
      return true;
    }
    return isRoomAvailable(roomId, this.checkIn(), this.checkOut());
  }

  visibleRooms(rooms: Room[]): Room[] {
    if (!this.hasDateRange()) {
      return rooms;
    }
    return rooms.filter((room) => this.isRoomAvailable(room.id));
  }

  availableCount(rooms: Room[]): number {
    if (!this.hasDateRange()) {
      return rooms.length;
    }
    return rooms.filter((room) => this.isRoomAvailable(room.id)).length;
  }

  bookingQueryParams(): Record<string, string> {
    if (!this.hasDateRange()) {
      return {};
    }
    return { checkIn: this.checkIn(), checkOut: this.checkOut() };
  }
}
