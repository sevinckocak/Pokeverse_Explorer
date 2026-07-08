import { memo } from "react";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

interface PokemonImageProps {
  imageUrl: string | null;
}

const IMAGE_WIDTH_RATIO = 0.55;
const GLOW_SCALE = 1.15;

function PokemonImageComponent({ imageUrl }: PokemonImageProps) {
  const { width } = useWindowDimensions();

  if (imageUrl === null) {
    return null;
  }

  const size = width * IMAGE_WIDTH_RATIO;
  const glowSize = size * GLOW_SCALE;

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <View
        style={[
          styles.glow,
          {
            width: glowSize,
            height: glowSize,
            borderRadius: glowSize / 2,
            top: (size - glowSize) / 2,
            left: (size - glowSize) / 2,
          },
        ]}
      />
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
    </View>
  );
}

export default memo(PokemonImageComponent);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.28)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
