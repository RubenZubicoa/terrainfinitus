import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-images',
  imports: [CommonModule, TranslateModule],
  templateUrl: './images.html',
  styleUrl: './images.scss',
})
export class Images {
  readonly images: ReadonlyArray<{ id: string; titleKey: string; src: string }> = [
    { id: 'inicio1', titleKey: 'gallery.images.image1', src: '/images/inicio/inicio1.jpeg' },
    { id: 'inicio2', titleKey: 'gallery.images.image2', src: '/images/inicio/inicio2.jpeg' },
    { id: 'inicio3', titleKey: 'gallery.images.image3', src: '/images/inicio/inicio3.jpeg' },
  ] as const;

  selectedImageId: string = this.images[0]?.id ?? '';

  selectImage(id: string) {
    this.selectedImageId = id;
  }

  get selectedImage(): { id: string; titleKey: string; src: string } | null {
    return this.images.find((i) => i.id === this.selectedImageId) ?? null;
  }
}
