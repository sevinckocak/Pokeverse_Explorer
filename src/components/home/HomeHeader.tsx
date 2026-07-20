import ScreenHeader from "@/components/common/ScreenHeader";

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
