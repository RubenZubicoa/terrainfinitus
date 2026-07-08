import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { getHotelById, getRoomById, ALL_ROOM_TYPES } from '../../data/rooms.data';

@Component({
  selector: 'app-room-detail',
  imports: [CurrencyPipe, RouterLink, TranslateModule],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.scss',
})
export class RoomDetail {
  private readonly route = inject(ActivatedRoute);

  private readonly roomId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('roomId') ?? '')),
    { initialValue: '' },
  );

  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: null,
  });

  readonly checkIn = computed(() => this.queryParams()?.get('checkIn') ?? '');
  readonly checkOut = computed(() => this.queryParams()?.get('checkOut') ?? '');

  readonly hasStayDates = computed(() => {
    const checkIn = this.checkIn();
    const checkOut = this.checkOut();
    return !!checkIn && !!checkOut && checkIn < checkOut;
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

  readonly bookingQueryParams = computed(() =>
    this.hasStayDates() ? { checkIn: this.checkIn(), checkOut: this.checkOut() } : {},
  );

  readonly selectedImageIndex = signal(0);

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

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }
}
