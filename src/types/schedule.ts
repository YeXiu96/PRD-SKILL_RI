export type DayOfWeek = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';

export interface ClassSession {
  classCode: string;
  day: DayOfWeek;
  startTime: string; // misal: "08:40"
  endTime: string;   // misal: "10:20"
  room: string;      // misal: "GKB 1 R.201"
}

export interface Course {
  id: number;
  name: string;
  lecturer: string;
  sessions: ClassSession[];
}

export interface LogEntry {
  id: string;
  at: number;
  txt: string;
  isSystem?: boolean;
  isScenario?: boolean;
  isRead?: boolean;
}

export interface ScheduleState {
  currentSessions: Record<number, ClassSession>;
  logs: LogEntry[];
}

export type ConflictMap = Record<number, number[]>;
