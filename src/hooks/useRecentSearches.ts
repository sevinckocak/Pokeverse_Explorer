import { useState } from 'react';

export interface UseRecentSearchesResult {
  recentSearches: string[];
}

const MOCK_RECENT_SEARCHES = ['Pikachu', 'Charizard', 'Bulbasaur'];

// Placeholder data source. When real search history (AsyncStorage/Redux) is
// added, only this hook's internals change — every component consuming it
// (RecentSearches) keeps working unmodified.
export function useRecentSearches(): UseRecentSearchesResult {
  const [recentSearches] = useState<string[]>(MOCK_RECENT_SEARCHES);

  return { recentSearches };
}
