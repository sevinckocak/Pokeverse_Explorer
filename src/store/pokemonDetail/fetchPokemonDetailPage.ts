import type { AppDispatch } from '@/store/store';
import { fetchPokemonDetail } from '@/store/pokemon/pokemonThunks';
import { fetchPokemonSpecies } from '@/store/species/speciesThunks';

export function fetchPokemonDetailPage(name: string) {
  return (dispatch: AppDispatch): void => {
    dispatch(fetchPokemonDetail(name));
    dispatch(fetchPokemonSpecies(name));
  };
}
