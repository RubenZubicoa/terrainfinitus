import { inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  LANGUAGE_STORAGE_KEY,
} from '../data/languages';
import { Languaje } from '../models/Languaje';

@Injectable({
  providedIn: 'root',
})
export class CurrentLanguegeService {
  private readonly translate = inject(TranslateService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly languages = LANGUAGE_OPTIONS;
  readonly currentLanguage = signal<Languaje>(DEFAULT_LANGUAGE);

  constructor() {
    this.translate.addLangs(this.languages.map((l) => l.code));
    this.translate.setFallbackLang(DEFAULT_LANGUAGE);

    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Languaje | null;
    const initial =
      stored && this.languages.some((l) => l.code === stored) ? stored : DEFAULT_LANGUAGE;
    this.setCurrentLanguege(initial);
  }

  get currentLanguege(): Languaje {
    return this.currentLanguage();
  }

  setCurrentLanguege(lang: Languaje): void {
    this.translate.use(lang);
    this.currentLanguage.set(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    this.updateDocumentLanguage(lang);
    this.updatePageMeta();
  }

  private updateDocumentLanguage(lang: Languaje): void {
    document.documentElement.lang = lang === 'jp' ? 'ja' : lang;
  }

  private updatePageMeta(): void {
    this.translate.get(['meta.title', 'meta.description']).subscribe((t) => {
      this.title.setTitle(t['meta.title']);
      this.meta.updateTag({ name: 'description', content: t['meta.description'] });
    });
  }
}
