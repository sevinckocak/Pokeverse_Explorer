import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { hydrateFavorites } from '@/store/favorites/favoritesThunks';

// Renders nothing — runs one-time app startup initialization as a side
// effect. Rendered inside AppProviders' <Provider>, so hooks like
// useAppDispatch are available here — unlike AppProviders itself, which
// only wires up providers and has no store access. Add future startup
// concerns (theme, settings, cache, auth, ...) as additional dispatch
// calls in this same effect; this stays the single place app bootstrap
// logic lives.
export default function AppBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateFavorites());
  }, [dispatch]);

  return null;
}
