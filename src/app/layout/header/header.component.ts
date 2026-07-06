import { Component, HostListener, inject, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CurrentLanguegeService } from '../../core/services/current-languege.service';
import { AuthService } from '../../core/services/auth.service';
import { CurrentUserService } from '../../core/services/current-user-service';
import { NotificationService } from '../../core/services/notification.service';
import { Languaje } from '../../core/models/Languaje';
import { LanguageOption } from '../../core/data/languages';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly menuToggle = output<void>();

  protected readonly languageService = inject(CurrentLanguegeService);
  protected readonly currentUserService = inject(CurrentUserService);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  protected readonly langMenuOpen = signal(false);

  protected get activeLanguage(): LanguageOption {
    const code = this.languageService.currentLanguage();
    return (
      this.languageService.languages.find((l) => l.code === code) ??
      this.languageService.languages[0]
    );
  }

  protected toggleLangMenu(): void {
    this.langMenuOpen.update((open) => !open);
  }

  protected selectLanguage(code: Languaje): void {
    this.languageService.setCurrentLanguege(code);
    this.langMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected closeLangMenuOnOutsideClick(event: MouseEvent): void {
    if (!this.langMenuOpen()) {
      return;
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.header__lang-mobile')) {
      this.langMenuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  protected closeLangMenuOnEscape(): void {
    this.langMenuOpen.set(false);
  }

  protected logout(): void {
    this.authService.logout();
    this.notificationService.show('auth.logoutSuccess', 'info');
    void this.router.navigate(['/']);
  }
}
