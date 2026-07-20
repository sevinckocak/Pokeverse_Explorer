import { useTranslation } from "react-i18next";
import ScreenHeader from "@/components/common/ScreenHeader";

interface HomeHeaderProps {
  onNotificationPress?: () => void;
}

export default function HomeHeader({ onNotificationPress }: HomeHeaderProps) {
  const { t } = useTranslation();

  return (
    <ScreenHeader
      title={t('home.title')}
      subtitle={t('home.subtitle')}
      icon="notifications-outline"
      onIconPress={onNotificationPress}
      showBadge
    />
  );
}
