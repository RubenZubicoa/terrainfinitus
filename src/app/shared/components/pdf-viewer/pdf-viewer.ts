import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pdf-viewer',
  imports: [TranslateModule],
  templateUrl: './pdf-viewer.html',
  styleUrl: './pdf-viewer.scss',
})
export class PdfViewer {
  private readonly sanitizer = inject(DomSanitizer);
  public pdfPath = input.required<string>();
  public pdfLabel = input.required<string>();
  
  public safePdfPath = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfPath()));
}
