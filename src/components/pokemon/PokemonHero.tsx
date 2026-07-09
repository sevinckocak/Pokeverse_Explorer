import { memo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn } from "react-native-reanimated";
import { RADIUS } from "@/constants/theme";
import { PokeballWatermark } from "@/components/pokemon/PokeballWatermark";
import PokemonImage from "@/components/pokemon/PokemonImage";
import PokemonHeader from "@/components/pokemon/PokemonHeader";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";

interface PokemonHeroProps {
  imageUrl: string | null;
  name: string;
  id: number;
  theme: PokemonTypeTheme;
}

const WATERMARK_WIDTH_RATIO = 1.1;
const WATERMARK_TOP_OFFSET_RATIO = 0.32;

function PokemonHeroComponent({ imageUrl, name, id, theme }: PokemonHeroProps) {
  const { width } = useWindowDimensions();
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
        <PokemonHeader name={name} id={id} />
      </LinearGradient>
    </Animated.View>
  );
}

export default memo(PokemonHeroComponent);

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    borderBottomLeftRadius: RADIUS.lg,
    borderBottomRightRadius: RADIUS.lg,
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 72,
    paddingBottom: 40,
  },
  watermarkLayer: {
    position: "absolute",
    alignSelf: "center",
  },
});
