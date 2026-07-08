import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface PokeballWatermarkProps {
  size: number;
}

function PokeballWatermarkComponent({ size }: PokeballWatermarkProps) {
  const borderWidth = size * 0.06;
  const centerSize = size * 0.22;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth,
        },
      ]}
    >
      <View style={[styles.divider, { top: size / 2 - borderWidth / 2 }]} />
      <View
        style={[
          styles.center,
          {
            width: centerSize,
            height: centerSize,
            borderRadius: centerSize / 2,
            borderWidth: borderWidth * 0.6,
          },
        ]}
      />
    </View>
  );
}

export const PokeballWatermark = memo(PokeballWatermarkComponent);

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    borderColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  center: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
  },
});
