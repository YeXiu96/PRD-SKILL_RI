# Change Log — PRD + UX Skill (Portal Akademik UMM: Jadwal & Bentrok)

Eksperimen: **PRD Only + UX Skill (UX Documentation Suite)**.  
Repositori GitHub: [https://github.com/YeXiu96/PRD-SKILL_RI](https://github.com/YeXiu96/PRD-SKILL_RI)  
Live Deployment (Vercel): [https://portalakademik.vercel.app/](https://portalakademik.vercel.app/)  
Metrik evaluasi: kelengkapan fitur, kesesuaian UX, konsistensi desain, hasil pengujian, jumlah revisi, waktu pengerjaan.

---

## v1.0.0 — 2026-11-24 (Implementasi React Native, Supabase Realtime, & Validasi AC-001 s.d. AC-028)

### Ditambahkan & Diimplementasikan
- **Aplikasi Mobile & Web React Native (TypeScript)** berbasis Expo dengan arsitektur modular (*Separation of Concerns* & *Clean Architecture*):
  - `App.tsx`: Root Component, Tab Navigasi, dan status bar responsif.
  - `src/types/schedule.ts`: model data kontrak kuat (*strongly typed*) untuk `Course`, `ClassSession`, `LogEntry`, `ConflictMap`.
  - `src/constants/`: master katalog mata kuliah, sesi paralel (`courses.ts`), dan token warna design system (`theme.ts`) dengan kontras teks WCAG ≥ 4,5:1 sesuai `DESIGN-SYS.md`.
  - `src/utils/scheduleLogic.ts`: logika murni deteksi irisan bentrok (FR-03, AC-008, AC-009) dan format waktu seragam (FR-01, AC-002).
  - `src/services/storage.ts`: persistensi data lokal terabstraksi (`AsyncStorage` dengan fallback web storage) (FR-07, AC-022).
  - `src/hooks/useSchedule.ts`: *state management* reaktif untuk simulasi BAA, pindah sesi kelas, dan notifikasi (FR-02, FR-04, FR-05).
  - `src/components/`: `Header`, `DemoBanner`, `ConflictAlert`, `ScheduleCard`, `ConfirmationModal`, `Toast`.
  - `src/screens/`: `ScheduleScreen` (layar jadwal) dan `HistoryScreen` (layar riwayat).
- **Backend Cloud & Realtime WebSocket (Supabase):**
  - Skema database PostgreSQL di `supabase_schema.sql` (`portal_schedule` dan `portal_logs`).
  - Integrasi **Supabase Realtime (WebSocket)** pada `src/services/supabase.ts` dan `src/hooks/useSchedule.ts`.
  - Dukungan pergeseran jadwal live dari admin BAA via cloud database secara langsung tanpa tombol di HP mahasiswa.
  - Konfigurasi variabel lingkungan aman via `.env` (`EXPO_PUBLIC_SUPABASE_URL` dan `EXPO_PUBLIC_SUPABASE_ANON_KEY`).
  - *Optimistic Local Rendering* dengan `react-native-url-polyfill` untuk menjamin performa instan tanpa blank screen.
- **Komponen & Microcopy Sesuai Dokumen UX:**
  - **Modal Dialog Konfirmasi (AC-015, AC-016):** modal konfirmasi dengan microcopy presensi sebelum perpindahan jadwal disimpan.
  - **Status Ganda:** warna merah muda (`#FEE2E2`) + border merah (`#DC2626`) + teks label `⚠ BENTROK dengan {matkul}` (AC-010, AC-023).
  - **Sesi Pengganti:** panel in-place pada kartu yang bentrok; sesi yang menimbulkan bentrok baru otomatis dinonaktifkan (disabled) dengan alasan jelas (AC-012 s.d. AC-014).
  - **Tombol Touch Target:** tinggi minimal 44 px untuk kenyamanan sentuhan mobile (AC-026).

### Keputusan & Asumsi
- **Platform Stack:** React Native (Expo) TypeScript, mendukung Android, iOS, dan Web browser secara cross-platform.
- **Aturan Presensi:** Presensi otomatis tercatat pada sesi baru yang dipilih mahasiswa (asumsi, perlu dikonfirmasi BAA).
- **Mode Eksekusi:** Mendukung simulasi live dari Supabase Cloud (event-driven) maupun mode mandiri dengan tombol demo dan reset.

---

### Hasil Validasi Kriteria Penerimaan (ACCEPTANCE.md — AC-001 s.d. AC-028)

| ID | Kriteria Penerimaan | Prioritas | Status | Bukti / Catatan Pengujian |
|---|---|---|---|---|
| **AC-001** | Menampilkan seluruh jadwal terurut hari lalu jam | Must Have | **Pass** | `sortCourseIds` mengurutkan Senin–Jumat dan jam mulai; seluruh kolom tampil lengkap |
| **AC-002** | Format waktu seragam (08.40–10.20) | Must Have | **Pass** | `formatTime` menstandarkan format waktu rentang jam di semua komponen |
| **AC-003** | Notifikasi perubahan jadwal (lama → baru) | Must Have | **Pass** | Perubahan memicu notifikasi toast, badge unread pada bell bertambah |
| **AC-004** | Riwayat perubahan lengkap terurut terbaru di atas | Must Have | **Pass** | Tab Riwayat menampilkan waktu, pelaku, dan jadwal lama ke baru secara kronologis terbalik |
| **AC-005** | Tidak ada duplikasi notifikasi | Must Have | **Pass** | Satu aksi pergeseran hanya menghasilkan satu entri riwayat dan satu notifikasi |
| **AC-006** | Status notifikasi jujur sesuai tampilan | Must Have | **Pass** | Notifikasi hanya tercatat setelah benar-benar dirender pada antarmuka |
| **AC-007** | Tandai sudah membaca pada banner perubahan | Should Have | **Pass** | Tombol "Saya sudah membaca" menghilangkan badge belum dibaca pada banner dan bell |
| **AC-008** | Deteksi bentrok irisan jam pada hari sama | Must Have | **Pass** | Algoritma `isOverlapping` mendeteksi irisan waktu secara presisi |
| **AC-009** | Tidak ada false positive (jam selesai = jam mulai) | Must Have | **Pass** | Logika `start < end && start2 < end1` memastikan jam yang bersentuhan pas tidak bentrok |
| **AC-010** | Penanda visual bentrok: merah + label teks | Must Have | **Pass** | Baris berlatar `#FEE2E2`, border `#DC2626`, dan badge `⚠ BENTROK dengan {matkul}` |
| **AC-011** | Bentrok hilang setelah pindah sesi | Must Have | **Pass** | Memilih sesi aman langsung menghapus status bentrok seketika |
| **AC-012** | Panel sesi pengganti tampil di bawah baris bentrok | Must Have | **Pass** | Panel alternatif terbuka in-place di bawah mata kuliah yang bentrok |
| **AC-013** | Hanya kelas paralel dari mata kuliah & dosen sama | Must Have | **Pass** | Mengambil kelas paralel dari dosen yang sama dan mengecualikan kelas yang sedang diambil |
| **AC-014** | Nonaktifkan opsi yang menimbulkan bentrok baru | Must Have | **Pass** | Tombol disabled dan menampilkan keterangan `⚠ Bentrok dengan {matkul}` |
| **AC-015** | Pindah sesi dengan dialog konfirmasi | Must Have | **Pass** | Dialog konfirmasi muncul dengan detail jam, ruang, dan penegasan presensi |
| **AC-016** | Pembatalan pada dialog konfirmasi | Must Have | **Pass** | Menekan "Batal" atau tombol Esc menutup modal tanpa mengubah jadwal |
| **AC-017** | Rollback saat kegagalan simpan | Must Have | **Pass** | Error boundary mempertahankan jadwal sebelumnya dan memunculkan toast kegagalan |
| **AC-018** | Alur pindah sesi maksimal 3 langkah | Must Have | **Pass** | 3 langkah: (1) Lihat baris bentrok $\rightarrow$ (2) Pilih sesi $\rightarrow$ (3) Konfirmasi di modal |
| **AC-019** | Pencegahan klik ganda (No Double Submission) | Must Have | **Pass** | Modal langsung menutup saat konfirmasi diproses mencegah duplikasi entri |
| **AC-020** | Banner spesifik menyebut nama mata kuliah | Must Have | **Pass** | Banner `ConflictAlert` memuat nama mata kuliah terdampak, bukan pesan ambigu |
| **AC-021** | Pernyataan presensi pada banner & modal | Must Have | **Pass** | Teks kepastian presensi tercantum jelas di banner peringatan dan dialog konfirmasi |
| **AC-022** | Persistensi data setelah muat ulang | Must Have | **Pass** | Data tersimpan di `AsyncStorage` / Supabase Cloud dan pulih saat reload |
| **AC-023** | Status tidak hanya mengandalkan warna | Must Have | **Pass** | Menggunakan teks eksplisit `✓ Aman` dan `⚠ BENTROK` dengan ikon pendukung |
| **AC-024** | Kesesuaian design tokens (warna, font, spasi) | Must Have | **Pass** | Implementasi `src/constants/theme.ts` sesuai spesifikasi `DESIGN-SYS.md` |
| **AC-025** | Kontras teks ≥ 4,5:1 dan aksesibilitas keyboard | Must Have | **Pass** | Kontras warna memenuhi rasio WCAG dan elemen interaktif memiliki accessibility roles |
| **AC-026** | Tata letak responsif desktop, tablet, dan smartphone | Must Have | **Pass** | Tampilan mobile menjadi kartu bertumpuk dengan target sentuh tombol min 44px |
| **AC-027** | Keadaan kosong dan error tertangani | Must Have | **Pass** | Empty state riwayat dan pesan feedback sesuai microcopy UX |
| **AC-028** | Data contoh/simulasi diberi penanda jelas | Must Have | **Pass** | Banner kuning menegaskan status "Mode demo / simulasi", bukan data resmi SIAKAD |

---

## v0.2.0 — 2026-11-23
### Ditambahkan
- `UX-SPEC.md`: spesifikasi UX (persona Suryo, journey, Moment of Truth, sitemap, spesifikasi halaman, user flow, responsive).
- `DESIGN-SYS.md`: design system (token warna, tipografi, layout, komponen, aksesibilitas).
- `INTERACTION.md`: spesifikasi interaksi (perubahan jadwal, deteksi bentrok, alur pindah sesi, feedback).
- `ACCEPTANCE.md`: 28 kriteria penerimaan (AC-001 s.d. AC-028).

## v0.1.0 — 2026-11-23
### Ditambahkan
- `README.md`: PRD fitur Penanganan Perubahan & Bentrok Jadwal Kuliah (persona, 4 user need, 7 FR, business rules, 5 user story, scope, asumsi, acceptance criteria).
