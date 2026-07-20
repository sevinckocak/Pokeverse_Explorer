import { memo } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HOME_HEADER_COLORS } from "@/components/home/HomeHeader";
import { RADIUS, SPACING } from "@/constants/theme";
import type { IoniconName } from "@/components/home/QuickActionCard";

interface SettingsItemProps {
  icon: IoniconName;
  title: string;
  subtitle?: string;
  value?: string;
  showSwitch?: boolean;
  switchValue?: boolean;
  showChevron?: boolean;
  disabled?: boolean;
}

const ICON_BADGE_SIZE = 36;
const ICON_SIZE = 18;
const CHEVRON_SIZE = 18;

const SETTINGS_ITEM_COLORS = {
  switchTrackOff: "rgba(255, 255, 255, 0.16)",
  chevron: "rgba(255, 255, 255, 0.4)",
} as const;

// Pure display row, no press handling — every row on this screen is a
// static placeholder for now. Future screens can wrap this in a Pressable
// (or add an onPress prop) once a setting actually does something.
function SettingsItemComponent({
  icon,
  title,
  subtitle,
  value,
  showSwitch = false,
  switchValue = false,
  showChevron = false,
  disabled = false,
}: SettingsItemProps) {
  return (
    <View style={[styles.row, disabled && styles.rowDisabled]}>
      <View style={styles.iconBadge}>
        <Ionicons
          name={icon}
          size={ICON_SIZE}
          color={HOME_HEADER_COLORS.title}
        />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={styles.trailing}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        {showSwitch ? (
          <Switch
            value={switchValue}
            disabled={disabled}
            trackColor={{
              false: SETTINGS_ITEM_COLORS.switchTrackOff,
              true: HOME_HEADER_COLORS.accent,
            }}
            thumbColor={HOME_HEADER_COLORS.title}
          />
        ) : null}
        {showChevron ? (
          <Ionicons
            name="chevron-forward"
            size={CHEVRON_SIZE}
            color={SETTINGS_ITEM_COLORS.chevron}
          />
        ) : null}
      </View>
    </View>
  );
}

export default memo(SettingsItemComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  rowDisabled: {
    opacity: 0.55,
  },
  iconBadge: {
    width: ICON_BADGE_SIZE,
    height: ICON_BADGE_SIZE,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: HOME_HEADER_COLORS.glass,
    borderWidth: 1,
    borderColor: HOME_HEADER_COLORS.glassBorder,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: HOME_HEADER_COLORS.title,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: HOME_HEADER_COLORS.subtitle,
  },
  trailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  value: {
    fontSize: 14,
    color: HOME_HEADER_COLORS.subtitle,
  },
});
