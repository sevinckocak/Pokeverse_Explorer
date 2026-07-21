import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { RootStackParamList } from "@/navigation";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { usePokemonDetailData } from "@/hooks/usePokemonDetailData";
import PokemonHero from "@/components/pokemon/PokemonHero";
import DetailDrawer from "@/components/detail/DetailDrawer";
import DetailContent from "@/components/detail/DetailContent";
import { DEFAULT_DETAIL_SECTION } from "@/constants/detailMenu";
import type { DetailSection } from "@/constants/detailMenu";
import { RADIUS, SPACING } from "@/constants/theme";
import { getPokemonHeroArtworkUrl } from "@/utils/pokemonAssets";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

const MENU_BUTTON_SIZE = 44;
const MENU_ICON_SIZE = 22;

export default function PokemonDetailScreen() {
  const { t } = useTranslation();
  const route = useRoute<PokemonDetailRouteProp>();
  const { name } = route.params;

  const { colors } = useThemeTokens();
  const { detail, loadingDetail, detailError } = usePokemonDetailData(name);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<DetailSection>(DEFAULT_DETAIL_SECTION);

  const handleOpenDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const handleCloseDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const handleSelectSection = useCallback((section: DetailSection) => {
    setSelectedSection(section);
    setIsDrawerOpen(false);
  }, []);

  const primaryType = detail?.types[0]?.type.name ?? null;

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
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Pressable
        style={[styles.menuButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={handleOpenDrawer}
        accessibilityRole="button"
        accessibilityLabel={t('pokemonDetail.openMenu')}
      >
        <Ionicons name="menu-outline" size={MENU_ICON_SIZE} color={colors.textPrimary} />
      </Pressable>

      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <PokemonHero
          imageUrl={getPokemonHeroArtworkUrl(detail)}
          name={detail.name}
          id={detail.id}
          primaryType={primaryType}
        />

        <View style={styles.body}>
          <DetailContent section={selectedSection} detail={detail} />
        </View>
      </ScrollView>

      <DetailDrawer
        visible={isDrawerOpen}
        selectedSection={selectedSection}
        onSelectSection={handleSelectSection}
        onClose={handleCloseDrawer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
  menuButton: {
    position: "absolute",
    top: SPACING.md,
    left: SPACING.lg,
    zIndex: 10,
    width: MENU_BUTTON_SIZE,
    height: MENU_BUTTON_SIZE,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
});
