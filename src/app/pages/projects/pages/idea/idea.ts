import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Banner, BannerSlide } from '../../../../shared/components/banner/banner';

@Component({
  selector: 'app-idea',
  imports: [Banner, TranslateModule],
  templateUrl: './idea.html',
  styleUrl: './idea.scss',
})
export class Idea {
  readonly slides: readonly BannerSlide[] = [
    { src: '/images/idea/idea1.jpg', altKey: 'projects.idea.alt1' },
    { src: '/images/idea/idea2.jpg', altKey: 'projects.idea.alt2' },
    { src: '/images/idea/idea3.jpg', altKey: 'projects.idea.alt3' },
    { src: '/images/idea/idea4.jpg', altKey: 'projects.idea.alt4' },
  ];
}
