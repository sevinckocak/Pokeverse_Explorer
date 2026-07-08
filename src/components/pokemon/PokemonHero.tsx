import { memo, useMemo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn } from "react-native-reanimated";
import { RADIUS } from "@/constants/theme";
import { getPokemonGradient } from "@/constants/pokemonTheme";
import { PokeballWatermark } from "@/components/pokemon/PokeballWatermark";
import PokemonImage from "@/components/pokemon/PokemonImage";
import PokemonHeader from "@/components/pokemon/PokemonHeader";

interface PokemonHeroProps {
  imageUrl: string | null;
  name: string;
  id: number;
  colorName: string | null;
}

const WATERMARK_WIDTH_RATIO = 1.1;
const WATERMARK_TOP_OFFSET_RATIO = 0.32;

function PokemonHeroComponent({ imageUrl, name, id, colorName }: PokemonHeroProps) {
  const { width } = useWindowDimensions();
  const gradientColors = useMemo(() => getPokemonGradient(colorName), [colorName]);
  const watermarkSize = width * WATERMARK_WIDTH_RATIO;

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.wrapper}>
      <LinearGradient
        colors={gradientColors}
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
        <PokemonImage imageUrl={imageUrl} />
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
