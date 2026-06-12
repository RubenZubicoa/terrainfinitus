import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewer } from '../../../../shared/components/pdf-viewer/pdf-viewer';

@Component({
  selector: 'app-idea',
  imports: [RouterLink, TranslateModule, PdfViewer],
  templateUrl: './idea.html',
  styleUrl: './idea.scss',
})
export class Idea {

  public readonly pdfPath1 = '/documents/idea/idea.pdf';
}
  