# **INTERACTION SPECIFICATION**

## **Project: Penanganan Perubahan & Bentrok Jadwal Kuliah — Portal Akademik UMM**

**Version:** 1.0
**Status:** Draft
**References:**

- README.md (PRD) v1.0
- UX-SPEC.md v1.0
- DESIGN-SYSTEM.md v1.0

# **1. Interaction Overview**

## **1.1 Objective**

Mendefinisikan perilaku interaksi pengguna pada fitur Penanganan Perubahan & Bentrok Jadwal Kuliah agar implementasi konsisten, dapat diprediksi, dan mudah digunakan.

## **1.2 Interaction Principles**

- Immediate Feedback: Setiap tindakan pengguna mendapatkan respons.
- Predictability: Perilaku komponen harus konsisten.
- Error Prevention: Sistem mencegah bentrok baru sebelum terjadi.
- User Control: Pengguna dapat membatalkan perpindahan sesi.
- State Consistency: Perubahan jadwal harus tercermin pada seluruh bagian terkait.
- Persistence: Perubahan jadwal, riwayat, dan status dibaca tersimpan.

# **2. Global Interaction Behavior**

## **2.1 Navigation**

| **Action** | **Expected Behavior** |
| --- | --- |
| Klik tab Jadwal | Membuka tampilan jadwal |
| Klik tab Riwayat Perubahan | Membuka riwayat perubahan |
| Klik ikon bell | Membuka Riwayat Perubahan |
| Tekan Esc pada dialog | Menutup dialog tanpa mengubah data |

Aturan:

- Tab aktif memiliki indikator visual.
- Navigasi tidak boleh menghasilkan halaman kosong.
- Riwayat dapat dibuka maksimal 2 klik dari halaman Jadwal.

## **2.2 Global Loading**

- Tampilkan loading indicator saat mengambil data.
- Hindari menampilkan data yang belum terkonfirmasi sebagai data terbaru.
- Jika gagal, tampilkan pesan kesalahan dan opsi mencoba kembali.

## **2.3 Global Error Handling**

- Gagal memuat jadwal: "Jadwal tidak dapat dimuat. Silakan coba kembali."
- Gagal menyimpan perpindahan: "Perpindahan gagal disimpan. Jadwal sebelumnya dipertahankan. Coba lagi."

# **3. Schedule Change Interaction**

## **3.1 Trigger**

Sistem (misalnya BAA) mengubah jadwal sebuah mata kuliah.

## **3.2 Behavior**

- Sistem memperbarui jadwal.
- Sistem membuat satu entri riwayat berisi mata kuliah, jadwal lama, dan jadwal baru.
- Sistem membuat satu notifikasi untuk perubahan tersebut.
- Sistem menjalankan ulang deteksi bentrok.
- Bell menampilkan jumlah notifikasi belum dibaca.
- Banner Perubahan ditampilkan pada halaman Jadwal.

## **3.3 Notification Content**

Contoh:

Judul: Jadwal Kuliah Berubah

Pesan: Jadwal Pemrograman Web dipindahkan dari Senin 08.40–10.20 ke Rabu 08.40–10.20.

## **3.4 Notification Rules**

- Satu perubahan menghasilkan satu notifikasi (tanpa duplikat).
- Setiap notifikasi memiliki identitas unik.
- Notifikasi tersimpan di riwayat dan tetap ada setelah halaman dimuat ulang.
- Status "terkirim" hanya dicatat setelah notifikasi benar-benar ditampilkan.
- Kegagalan menampilkan notifikasi dicatat dan tidak menghilangkan data jadwal.

# **4. Conflict Detection Interaction**

## **4.1 Detection Rule**

Dua mata kuliah bentrok apabila berada pada hari yang sama dan jam mulai salah satunya lebih awal daripada jam selesai lainnya (irisan waktu). Jam selesai yang sama dengan jam mulai berikutnya bukan bentrok.

## **4.2 Behavior**

- Deteksi berjalan saat jadwal dimuat dan setiap kali jadwal berubah.
- Baris bentrok memakai latar merah, garis kiri merah, dan label "BENTROK dengan {mata kuliah}".
- Baris yang tidak bentrok menampilkan status "Aman".
- Panel Sesi Pengganti terbuka otomatis di bawah baris bentrok.
- Banner menyebut daftar mata kuliah yang bentrok.

# **5. Alternative Session & Move Interaction**

## **5.1 Trigger**

Pengguna memilih "Pindah ke sesi ini" pada salah satu sesi pengganti.

## **5.2 Alternative Session Rules**

- Sesi pengganti berasal dari mata kuliah dan dosen yang sama.
- Sesi yang sedang diikuti tidak ditampilkan sebagai pengganti.
- Sesi yang menimbulkan bentrok baru dinonaktifkan dengan keterangan "Bentrok dengan {mata kuliah}".
- Sesi yang tidak bentrok ditandai "Tidak bentrok".

## **5.3 Interaction Flow (maksimal 3 langkah)**

- Langkah 1: Pengguna melihat baris bentrok beserta sesi pengganti.
- Langkah 2: Pengguna memilih "Pindah ke sesi ini".
- Langkah 3: Pengguna mengonfirmasi pada dialog.
- Sistem menyimpan perpindahan.
- Jadwal dan status bentrok diperbarui.
- Sistem menambahkan entri riwayat.
- Sistem menampilkan toast "Sesi berhasil dipindahkan."

## **5.4 Confirmation Dialog**

Judul: Pindah ke Kelas {X}?

Pesan: Jadwal {Mata Kuliah} menjadi {Hari Jam, Ruang}. Presensi dicatat pada sesi baru.

Actions:

- Batal.
- Pindah.

## **5.5 Behavior**

Jika pengguna memilih Batal:

- Dialog ditutup.
- Jadwal tidak berubah.

Jika pengguna memilih Pindah:

- Tombol dinonaktifkan selama proses simpan (mencegah klik ganda).
- Pembaruan bersifat atomik.
- Jadwal, status bentrok, banner, dan riwayat diperbarui.

Jika gagal:

- Jadwal sebelumnya dipertahankan.
- Sistem menampilkan pesan kesalahan.

## **5.6 Edge Cases**

| **Kondisi** | **Behavior** |
| --- | --- |
| Tidak ada sesi pengganti | Tampilkan "Belum ada sesi pengganti yang tersedia. Hubungi Program Studi." |
| Semua sesi pengganti bentrok | Tampilkan "Semua sesi pengganti bertabrakan dengan jadwal lain." |
| Setelah pindah masih ada bentrok lain | Baris lain tetap ditandai dan banner tetap tampil |

# **6. Banner Interaction**

## **6.1 Content**

- Judul: "Jadwal kuliahmu berubah" atau "Ada jadwal yang bentrok".
- Daftar perubahan: "{Mata Kuliah} dipindahkan dari {lama} ke {baru}."
- Bentrok: "Bentrok terdeteksi pada {A}, {B}. Pilih sesi pengganti pada baris bertanda BENTROK."
- Presensi: "Jika kamu pindah lewat portal, presensi dicatat pada sesi yang kamu pilih."

## **6.2 Behavior**

- Banner muncul selama ada perubahan belum dibaca atau bentrok.
- Klik "Saya sudah membaca" menandai perubahan sebagai dibaca dan menghilangkan badge "Baru".
- Bagian bentrok pada banner tetap tampil sampai bentrok selesai.

# **7. History Interaction**

- Riwayat diurutkan dari terbaru.
- Setiap item menampilkan waktu, pelaku, dan perubahan jadwal.
- Perubahan oleh sistem dan oleh mahasiswa sama-sama tercatat.
- Item belum dibaca memiliki badge "Baru".
- Jika kosong, tampilkan "Belum ada perubahan jadwal."

# **8. Empty State Interaction**

| **Page** | **Condition** | **Message** | **Action** |
| --- | --- | --- | --- |
| Riwayat | Belum ada perubahan | Belum ada perubahan jadwal | — |
| Panel Sesi Pengganti | Tidak ada sesi | Belum ada sesi pengganti yang tersedia | Hubungi Program Studi |
| Panel Sesi Pengganti | Semua bentrok | Semua sesi pengganti bertabrakan dengan jadwal lain | — |

# **9. Responsive Interaction**

## **Desktop**

- Tabel jadwal penuh.
- Modal menggunakan dialog terpusat.

## **Tablet**

- Tabel ringkas.
- Modal menyesuaikan ukuran layar.

## **Mobile**

- Baris jadwal menjadi kartu.
- Dialog dapat menggunakan bottom sheet atau full-screen dialog.
- Tombol aksi utama mudah dijangkau.

# **10. Data Consistency**

Setiap perubahan jadwal harus tercermin pada:

- Tabel jadwal.
- Status bentrok.
- Panel sesi pengganti.
- Banner Perubahan.
- Riwayat Perubahan.
- Jumlah notifikasi pada bell.

Sistem harus memastikan perubahan data tidak menghasilkan status yang berbeda antarkomponen.

# **11. Interaction Completion Rules**

Sebuah interaksi dinyatakan selesai apabila:

- Aksi pengguna telah diproses.
- Data berhasil diperbarui jika diperlukan.
- Tampilan mencerminkan kondisi terbaru.
- Pengguna mendapatkan umpan balik.
- Tidak ada duplikasi tindakan.
- Kesalahan dapat dipahami dan ditangani pengguna.

**End of INTERACTION-SPEC v1.0**
