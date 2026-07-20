import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { POKEMON_TYPE_NAMES, getPokemonTheme } from '@/constants/pokemonTheme';
import type { PokemonTypeName } from '@/constants/pokemonTheme';
import { RADIUS, SPACING } from '@/constants/theme';
import { capitalize } from '@/utils/string';

interface BrowseByTypeProps {
  onTypePress: (type: PokemonTypeName) => void;
}

function BrowseByTypeComponent({ onTypePress }: BrowseByTypeProps) {
  const { colors } = useThemeTokens();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Browse by Type</Text>
      <View style={styles.grid}>
        {POKEMON_TYPE_NAMES.map((type) => {
          const theme = getPokemonTheme(type);
          return (
            <Pressable
              key={type}
              style={[styles.chip, { backgroundColor: theme.chipColor }]}
              onPress={() => onTypePress(type)}
              accessibilityRole="button"
              accessibilityLabel={`Browse ${type} type Pokémon`}
            >
              <Text style={styles.chipLabel}>{capitalize(type)}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default memo(BrowseByTypeComponent);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  chip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
  },
  // Always white regardless of app theme: chips use per-Pokémon-type
  // background colors (theme.chipColor), which are already saturated
  // enough that white text stays legible in both light and dark mode.
  chipLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
