import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-peralejos',
  imports: [RouterLink, TranslateModule],
  templateUrl: './peralejos.html',
  styleUrl: './peralejos.scss',
})
export class Peralejos {}
