import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewer } from '../../../../shared/components/pdf-viewer/pdf-viewer';

@Component({
  selector: 'app-peralejos',
  imports: [RouterLink, TranslateModule, PdfViewer],
  templateUrl: './peralejos.html',
  styleUrl: './peralejos.scss',
})
export class Peralejos {
  public readonly pdfPath = 'https://firebasestorage.googleapis.com/v0/b/terrainfinitus-62208.firebasestorage.app/o/Volumen%20II%20final%20El%20Proyecto%20.pdf?alt=media&token=a488c9e8-e723-475b-ae28-5942d06585e9'


}
