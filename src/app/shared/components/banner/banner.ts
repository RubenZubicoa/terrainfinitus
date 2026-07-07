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
  readonly enableTransition = signal(true);

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
    this.goToIndex((this.currentIndex() + 1) % this.slides().length, 'next');
  }

  prevSlide(): void {
    const count = this.slides().length;
    if (count === 0) return;
    this.goToIndex((this.currentIndex() - 1 + count) % count, 'prev');
  }

  goToSlide(index: number): void {
    const current = this.currentIndex();
    if (index === current) return;
    const direction = index > current ? 'next' : 'prev';
    this.goToIndex(index, direction);
  }

  private goToIndex(index: number, direction: 'next' | 'prev'): void {
    const count = this.slides().length;
    if (count === 0) return;

    const current = this.currentIndex();
    const isWrap =
      (direction === 'next' && index < current) || (direction === 'prev' && index > current);
    const isJump = Math.abs(index - current) > 1;

    if (isWrap || isJump) {
      this.setIndexWithoutTransition(index);
      return;
    }

    this.currentIndex.set(index);
  }

  private setIndexWithoutTransition(index: number): void {
    this.enableTransition.set(false);
    this.currentIndex.set(index);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.enableTransition.set(true));
    });
  }
}
