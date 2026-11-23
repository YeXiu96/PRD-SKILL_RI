import { createClient } from '@supabase/supabase-js';
import { ClassSession, LogEntry, DayOfWeek } from '../types/schedule';

export const SUPABASE_URL = 'https://ywwbkuositwvtzjmwgwm.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3d2JrdW9zaXR3dnR6am13Z3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0NTc4MzcsImV4cCI6MjExMTAzMzgzN30.VqTwI4Ct1KxkvScdghxSqQhcbcjag6fW3JsJaJL4Byw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const supabaseService = {
  /** Mengambil seluruh jadwal dari tabel portal_schedule */
  async fetchSchedule(): Promise<Record<number, ClassSession> | null> {
    try {
      const { data, error } = await supabase.from('portal_schedule').select('*');
      if (error || !data || data.length === 0) return null;

      const sessions: Record<number, ClassSession> = {};
      data.forEach((row: any) => {
        sessions[row.course_id] = {
          classCode: row.class_code,
          day: row.day as DayOfWeek,
          startTime: row.start_time,
          endTime: row.end_time,
          room: row.room,
        };
      });
      return sessions;
    } catch (e) {
      console.warn('Gagal memuat jadwal dari Supabase:', e);
      return null;
    }
  },

  /** Mengambil riwayat log dari tabel portal_logs */
  async fetchLogs(): Promise<LogEntry[] | null> {
    try {
      const { data, error } = await supabase
        .from('portal_logs')
        .select('*')
        .order('at', { ascending: true });

      if (error || !data) return null;

      return data.map((row: any) => ({
        id: row.id,
        txt: row.txt,
        isSystem: row.is_system,
        isScenario: row.is_scenario,
        isRead: row.is_read,
        at: Number(row.at),
      }));
    } catch (e) {
      console.warn('Gagal memuat log dari Supabase:', e);
      return null;
    }
  },

  /** Memperbarui sesi jadwal mata kuliah tertentu */
  async updateSession(courseId: number, session: ClassSession): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('portal_schedule')
        .update({
          class_code: session.classCode,
          day: session.day,
          start_time: session.startTime,
          end_time: session.endTime,
          room: session.room,
          updated_at: new Date().toISOString(),
        })
        .eq('course_id', courseId);

      return !error;
    } catch (e) {
      console.warn('Gagal mengupdate sesi ke Supabase:', e);
      return false;
    }
  },

  /** Menambahkan catatan log riwayat baru */
  async addLog(log: LogEntry): Promise<boolean> {
    try {
      const { error } = await supabase.from('portal_logs').insert({
        id: log.id,
        txt: log.txt,
        is_system: log.isSystem ?? false,
        is_scenario: log.isScenario ?? false,
        is_read: log.isRead ?? false,
        at: log.at,
      });

      return !error;
    } catch (e) {
      console.warn('Gagal menambah log ke Supabase:', e);
      return false;
    }
  },
};
