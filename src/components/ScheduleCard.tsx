import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { Course, ClassSession } from '../types/schedule';
import { COURSES } from '../constants/courses';
import { formatSlot, formatTime, isOverlapping } from '../utils/scheduleLogic';

interface ScheduleCardProps {
  course: Course;
  currentSession: ClassSession;
  conflictingPeers?: Course[];
  allCurrentSessions: Record<number, ClassSession>;
  onRequestMove: (course: Course, targetSession: ClassSession) => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  course,
  currentSession,
  conflictingPeers,
  allCurrentSessions,
  onRequestMove,
}) => {
  const isConflict = Boolean(conflictingPeers && conflictingPeers.length > 0);

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
            <View style={styles.badgeDanger} accessibilityLabel={`Bentrok dengan ${conflictingPeers?.map(p => p.name).join(', ')}`}>
              <Text style={styles.badgeDangerText}>⚠ BENTROK</Text>
            </View>
          ) : (
            <View style={styles.badgeSuccess} accessibilityLabel="Jadwal aman">
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

      {/* Bagian Pemilihan Sesi Pengganti Kelas Paralel (FR-04 & UXAC-05, UXAC-06) */}
      {isConflict && (
        <View style={styles.alternativesSection}>
          <Text style={styles.alternativesTitle}>
            Sesi pengganti (kelas paralel dosen yang sama: {course.lecturer})
          </Text>

          {alternativeSessions.length === 0 ? (
            <Text style={styles.altEmptyText}>
              Belum ada sesi pengganti yang tersedia. Hubungi Program Studi.
            </Text>
          ) : (
            <View style={styles.alternativesList}>
              {alternativeSessions.map((session, idx) => {
                // Periksa apakah sesi alternatif ini beririsan dengan matkul lain
                const collisionIds = Object.keys(allCurrentSessions)
                  .map(Number)
                  .filter((otherId) => otherId !== course.id && isOverlapping(session, allCurrentSessions[otherId]));

                const willConflict = collisionIds.length > 0;
                const collidingCourseNames = collisionIds.map((id) => COURSES[id]?.name).join(', ');

                return (
                  <View key={idx} style={styles.alternativeItem}>
                    <View style={styles.altInfo}>
                      <Text style={styles.altClassTitle}>
                        Kelas {session.classCode} · {formatSlot(session)} · {session.room}
                      </Text>
                      {willConflict ? (
                        <Text style={styles.altConflictText}>
                          ⚠ Bentrok dengan {collidingCourseNames}
                        </Text>
                      ) : (
                        <Text style={styles.altSafeText}>✓ Tidak bentrok</Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={[styles.moveButton, willConflict && styles.moveButtonDisabled]}
                      disabled={willConflict}
                      onPress={() => onRequestMove(course, session)}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityLabel={willConflict ? `Tidak bisa pindah, bentrok dengan ${collidingCourseNames}` : `Pindah ke kelas ${session.classCode}`}
                    >
                      <Text style={[styles.moveButtonText, willConflict && styles.moveButtonTextDisabled]}>
                        Pindah ke sesi ini
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
    backgroundColor: THEME.colors.dangerLight,
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
    fontWeight: '600',
    marginTop: 6,
  },
  bold: {
    fontWeight: '700',
  },
  alternativesSection: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.danger,
    borderStyle: 'dashed',
  },
  alternativesTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 8,
  },
  altEmptyText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    fontStyle: 'italic',
    paddingVertical: 4,
  },
  alternativesList: {
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
    flexWrap: 'wrap',
    gap: 8,
  },
  altInfo: {
    flex: 1,
    minWidth: 180,
  },
  altClassTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  altConflictText: {
    fontSize: 11,
    color: THEME.colors.danger,
    fontWeight: '600',
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: THEME.borderRadius.md,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveButtonDisabled: {
    backgroundColor: THEME.colors.border,
  },
  moveButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  moveButtonTextDisabled: {
    color: THEME.colors.textSecondary,
  },
});
