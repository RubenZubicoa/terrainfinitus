import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddUser } from '../../../../core/models/User';
import { UserService } from '../../services/user.service';
import { passwordMatchValidator } from './register.validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './register.html',
  styleUrl: '../login/login.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly showPassword = signal(false);
  protected readonly showConfirmPassword = signal(false);
  protected readonly loading = signal(false);
  protected readonly errorKey = signal<string | null>(null);
  protected readonly success = signal(false);

  protected readonly form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator },
  );

  protected togglePassword(): void {
    this.showPassword.update((visible) => !visible);
  }

  protected toggleConfirmPassword(): void {
    this.showConfirmPassword.update((visible) => !visible);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorKey.set(
        this.form.hasError('passwordMismatch')
          ? 'register.errorPasswordMismatch'
          : 'register.errorRequired',
      );
      return;
    }

    this.loading.set(true);
    this.errorKey.set(null);
    this.success.set(false);

    const { name, lastName, email, phone, dni, address, password } = this.form.getRawValue();

    const payload: AddUser = {
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      dni: dni.trim().toUpperCase(),
      address: address.trim(),
      password,
      role: 'user',
    };

    this.userService.createUser(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => void this.router.navigate(['/login']), 1500);
      },
      error: (error: { status?: number }) => {
        this.loading.set(false);
        if (error?.status === 409) {
          this.errorKey.set('register.errorExists');
          return;
        }
        this.errorKey.set('register.error');
      },
    });
  }
}
