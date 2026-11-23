# AGENTS.md — Panduan Agen AI

Proyek: **Penanganan Perubahan & Bentrok Jadwal Kuliah — Portal Akademik UMM** (eksperimen **PRD + UX Skill / UX Documentation Suite**).

## Sumber kebenaran (urutan)
1. `README.md` — PRD (scope fungsional, business rules, acceptance criteria, dan instruksi deployment).
2. Dokumen Spesifikasi UX & Desain:
   - `UX-SPEC.md` — Keputusan UX: persona Suryo, journey, Moment of Truth, IA, spesifikasi halaman (Jadwal, Riwayat, Modal Konfirmasi), user flow, responsif.
   - `DESIGN-SYS.md` — Design system: konsep modern minimalist portal, token warna, tipografi, layout, komponen, dan aksesibilitas.
   - `INTERACTION.md` — Interaction specification: perilaku realtime perubahan jadwal, deteksi bentrok, alur pindah sesi (≤ 3 langkah), feedback, edge cases.
   - `ACCEPTANCE.md` — Acceptance criteria lengkap (AC-001 s.d. AC-028).
3. `CHANGELOG.md` — Riwayat keputusan, perubahan, dan matriks status pengujian kriteria penerimaan.

Jika PRD dan dokumen UX berbeda, PRD menang untuk scope fungsional dan dokumen UX menang untuk detail tampilan, teks, serta interaksi. Catat selisihnya di `CHANGELOG.md`.

## Alur kerja
1. **Analisis:** pelajari seluruh dokumen spesifikasi (PRD dan UX suite), rangkum pemahaman dan dependensi.
2. **Rencana:** terapkan stack modern berbasis **React Native (TypeScript) + Expo** dengan integrasi cloud database **Supabase Realtime (WebSocket)**.
3. **Implementasi:** bangun fitur sesuai FR-01 s.d. FR-07 dengan `UX-SPEC.md`, `DESIGN-SYS.md`, dan `INTERACTION.md` sebagai acuan tampilan, microcopy, dan interaksi.
4. **Validasi:** uji setiap kriteria pada `ACCEPTANCE.md` (AC-001 s.d. AC-028) dan kriteria PRD; catat status Pass/Fail/Blocked/Not Tested hanya berdasarkan bukti pengujian nyata.
5. **Laporan:** ringkas hasil implementasi, perubahan arsitektur, dan perbarui `CHANGELOG.md`.

## Aturan wajib
- Jangan menambah fitur di luar scope PRD (login/SSO kampus, persetujuan dosen).
- Data simulasi/demo harus diberi penanda jelas di antarmuka; jangan menyajikannya sebagai data resmi kampus.
- Teks antarmuka memakai Bahasa Indonesia sesuai microcopy pada spesifikasi UX; sebut mata kuliah, jam, dan ruang secara spesifik.
- Bentrok selalu memakai warna **dan** label teks; format waktu seragam di semua bagian (`08.40–10.20`).
- Dialog konfirmasi wajib muncul sebelum perpindahan sesi disimpan (error prevention & kepastian presensi).
- Aturan presensi adalah asumsi yang harus tetap ditandai *(asumsi, konfirmasi BAA)*.
- Setiap perubahan dicatat di `CHANGELOG.md` dengan tanggal dan alasan.

## Definisi selesai
Seluruh acceptance criteria pada `ACCEPTANCE.md` (AC-001 s.d. AC-028) berstatus **Pass**, aplikasi React Native berjalan tanpa error di web dan mobile, dan `CHANGELOG.md` mutakhir.
