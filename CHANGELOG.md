# Change Log — PRD + UX Skill (Portal Akademik UMM: Jadwal & Bentrok)

Eksperimen: **PRD Only + UX Skill**. Pembanding: repo PRD Only (PRD yang sama).  
Metrik evaluasi: kelengkapan fitur, kesesuaian UX, konsistensi desain, hasil pengujian, jumlah revisi, waktu pengerjaan.

## v1.0.0 — 2026-11-24 (Implementasi React Native & Validasi Penuh Acceptance Criteria)

### Ditambahkan
- **Aplikasi Mobile & Web Berbasis React Native (TypeScript)** menggunakan Expo dengan arsitektur modular (*Separation of Concerns* & *Clean Architecture*).
- **Struktur Direktori & Klasifikasi Kode:**
  - `src/types/schedule.ts`: model data kontrak kuat (*strongly typed*) untuk `Course`, `ClassSession`, `LogEntry`, `ConflictMap`.
  - `src/constants/`: master katalog mata kuliah, sesi paralel (`courses.ts`), dan token warna design system (`theme.ts`) dengan kontras teks WCAG ≥ 4,5:1.
  - `src/utils/scheduleLogic.ts`: logika murni deteksi irisan bentrok (FR-03) dan format waktu seragam (FR-01).
  - `src/services/storage.ts`: persistensi data lokal terabstraksi (`AsyncStorage` dengan fallback web storage) (FR-07).
  - `src/hooks/useSchedule.ts`: *state management* terisolasi untuk simulasi BAA, pindah sesi kelas, dan notifikasi (FR-02, FR-04, FR-05).
  - `src/components/`: `Header`, `DemoBanner`, `ConflictAlert`, `ScheduleCard`, `ConfirmationModal`, `Toast`.
  - `src/screens/`: `ScheduleScreen` (layar jadwal) dan `HistoryScreen` (layar riwayat).
- **Dialog Konfirmasi Pindah Sesi (UXAC-07, UXAC-08):** modal konfirmasi dengan klausul presensi sebelum perpindahan jadwal disimpan.
- **Microcopy & Aksesibilitas Sesuai UX-SKILL.md:**
  - Status visual ganda (warna merah muda/border merah + teks penanda `⚠ BENTROK dengan {matkul}`).
  - Tombol aksi dengan touch target minimal 44 px.
  - Banner peringatan dan riwayat perubahan dengan nada informatif dan tidak ambigu.

### Keputusan & Asumsi
- **Stack Teknologi:** Menggunakan **React Native (Expo) dengan TypeScript** untuk mendukung aplikasi mobile native (Android & iOS) sekaligus responsif di web browser.
- **Aturan Presensi:** Presensi mengikuti sesi kelas paralel yang dipilih mahasiswa (asumsi, perlu dikonfirmasi BAA).
- **Mode Demo:** Data jadwal adalah simulasi berpenanda jelas (*Mode Demo Banner*) yang dilengkapi tombol simulasi aksi BAA dan tombol reset data awal.

### Hasil Pengujian Acceptance Criteria PRD (README.md)
| ID | Kriteria Penerimaan PRD | Status | Bukti / Catatan Pengujian |
|---|---|---|---|
| AC-1 | Perubahan jadwal menghasilkan notifikasi dan entri riwayat | **Pass** | Simulasi perubahan BAA memicu toast notifikasi, unread badge lonceng, dan entri riwayat dengan jam lama → baru |
| AC-2 | Jam beririsan ditandai merah dengan label "BENTROK" | **Pass** | Algoritma `detectConflicts` mendeteksi tabrakan waktu; baris berlatar merah muda, border merah, dan badge teks `⚠ BENTROK dengan {matkul}` |
| AC-3 | Baris bentrok menampilkan sesi pengganti; sesi bentrok baru dinonaktifkan | **Pass** | Panel alternatif menampilkan kelas paralel dosen sama; sesi yang beririsan dengan jadwal lain otomatis dinonaktifkan (disabled) disertai alasan |
| AC-4 | Memilih sesi pengganti menghilangkan bentrok dan mencatat riwayat | **Pass** | Pemilihan sesi pengganti via dialog konfirmasi berhasil menghapus status bentrok dan menambah riwayat perpindahan |
| AC-5 | Banner menyebut mata kuliah terdampak dan status presensi | **Pass** | Banner `ConflictAlert` mencantumkan spesifik matkul terdampak, lawan bentrok, dan penegasan presensi |
| AC-6 | Data tetap ada setelah dimuat ulang | **Pass** | Persistensi `AsyncStorage` / local storage memulihkan status jadwal dan riwayat saat aplikasi dimuat ulang |
| AC-7 | Tampilan dapat digunakan di desktop dan smartphone | **Pass** | Tata letak responsif dengan flexbox, card bertumpuk pada mobile (<640px), dan tombol sentuh ≥ 44px |

### Hasil Pengujian UX Acceptance Criteria (UX-SKILL.md)
| ID | Kriteria UXAC | Status | Bukti Pengujian |
|---|---|---|---|
| UXAC-01 | Notifikasi & entri riwayat mencakup jam lama dan baru | **Pass** | Riwayat mencatat string rentang jam lama dan baru secara eksplisit |
| UXAC-02 | Banner menyebut nama mata kuliah terdampak spesifik | **Pass** | Menampilkan nama matkul terdampak (mis. Pemrograman Web) |
| UXAC-03 | Bentrok ditandai merah + label teks + nama lawan | **Pass** | Warna latar `#FEE2E2`, border `#DC2626`, label `⚠ BENTROK dengan ...` |
| UXAC-04 | Format waktu seragam (08.40–10.20) di semua bagian | **Pass** | Fungsi `formatTime` menstandarkan format waktu di seluruh komponen |
| UXAC-05 | Sesi pengganti di baris yang sama (in-place) | **Pass** | Panel sesi paralel tampil langsung di dalam kartu mata kuliah yang bentrok |
| UXAC-06 | Sesi bentrok baru dinonaktifkan dengan alasan jelas | **Pass** | Tombol nonaktif jika bentrok dan menampilkan label peringatan bentrok |
| UXAC-07 | Pindah sesi ≤ 3 langkah & ada dialog konfirmasi | **Pass** | Alur: Lihat bentrok → Klik sesi → Dialog Konfirmasi (Batal / Pindah) |
| UXAC-08 | Pernyataan presensi tampil di banner & dialog konfirmasi | **Pass** | Teks kepastian presensi tercantum di banner peringatan dan modal konfirmasi |
| UXAC-09 | Riwayat dapat dibuka ≤ 2 klik dan tersimpan persisten | **Pass** | Tab Riwayat dapat diakses dalam 1 klik dari layar utama |
| UXAC-10 | Status memiliki teks/ikon selain warna; kontras ≥ 4,5:1 | **Pass** | Menggunakan ikon `✓` dan `⚠` serta teks jelas, rasio kontras sesuai tema |
| UXAC-11 | Seluruh aksi dapat diakses kontrol sentuh / keyboard | **Pass** | Aksesibilitas tombol dengan role dan touch target min 44px |
| UXAC-12 | Tampilan nyaman di desktop, tablet, dan smartphone | **Pass** | Responsif penuh pada web desktop dan mobile Android/iOS |
| UXAC-13 | Keadaan kosong, error, dan sukses sesuai microcopy | **Pass** | Teks feedback disesuaikan persis dengan kamus microcopy UX-SKILL.md |
| UXAC-14 | Data contoh/demo diberi penanda jelas | **Pass** | Banner kuning bertanda jelas "Mode demo: data jadwal adalah simulasi..." |

---

## v0.2.0 — 2026-11-23
### Ditambahkan
- `UX-SKILL.md`: UX Skill lengkap (konteks riset WS1–5, persona & empathy map WS6, user journey & Moment of Truth WS7, UX requirements WS8, prinsip UX, UX spec, design system, interaction spec, 14 UX acceptance criteria).
- `AGENTS.md`: panduan agen (sumber kebenaran, alur kerja, aturan wajib, definisi selesai).

## v0.1.0 — 2026-11-23
### Ditambahkan
- `README.md`: PRD fitur Penanganan Perubahan & Bentrok Jadwal Kuliah (persona, 4 user need, 7 functional requirement, business rules, 5 user story, scope, asumsi, acceptance criteria), disusun dari Worksheet 1–8. Isinya sama dengan repo PRD Only agar perbandingan adil.
