import { memo, useMemo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn } from "react-native-reanimated";
import { getPokemonTheme } from "@/constants/pokemonTheme";
import { PokeballWatermark } from "@/components/pokemon/PokeballWatermark";
import PokemonImage from "@/components/pokemon/PokemonImage";
import PokemonHeader from "@/components/pokemon/PokemonHeader";

interface PokemonHeroProps {
  imageUrl: string | null;
  name: string;
  id: number;
  primaryType: string | null;
}

const WATERMARK_WIDTH_RATIO = 1.1;
const WATERMARK_TOP_OFFSET_RATIO = 0.32;

// Full-bleed, immersive banner — the single source of the Pokemon's visual
// identity on the detail screen (artwork + name + id), colored by its
// primary type. Deliberately edge-to-edge with no rounding, so it reads as
// a hero section rather than a floating card.
function PokemonHeroComponent({ imageUrl, name, id, primaryType }: PokemonHeroProps) {
  const { width } = useWindowDimensions();
  const theme = useMemo(() => getPokemonTheme(primaryType), [primaryType]);
  const watermarkSize = width * WATERMARK_WIDTH_RATIO;

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.wrapper}>
      <LinearGradient
        colors={theme.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View
          pointerEvents="none"
          style={[styles.watermarkLayer, { top: -watermarkSize * WATERMARK_TOP_OFFSET_RATIO }]}
        >
          <PokeballWatermark size={watermarkSize} />
        </View>
        <PokemonImage imageUrl={imageUrl} glowColor={theme.glowColor} />
        <PokemonHeader name={name} id={id} accentColor={theme.accent} />
      </LinearGradient>
    </Animated.View>
  );
}

export default memo(PokemonHeroComponent);

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingBottom: 48,
  },
  watermarkLayer: {
    position: "absolute",
    alignSelf: "center",
  },
});
