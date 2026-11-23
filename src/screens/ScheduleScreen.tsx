import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DemoBanner } from '../components/DemoBanner';
import { ConflictAlert } from '../components/ConflictAlert';
import { ScheduleCard } from '../components/ScheduleCard';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { COURSES } from '../constants/courses';
import { sortCourseIds } from '../utils/scheduleLogic';
import { ClassSession, ConflictMap, LogEntry, Course } from '../types/schedule';

interface ScheduleScreenProps {
  currentSessions: Record<number, ClassSession>;
  conflicts: ConflictMap;
  pendingNotifications: LogEntry[];
  isScenarioTriggered: boolean;
  onSimulate: () => void;
  onReset: () => void;
  onAcknowledge: () => void;
  onMoveSession: (courseId: number, targetSession: ClassSession) => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  currentSessions,
  conflicts,
  pendingNotifications,
  isScenarioTriggered,
  onSimulate,
  onReset,
  onAcknowledge,
  onMoveSession,
}) => {
  const [targetCourse, setTargetCourse] = useState<Course | null>(null);
  const [targetSession, setTargetSession] = useState<ClassSession | null>(null);

  const sortedCourseIds = sortCourseIds(
    Object.keys(currentSessions).map(Number),
    currentSessions
  );

  const handleRequestMove = (course: Course, session: ClassSession) => {
    setTargetCourse(course);
    setTargetSession(session);
  };

  const handleConfirmMove = () => {
    if (targetCourse && targetSession) {
      onMoveSession(targetCourse.id, targetSession);
    }
    setTargetCourse(null);
    setTargetSession(null);
  };

  const handleCancelMove = () => {
    setTargetCourse(null);
    setTargetSession(null);
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <DemoBanner
          isScenarioTriggered={isScenarioTriggered}
          onSimulate={onSimulate}
          onReset={onReset}
        />

        <ConflictAlert
          pendingNotifications={pendingNotifications}
          conflicts={conflicts}
          onAcknowledge={onAcknowledge}
        />

        {sortedCourseIds.map((courseId) => {
          const course = COURSES[courseId];
          const currentSession = currentSessions[courseId];
          const conflictingIds = conflicts[courseId] || [];
          const conflictingPeers = conflictingIds.map((id) => COURSES[id]);

          return (
            <ScheduleCard
              key={courseId}
              course={course}
              currentSession={currentSession}
              conflictingPeers={conflictingPeers}
              allCurrentSessions={currentSessions}
              onRequestMove={handleRequestMove}
            />
          );
        })}
      </ScrollView>

      {/* Dialog Konfirmasi Pindah Sesi (UXAC-07, UXAC-08) */}
      <ConfirmationModal
        visible={Boolean(targetCourse && targetSession)}
        course={targetCourse}
        targetSession={targetSession}
        onCancel={handleCancelMove}
        onConfirm={handleConfirmMove}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
});
