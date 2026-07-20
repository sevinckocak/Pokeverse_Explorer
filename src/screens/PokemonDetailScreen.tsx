import { useEffect, useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { usePokemonDetailData } from "@/hooks/usePokemonDetailData";
import { getPokemonTheme } from "@/constants/pokemonTheme";
import { fetchAbility } from "@/store/ability/abilityThunks";
import { clearAbilities } from "@/store/ability/abilitySlice";
import PokemonHero from "@/components/pokemon/PokemonHero";
import PokemonInfo from "@/components/pokemon/PokemonInfo";
import PokemonSpecies from "@/components/pokemon/PokemonSpecies";
import PokemonEvolution from "@/components/pokemon/PokemonEvolution";
import { SPACING } from "@/constants/theme";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

export default function PokemonDetailScreen() {
  const { t } = useTranslation();
  const route = useRoute<PokemonDetailRouteProp>();
  const { name } = route.params;

  const { colors } = useThemeTokens();
  const dispatch = useAppDispatch();
  const {
    detail,
    loadingDetail,
    detailError,
    species,
    loadingSpecies,
    speciesError,
  } = usePokemonDetailData(name);

  const abilities = useAppSelector((state) => state.ability.abilities);
  const loadingAbilities = useAppSelector((state) => state.ability.isLoading);
  const abilitiesError = useAppSelector((state) => state.ability.error);

  const primaryType = detail?.types[0]?.type.name ?? null;
  const theme = useMemo(() => getPokemonTheme(primaryType), [primaryType]);

  useEffect(() => {
    dispatch(clearAbilities());
  }, [dispatch, name]);

  useEffect(() => {
    if (!detail) {
      return;
    }

    detail.abilities.forEach((ability) => {
      dispatch(
        fetchAbility({
          name: ability.ability.name,
          isHidden: ability.is_hidden,
        })
      );
    });
  }, [dispatch, detail]);

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
        <Text style={{ color: colors.textPrimary }}>{t('pokemonDetail.noDataAvailable')}</Text>
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

        {/* Temporary: verifies the Ability data flow, not final UI. */}
        <View>
          {loadingAbilities ? <Text style={{ color: colors.textPrimary }}>Loading abilities...</Text> : null}
          {abilitiesError ? <Text style={{ color: colors.textPrimary }}>{abilitiesError}</Text> : null}
          {abilities.map((ability) => (
            <Text key={ability.name} style={{ color: colors.textPrimary }}>
              {`${ability.name}${ability.isHidden ? " (hidden)" : ""}: ${ability.shortEffect}`}
            </Text>
          ))}
        </View>
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
