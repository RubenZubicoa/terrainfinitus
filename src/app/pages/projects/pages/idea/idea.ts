import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Banner, BannerSlide } from '../../../../shared/components/banner/banner';
import { PdfViewer } from '../../../../shared/components/pdf-viewer/pdf-viewer';

@Component({
  selector: 'app-idea',
  imports: [Banner, RouterLink, TranslateModule, PdfViewer],
  templateUrl: './idea.html',
  styleUrl: './idea.scss',
})
export class Idea {
  readonly pdfPath1 = '/documents/idea/idea.pdf';

  readonly slides: readonly BannerSlide[] = [
    { src: '/images/idea/idea1.jpg', altKey: 'idea.alt1' },
    { src: '/images/idea/idea2.jpg', altKey: 'idea.alt2' },
    { src: '/images/idea/idea3.jpg', altKey: 'idea.alt3' },
    { src: '/images/idea/idea4.jpg', altKey: 'idea.alt4' },
  ];
}
  