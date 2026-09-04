import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  DESTINATION_CATEGORIES,
  DestinationCategory,
} from '../../data/destination-categories.data';

@Component({
  selector: 'app-destinations-landing',
  imports: [RouterLink, TranslateModule],
  templateUrl: './destinations-landing.html',
  styleUrl: './destinations-landing.scss',
})
export class DestinationsLanding {
  readonly categories: readonly DestinationCategory[] = DESTINATION_CATEGORIES;
}
