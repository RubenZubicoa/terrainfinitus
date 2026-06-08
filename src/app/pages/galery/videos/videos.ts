import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-videos',
  imports: [CommonModule, TranslateModule],
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class Videos {
  readonly videos: ReadonlyArray<{ id: string; titleKey: string; src: string }> = [
    { id: '1', titleKey: 'gallery.videos.videoTitle', src: '/videos/videos/video1.mp4' },
    { id: '2', titleKey: 'gallery.videos.videoTitle', src: '/videos/videos/video2.mp4' },
    { id: '3', titleKey: 'gallery.videos.videoTitle', src: '/videos/videos/video3.mp4' },
    { id: '4', titleKey: 'gallery.videos.videoTitle', src: '/videos/videos/video4.mp4' },
    { id: '5', titleKey: 'gallery.videos.videoTitle', src: '/videos/videos/video5.mp4' },
  ] as const;

  selectedVideoId: string = this.videos[0]?.id ?? '';

  selectVideo(id: string) {
    this.selectedVideoId = id;
  }

  get selectedVideo(): { id: string; titleKey: string; src: string } | null {
    return this.videos.find((v) => v.id === this.selectedVideoId) ?? null;
  }
}
