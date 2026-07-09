import { useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { usePokemonDetailData } from "@/hooks/usePokemonDetailData";
import { getPokemonTheme } from "@/constants/pokemonTheme";
import PokemonHero from "@/components/pokemon/PokemonHero";
import PokemonInfo from "@/components/pokemon/PokemonInfo";
import PokemonSpecies from "@/components/pokemon/PokemonSpecies";
import PokemonEvolution from "@/components/pokemon/PokemonEvolution";
import { SPACING } from "@/constants/theme";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

export default function PokemonDetailScreen() {
  const route = useRoute<PokemonDetailRouteProp>();
  const { name } = route.params;

  const { colors } = useThemeTokens();
  const {
    detail,
    loadingDetail,
    detailError,
    species,
    loadingSpecies,
    speciesError,
  } = usePokemonDetailData(name);

  const primaryType = detail?.types[0]?.type.name ?? null;
  const theme = useMemo(() => getPokemonTheme(primaryType), [primaryType]);

  if (loadingDetail) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (detailError) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>{detailError}</Text>
      </View>
    );
  }

  if (detail === null) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>No Pokémon data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    >
      <PokemonHero
        imageUrl={detail.sprites.front_default}
        name={detail.name}
        id={detail.id}
        primaryType={primaryType}
      />
      <View style={styles.body}>
        <PokemonInfo height={detail.height} weight={detail.weight} theme={theme} />
        <PokemonSpecies
          species={species}
          loading={loadingSpecies}
          error={speciesError}
          theme={theme}
        />
        <PokemonEvolution theme={theme} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingBottom: SPACING.xxl,
  },
  body: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
});
