import { Course, ClassSession } from '../types/schedule';

export const COURSES: Record<number, Course> = {
  1: {
    id: 1,
    name: 'Basis Data',
    lecturer: 'Dr. Andi Pratama',
    sessions: [
      { classCode: 'A', day: 'Rabu', startTime: '08:40', endTime: '10:20', room: 'GKB 1 R.201' },
      { classCode: 'B', day: 'Kamis', startTime: '08:40', endTime: '10:20', room: 'GKB 1 R.202' },
      { classCode: 'C', day: 'Jumat', startTime: '13:00', endTime: '14:40', room: 'GKB 1 R.203' },
    ],
  },
  2: {
    id: 2,
    name: 'Pemrograman Web',
    lecturer: 'Budi Santoso, M.Kom.',
    sessions: [
      { classCode: 'A', day: 'Senin', startTime: '08:40', endTime: '10:20', room: 'GKB 2 R.101' },
      { classCode: 'B', day: 'Selasa', startTime: '10:30', endTime: '12:10', room: 'GKB 2 R.102' },
      { classCode: 'C', day: 'Rabu', startTime: '13:00', endTime: '14:40', room: 'GKB 2 R.103' },
    ],
  },
  3: {
    id: 3,
    name: 'Rekayasa Perangkat Lunak',
    lecturer: 'Siti Rahma, M.T.',
    sessions: [
      { classCode: 'A', day: 'Selasa', startTime: '08:40', endTime: '10:20', room: 'GKB 3 R.301' },
      { classCode: 'B', day: 'Kamis', startTime: '10:30', endTime: '12:10', room: 'GKB 3 R.302' },
      { classCode: 'C', day: 'Jumat', startTime: '08:40', endTime: '10:20', room: 'GKB 3 R.303' },
    ],
  },
  4: {
    id: 4,
    name: 'Interaksi Manusia dan Komputer',
    lecturer: 'Dr. Hendra Wijaya',
    sessions: [
      { classCode: 'A', day: 'Kamis', startTime: '13:00', endTime: '14:40', room: 'GKB 1 R.204' },
      { classCode: 'B', day: 'Senin', startTime: '13:00', endTime: '14:40', room: 'GKB 1 R.205' },
      { classCode: 'C', day: 'Rabu', startTime: '10:30', endTime: '12:10', room: 'GKB 1 R.206' },
    ],
  },
  5: {
    id: 5,
    name: 'Jaringan Komputer',
    lecturer: 'Rina Kusuma, M.Kom.',
    sessions: [
      { classCode: 'A', day: 'Jumat', startTime: '10:30', endTime: '12:10', room: 'GKB 2 R.201' },
      { classCode: 'B', day: 'Selasa', startTime: '13:00', endTime: '14:40', room: 'GKB 2 R.202' },
      { classCode: 'C', day: 'Senin', startTime: '10:30', endTime: '12:10', room: 'GKB 2 R.203' },
    ],
  },
};

export const INITIAL_SESSIONS: Record<number, ClassSession> = {
  1: COURSES[1].sessions[0],
  2: COURSES[2].sessions[0],
  3: COURSES[3].sessions[0],
  4: COURSES[4].sessions[0],
  5: COURSES[5].sessions[0],
};
