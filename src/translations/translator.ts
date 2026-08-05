import { translations } from './index';

interface TranslationTree {
  [key: string]: string | TranslationTree;
}

export function translate(language: string | undefined, key: string): string {
  const normalizedLanguage = language?.toLowerCase().startsWith('de') ? 'de' : 'en';
  const value = lookupTranslation(translations[normalizedLanguage], key);
  return value ?? lookupTranslation(translations.en, key) ?? key;
}

function lookupTranslation(tree: TranslationTree, key: string): string | undefined {
  const value = key.split('.').reduce<string | TranslationTree | undefined>((current, segment) => {
    if (typeof current !== 'object' || current === undefined) {
      return undefined;
    }

    return current[segment];
  }, tree);

  return typeof value === 'string' ? value : undefined;
}
