import { getStorageItem, setStorageItem } from '@/storage/asyncStorage';

export const LANGUAGE_STORAGE_KEY = 'language';

export async function loadLanguage(): Promise<string | null> {
  return getStorageItem<string>(LANGUAGE_STORAGE_KEY);
}

export async function saveLanguage(language: string): Promise<void> {
  await setStorageItem(LANGUAGE_STORAGE_KEY, language);
}
