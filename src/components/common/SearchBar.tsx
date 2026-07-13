import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RADIUS, SPACING } from '@/constants/theme';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  autoFocus?: boolean;
  editable?: boolean;
}

// Same dark-glass design language as HomeHeader, so this reads as one
// consistent shell wherever it's reused (Home, Search, Favorites).
const SEARCH_BAR_COLORS = {
  background: 'rgba(255, 255, 255, 0.1)',
  border: 'rgba(255, 255, 255, 0.18)',
  divider: 'rgba(255, 255, 255, 0.18)',
  icon: 'rgba(255, 255, 255, 0.64)',
  text: '#FFFFFF',
  placeholder: 'rgba(255, 255, 255, 0.45)',
  shadow: '#000000',
} as const;

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
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={SEARCH_ICON_SIZE}
        color={SEARCH_BAR_COLORS.icon}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={SEARCH_BAR_COLORS.placeholder}
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
          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.filterButton}
            onPress={onFilterPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Filter"
          >
            <Ionicons
              name="options-outline"
              size={FILTER_ICON_SIZE}
              color={SEARCH_BAR_COLORS.icon}
            />
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
    backgroundColor: SEARCH_BAR_COLORS.background,
    borderWidth: 1,
    borderColor: SEARCH_BAR_COLORS.border,
    shadowColor: SEARCH_BAR_COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  input: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: 15,
    color: SEARCH_BAR_COLORS.text,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: '60%',
    backgroundColor: SEARCH_BAR_COLORS.divider,
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
