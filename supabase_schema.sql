-- ==============================================================================
-- SKEMA DATABASE PORTAL AKADEMIK UMM (SUPABASE REALTIME)
-- Proyek: Penanganan Perubahan & Bentrok Jadwal Kuliah (Rekayasa Interaksi B)
-- ==============================================================================

-- 1. Hapus tabel lama jika ada
DROP TABLE IF EXISTS portal_logs CASCADE;
DROP TABLE IF EXISTS portal_schedule CASCADE;

-- 2. Buat tabel jadwal kuliah mahasiswa
CREATE TABLE portal_schedule (
    course_id INT PRIMARY KEY,
    course_name TEXT NOT NULL,
    lecturer TEXT NOT NULL,
    class_code TEXT NOT NULL,
    day TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    room TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Buat tabel riwayat & log notifikasi
CREATE TABLE portal_logs (
    id TEXT PRIMARY KEY,
    txt TEXT NOT NULL,
    is_system BOOLEAN DEFAULT false,
    is_scenario BOOLEAN DEFAULT false,
    is_read BOOLEAN DEFAULT false,
    at BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Aktifkan Row Level Security (RLS) dan beri izin akses Anon Key (Public)
ALTER TABLE portal_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Akses publik baca portal_schedule" ON portal_schedule FOR SELECT USING (true);
CREATE POLICY "Akses publik tulis portal_schedule" ON portal_schedule FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Akses publik baca portal_logs" ON portal_logs FOR SELECT USING (true);
CREATE POLICY "Akses publik tulis portal_logs" ON portal_logs FOR ALL USING (true) WITH CHECK (true);

-- 5. Masukkan Data Jadwal Awal Mahasiswa (Suryo Wisodono Prayogo)
INSERT INTO portal_schedule (course_id, course_name, lecturer, class_code, day, start_time, end_time, room) VALUES
(1, 'Basis Data', 'Dr. Andi Pratama', 'A', 'Rabu', '08:40', '10:20', 'GKB 1 R.201'),
(2, 'Pemrograman Web', 'Budi Santoso, M.Kom.', 'A', 'Senin', '08:40', '10:20', 'GKB 2 R.101'),
(3, 'Rekayasa Perangkat Lunak', 'Siti Rahma, M.T.', 'A', 'Selasa', '08:40', '10:20', 'GKB 3 R.301'),
(4, 'Interaksi Manusia dan Komputer', 'Dr. Hendra Wijaya', 'A', 'Kamis', '13:00', '14:40', 'GKB 1 R.204'),
(5, 'Jaringan Komputer', 'Rina Kusuma, M.Kom.', 'A', 'Jumat', '10:30', '12:10', 'GKB 2 R.201');

-- 6. Daftarkan tabel ke Supabase Realtime Publication (Wajib untuk WebSocket!)
ALTER PUBLICATION supabase_realtime ADD TABLE portal_schedule;
ALTER PUBLICATION supabase_realtime ADD TABLE portal_logs;

-- ==============================================================================
-- QUERY AKSI LIVE BAA (Bisa dijalankan di SQL Editor untuk uji live tanpa pencet tombol di HP!)
-- ==============================================================================
--
-- CONTOH 1: BAA Geser Pemrograman Web ke Rabu (Membuat Bentrok Real-Time di HP)
-- UPDATE portal_schedule 
-- SET day = 'Rabu', start_time = '08:40', end_time = '10:20', room = 'GKB 2 R.101', updated_at = now()
-- WHERE course_id = 2;
--
-- CONTOH 2: Reset kembali ke jadwal normal (Senin)
-- UPDATE portal_schedule 
-- SET day = 'Senin', start_time = '08:40', end_time = '10:20', room = 'GKB 2 R.101', updated_at = now()
-- WHERE course_id = 2;
