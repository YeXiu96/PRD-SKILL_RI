# Change Log — Penanganan Perubahan & Bentrok Jadwal Kuliah (Portal Akademik UMM)
**Eksperimen:** A (PRD saja; spesifikasi di `PRD.md`). **Platform AI:** Claude

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
