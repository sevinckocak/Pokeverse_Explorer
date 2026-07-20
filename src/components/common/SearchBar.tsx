import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { RADIUS, SPACING } from '@/constants/theme';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  autoFocus?: boolean;
  editable?: boolean;
}

const SEARCH_BAR_HEIGHT = 56;
const SEARCH_ICON_SIZE = 20;
const FILTER_ICON_SIZE = 18;
const FILTER_BUTTON_SIZE = 36;

export default function SearchBar({
  value = '',
  placeholder = 'Search Pokémon...',
  onChangeText,
  onFilterPress,
  autoFocus = false,
  editable = true,
}: SearchBarProps) {
  const { colors } = useThemeTokens();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <Ionicons
        name="search"
        size={SEARCH_ICON_SIZE}
        color={colors.textSecondary}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />

      <TextInput
        style={[styles.input, { color: colors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        autoFocus={autoFocus}
        editable={editable}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        accessibilityLabel={placeholder}
      />

      {onFilterPress ? (
        <>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity
            style={styles.filterButton}
            onPress={onFilterPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Filter"
          >
            <Ionicons name="options-outline" size={FILTER_ICON_SIZE} color={colors.textSecondary} />
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SEARCH_BAR_HEIGHT,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  input: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: 15,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: '60%',
    marginRight: SPACING.sm,
  },
  filterButton: {
    width: FILTER_BUTTON_SIZE,
    height: FILTER_BUTTON_SIZE,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
