import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchPokemonDetailPage } from '@/store/pokemonDetail/fetchPokemonDetailPage';
import {
  selectPokemonDetail,
  selectPokemonError,
  selectPokemonLoading,
} from '@/store/pokemon/pokemonSelectors';
import {
  selectPokemonSpecies,
  selectSpeciesError,
  selectSpeciesLoading,
} from '@/store/species/speciesSelectors';

export function usePokemonDetailData(name: string) {
  const dispatch = useAppDispatch();

  const detail = useAppSelector(selectPokemonDetail);
  const loadingDetail = useAppSelector(selectPokemonLoading);
  const detailError = useAppSelector(selectPokemonError);

  const species = useAppSelector(selectPokemonSpecies);
  const loadingSpecies = useAppSelector(selectSpeciesLoading);
  const speciesError = useAppSelector(selectSpeciesError);

  useEffect(() => {
    dispatch(fetchPokemonDetailPage(name));
  }, [dispatch, name]);

  return {
    detail,
    loadingDetail,
    detailError,
    species,
    loadingSpecies,
    speciesError,
  };
}
