import { useEffect, useState } from 'react';
import { getPokemonByNameOrId } from '@/services';

export interface PokemonCardData {
  id: number;
  imageUrl: string | null;
  types: string[];
}

export interface UsePokemonCardDataResult {
  data: PokemonCardData | null;
  loading: boolean;
}

// Reuses the existing `getPokemonByNameOrId` service directly rather than
// Redux: `pokemonSlice.detail` is a single slot built for the Detail screen
// and would collide across the many cards mounted at once in this grid.
// Each card owns its own transient summary instead.
export function usePokemonCardData(name: string): UsePokemonCardDataResult {
  const [data, setData] = useState<PokemonCardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getPokemonByNameOrId(name)
      .then((detail) => {
        if (!isMounted) {
          return;
        }

        setData({
          id: detail.id,
          imageUrl: detail.sprites.front_default,
          types: detail.types.map((type) => type.type.name),
        });
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
  }, [name]);

  return { data, loading };
}
