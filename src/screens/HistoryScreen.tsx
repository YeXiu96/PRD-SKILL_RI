import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { THEME } from '../constants/theme';
import { LogEntry } from '../types/schedule';
import { formatDateTime } from '../utils/scheduleLogic';

interface HistoryScreenProps {
  logs: LogEntry[];
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ logs }) => {
  const reversedLogs = [...logs].reverse();

  if (reversedLogs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📋</Text>
        <Text style={styles.emptyTitle}>Belum Ada Riwayat Perubahan</Text>
        <Text style={styles.emptySubtitle}>
          Setiap pergeseran jadwal oleh sistem atau perpindahan sesi kelas paralel akan tercatat di sini.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reversedLogs}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.logItem}>
          <View style={styles.headerRow}>
            {item.isSystem && !item.isRead ? (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>Baru</Text>
              </View>
            ) : null}
            <Text style={styles.dateText}>{formatDateTime(item.at)}</Text>
          </View>
          <Text style={styles.logText}>{item.txt}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: THEME.spacing.lg,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  logItem: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.md,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  newBadge: {
    backgroundColor: THEME.colors.danger,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: THEME.borderRadius.full,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  logText: {
    fontSize: 13,
    color: THEME.colors.textPrimary,
    lineHeight: 18,
  },
});
