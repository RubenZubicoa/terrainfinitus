import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateUser, UpdateUserWithPassword, User } from '../../../../core/models/User';
import { CurrentUserService } from '../../../../core/services/current-user-service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TokenService } from '../../../../core/services/token-service';
import { UserService } from '../../services/user.service';
import { passwordMatchValidator } from '../register/register.validators';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './profile.html',
  styleUrl: '../login/login.scss',
})
export class Profile implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly tokenService = inject(TokenService);
  private readonly notificationService = inject(NotificationService);

  protected readonly showPassword = signal(false);
  protected readonly showConfirmPassword = signal(false);
  protected readonly profileLoading = signal(false);
  protected readonly passwordLoading = signal(false);
  protected readonly profileErrorKey = signal<string | null>(null);
  protected readonly passwordErrorKey = signal<string | null>(null);
  protected readonly profileSuccess = signal(false);
  protected readonly passwordSuccess = signal(false);

  protected readonly profileForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
  });

  protected readonly passwordForm = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator },
  );

  ngOnInit(): void {
    const user = this.currentUserService.user();
    if (!this.tokenService.isAuthenticated() || !user) {
      void this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/perfil' },
      });
      return;
    }

    this.patchProfileForm(user);
  }

  protected togglePassword(): void {
    this.showPassword.update((visible) => !visible);
  }

  protected toggleConfirmPassword(): void {
    this.showConfirmPassword.update((visible) => !visible);
  }

  protected onSaveProfile(): void {
    const user = this.currentUserService.user();
    if (!user) {
      return;
    }

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.profileErrorKey.set('profile.errorRequired');
      return;
    }

    this.profileLoading.set(true);
    this.profileErrorKey.set(null);
    this.profileSuccess.set(false);

    const payload = this.buildUpdatePayload(user);

    this.userService.updateUser(user.uuid, payload).subscribe({
      next: () => {
        this.profileLoading.set(false);
        this.profileSuccess.set(true);
        this.currentUserService.setUser({
          ...user,
          ...payload,
          password: user.password,
        });
        this.notificationService.show('profile.successProfile', 'success');
      },
      error: (error: { status?: number }) => {
        this.profileLoading.set(false);
        if (error?.status === 409) {
          this.profileErrorKey.set('profile.errorExists');
          return;
        }
        this.profileErrorKey.set('profile.errorProfile');
      },
    });
  }

  protected onChangePassword(): void {
    const user = this.currentUserService.user();
    if (!user) {
      return;
    }

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      this.passwordErrorKey.set(
        this.passwordForm.hasError('passwordMismatch')
          ? 'profile.errorPasswordMismatch'
          : 'profile.errorRequired',
      );
      return;
    }

    this.passwordLoading.set(true);
    this.passwordErrorKey.set(null);
    this.passwordSuccess.set(false);

    const { password } = this.passwordForm.getRawValue();
    const payload: UpdateUserWithPassword = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dni: user.dni,
      address: user.address,
      isProfessional: user.isProfessional,
      password,
    };

    this.userService.updateUserPassword(user.uuid, payload).subscribe({
      next: () => {
        this.passwordLoading.set(false);
        this.passwordSuccess.set(true);
        this.passwordForm.reset({ password: '', confirmPassword: '' });
        this.notificationService.show('profile.successPassword', 'success');
      },
      error: () => {
        this.passwordLoading.set(false);
        this.passwordErrorKey.set('profile.errorPassword');
      },
    });
  }

  private patchProfileForm(user: User): void {
    this.profileForm.patchValue({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dni: user.dni,
      address: user.address,
    });
  }

  private buildUpdatePayload(user: User): UpdateUser {
    const { name, lastName, email, phone, dni, address } = this.profileForm.getRawValue();

    return {
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      dni: dni.trim().toUpperCase(),
      address: address.trim(),
      isProfessional: user.isProfessional,
    };
  }
}
