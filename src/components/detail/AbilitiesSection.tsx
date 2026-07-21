import { memo } from "react";
import { View } from "react-native";
import AbilityCard from "@/components/detail/AbilityCard";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";
import type { PokemonDetail } from "@/types";

interface AbilitiesSectionProps {
  detail: PokemonDetail;
  theme: PokemonTypeTheme;
}

// Ability names come from the PokemonDetail already loaded on mount (no
// extra fetch here) — each name is handed to its own AbilityCard, which
// lazily fetches and caches that one ability's effect text independently.
function AbilitiesSectionComponent({ detail, theme }: AbilitiesSectionProps) {
  return (
    <View>
      {detail.abilities.map((ability) => (
        <AbilityCard key={ability.name} name={ability.name} isHidden={ability.isHidden} theme={theme} />
      ))}
    </View>
  );
}

export default memo(AbilitiesSectionComponent);
