import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchPokemonDetail } from "@/store/pokemon/pokemonSlice";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

export default function PokemonDetailScreen() {
  const route = useRoute<PokemonDetailRouteProp>();
  const { name } = route.params;

  const dispatch = useAppDispatch();
  const { detail, loadingDetail, detailError } = useAppSelector(
    (state) => state.pokemon,
  );

  useEffect(() => {
    dispatch(fetchPokemonDetail(name));
  }, [dispatch, name]);

  if (loadingDetail) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (detailError) {
    return (
      <View style={styles.center}>
        <Text>{detailError}</Text>
      </View>
    );
  }

  if (detail === null) {
    return (
      <View style={styles.center}>
        <Text>No Pokémon data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text>{detail.name}</Text>
      <Text>{detail.id}</Text>
      <Text>{(detail.height / 10).toFixed(1)} m</Text>
      <Text>{(detail.weight / 10).toFixed(1)} kg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
