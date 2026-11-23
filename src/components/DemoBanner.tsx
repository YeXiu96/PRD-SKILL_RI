import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

interface DemoBannerProps {
  isScenarioTriggered: boolean;
  onSimulate: () => void;
  onReset: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  isScenarioTriggered,
  onSimulate,
  onReset,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        <Text style={styles.bold}>Mode demo:</Text> Data jadwal adalah simulasi. Gunakan tombol di
        bawah untuk mensimulasikan perubahan sepihak oleh BAA.
      </Text>
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.primaryButton, isScenarioTriggered && styles.disabledButton]}
          onPress={onSimulate}
          disabled={isScenarioTriggered}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {isScenarioTriggered ? '✓ Perubahan Telah Disimulasikan' : '⚡ Simulasikan Perubahan'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onReset} activeOpacity={0.7}>
          <Text style={styles.secondaryButtonText}>Reset Demo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.warningLight,
    borderWidth: 1,
    borderColor: THEME.colors.warning,
    borderStyle: 'dashed',
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginHorizontal: THEME.spacing.lg,
    marginTop: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
  },
  description: {
    fontSize: 13,
    color: THEME.colors.textPrimary,
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: THEME.borderRadius.md,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: THEME.borderRadius.md,
  },
  secondaryButtonText: {
    color: THEME.colors.textPrimary,
    fontWeight: '600',
    fontSize: 12,
  },
});
