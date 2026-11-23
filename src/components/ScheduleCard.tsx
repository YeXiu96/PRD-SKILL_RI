import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { Course, ClassSession } from '../types/schedule';
import { formatSlot, formatTime, isOverlapping } from '../utils/scheduleLogic';

interface ScheduleCardProps {
  course: Course;
  currentSession: ClassSession;
  conflictingPeers?: Course[];
  allCurrentSessions: Record<number, ClassSession>;
  onMoveSession: (courseId: number, targetSession: ClassSession) => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  course,
  currentSession,
  conflictingPeers,
  allCurrentSessions,
  onMoveSession,
}) => {
  const isConflict = Boolean(conflictingPeers && conflictingPeers.length > 0);
  const [isAlternativesExpanded, setIsAlternativesExpanded] = useState<boolean>(true);

  // Daftar kelas paralel selain kelas yang saat ini diambil
  const alternativeSessions = course.sessions.filter(
    (s) => !(s.day === currentSession.day && s.classCode === currentSession.classCode)
  );

  return (
    <View style={[styles.card, isConflict && styles.cardConflict]}>
      {/* Header Info Kartu */}
      <View style={styles.cardHeader}>
        <View style={styles.timeBadge}>
          <Text style={styles.dayText}>{currentSession.day}</Text>
          <Text style={styles.timeText}>
            {formatTime(currentSession.startTime)}–{formatTime(currentSession.endTime)}
          </Text>
        </View>

        <View style={styles.statusBadgeContainer}>
          {isConflict ? (
            <View style={styles.badgeDanger}>
              <Text style={styles.badgeDangerText}>⚠ BENTROK</Text>
            </View>
          ) : (
            <View style={styles.badgeSuccess}>
              <Text style={styles.badgeSuccessText}>✓ Aman</Text>
            </View>
          )}
        </View>
      </View>

      {/* Detail Mata Kuliah */}
      <View style={styles.courseDetails}>
        <Text style={styles.courseName}>{course.name}</Text>
        <Text style={styles.lecturerText}>
          {course.lecturer} · <Text style={styles.classCodeText}>Kelas {currentSession.classCode}</Text>
        </Text>
        <Text style={styles.roomText}>Ruang: {currentSession.room}</Text>

        {isConflict && conflictingPeers && (
          <Text style={styles.conflictWarningText}>
            Tabrakan waktu dengan: <Text style={styles.bold}>{conflictingPeers.map((p) => p.name).join(', ')}</Text>
          </Text>
        )}
      </View>

      {/* Bagian Pemilihan Sesi Pengganti Kelas Paralel (FR-04 & FR-05) */}
      {isConflict && (
        <View style={styles.alternativesSection}>
          <TouchableOpacity
            style={styles.alternativesHeader}
            onPress={() => setIsAlternativesExpanded(!isAlternativesExpanded)}
            activeOpacity={0.7}
          >
            <Text style={styles.alternativesTitle}>
              🔄 Sesi Pengganti (Dosen: {course.lecturer})
            </Text>
            <Text style={styles.expandIcon}>{isAlternativesExpanded ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {isAlternativesExpanded && (
            <View style={styles.alternativesList}>
              {alternativeSessions.map((session, idx) => {
                // Periksa apakah sesi ini menyebabkan bentrok dengan mata kuliah lain
                const otherCollisions = Object.keys(allCurrentSessions)
                  .map(Number)
                  .filter((otherId) => otherId !== course.id && isOverlapping(session, allCurrentSessions[otherId]));

                const willConflict = otherCollisions.length > 0;

                return (
                  <View key={idx} style={styles.alternativeItem}>
                    <View style={styles.altInfo}>
                      <Text style={styles.altClassTitle}>
                        Kelas {session.classCode} · {formatSlot(session)}
                      </Text>
                      <Text style={styles.altRoomText}>{session.room}</Text>
                      {willConflict ? (
                        <Text style={styles.altConflictText}>
                          Bentrok jika dipilih (irisan jam kuliah lain)
                        </Text>
                      ) : (
                        <Text style={styles.altSafeText}>✓ Bebas bentrok</Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={[styles.moveButton, willConflict && styles.moveButtonDisabled]}
                      disabled={willConflict}
                      onPress={() => onMoveSession(course.id, session)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.moveButtonText}>
                        {willConflict ? 'Tidak Bisa' : 'Pindah Sesi'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.lg,
    marginHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardConflict: {
    borderColor: THEME.colors.danger,
    backgroundColor: '#FFF8F8',
    borderLeftWidth: 5,
    borderLeftColor: THEME.colors.danger,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  timeText: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  statusBadgeContainer: {
    alignItems: 'flex-end',
  },
  badgeSuccess: {
    backgroundColor: THEME.colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: THEME.borderRadius.full,
  },
  badgeSuccessText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.success,
  },
  badgeDanger: {
    backgroundColor: THEME.colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: THEME.borderRadius.full,
  },
  badgeDangerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  courseDetails: {
    marginTop: 2,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  lecturerText: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  classCodeText: {
    fontWeight: '600',
    color: THEME.colors.primary,
  },
  roomText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  conflictWarningText: {
    fontSize: 12,
    color: THEME.colors.danger,
    marginTop: 6,
  },
  bold: {
    fontWeight: '700',
  },
  alternativesSection: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.dangerLight,
  },
  alternativesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  alternativesTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  expandIcon: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  alternativesList: {
    marginTop: 6,
    gap: 8,
  },
  alternativeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  altInfo: {
    flex: 1,
    marginRight: 8,
  },
  altClassTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  altRoomText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginTop: 1,
  },
  altConflictText: {
    fontSize: 11,
    color: THEME.colors.danger,
    marginTop: 2,
  },
  altSafeText: {
    fontSize: 11,
    color: THEME.colors.success,
    fontWeight: '600',
    marginTop: 2,
  },
  moveButton: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: THEME.borderRadius.md,
  },
  moveButtonDisabled: {
    backgroundColor: THEME.colors.border,
  },
  moveButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
