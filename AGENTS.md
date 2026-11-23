# AGENTS.md — Panduan Agen AI

Proyek: **Penanganan Perubahan & Bentrok Jadwal Kuliah — Portal Akademik UMM** (eksperimen **PRD + UX Skill**).

## Sumber kebenaran (urutan)
1. `README.md` — PRD (scope fungsional, business rules, acceptance criteria).
2. `UX-SKILL.md` — keputusan UX: persona, journey, requirement, UX spec, design system, interaction spec, UX acceptance criteria.
3. `CHANGELOG.md` — riwayat keputusan dan perubahan.

Jika PRD dan skill berbeda, PRD menang untuk scope fungsional dan skill menang untuk detail UX. Catat selisihnya di `CHANGELOG.md`; jangan memutuskan diam-diam.

## Alur kerja
1. **Analisis:** baca ketiga dokumen, rangkum pemahaman, daftar asumsi dan konflik.
2. **Rencana:** tetapkan stack sederhana dan urutan implementasi; catat keputusan.
3. **Implementasi:** bangun fitur sesuai FR-01 s.d. FR-07 dengan UX-SKILL.md sebagai acuan tampilan, teks, dan interaksi.
4. **Validasi:** periksa setiap acceptance criteria PRD dan UXAC; beri status Pass/Fail/Blocked/Not Tested **hanya berdasarkan bukti pengujian**.
5. **Laporan:** ringkas hasil, perubahan, masalah, dan batasan; perbarui `CHANGELOG.md`.

## Aturan wajib
- Jangan menambah fitur di luar scope PRD (integrasi SIAKAD, login, push di luar aplikasi, persetujuan dosen).
- Data contoh/demo harus diberi penanda jelas di antarmuka; jangan menyajikannya sebagai data resmi.
- Jangan mengklaim notifikasi "terkirim" kecuali benar-benar ditampilkan atau dikonfirmasi layanan.
- Teks antarmuka memakai Bahasa Indonesia sesuai microcopy di UX-SKILL.md; sebut mata kuliah, jam, dan ruang secara spesifik.
- Bentrok selalu memakai warna **dan** label teks; format waktu seragam di semua halaman.
- Jangan mengarang kebijakan kampus. Aturan presensi adalah asumsi yang harus tetap ditandai sampai dikonfirmasi BAA.
- Setiap perubahan, revisi, dan perbaikan dicatat di `CHANGELOG.md` dengan tanggal dan alasan.
- Jika ada keputusan yang membutuhkan pemilik proyek, ajukan pertanyaan singkat dan spesifik sebelum melanjutkan.

## Definisi selesai
Seluruh acceptance criteria PRD dan UXAC berstatus Pass atau memiliki alasan Blocked/Not Tested yang dicatat, dan `CHANGELOG.md` mutakhir.
