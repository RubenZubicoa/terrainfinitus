import { Injectable, signal } from '@angular/core';

export type NotificationType = 'info' | 'success' | 'error';

export interface Notification {
  messageKey: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _notification = signal<Notification | null>(null);
  private hideTimer: ReturnType<typeof setTimeout> | undefined;

  readonly notification = this._notification.asReadonly();

  show(messageKey: string, type: NotificationType = 'info', durationMs = 4500): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this._notification.set({ messageKey, type });

    this.hideTimer = setTimeout(() => this.clear(), durationMs);
  }

  clear(): void {
    this._notification.set(null);

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }
}
