import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { getHotelRooms, getRoomTypeGroups, HOTELS, INITIAL_RESERVATIONS, ROOMS } from '../../data/rooms.data';
import { HotelId, RoomType } from '../../models/room.models';

@Component({
  selector: 'app-rooms',
  imports: [CurrencyPipe, RouterLink, TranslateModule],
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

  readonly roomTypeGroups = computed(() => getRoomTypeGroups(this.selectedHotelId()));

  readonly flatRooms = computed(() => getHotelRooms(this.selectedHotelId()));

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
}
