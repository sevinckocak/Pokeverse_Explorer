import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchPokemonDetailPage } from "@/store/pokemonDetail/fetchPokemonDetailPage";
import PokemonImage from "@/components/pokemon/PokemonImage";
import PokemonHeader from "@/components/pokemon/PokemonHeader";
import PokemonInfo from "@/components/pokemon/PokemonInfo";
import PokemonSpecies from "@/components/pokemon/PokemonSpecies";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

export default function PokemonDetailScreen() {
  const route = useRoute<PokemonDetailRouteProp>();
  const { name } = route.params;

  const dispatch = useAppDispatch();
  const { detail, loading: loadingDetail, error: detailError } = useAppSelector(
    (state) => state.pokemon,
  );
  const { species, loading: loadingSpecies, error: speciesError } = useAppSelector(
    (state) => state.species,
  );

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
