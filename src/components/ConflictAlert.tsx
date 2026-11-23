import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { LogEntry, ConflictMap } from '../types/schedule';
import { COURSES } from '../constants/courses';

interface ConflictAlertProps {
  pendingNotifications: LogEntry[];
  conflicts: ConflictMap;
  onAcknowledge: () => void;
}

export const ConflictAlert: React.FC<ConflictAlertProps> = ({
  pendingNotifications,
  conflicts,
  onAcknowledge,
}) => {
  const conflictCourseIds = Object.keys(conflicts).map(Number);
  const hasConflicts = conflictCourseIds.length > 0;
  const hasUnread = pendingNotifications.length > 0;

  if (!hasConflicts && !hasUnread) return null;

  const conflictCourseNames = conflictCourseIds.map((id) => COURSES[id]?.name).join(', ');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ⚠ {hasUnread ? 'Jadwal kuliahmu berubah' : 'Ada jadwal yang bentrok'}
      </Text>

      {hasUnread && (
        <View style={styles.notificationList}>
          {pendingNotifications.map((notif) => (
            <Text key={notif.id} style={styles.bulletItem}>
              • {notif.txt}
            </Text>
          ))}
        </View>
      )}

      {hasConflicts && (
        <Text style={styles.conflictDescription}>
          Bentrok terdeteksi pada: <Text style={styles.bold}>{conflictCourseNames}</Text>. Pilih sesi
          pengganti pada baris bertanda <Text style={styles.dangerText}>BENTROK</Text>. Jika kamu
          pindah lewat portal, presensi dicatat pada sesi yang kamu pilih.
        </Text>
      )}

      {hasUnread && (
        <TouchableOpacity
          style={styles.ackButton}
          onPress={onAcknowledge}
          activeOpacity={0.8}
        >
          <Text style={styles.ackButtonText}>Saya sudah membaca</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.warningLight,
    borderWidth: 1,
    borderColor: THEME.colors.warning,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginHorizontal: THEME.spacing.lg,
    marginTop: THEME.spacing.sm,
    marginBottom: THEME.spacing.md,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 6,
  },
  notificationList: {
    marginVertical: 4,
  },
  bulletItem: {
    fontSize: 13,
    color: THEME.colors.textPrimary,
    lineHeight: 18,
    marginVertical: 2,
  },
  conflictDescription: {
    fontSize: 13,
    color: THEME.colors.textPrimary,
    lineHeight: 18,
    marginTop: 6,
  },
  bold: {
    fontWeight: '700',
  },
  dangerText: {
    color: THEME.colors.danger,
    fontWeight: '700',
  },
  ackButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: THEME.borderRadius.md,
  },
  ackButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
});
