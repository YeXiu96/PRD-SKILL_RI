# Rekayasa Interaksi B — Penanganan Perubahan & Bentrok Jadwal Kuliah (Portal Akademik UMM)

Repository ini berisi dokumentasi spesifikasi produk (**PRD**), catatan perubahan (**Changelog**), dan prototipe interaktif untuk tugas mata kuliah **Rekayasa Interaksi (Kelas B)**.

---

## 📌 Dokumen Utama

- 📄 **[Product Requirements Document (PRD.md)](./PRD.md)**  
  Berisi latar belakang masalah, persona narasumber wawancara (*Suryo Wisodono Prayogo*), *user needs*, *functional requirements* (FR-01 s/d FR-07), batasan, dan kriteria penerimaan (*acceptance criteria*).
- 📝 **[Changelog (CHANGELOG.md)](./CHANGELOG.md)**  
  Mencatat riwayat versi iterasi produk (v1.0.0), daftar fitur yang telah diimplementasikan, keputusan desain, dan status pengujian.
- 💻 **[Interactive Web Prototype (index.html)](./index.html)**  
  Prototipe antarmuka berbasis web (HTML/CSS/JS) mandiri untuk mendemonstrasikan penyelesaian masalah bentrok jadwal.
- 📱 **[React Native Mobile App (App.tsx & src/)](./App.tsx)**  
  Implementasi aplikasi mobile React Native modular (TypeScript) dengan standar pemrograman profesional (*Clean Architecture*).

---

## 🎯 Masalah yang Diselesaikan

Pada Portal Akademik mahasiswa, perubahan jadwal kuliah sepihak pasca KRS sering kali:
1. Tidak disertai notifikasi perubahan yang jelas.
2. Jadwal yang bertabrakan (bentrok) tidak memiliki indikator visual yang menonjol.
3. Mahasiswa kesulitan mencari sesi kelas paralel pengganti dari dosen yang sama.
4. Mahasiswa khawatir kehilangan presensi/dianggap alfa jika berpindah sesi.

---

## 🚀 Fitur Utama (Berdasarkan PRD)

| Kode | Fitur | Deskripsi |
|---|---|---|
| **FR-01** | Format Waktu Seragam | Rentang waktu ditampilkan terstandarisasi (misal: 08.40–10.20). |
| **FR-02** | Notifikasi & Riwayat Perubahan | Notifikasi otomatis dan pencatatan riwayat setiap ada perubahan jadwal. |
| **FR-03** | Deteksi Bentrok Visual | Penanda merah dan label tegas `BENTROK` dengan nama mata kuliah terkait. |
| **FR-04** | Rekomendasi Sesi Pengganti | Menampilkan opsi kelas paralel dari dosen yang sama; sesi yang bentrok dinonaktifkan otomatis. |
| **FR-05** | Pindah Sesi Mandiri | Mahasiswa dapat langsung memilih sesi baru dan jadwal otomatis diperbarui. |
| **FR-06** | Banner Informatif | Memberikan kejelasan mata kuliah terdampak dan jaminan status presensi. |
| **FR-07** | Persistensi Data | Seluruh status jadwal dan riwayat tersimpan lokal (*localStorage*). |

---

## 🏗️ Arsitektur Proyek React Native (Clean & Modular)

```
.
├── App.tsx                      # Root component & Tab Navigation
├── package.json                 # Dependensi Expo / React Native
├── tsconfig.json                # Konfigurasi TypeScript
├── src/
│   ├── types/                   # Contract & Interface definisi data
│   │   └── schedule.ts
│   ├── constants/               # Katalog mata kuliah & tema warna UI
│   │   ├── courses.ts
│   │   └── theme.ts
│   ├── utils/                   # Logika murni: deteksi irisan bentrok & format waktu
│   │   └── scheduleLogic.ts
│   ├── services/                # Abstraksi persistensi penyimpanan lokal (AsyncStorage)
│   │   └── storage.ts
│   ├── hooks/                   # Business state management (FR-01 s/d FR-07)
│   │   └── useSchedule.ts
│   ├── components/              # Komponen modular reusable
│   │   ├── Header.tsx           # Bar atas & badge notifikasi
│   │   ├── DemoBanner.tsx       # Kontrol simulasi BAA & reset
│   │   ├── ConflictAlert.tsx    # Banner peringatan bentrok & kepastian presensi
│   │   ├── ScheduleCard.tsx     # Kartu jadwal kuliah & drawer sesi paralel
│   │   └── Toast.tsx            # Floating toast notification
│   └── screens/                 # Layar utama
│       ├── ScheduleScreen.tsx   # Layar daftar jadwal kuliah
│       └── HistoryScreen.tsx    # Layar riwayat & audit log perubahan
```

---

## 🖥️ Cara Menjalankan Prototipe

### 1. Prototipe Web Mandiri:
1. Buka berkas `index.html` langsung menggunakan peramban web (Google Chrome, Microsoft Edge, dll.).
2. Klik tombol **"Simulasikan perubahan jadwal"** pada banner kuning.

### 2. Aplikasi Mobile (React Native / Expo):
1. Install dependensi:
   ```bash
   npm install
   ```
2. Jalankan aplikasi menggunakan Expo:
   ```bash
   npx expo start
   ```
3. Scan QR code melalui aplikasi **Expo Go** pada smartphone Android/iOS Anda.

---

## 👤 Informasi Pengembang & Proyek
- **Pengembang:** Raditya Zeliq Amanta ([@YeXiu96](https://github.com/YeXiu96))
- **Narasumber (Persona):** Suryo Wisodono Prayogo (Mahasiswa S1 Informatika Semester 7)
- **Mata Kuliah:** Rekayasa Interaksi B
- **Institusi:** Universitas Muhammadiyah Malang
