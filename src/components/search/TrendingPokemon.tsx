import { memo, useMemo } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { selectPokemonList } from '@/store/pokemon/pokemonSelectors';
import PokemonSection from '@/components/pokemon/PokemonSection';

interface TrendingPokemonProps {
  onCardPress: (name: string) => void;
  onSeeAllPress: () => void;
}

const TRENDING_COUNT = 10;

function TrendingPokemonComponent({ onCardPress, onSeeAllPress }: TrendingPokemonProps) {
  const pokemonList = useAppSelector(selectPokemonList);
  const trendingPokemon = useMemo(() => pokemonList.slice(0, TRENDING_COUNT), [pokemonList]);

  return (
    <PokemonSection
      title="Trending Pokémon"
      data={trendingPokemon}
      loading={false}
      error={null}
      onSeeAllPress={onSeeAllPress}
      onCardPress={onCardPress}
    />
  );
}

export default memo(TrendingPokemonComponent);
