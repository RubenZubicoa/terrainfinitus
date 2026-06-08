import { Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  readonly mobileOpen = input(false);
  readonly navClose = output<void>();

  protected readonly navigation = MAIN_NAVIGATION;
  protected readonly expandedGroups = signal<Record<string, boolean>>({});

  protected toggleGroup(labelKey: string): void {
    this.expandedGroups.update((state) => ({
      ...state,
      [labelKey]: !state[labelKey],
    }));
  }

  protected isGroupExpanded(item: NavItem): boolean {
    return this.expandedGroups()[item.labelKey] ?? false;
  }

  protected onNavigate(): void {
    this.navClose.emit();
  }
}
