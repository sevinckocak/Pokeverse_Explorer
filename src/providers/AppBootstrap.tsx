import { useEffect } from "react";
import i18n from "@/localization";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { hydrateFavorites } from "@/store/favorites/favoritesThunks";
import { hydrateSettings } from "@/store/settings/settingsThunks";
import { selectLanguage } from "@/store/settings/settingsSelectors";

// Renders nothing — runs one-time app startup initialization as a side
// effect. Rendered inside AppProviders' <Provider>, so hooks like
// useAppDispatch are available here — unlike AppProviders itself, which
// only wires up providers and has no store access. Add future startup
// concerns (theme, settings, cache, auth, ...) as additional dispatch
// calls in this same effect; this stays the single place app bootstrap
// logic lives.
export default function AppBootstrap() {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);

  useEffect(() => {
    dispatch(hydrateFavorites());
    dispatch(hydrateSettings());
  }, [dispatch]);

  // Keeps i18next in sync with Redux's `settings.language` — the single
  // source of truth. This runs on every change (not just at startup), so
  // it also covers both the initial hydration from storage and any later
  // dispatch(setLanguage(...)) from the Settings screen; every component
  // using useTranslation() re-renders via i18next's own subscription.
  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language]);

  return null;
}
