import { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { fetchPokemonDetailPage } from "@/store/pokemonDetail/fetchPokemonDetailPage";
import {
  selectPokemonDetail,
  selectPokemonError,
  selectPokemonLoading,
} from "@/store/pokemon/pokemonSelectors";
import {
  selectPokemonSpecies,
  selectSpeciesError,
  selectSpeciesLoading,
} from "@/store/species/speciesSelectors";
import PokemonHero from "@/components/pokemon/PokemonHero";
import PokemonInfo from "@/components/pokemon/PokemonInfo";
import PokemonSpecies from "@/components/pokemon/PokemonSpecies";
import PokemonEvolution from "@/components/pokemon/PokemonEvolution";
import { SPACING } from "@/constants/theme";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

export default function PokemonDetailScreen() {
  const route = useRoute<PokemonDetailRouteProp>();
  const { name } = route.params;

  const dispatch = useAppDispatch();
  const { colors } = useThemeTokens();

  const detail = useAppSelector(selectPokemonDetail);
  const loadingDetail = useAppSelector(selectPokemonLoading);
  const detailError = useAppSelector(selectPokemonError);

  const species = useAppSelector(selectPokemonSpecies);
  const loadingSpecies = useAppSelector(selectSpeciesLoading);
  const speciesError = useAppSelector(selectSpeciesError);

  useEffect(() => {
    dispatch(fetchPokemonDetailPage(name));
  }, [dispatch, name]);

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
        colorName={species?.color.name ?? null}
      />
      <View style={styles.body}>
        <PokemonInfo height={detail.height} weight={detail.weight} />
        <PokemonSpecies species={species} loading={loadingSpecies} error={speciesError} />
        <PokemonEvolution />
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
