import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/localization/resources/en.json';
import tr from '@/localization/resources/tr.json';
import de from '@/localization/resources/de.json';
import fr from '@/localization/resources/fr.json';
import es from '@/localization/resources/es.json';

export const SUPPORTED_LANGUAGES = ['en', 'tr', 'de', 'fr', 'es'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  flag: string;
}

// Single source of truth for the language picker (label + flag) and for
// LANGUAGE_LABELS below. Language names are deliberately not run through
// t(): a language picker shows each option in its own native name
// regardless of the currently active UI language, so users can always
// recognize their language even if they can't read the current one.
// Adding another language means: one more entry here, one more
// SUPPORTED_LANGUAGES code, one more resources/<code>.json, and one more
// `resources` entry in the i18n.init(...) call below — no existing
// language file needs to change.
export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = LANGUAGE_OPTIONS.reduce(
  (labels, option) => ({ ...labels, [option.code]: option.label }),
  {} as Record<SupportedLanguage, string>
);

// `initReactI18next` registers this instance as the one `useTranslation()`
// uses by default, so no <I18nextProvider> (and therefore no React Context
// we own) is needed anywhere in the tree. Redux's `settings.language` stays
// the single source of truth; AppBootstrap calls `i18n.changeLanguage(...)`
// whenever it changes, and every component using `useTranslation()`
// re-renders automatically — that subscription is internal to i18next, not
// something built here.
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
    de: { translation: de },
    fr: { translation: fr },
    es: { translation: es },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
