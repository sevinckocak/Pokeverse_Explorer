import { SectionState } from "@/components/ui/SectionState";
import { HabitatCard } from "@/components/pokemon/HabitatCard";
import { CaptureCard } from "@/components/pokemon/CaptureCard";
import { StatusCard } from "@/components/pokemon/StatusCard";
import type { PokemonSpecies as PokemonSpeciesType } from "@/types";

interface PokemonSpeciesProps {
  species: PokemonSpeciesType | null;
  loading: boolean;
  error: string | null;
}

export default function PokemonSpecies({ species, loading, error }: PokemonSpeciesProps) {
  if (loading) {
    return <SectionState title="Species" message="Loading species..." />;
  }

  if (error) {
    return <SectionState title="Species" message={error} />;
  }

  if (!species) {
    return null;
  }

  return (
    <>
      <HabitatCard species={species} />
      <CaptureCard species={species} />
      <StatusCard species={species} />
    </>
  );
}
