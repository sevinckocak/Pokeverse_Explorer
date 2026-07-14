import ScreenHeader from "@/components/common/ScreenHeader";

export { HOME_HEADER_COLORS } from "@/constants/theme";

interface HomeHeaderProps {
  onNotificationPress?: () => void;
}

export default function HomeHeader({ onNotificationPress }: HomeHeaderProps) {
  return (
    <ScreenHeader
      title="Discover Pokémon"
      subtitle="Explore Pokémon, abilities, evolutions and more."
      icon="notifications-outline"
      onIconPress={onNotificationPress}
      showBadge
    />
  );
}
