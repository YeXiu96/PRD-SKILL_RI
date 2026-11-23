# **USER EXPERIENCE SPECIFICATION (UX-SPEC)**

## **Fitur: Penanganan Perubahan & Bentrok Jadwal Kuliah — Portal Akademik UMM**

**Versi:** 1.0
**Referensi:** README.md (PRD) v1.0, Worksheet 1–8
**Status:** Draft

# **1. UX Overview**

## **1.1 UX Objective**

Membantu mahasiswa segera mengetahui perubahan jadwal kuliah, menyadari bentrok tanpa menghitung manual, dan menemukan serta memilih sesi pengganti dalam satu tempat tanpa rasa cemas.

Pengguna harus dapat:

- Mengetahui jadwal kuliah yang berubah dan mata kuliah yang terdampak.
- Melihat jam kuliah yang bertabrakan secara langsung.
- Melihat sesi pengganti dari dosen yang sama (hari, jam, ruang GKB).
- Memindahkan kelas ke sesi pengganti dalam maksimal 3 langkah.
- Mengetahui riwayat perubahan jadwal.
- Memperoleh kepastian bahwa presensi dicatat pada sesi yang dipilih.

## **1.2 UX Design Principles**

- **Visibility of System Status:** Setiap perubahan jadwal harus terlihat melalui notifikasi, banner, dan riwayat; tidak boleh terjadi diam-diam.
- **Consistency with Mental Model:** Merah berarti masalah. Bentrok memakai warna merah yang sama dengan kelas penuh.
- **User Control & Recovery:** Setiap bentrok memiliki jalur pemulihan pada layar yang sama.
- **Specificity:** Pesan menyebut nama mata kuliah, jam lama dan baru, serta ruang GKB.
- **Consistency of Format:** Waktu selalu ditulis sebagai rentang jam (contoh 08.40–10.20) di seluruh halaman.
- **Calm Tone:** Nada informatif, tidak menakutkan, dan tidak menyalahkan pengguna.
- **Accessibility:** Status tidak hanya dibedakan berdasarkan warna.

# **2. User Context**

## **2.1 Primary Persona**

**Suryo Wisodono Prayogo, 22 tahun, Mahasiswa Aktif S1 Informatika Semester 7 UMM**

Karakteristik:

- Menyimpan screenshot jadwal setelah KRS dikunci dan jarang membuka portal lagi.
- Mengakses portal melalui smartphone dan memeriksa jadwal dengan membaca tabel teks.
- Mengandalkan grup WhatsApp angkatan untuk kabar perubahan jadwal.
- Terbiasa menganggap tidak adanya warna merah berarti jadwal aman.

## **2.2 User Goals**

| **Goal** | **Expected Experience** |
| --- | --- |
| Mengetahui perubahan jadwal | Perubahan diberitahukan jelas, lengkap dengan mata kuliah terdampak |
| Mengetahui bentrok | Baris bentrok langsung terlihat tanpa menghitung manual |
| Menemukan sesi pengganti | Sesi alternatif dosen yang sama tampil pada baris bentrok |
| Menjaga presensi | Kepastian presensi tampil pada banner dan konfirmasi |
| Memahami format waktu | Format waktu seragam di semua halaman |

## **2.3 Main User Scenario**

Suryo membuka Portal Akademik setelah mendengar kabar di grup angkatan. Banner menyatakan bahwa jadwal Pemrograman Web dipindahkan dari Senin 08.40–10.20 ke Rabu 08.40–10.20 dan bentrok dengan Basis Data.

Pada tabel jadwal, kedua baris ditandai merah dengan label BENTROK. Di bawah baris Pemrograman Web, Suryo melihat sesi pengganti: Kelas B (Selasa 10.30–12.10, GKB 2 R.102) dan Kelas C (Rabu 13.00–14.40, GKB 2 R.103). Ia memilih Kelas B, mengonfirmasi, dan bentrok hilang. Perubahan tercatat di riwayat.

## **2.4 Moment of Truth (Worksheet 7)**

Tahap **During**: saat mahasiswa menyadari jadwal berubah dan bentrok. Layar harus langsung menjawab: apa yang berubah, di mana bentroknya, dan apa langkah berikutnya.

# **3. Information Architecture (IA)**

## **3.1 Sitemap**

```
Portal Akademik UMM
└── Jadwal Kuliah
    ├── Jadwal (default)
    │   ├── Banner Perubahan (kondisional)
    │   ├── Tabel Jadwal
    │   └── Panel Sesi Pengganti (di bawah baris bentrok)
    ├── Riwayat Perubahan
    └── Notifikasi (ikon bell)
```

## **3.2 Primary Navigation**

Navigasi utama pada fitur ini terdiri dari:

- Jadwal
- Riwayat Perubahan
- Notifikasi (bell dengan jumlah yang belum dibaca)

Riwayat Perubahan dapat diakses maksimal 2 klik dari halaman Jadwal.

# **4. Page Specification**

## **PAGE-01: Jadwal Kuliah**

### **Purpose**

Menampilkan jadwal kuliah mahasiswa, menandai bentrok, dan menyediakan jalur pemulihan melalui sesi pengganti.

### **Information Components**

- Judul halaman dan identitas mahasiswa.
- Ikon notifikasi dengan jumlah belum dibaca.
- Banner Perubahan (jika ada perubahan belum dibaca atau bentrok).
- Tab Jadwal dan Riwayat Perubahan.
- Tabel jadwal terurut hari lalu jam, dengan kolom Hari, Waktu, Mata Kuliah (nama, dosen, kelas), Ruang (GKB), dan Status.
- Panel Sesi Pengganti di bawah baris bentrok.
- Penanda data demo jika data contoh dipakai.

### **User Actions**

- Membaca banner dan menandainya sudah dibaca.
- Membuka riwayat perubahan.
- Memilih sesi pengganti pada baris bentrok.
- Mengonfirmasi atau membatalkan perpindahan sesi.

### **Expected Outcome**

Suryo mengetahui perubahan, menyadari bentrok, dan dapat memindahkan kelas tanpa mencari informasi di luar portal.

## **PAGE-02: Riwayat Perubahan**

### **Purpose**

Menampilkan seluruh perubahan jadwal, baik oleh sistem maupun oleh mahasiswa.

### **Information Components**

- Daftar kronologis, terbaru di atas.
- Waktu perubahan.
- Pelaku perubahan (sistem atau mahasiswa).
- Mata kuliah, jadwal lama, dan jadwal baru.
- Badge "Baru" untuk perubahan yang belum dibaca.

### **User Actions**

- Membaca riwayat.
- Kembali ke tab Jadwal.

### **Expected Outcome**

Mahasiswa memahami mata kuliah apa saja yang digeser dan kapan.

## **PAGE-03: Dialog Konfirmasi Pindah Sesi**

### **Purpose**

Mencegah perpindahan kelas yang tidak disengaja dan menegaskan konsekuensi presensi.

### **Information Components**

- Judul "Pindah ke Kelas {X}?"
- Mata kuliah, hari, jam, dan ruang sesi baru.
- Pernyataan presensi dicatat pada sesi baru.
- Tombol Batal dan Pindah.

### **Expected Outcome**

Mahasiswa memindahkan kelas dengan sadar dan mengetahui dampaknya.

# **5. User Flow**

## **5.1 Flow: Menerima Perubahan Jadwal**

```
Sistem mengubah jadwal
        |
        v
Sistem mencatat riwayat + membuat notifikasi
        |
        v
Bell menampilkan jumlah baru
        |
        v
Mahasiswa membuka Jadwal Kuliah
        |
        v
Banner Perubahan menyebut mata kuliah terdampak
        |
        v
Klik "Saya sudah membaca" -> ditandai dibaca
```

## **5.2 Flow: Menangani Bentrok**

```
Jadwal dimuat / berubah
        |
        v
Deteksi jam beririsan (hari sama)
        |
        +---- Tidak ada bentrok -> Status "Aman"
        |
        +---- Ada bentrok
                 |
                 v
        Baris merah + label BENTROK
                 |
                 v
        Panel Sesi Pengganti terbuka
                 |
                 v
        Pilih sesi -> Konfirmasi -> Jadwal diperbarui
                 |
                 v
        Riwayat bertambah + Toast sukses
```

# **6. User Interaction Requirements**

## **6.1 Conflict Marking**

- Baris bentrok harus ditandai warna merah dan label teks "BENTROK".
- Label menyebut mata kuliah yang bertabrakan.
- Baris yang tidak bentrok menampilkan status "Aman".

## **6.2 Alternative Session**

- Sesi pengganti hanya berasal dari mata kuliah dan dosen yang sama.
- Setiap sesi menampilkan kelas, hari, jam, dan ruang.
- Sesi yang menimbulkan bentrok baru dinonaktifkan dan alasannya ditampilkan.

## **6.3 Banner & Notification**

- Banner menyebut nama mata kuliah, jadwal lama, dan jadwal baru.
- Banner menyatakan presensi dicatat pada sesi yang dipilih.
- Notifikasi berisi mata kuliah, jam lama, dan jam baru.

## **6.4 Move Session**

- Perpindahan memerlukan konfirmasi.
- Jika penyimpanan gagal, jadwal sebelumnya dipertahankan dan pesan kesalahan ditampilkan.

# **7. Responsive Experience**

## **Desktop**

- Tabel jadwal penuh dengan lima kolom.
- Panel sesi pengganti tampil di bawah baris bentrok.
- Dialog berupa modal terpusat.

## **Tablet**

- Tabel ringkas yang tetap terbaca.
- Navigasi menyesuaikan lebar layar.

## **Mobile**

- Setiap baris jadwal menjadi kartu bertumpuk.
- Panel sesi pengganti tampil di dalam kartu bentrok.
- Tombol aksi utama mudah dijangkau (tinggi minimal 44px).
- Dialog dapat berupa bottom sheet atau layar penuh.

# **8. Empty States**

### **Empty Riwayat**

Pesan: "Belum ada perubahan jadwal."

### **Tanpa Sesi Pengganti**

Pesan: "Belum ada sesi pengganti yang tersedia. Hubungi Program Studi."

### **Semua Sesi Pengganti Bentrok**

Pesan: "Semua sesi pengganti bertabrakan dengan jadwal lain."

# **9. UX Error Prevention**

- Sesi yang menimbulkan bentrok baru tidak dapat dipilih.
- Perpindahan sesi meminta konfirmasi.
- Kegagalan menyimpan memunculkan pesan dan mempertahankan jadwal sebelumnya.
- Klik ganda pada tombol Pindah tidak menghasilkan perpindahan ganda.
- Format waktu seragam mencegah salah baca kode sesi.

# **10. UX Deliverables**

Dokumen UX ini menjadi acuan untuk menghasilkan:

- Sitemap.
- User Flow.
- Page Specification.
- Wireframe.
- Interactive Prototype.
- UI Design.
- Responsive Design.
- Interaction Specification.

# **11. UX Design Constraints**

- Seluruh halaman harus konsisten dengan tujuan utama penanganan perubahan dan bentrok jadwal.
- Status bentrok harus mudah ditemukan dan dibedakan dengan jelas.
- Tidak boleh ada navigasi yang tidak memiliki fungsi.
- Tidak boleh ada fitur di luar ruang lingkup PRD tanpa persetujuan.
- Data contoh harus diberi penanda jelas.
- Aturan presensi adalah asumsi sampai dikonfirmasi BAA.

**End of UX-SPEC v1.0**
