import { useEffect, useState } from 'react';
import { getPokemonType } from '@/services';
import type { PokemonListItem } from '@/types';

export interface UsePokemonTypeListResult {
  data: PokemonListItem[] | null;
  loading: boolean;
}

// Fetches the authoritative full list of Pokémon for a type via PokeAPI's
// /type/{name} endpoint. This is deliberately not routed through Redux: it's
// ephemeral, search-query-scoped data, not shared app state, and calling the
// service directly here keeps the pokemon slice free of a "search" concern
// it wasn't designed for.
export function usePokemonTypeList(typeName: string | null): UsePokemonTypeListResult {
  const [data, setData] = useState<PokemonListItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!typeName) {
      setData(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    getPokemonType(typeName)
      .then((typeDetail) => {
        if (!isMounted) {
          return;
        }
        setData(typeDetail.pokemon.map((member) => member.pokemon));
      })
      .catch(() => {
        if (isMounted) {
          setData(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [typeName]);

  return { data, loading };
}
