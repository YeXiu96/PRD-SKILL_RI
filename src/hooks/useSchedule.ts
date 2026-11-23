import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { ScheduleState, LogEntry, ClassSession, DayOfWeek } from '../types/schedule';
import { COURSES, INITIAL_SESSIONS } from '../constants/courses';
import { detectConflicts, formatSlot, isOverlapping } from '../utils/scheduleLogic';
import { storageService } from '../services/storage';
import { getSupabase, supabaseService } from '../services/supabase';

const getInitialState = (): ScheduleState => ({
  currentSessions: { ...INITIAL_SESSIONS },
  logs: [],
});

export const useSchedule = () => {
  // Render instan dengan initial state agar tidak ada blank screen
  const [state, setState] = useState<ScheduleState>(getInitialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'jadwal' | 'riwayat'>('jadwal');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stateRef = useRef(state);
  stateRef.current = state;

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const hideToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  // Simpan setiap ada perubahan state (FR-07)
  const updateAndSave = useCallback((updater: (prev: ScheduleState) => ScheduleState) => {
    setState((prev) => {
      const next = updater(prev);
      storageService.saveState(next);
      return next;
    });
  }, []);

  // 1. Pemuatan Data Latar Belakang (Optimistic: Local Storage & Supabase Sync)
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        // Coba muat dari penyimpanan lokal dulu untuk kecepatan
        const localSaved = await storageService.loadState();
        if (isMounted && localSaved) {
          setState(localSaved);
        }

        // Kemudian sinkronkan dengan Supabase di background
        const remoteSessions = await supabaseService.fetchSchedule();
        const remoteLogs = await supabaseService.fetchLogs();

        if (isMounted && remoteSessions && Object.keys(remoteSessions).length > 0) {
          const remoteState: ScheduleState = {
            currentSessions: remoteSessions,
            logs: remoteLogs || localSaved?.logs || [],
          };
          setState(remoteState);
          storageService.saveState(remoteState);
        }
      } catch (e) {
        console.warn('Latar belakang sinkronisasi Supabase:', e);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Langganan Supabase Realtime (WebSocket Live Update tanpa reload!)
  useEffect(() => {
    const client = getSupabase();
    if (!client) return;

    let channel: any = null;

    try {
      channel = client
        .channel('portal-realtime-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'portal_schedule' },
          (payload) => {
            if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
              const row: any = payload.new;
              if (!row || !row.course_id) return;

              const courseId = Number(row.course_id);
              const newSession: ClassSession = {
                classCode: row.class_code,
                day: row.day as DayOfWeek,
                startTime: row.start_time,
                endTime: row.end_time,
                room: row.room,
              };

              const prevSession = stateRef.current.currentSessions[courseId];
              const isDifferent =
                !prevSession ||
                prevSession.day !== newSession.day ||
                prevSession.startTime !== newSession.startTime ||
                prevSession.classCode !== newSession.classCode;

              if (isDifferent) {
                const courseName = COURSES[courseId]?.name || `Mata Kuliah #${courseId}`;
                const changeText = `Jadwal ${courseName} dipindahkan oleh sistem ke ${formatSlot(
                  newSession
                )}.`;

                const now = Date.now();
                const systemLog: LogEntry = {
                  id: `realtime-sys-${now}`,
                  at: now,
                  txt: changeText,
                  isSystem: true,
                  isRead: false,
                };

                updateAndSave((prev) => ({
                  ...prev,
                  currentSessions: {
                    ...prev.currentSessions,
                    [courseId]: newSession,
                  },
                  logs: [...prev.logs, systemLog],
                }));

                showToast(`⚡ Realtime Update: ${changeText}`);
              }
            }
          }
        )
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'portal_logs' },
          (payload) => {
            const row: any = payload.new;
            if (!row || !row.id) return;

            const newLog: LogEntry = {
              id: row.id,
              txt: row.txt,
              isSystem: row.is_system,
              isScenario: row.is_scenario,
              isRead: row.is_read,
              at: Number(row.at),
            };

            updateAndSave((prev) => {
              if (prev.logs.some((l) => l.id === newLog.id)) return prev;
              return {
                ...prev,
                logs: [...prev.logs, newLog],
              };
            });
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Realtime channel subscribe error:', err);
    }

    return () => {
      if (channel && client) {
        client.removeChannel(channel);
      }
    };
  }, [updateAndSave, showToast]);

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

  // Simulasi pemindahan sepihak oleh BAA (Sync ke Supabase & Local)
  const simulateBAAChange = useCallback(async () => {
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

    const nextSessions: Record<number, ClassSession> = {
      ...state.currentSessions,
      [courseId]: newSession,
    };

    const collidingIds = Object.keys(nextSessions)
      .map(Number)
      .filter((j) => j !== courseId && isOverlapping(newSession, nextSessions[j]));

    if (collidingIds.length > 0) {
      const collidedNames = collidingIds.map((id) => COURSES[id]?.name).join(', ');
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

    // Sinkronisasi ke Supabase di cloud
    await supabaseService.updateSession(courseId, newSession);
    for (const log of newLogs) {
      await supabaseService.addLog(log);
    }
  }, [state.currentSessions, updateAndSave, showToast]);

  // Pindah ke sesi kelas paralel dosen sama (FR-04 & FR-05)
  const moveToSession = useCallback(
    async (courseId: number, targetSession: ClassSession) => {
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

      // Simpan ke Supabase di cloud
      await supabaseService.updateSession(courseId, targetSession);
      await supabaseService.addLog(newLog);
    },
    [state.currentSessions, updateAndSave, showToast]
  );

  // Reset data demo ke awal
  const resetDemo = useCallback(async () => {
    await storageService.clearState();
    setState(getInitialState());
    setActiveTab('jadwal');
    showToast('Data demo berhasil direset ke jadwal awal.');

    // Kembalikan semua ke INITIAL_SESSIONS di Supabase
    for (const id of [1, 2, 3, 4, 5]) {
      await supabaseService.updateSession(id, INITIAL_SESSIONS[id]);
    }
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
