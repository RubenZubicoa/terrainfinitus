import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification-toast',
  imports: [TranslateModule],
  templateUrl: './notification-toast.html',
  styleUrl: './notification-toast.scss',
})
export class NotificationToast {
  protected readonly notificationService = inject(NotificationService);

  protected dismiss(): void {
    this.notificationService.clear();
  }
}
