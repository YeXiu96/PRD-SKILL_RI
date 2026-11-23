import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

interface HeaderProps {
  unreadCount: number;
  onPressNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ unreadCount, onPressNotifications }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Jadwal Kuliah</Text>
        <Text style={styles.subtitle}>
          Portal Akademik UMM · Suryo Wisodono Prayogo · Informatika semester 7
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.bellButton, unreadCount > 0 && styles.bellButtonActive]}
        onPress={onPressNotifications}
        activeOpacity={0.7}
      >
        <Text style={[styles.bellText, unreadCount > 0 && styles.bellTextActive]}>
          🔔 Notifikasi {unreadCount > 0 ? `(${unreadCount} baru)` : ''}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    backgroundColor: THEME.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  titleContainer: {
    flex: 1,
    minWidth: 220,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  bellButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.card,
  },
  bellButtonActive: {
    borderColor: THEME.colors.danger,
    backgroundColor: THEME.colors.dangerLight,
  },
  bellText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  bellTextActive: {
    color: THEME.colors.danger,
  },
});
