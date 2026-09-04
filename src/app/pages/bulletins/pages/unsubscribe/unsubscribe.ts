import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bulletins-unsubscribe',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './unsubscribe.html',
  styleUrl: './unsubscribe.scss',
})
export class Unsubscribe {
  private readonly formBuilder = inject(FormBuilder);

  readonly success = signal(false);
  readonly submitting = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    window.setTimeout(() => {
      this.submitting.set(false);
      this.success.set(true);
      this.form.reset();
    }, 600);
  }
}
