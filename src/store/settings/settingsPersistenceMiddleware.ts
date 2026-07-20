import type { Middleware } from '@reduxjs/toolkit';
import { setLanguage } from '@/store/settings/settingsSlice';
import type { SettingsState } from '@/store/settings/settingsSlice';
import { saveLanguage } from '@/storage/settingsStorage';

interface StateWithSettings {
  settings: SettingsState;
}

// Mirrors favoritesPersistenceMiddleware's pattern: only `setLanguage` is
// persisted here (theme/notifications persistence is a separate concern,
// not part of this task). Reads the authoritative post-mutation state
// rather than trusting the action payload directly, same as favorites.
export const settingsPersistenceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    const actionType = (action as { type?: unknown })?.type;

    if (actionType === setLanguage.type) {
      const { settings } = store.getState() as StateWithSettings;
      void saveLanguage(settings.language);
    }

    return result;
  };
