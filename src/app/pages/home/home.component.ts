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
    { src: '/images/inicio/inicio1.jpeg', altKey: 'home.alt1' },
    { src: '/images/inicio/inicio2.jpeg', altKey: 'home.alt2' },
    { src: '/images/inicio/inicio3.jpeg', altKey: 'home.alt3' },
    { src: '/images/inicio/inicio4.jpg', altKey: 'home.alt4' },
    { src: '/images/inicio/inicio5.jpg', altKey: 'home.alt5' },
    { src: '/images/inicio/inicio6.jpg', altKey: 'home.alt6' },
    { src: '/images/inicio/inicio7.jpg', altKey: 'home.alt7' },
    { src: '/images/inicio/inicio8.jpg', altKey: 'home.alt8' },
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
