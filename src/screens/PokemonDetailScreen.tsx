import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
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
import PokemonImage from "@/components/pokemon/PokemonImage";
import PokemonHeader from "@/components/pokemon/PokemonHeader";
import PokemonInfo from "@/components/pokemon/PokemonInfo";
import PokemonSpecies from "@/components/pokemon/PokemonSpecies";
import PokemonEvolution from "@/components/pokemon/PokemonEvolution";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

export default function PokemonDetailScreen() {
  const route = useRoute<PokemonDetailRouteProp>();
  const { name } = route.params;

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

  if (loadingDetail) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (detailError) {
    return (
      <View style={styles.container}>
        <Text>{detailError}</Text>
      </View>
    );
  }

  if (detail === null) {
    return (
      <View style={styles.container}>
        <Text>No Pokémon data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PokemonImage imageUrl={detail.sprites.front_default} />
      <PokemonHeader name={detail.name} id={detail.id} />
      <PokemonInfo height={detail.height} weight={detail.weight} />
      <PokemonSpecies
        species={species}
        loading={loadingSpecies}
        error={speciesError}
      />
      <PokemonEvolution />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
