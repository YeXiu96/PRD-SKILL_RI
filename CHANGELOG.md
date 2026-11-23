# Change Log — Penanganan Perubahan & Bentrok Jadwal Kuliah (Portal Akademik UMM)
**Eksperimen:** A (PRD saja; spesifikasi di `PRD.md`). **Platform AI:** Claude

## v1.1.0 — 2026-11-23 (Implementasi Mobile Native / React Native)
### Ditambahkan
- Struktur arsitektur modular React Native (TypeScript) berbasis *Separation of Concerns* (SoC) dan *Clean Architecture*.
- Definisi tipe data kuat (*strongly typed*) pada `src/types/schedule.ts`.
- Logika bisnis terisolasi (deteksi irisan jam bentrok & format waktu seragam FR-01/FR-03) pada `src/utils/scheduleLogic.ts`.
- Layanan penyimpanan persisten asynchronous (`AsyncStorage`) pada `src/services/storage.ts` (FR-07).
- *State management* terenkapsulasi melalui custom hook `src/hooks/useSchedule.ts`.
- Komponen antarmuka modular: `Header`, `DemoBanner`, `ConflictAlert`, `ScheduleCard`, `Toast`.
- Layar interaktif: `ScheduleScreen` dan `HistoryScreen` (FR-02, FR-04, FR-05, FR-06).

## v1.0.0 — 2026-11-22 (iterasi pertama, 0 revisi)
### Ditambahkan
- Jadwal kuliah dengan format waktu seragam (FR-01).
- Notifikasi dan riwayat perubahan jadwal (FR-02).
- Deteksi bentrok: warna merah + label "BENTROK" + nama mata kuliah yang bertabrakan (FR-03).
- Daftar sesi pengganti kelas paralel dosen yang sama; sesi yang menimbulkan bentrok baru dinonaktifkan (FR-04).
- Pindah sesi dengan pembaruan langsung dan pencatatan riwayat (FR-05).
- Banner perubahan: mata kuliah terdampak, bentrok, langkah lanjutan, status presensi (FR-06).
- Persistensi localStorage (FR-07); tampilan responsif.
### Keputusan & asumsi
- HTML/CSS/JS tunggal tanpa dependensi; data contoh + tombol "Simulasikan perubahan" (mode demo, diberi penanda di UI).
- Presensi mengikuti sesi yang dipilih (asumsi, perlu dikonfirmasi BAA).
### Known issues / batasan
- Belum terhubung ke SIAKAD; tidak ada login; notifikasi hanya di dalam aplikasi.
- Hanya satu skenario simulasi perubahan jadwal.
### Status Acceptance Criteria
Belum diuji di browser: semua **Not Tested**.
