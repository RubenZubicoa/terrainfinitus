import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentLanguegeService } from './core/services/current-languege.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {
  constructor() {
    inject(CurrentLanguegeService);
  }
}
