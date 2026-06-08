import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewer } from '../../../../shared/components/pdf-viewer/pdf-viewer';

@Component({
  selector: 'app-bugarra',
  imports: [RouterLink, TranslateModule, PdfViewer],
  templateUrl: './bugarra.html',
  styleUrl: './bugarra.scss',
})
export class Bugarra {  
  public readonly pdfPath1 = '/documents/bugarra/bugarra_1.pdf';
  public readonly pdfPath2 = '/documents/bugarra/bugarra_2.pdf';
}
