import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-placeholder',
  imports: [RouterLink, TranslateModule],
  template: `
    <section class="placeholder">
      <h1>{{ titleKey | translate }}</h1>
      <p>{{ 'placeholder.message' | translate }}</p>
      <a routerLink="/">{{ 'common.backHome' | translate }}</a>
    </section>
  `,
  styles: `
    .placeholder {
      max-width: 36rem;
    }
    h1 {
      font-family: var(--ti-font-display);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--ti-black);
    }
    p {
      color: var(--ti-muted);
      line-height: 1.6;
    }
    a {
      color: var(--ti-copper);
      font-weight: 600;
    }
  `,
})
export class PlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly titleKey =
    this.route.snapshot.data['titleKey'] ?? 'placeholder.defaultTitle';
}
