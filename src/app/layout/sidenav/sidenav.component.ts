import { Component, inject, input, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MAIN_NAVIGATION } from '../../core/data/navigation';
import { NavItem } from '../../core/models/nav-item.model';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  private readonly router = inject(Router);

  readonly mobileOpen = input(false);
  readonly navClose = output<void>();

  protected readonly navigation = MAIN_NAVIGATION;
  protected readonly expandedGroups = signal<Record<string, boolean>>({});

  protected toggleGroup(labelKey: string): void {
    this.expandedGroups.update((state) => ({
      ...state,
      [labelKey]: !this.isGroupExpanded({ labelKey } as NavItem),
    }));
  }

  protected isGroupExpanded(item: NavItem): boolean {
    const manual = this.expandedGroups()[item.labelKey];
    if (manual !== undefined) {
      return manual;
    }

    if (item.labelKey === 'nav.shop' && this.router.url.startsWith('/tienda-boutique')) {
      return true;
    }

    return false;
  }

  protected onNavigate(): void {
    this.navClose.emit();
  }
}
