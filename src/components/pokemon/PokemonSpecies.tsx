import { useTranslation } from "react-i18next";
import { SectionState } from "@/components/ui/SectionState";
import { HabitatCard } from "@/components/pokemon/HabitatCard";
import { CaptureCard } from "@/components/pokemon/CaptureCard";
import { StatusCard } from "@/components/pokemon/StatusCard";
import type { PokemonSpecies as PokemonSpeciesType } from "@/types";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";

interface PokemonSpeciesProps {
  species: PokemonSpeciesType | null;
  loading: boolean;
  error: string | null;
  theme: PokemonTypeTheme;
}

export default function PokemonSpecies({ species, loading, error, theme }: PokemonSpeciesProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <SectionState
        title={t('pokemonDetail.species')}
        message={t('pokemonDetail.loadingSpecies')}
        theme={theme}
      />
    );
  }

  if (error) {
    return <SectionState title={t('pokemonDetail.species')} message={error} theme={theme} />;
  }

  if (!species) {
    return null;
  }

  return (
    <>
      <HabitatCard species={species} theme={theme} />
      <CaptureCard species={species} theme={theme} />
      <StatusCard species={species} theme={theme} />
    </>
  );
}
