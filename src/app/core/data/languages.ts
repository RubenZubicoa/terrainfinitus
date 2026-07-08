import { Languaje } from '../models/Languaje';

export interface LanguageOption {
  id: string;
  code: Languaje;
  label: string;
  flagSrc: string;
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { id: 'es', code: 'es', label: 'Español', flagSrc: '/images/flags/es.svg' },
  { id: 'en-us', code: 'en', label: 'English', flagSrc: '/images/flags/en.svg' },
  { id: 'en-gb', code: 'en', label: 'English', flagSrc: '/images/flags/en-gb.svg' },
  { id: 'de', code: 'de', label: 'Deutsch', flagSrc: '/images/flags/de.svg' },
  { id: 'jp', code: 'jp', label: '日本語', flagSrc: '/images/flags/jp.svg' },
  { id: 'pt', code: 'pt', label: 'Português', flagSrc: '/images/flags/pt.svg' },
  { id: 'it', code: 'it', label: 'Italiano', flagSrc: '/images/flags/it.svg' },
  { id: 'fr', code: 'fr', label: 'Français', flagSrc: '/images/flags/fr.svg' },
] as const;

export const DEFAULT_LANGUAGE: Languaje = 'es';
export const LANGUAGE_STORAGE_KEY = 'ti-lang';
