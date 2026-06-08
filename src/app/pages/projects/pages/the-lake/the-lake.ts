import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewer } from '../../../../shared/components/pdf-viewer/pdf-viewer';

@Component({
  selector: 'app-the-lake',
  imports: [RouterLink, TranslateModule, PdfViewer  ],
  templateUrl: './the-lake.html',
  styleUrl: './the-lake.scss',
})
export class TheLake {
  public readonly pdfPath = '/documents/the-lake/the-lake.pdf';
}
