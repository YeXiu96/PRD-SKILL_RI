import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DemoBanner } from '../components/DemoBanner';
import { ConflictAlert } from '../components/ConflictAlert';
import { ScheduleCard } from '../components/ScheduleCard';
import { COURSES } from '../constants/courses';
import { sortCourseIds } from '../utils/scheduleLogic';
import { ClassSession, ConflictMap, LogEntry } from '../types/schedule';

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
  const sortedCourseIds = sortCourseIds(
    Object.keys(currentSessions).map(Number),
    currentSessions
  );

  return (
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
            onMoveSession={onMoveSession}
          />
        );
      })}
    </ScrollView>
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
