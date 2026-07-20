import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useRedux';
import { selectPokemonList } from '@/store/pokemon/pokemonSelectors';
import PokemonSection from '@/components/pokemon/PokemonSection';

interface TrendingPokemonProps {
  onCardPress: (name: string) => void;
  onSeeAllPress: () => void;
}

const TRENDING_COUNT = 10;

function TrendingPokemonComponent({ onCardPress, onSeeAllPress }: TrendingPokemonProps) {
  const { t } = useTranslation();
  const pokemonList = useAppSelector(selectPokemonList);
  const trendingPokemon = useMemo(() => pokemonList.slice(0, TRENDING_COUNT), [pokemonList]);

  return (
    <PokemonSection
      title={t('search.trending')}
      data={trendingPokemon}
      loading={false}
      error={null}
      onSeeAllPress={onSeeAllPress}
      onCardPress={onCardPress}
    />
  );
}

export default memo(TrendingPokemonComponent);
