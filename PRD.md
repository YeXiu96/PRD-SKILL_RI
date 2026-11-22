# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Fitur: Penanganan Perubahan & Bentrok Jadwal Kuliah — Portal Akademik UMM
**Penyusun:** Raditya Zeliq Amanta | **Versi:** 1.0 | **Status:** Draft | **Sumber:** Worksheet 1–8 (UX Design Hands-on Workbook)

## 1. Latar Belakang
Portal Akademik dapat memindahkan jadwal kuliah mahasiswa secara sepihak setelah KRS dikunci. Perubahan tidak disertai notifikasi, bentrok tampil polos tanpa penanda, kolom Aksi KRS kosong, dan banner peringatan tidak menjelaskan mata kuliah yang terdampak. Mahasiswa mencari sesi pengganti secara manual lewat grup angkatan dan file Excel prodi, serta cemas dianggap alfa.

## 2. Persona
**Suryo Wisodono Prayogo**, 22 tahun, mahasiswa S1 Informatika semester 7. Goal: memastikan jadwal aman dan tidak kehilangan presensi. Pain point: perubahan tak terdeteksi, bentrok tak terlihat, sesi pengganti sulit dicari, format waktu tidak konsisten.

## 3. User Needs (Worksheet 8)
1. Mengetahui segera dan jelas saat jadwal berubah, termasuk mata kuliah yang terdampak.
2. Langsung menyadari jam kuliah yang bertabrakan tanpa menghitung manual.
3. Menemukan sesi pengganti (hari, jam, ruang GKB) dari dosen yang sama di satu tempat.
4. Yakin presensi di sesi pengganti tetap diakui.

## 4. Product Goals & Success Metrics (hipotesis awal)
| Indikator | Target |
|---|---|
| Perubahan jadwal menghasilkan notifikasi dan riwayat | 100% |
| Bentrok terdeteksi dan ditandai | 100% |
| Waktu dari mengetahui bentrok hingga memilih sesi pengganti | ≤ 3 langkah |

## 5. Functional Requirements
- **FR-01 Jadwal Kuliah:** menampilkan jadwal mahasiswa dengan format waktu seragam (rentang jam, mis. 08.40–10.20).
- **FR-02 Notifikasi & Riwayat Perubahan:** setiap perubahan jadwal menghasilkan notifikasi (mata kuliah, jadwal lama, jadwal baru) dan tercatat di riwayat.
- **FR-03 Deteksi Bentrok:** sistem mendeteksi jam yang beririsan pada hari yang sama dan menandai baris dengan warna merah **dan** label teks "BENTROK" beserta mata kuliah yang bertabrakan.
- **FR-04 Sesi Pengganti:** pada baris bentrok, tampil daftar kelas paralel dari mata kuliah yang sama (kelas, hari, jam, ruang). Sesi yang menimbulkan bentrok baru tidak dapat dipilih.
- **FR-05 Pindah Sesi:** mahasiswa dapat memilih sesi pengganti; jadwal, status bentrok, dan riwayat diperbarui seketika.
- **FR-06 Banner Perubahan:** menjelaskan mata kuliah terdampak (jadwal lama → baru), jumlah bentrok, langkah lanjutan, dan kepastian presensi.
- **FR-07 Persistensi:** jadwal, riwayat, dan status dibaca tetap tersimpan setelah halaman dimuat ulang.

## 6. Business Rules
1. Bentrok = dua mata kuliah di hari yang sama dengan jam beririsan.
2. Sesi pengganti hanya dari mata kuliah dan dosen yang sama.
3. Presensi mengikuti sesi yang dipilih mahasiswa (asumsi, perlu dikonfirmasi BAA).
4. Setiap perubahan, oleh sistem maupun mahasiswa, tercatat di riwayat.

## 7. Non-Functional Requirements
Responsif (desktop, tablet, mobile); status tidak hanya dibedakan lewat warna; data tersimpan persisten.

## 8. User Stories
Sebagai mahasiswa aktif pengguna Portal Akademik UMM, saya ingin:
- US-01 menerima notifikasi otomatis saat jadwal berubah, agar segera mengetahuinya.
- US-02 melihat penanda pada mata kuliah yang bentrok, agar langsung sadar tanpa menghitung manual.
- US-03 melihat sesi pengganti dari dosen yang sama di baris yang bentrok, agar tidak mencari lewat grup atau Excel.
- US-04 mendapat penjelasan mata kuliah terdampak pada banner, agar tidak panik.
- US-05 mendapat kepastian presensi di sesi pengganti, agar tidak khawatir dianggap alfa.

## 9. Scope
**In scope:** FR-01 s.d. FR-07. **Out of scope:** integrasi SIAKAD sungguhan, login/autentikasi, push notification di luar aplikasi, persetujuan dosen, perubahan KRS di luar jadwal.

## 10. Asumsi
Mahasiswa sudah login; data jadwal dan kelas paralel tersedia; untuk demonstrasi dipakai data contoh dan tombol simulasi perubahan jadwal oleh BAA.

## 11. Acceptance Criteria
1. Perubahan jadwal menghasilkan notifikasi dan entri riwayat.
2. Jam beririsan ditandai merah dengan label "BENTROK".
3. Baris bentrok menampilkan sesi pengganti; sesi yang membuat bentrok baru dinonaktifkan.
4. Memilih sesi pengganti menghilangkan bentrok dan mencatat riwayat.
5. Banner menyebut mata kuliah terdampak dan status presensi.
6. Data tetap ada setelah dimuat ulang.
7. Tampilan dapat digunakan di desktop dan smartphone.
