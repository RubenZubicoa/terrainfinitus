import { Languaje } from '../models/Languaje';

export interface LanguageOption {
  code: Languaje;
  label: string;
  flagSrc: string;
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'es', label: 'Español', flagSrc: '/images/flags/es.svg' },
  { code: 'en', label: 'English', flagSrc: '/images/flags/en.svg' },
  { code: 'de', label: 'Deutsch', flagSrc: '/images/flags/de.svg' },
  { code: 'jp', label: '日本語', flagSrc: '/images/flags/jp.svg' },
  { code: 'pt', label: 'Português', flagSrc: '/images/flags/pt.svg' },
  { code: 'it', label: 'Italiano', flagSrc: '/images/flags/it.svg' },
  { code: 'fr', label: 'Français', flagSrc: '/images/flags/fr.svg' },
] as const;

export const DEFAULT_LANGUAGE: Languaje = 'es';
export const LANGUAGE_STORAGE_KEY = 'ti-lang';
