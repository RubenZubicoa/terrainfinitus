import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { getHotelById, getRoomById } from '../../data/rooms.data';

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

  readonly selectedImageIndex = signal(0);

  readonly room = computed(() => {
    const id = this.roomId();
    return id ? getRoomById(id) : undefined;
  });

  readonly hotel = computed(() => {
    const currentRoom = this.room();
    return currentRoom ? getHotelById(currentRoom.hotelId) : undefined;
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
