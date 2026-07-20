import { memo, useCallback, useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleFavorite } from "@/store/favorites/favoritesSlice";
import { selectIsFavorite } from "@/store/favorites/favoritesSelectors";
import { CARD_SHADOW, RADIUS, SPACING } from "@/constants/theme";
import { getPokemonTheme } from "@/constants/pokemonTheme";
import { capitalize } from "@/utils/string";
import {
  extractPokemonIdFromUrl,
  getPokemonSpriteUrl,
} from "@/utils/pokemonAssets";
import FavoriteButton from "@/components/common/FavoriteButton";
import type { PokemonListItem } from "@/types";

interface PokemonCardProps {
  pokemon: PokemonListItem;
  width: number;
  onPress: (name: string) => void;
}

// Intentionally not theme-driven: this text renders on top of a colorful
// per-Pokémon-type gradient (CARD_THEME below), not the app background, so
// its contrast requirement is unrelated to light/dark mode — white stays
// legible on every type gradient in both themes.
const POKEMON_CARD_COLORS = {
  idText: "rgba(255, 255, 255, 0.85)",
  name: "#FFFFFF",
} as const;

const CARD_HEIGHT = 190;
const IMAGE_SIZE_RATIO = 0.55;
const FAVORITE_BUTTON_SIZE = 32;
const ID_PLACEHOLDER = "#---";

// List items only carry `{ name, url }` (see PokemonListItem) — no type
// data until the detail endpoint is fetched. The card intentionally never
// fetches per-item detail (that would re-introduce the N+1 request problem
// this component was refactored to avoid), so it always renders the
// neutral default theme instead of a type-colored gradient.
const CARD_THEME = getPokemonTheme(null);

function PokemonCardComponent({ pokemon, width, onPress }: PokemonCardProps) {
  const dispatch = useAppDispatch();

  // `selectIsFavorite` is a selector factory: memoize the selector instance
  // itself per pokemon name so useAppSelector can actually benefit from
  // reselect's memoization instead of getting a fresh selector every render.
  const isFavoriteSelector = useMemo(
    () => selectIsFavorite(pokemon.name),
    [pokemon.name],
  );
  const isFavorite = useAppSelector(isFavoriteSelector);

  // `pokemon.url` is the detail endpoint, not an image URL — the id is
  // parsed from it locally so the sprite can be derived without a request.

  const pokemonId = useMemo(
    () => extractPokemonIdFromUrl(pokemon.url),
    [pokemon.url],
  );
  const displayId =
    pokemonId !== null
      ? `#${pokemonId.toString().padStart(3, "0")}`
      : ID_PLACEHOLDER;
  const imageUrl = pokemonId !== null ? getPokemonSpriteUrl(pokemonId) : null;

  const displayName = capitalize(pokemon.name);
  const imageSize = width * IMAGE_SIZE_RATIO;

  const handlePress = useCallback(() => {
    onPress(pokemon.name);
  }, [onPress, pokemon.name]);

  const handleFavoritePress = useCallback(() => {
    dispatch(toggleFavorite(pokemon));
  }, [dispatch, pokemon]);

  return (
    <Pressable onPress={handlePress} style={{ width }}>
      <LinearGradient
        colors={CARD_THEME.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.topRow}>
          <Text style={styles.idText}>{displayId}</Text>
        </View>

        <View style={[styles.imageWrapper, { height: imageSize }]}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : null}
        </View>

        <Text style={styles.name} numberOfLines={1}>
          {displayName}
        </Text>
      </LinearGradient>

      <View style={styles.favoriteButtonWrapper}>
        <FavoriteButton
          isFavorite={isFavorite}
          onPress={handleFavoritePress}
          size={FAVORITE_BUTTON_SIZE}
          variant="solid"
        />
      </View>
    </Pressable>
  );
}

export default memo(PokemonCardComponent);

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...CARD_SHADOW,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  idText: {
    fontSize: 12,
    fontWeight: "700",
    color: POKEMON_CARD_COLORS.idText,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    marginTop: SPACING.xs,
    fontSize: 16,
    fontWeight: "700",
    color: POKEMON_CARD_COLORS.name,
  },
  favoriteButtonWrapper: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
  },
});
