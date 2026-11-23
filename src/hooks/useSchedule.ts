import { useState, useEffect, useMemo, useCallback } from 'react';
import { ScheduleState, LogEntry, ClassSession } from '../types/schedule';
import { COURSES, INITIAL_SESSIONS } from '../constants/courses';
import { detectConflicts, formatSlot, isOverlapping } from '../utils/scheduleLogic';
import { storageService } from '../services/storage';

const getInitialState = (): ScheduleState => ({
  currentSessions: { ...INITIAL_SESSIONS },
  logs: [],
});

export const useSchedule = () => {
  const [state, setState] = useState<ScheduleState>(getInitialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'jadwal' | 'riwayat'>('jadwal');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load state saat startup (FR-07) dengan safety timeout agar tidak stuck loading
  useEffect(() => {
    let isMounted = true;
    const safetyTimer = setTimeout(() => {
      if (isMounted) setIsLoading(false);
    }, 800);

    (async () => {
      try {
        const saved = await storageService.loadState();
        if (isMounted && saved) {
          setState(saved);
        }
      } catch (e) {
        console.warn('Gagal memuat penyimpanan:', e);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          clearTimeout(safetyTimer);
        }
      }
    })();

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const hideToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  // Simpan setiap ada perubahan state (FR-07)
  const updateAndSave = useCallback(async (updater: (prev: ScheduleState) => ScheduleState) => {
    setState((prev) => {
      const next = updater(prev);
      storageService.saveState(next);
      return next;
    });
  }, []);

  // Hitung status bentrok secara reaktif (FR-03)
  const conflicts = useMemo(() => {
    return detectConflicts(state.currentSessions);
  }, [state.currentSessions]);

  // Notifikasi baru dari sistem yang belum dibaca (FR-02)
  const pendingNotifications = useMemo(() => {
    return state.logs.filter((log) => log.isSystem && !log.isRead);
  }, [state.logs]);

  // Cek apakah skenario demo sudah pernah dijalankan
  const isScenarioTriggered = useMemo(() => {
    return state.logs.some((log) => log.isScenario);
  }, [state.logs]);

  // Tandai notifikasi sudah dibaca
  const acknowledgeNotifications = useCallback(() => {
    updateAndSave((prev) => ({
      ...prev,
      logs: prev.logs.map((log) => ({ ...log, isRead: true })),
    }));
  }, [updateAndSave]);

  // Simulasi pemindahan sepihak oleh BAA (Mode Demo)
  const simulateBAAChange = useCallback(() => {
    const courseId = 2; // Pemrograman Web
    const oldSession = state.currentSessions[courseId];
    // Dipindah ke Rabu 08:40 - 10:20 (menabrak Basis Data)
    const newSession: ClassSession = {
      classCode: 'A',
      day: 'Rabu',
      startTime: '08:40',
      endTime: '10:20',
      room: 'GKB 2 R.101',
    };

    const changeText = `Jadwal Pemrograman Web dipindahkan oleh sistem dari ${formatSlot(
      oldSession
    )} ke ${formatSlot(newSession)}.`;

    const now = Date.now();
    const newLogs: LogEntry[] = [
      {
        id: `sys-${now}-1`,
        at: now,
        txt: changeText,
        isSystem: true,
        isScenario: true,
        isRead: false,
      },
    ];

    // Cek bentrok dengan mata kuliah lain
    const nextSessions: Record<number, ClassSession> = {
      ...state.currentSessions,
      [courseId]: newSession,
    };
    const collidingIds = Object.keys(nextSessions)
      .map(Number)
      .filter((j) => j !== courseId && isOverlapping(newSession, nextSessions[j]));

    if (collidingIds.length > 0) {
      const collidedNames = collidingIds.map((id) => COURSES[id].name).join(', ');
      newLogs.push({
        id: `sys-${now}-2`,
        at: now,
        txt: `Bentrok terdeteksi: Pemrograman Web dengan ${collidedNames}.`,
        isSystem: true,
        isRead: false,
      });
    }

    updateAndSave((prev) => ({
      ...prev,
      currentSessions: nextSessions,
      logs: [...prev.logs, ...newLogs],
    }));

    showToast(`Notifikasi: ${changeText}`);
  }, [state.currentSessions, updateAndSave, showToast]);

  // Pindah ke sesi kelas paralel dosen sama (FR-04 & FR-05)
  const moveToSession = useCallback(
    (courseId: number, targetSession: ClassSession) => {
      const oldSession = state.currentSessions[courseId];
      const course = COURSES[courseId];
      const logText = `Kamu pindah kelas ${course.name} dari Kelas ${oldSession.classCode} (${formatSlot(
        oldSession
      )}) ke Kelas ${targetSession.classCode} (${formatSlot(
        targetSession
      )}). Presensi dicatat pada sesi baru.`;

      const newLog: LogEntry = {
        id: `usr-${Date.now()}`,
        at: Date.now(),
        txt: logText,
        isSystem: false,
        isRead: true,
      };

      updateAndSave((prev) => ({
        ...prev,
        currentSessions: {
          ...prev.currentSessions,
          [courseId]: targetSession,
        },
        logs: [...prev.logs, newLog],
      }));

      showToast('Sesi kuliah berhasil dipindahkan.');
    },
    [state.currentSessions, updateAndSave, showToast]
  );

  // Reset data demo ke awal
  const resetDemo = useCallback(async () => {
    await storageService.clearState();
    setState(getInitialState());
    setActiveTab('jadwal');
    showToast('Data demo berhasil direset ke jadwal awal.');
  }, [showToast]);

  return {
    state,
    isLoading,
    activeTab,
    setActiveTab,
    conflicts,
    pendingNotifications,
    isScenarioTriggered,
    toastMessage,
    showToast,
    hideToast,
    acknowledgeNotifications,
    simulateBAAChange,
    moveToSession,
    resetDemo,
  };
};
