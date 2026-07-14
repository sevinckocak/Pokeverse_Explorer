import { useMemo, useState } from 'react';
import { isPokemonTypeName } from '@/constants/pokemonTheme';
import { usePokemonTypeList } from '@/hooks/usePokemonTypeList';
import { filterPokemonByName, mergePokemonResults } from '@/utils/pokemonSearch';
import type { PokemonListItem } from '@/types';

export interface UsePokemonSearchResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  isLoading: boolean;
  filteredPokemon: PokemonListItem[];
}

// Shared search logic for Home and Search: each caller gets its own
// independent query state, but the matching rules live in one place.
//
// A query matches Pokémon two ways:
// - by name, filtered locally against whatever's already loaded, and
// - by type (e.g. "fire"), which fetches the authoritative full member list
//   for that type via usePokemonTypeList rather than only checking whatever
//   happens to already be paginated into `pokemonList`.
export function usePokemonSearch(pokemonList: PokemonListItem[]): UsePokemonSearchResult {
  const [searchQuery, setSearchQuery] = useState('');
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;
  const matchedType = isPokemonTypeName(normalizedQuery) ? normalizedQuery : null;

  const { data: typeMembers, loading: isTypeListLoading } = usePokemonTypeList(matchedType);

  const filteredPokemon = useMemo(() => {
    if (!isSearching) {
      return [];
    }

    const nameMatches = filterPokemonByName(pokemonList, normalizedQuery);
    return mergePokemonResults(nameMatches, typeMembers ?? []);
  }, [pokemonList, normalizedQuery, isSearching, typeMembers]);

  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    isLoading: matchedType !== null && isTypeListLoading,
    filteredPokemon,
  };
}
