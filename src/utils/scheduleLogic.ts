import { DayOfWeek, ClassSession, ConflictMap } from '../types/schedule';

export const DAYS_ORDER: DayOfWeek[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

/** Format waktu seragam "08:40" -> "08.40" (FR-01) */
export const formatTime = (time: string): string => {
  return time.replace(':', '.');
};

/** Format rentang waktu slot "Senin 08.40–10.20" */
export const formatSlot = (session: ClassSession): string => {
  return `${session.day} ${formatTime(session.startTime)}–${formatTime(session.endTime)}`;
};

/** Format tanggal & jam riwayat */
export const formatDateTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

/** Deteksi irisan jam pada hari yang sama (FR-03) */
export const isOverlapping = (a: ClassSession, b: ClassSession): boolean => {
  return a.day === b.day && a.startTime < b.endTime && b.startTime < a.endTime;
};

/** Mendeteksi seluruh mata kuliah yang saling bentrok */
export const detectConflicts = (sessions: Record<number, ClassSession>): ConflictMap => {
  const ids = Object.keys(sessions).map(Number);
  const conflicts: ConflictMap = {};

  ids.forEach((i) => {
    const peers = ids.filter((j) => j !== i && isOverlapping(sessions[i], sessions[j]));
    if (peers.length > 0) {
      conflicts[i] = peers;
    }
  });

  return conflicts;
};

/** Mengurutkan ID mata kuliah berdasarkan hari dan jam mulai */
export const sortCourseIds = (
  courseIds: number[],
  sessions: Record<number, ClassSession>
): number[] => {
  return [...courseIds].sort((a, b) => {
    const sessionA = sessions[a];
    const sessionB = sessions[b];
    if (!sessionA || !sessionB) return 0;

    const dayDiff = DAYS_ORDER.indexOf(sessionA.day) - DAYS_ORDER.indexOf(sessionB.day);
    if (dayDiff !== 0) return dayDiff;

    return sessionA.startTime.localeCompare(sessionB.startTime);
  });
};
