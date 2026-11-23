import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ClassSession, LogEntry, DayOfWeek } from '../types/schedule';

export const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://ywwbkuositwvtzjmwgwm.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3d2JrdW9zaXR3dnR6am13Z3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0NTc4MzcsImV4cCI6MjExMTAzMzgzN30.VqTwI4Ct1KxkvScdghxSqQhcbcjag6fW3JsJaJL4Byw';

let client: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!client) {
    try {
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        });
      }
    } catch (err) {
      console.warn('Gagal menginisialisasi klien Supabase:', err);
    }
  }
  return client;
};

export const supabase = getSupabase();

export const supabaseService = {
  /** Mengambil seluruh jadwal dari tabel portal_schedule */
  async fetchSchedule(): Promise<Record<number, ClassSession> | null> {
    try {
      const client = getSupabase();
      if (!client) return null;

      const { data, error } = await client.from('portal_schedule').select('*');
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
      console.warn('Supabase offline atau tabel belum dibuat, menggunakan data lokal:', e);
      return null;
    }
  },

  /** Mengambil riwayat log dari tabel portal_logs */
  async fetchLogs(): Promise<LogEntry[] | null> {
    try {
      const client = getSupabase();
      if (!client) return null;

      const { data, error } = await client
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
      return null;
    }
  },

  /** Memperbarui sesi jadwal mata kuliah tertentu */
  async updateSession(courseId: number, session: ClassSession): Promise<boolean> {
    try {
      const client = getSupabase();
      if (!client) return false;

      const { error } = await client
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
      return false;
    }
  },

  /** Menambahkan catatan log riwayat baru */
  async addLog(log: LogEntry): Promise<boolean> {
    try {
      const client = getSupabase();
      if (!client) return false;

      const { error } = await client.from('portal_logs').insert({
        id: log.id,
        txt: log.txt,
        is_system: log.isSystem ?? false,
        is_scenario: log.isScenario ?? false,
        is_read: log.isRead ?? false,
        at: log.at,
      });

      return !error;
    } catch (e) {
      return false;
    }
  },
};
