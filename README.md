# Rekayasa Interaksi B — Penanganan Perubahan & Bentrok Jadwal Kuliah (Portal Akademik UMM)

Repository ini berisi dokumentasi spesifikasi produk (**PRD**), catatan perubahan (**Changelog**), dan prototipe interaktif untuk tugas mata kuliah **Rekayasa Interaksi (Kelas B)**.

---

## 📌 Dokumen Utama

- 📄 **[Product Requirements Document (PRD.md)](./PRD.md)**  
  Berisi latar belakang masalah, persona narasumber wawancara (*Suryo Wisodono Prayogo*), *user needs*, *functional requirements* (FR-01 s/d FR-07), batasan, dan kriteria penerimaan (*acceptance criteria*).
- 📝 **[Changelog (CHANGELOG.md)](./CHANGELOG.md)**  
  Mencatat riwayat versi iterasi produk (v1.0.0), daftar fitur yang telah diimplementasikan, keputusan desain, dan status pengujian.
- 💻 **[Interactive Prototype (index.html)](./index.html)**  
  Prototipe antarmuka berbasis web (HTML/CSS/JS) mandiri untuk mendemonstrasikan penyelesaian masalah bentrok jadwal.

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

## 🖥️ Cara Menjalankan Prototipe

1. Unduh / clone repository ini:
   ```bash
   git clone https://github.com/YeXiu96/Rekayasa-Interaksi-B.git
   ```
2. Buka berkas `index.html` langsung menggunakan peramban web (Google Chrome, Microsoft Edge, Mozilla Firefox, dll.).
3. Klik tombol **"Simulasikan perubahan jadwal"** pada banner kuning untuk menguji skenario bentrok dan alur penyelesaiannya.

---

## 👤 Informasi Pengembang & Proyek
- **Pengembang:** Raditya Zeliq Amanta ([@YeXiu96](https://github.com/YeXiu96))
- **Narasumber (Persona):** Suryo Wisodono Prayogo (Mahasiswa S1 Informatika Semester 7)
- **Mata Kuliah:** Rekayasa Interaksi B
- **Institusi:** Universitas Muhammadiyah Malang
