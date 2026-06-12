import { Component, effect, input, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';

export interface BannerSlide {
  src: string;
  altKey: string;
}

@Component({
  selector: 'app-banner',
  imports: [TranslateModule],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {
  readonly slides = input.required<readonly BannerSlide[]>();
  readonly galleryAriaKey = input('home.galleryAria');
  readonly prevAriaKey = input('home.bannerPrev');
  readonly nextAriaKey = input('home.bannerNext');
  readonly autoplayMs = input(5000);

  readonly currentIndex = signal(0);

  constructor() {
    effect((onCleanup) => {
      const ms = this.autoplayMs();
      const count = this.slides().length;
      if (ms <= 0 || count <= 1) return;

      const sub: Subscription = interval(ms).subscribe(() => this.nextSlide());
      onCleanup(() => sub.unsubscribe());
    });
  }

  nextSlide(): void {
    const count = this.slides().length;
    if (count === 0) return;
    this.currentIndex.update((i) => (i + 1) % count);
  }

  prevSlide(): void {
    const count = this.slides().length;
    if (count === 0) return;
    this.currentIndex.update((i) => (i - 1 + count) % count);
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
  }
}
