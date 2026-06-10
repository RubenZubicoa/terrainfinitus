import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly slides = [
    { src: '/images/inicio/inicio1.jpg', altKey: 'home.alt1' },
    { src: '/images/inicio/inicio2.jpg', altKey: 'home.alt2' },
    { src: '/images/inicio/inicio3.jpg', altKey: 'home.alt3' },
    { src: '/images/inicio/inicio4.jpg', altKey: 'home.alt4' },
    { src: '/images/inicio/inicio5.jpg', altKey: 'home.alt5' },
    { src: '/images/inicio/inicio6.jpg', altKey: 'home.alt6' },
    { src: '/images/inicio/inicio7.jpg', altKey: 'home.alt7' },
    { src: '/images/inicio/inicio8.jpg', altKey: 'home.alt8' },
    { src: '/images/inicio/inicio9.jpg', altKey: 'home.alt9' },
    { src: '/images/inicio/inicio10.jpg', altKey: 'home.alt10' },
    { src: '/images/inicio/inicio11.jpg', altKey: 'home.alt11' },
    { src: '/images/inicio/inicio12.jpg', altKey: 'home.alt12' },
    { src: '/images/inicio/inicio13.jpg', altKey: 'home.alt13' },
    { src: '/images/inicio/inicio14.jpg', altKey: 'home.alt14' },
    { src: '/images/inicio/inicio15.jpg', altKey: 'home.alt15' },
    { src: '/images/inicio/inicio16.jpg', altKey: 'home.alt16' },
    { src: '/images/inicio/inicio17.jpg', altKey: 'home.alt17' },
    { src: '/images/inicio/inicio18.jpg', altKey: 'home.alt18' },
    { src: '/images/inicio/inicio19.jpg', altKey: 'home.alt19' },
  ] as const;

  readonly currentIndex = signal(0);

  constructor() {
    interval(5000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.nextSlide());
  }

  nextSlide(): void {
    this.currentIndex.update((i) => (i + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentIndex.update(
      (i) => (i - 1 + this.slides.length) % this.slides.length,
    );
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
  }
}
