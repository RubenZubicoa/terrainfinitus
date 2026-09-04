import { Component, DestroyRef, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BULLETIN_ISSUES } from '../../data/bulletins.data';

@Component({
  selector: 'app-bulletins',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './bulletins.html',
  styleUrl: './bulletins.scss',
})
export class Bulletins implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly issues = BULLETIN_ISSUES;
  readonly subscribeDialogOpen = signal(false);
  readonly subscribeSuccess = signal(false);
  readonly subscribeSubmitting = signal(false);

  readonly subscribeForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  private readonly subscribeBackdropRef = viewChild<ElementRef<HTMLElement>>('subscribeBackdrop');

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.document.body.style.overflow = '';
    });
  }

  openSubscribeDialog(): void {
    this.subscribeSuccess.set(false);
    this.subscribeDialogOpen.set(true);
    this.document.body.style.overflow = 'hidden';
    window.setTimeout(() => this.attachBackdropToBody(), 0);
  }

  private attachBackdropToBody(): void {
    const backdrop = this.subscribeBackdropRef()?.nativeElement;
    if (backdrop && backdrop.parentElement !== this.document.body) {
      this.document.body.appendChild(backdrop);
    }
  }

  closeSubscribeDialog(): void {
    this.subscribeDialogOpen.set(false);
    this.subscribeForm.reset();
    this.subscribeSuccess.set(false);
    this.document.body.style.overflow = '';
  }

  onSubscribeBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeSubscribeDialog();
    }
  }

  onDialogKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeSubscribeDialog();
    }
  }

  onSubscribeSubmit(): void {
    if (this.subscribeForm.invalid) {
      this.subscribeForm.markAllAsTouched();
      return;
    }

    this.subscribeSubmitting.set(true);

    window.setTimeout(() => {
      this.subscribeSubmitting.set(false);
      this.subscribeSuccess.set(true);
      this.subscribeForm.reset();
    }, 600);
  }
}
