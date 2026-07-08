import { Image, StyleSheet } from "react-native";

interface PokemonImageProps {
  imageUrl: string | null;
}

export default function PokemonImage({ imageUrl }: PokemonImageProps) {
  if (imageUrl === null) {
    return null;
  }

  return <Image source={{ uri: imageUrl }} style={styles.sprite} />;
}

const styles = StyleSheet.create({
  sprite: {
    width: 150,
    height: 150,
  },
});
