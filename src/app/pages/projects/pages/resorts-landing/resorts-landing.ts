import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RESORT_BASE_PATH, RESORTS } from '../../data/project-sections.data';
import { ResortId } from '../../models/project-section.models';

interface ResortLandingLink {
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly ctaKey: string;
  readonly route: string;
}

const RESORT_CTA_KEYS: Record<ResortId, string> = {
  peralejos: 'projects.landing.peralejos.cta',
  bugarra: 'projects.landing.bugarra.cta',
  'the-lake': 'projects.landing.theLake.cta',
};

@Component({
  selector: 'app-resorts-landing',
  imports: [RouterLink, TranslateModule],
  templateUrl: './resorts-landing.html',
  styleUrl: './resorts-landing.scss',
})
export class ResortsLanding {
  readonly sections: readonly ResortLandingLink[] = [
    {
      titleKey: 'projects.landing.idea.title',
      descriptionKey: 'projects.landing.idea.description',
      ctaKey: 'projects.landing.idea.cta',
      route: `${RESORT_BASE_PATH}/la-idea`,
    },
    ...RESORTS.map((resort) => ({
      titleKey: `${resort.translationKey}.title`,
      descriptionKey: `${resort.translationKey}.description`,
      ctaKey: RESORT_CTA_KEYS[resort.id],
      route: resort.route,
    })),
  ];
}
