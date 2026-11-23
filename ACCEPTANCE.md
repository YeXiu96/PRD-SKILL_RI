# **ACCEPTANCE CRITERIA**

## **Project: Penanganan Perubahan & Bentrok Jadwal Kuliah — Portal Akademik UMM**

**Version:** 1.0
**Status:** Draft
**References:**

- README.md (PRD) v1.0
- UX-SPEC.md v1.0
- DESIGN-SYSTEM.md v1.0
- INTERACTION-SPEC.md v1.0

# **1. Purpose**

Dokumen ini mendefinisikan kriteria penerimaan untuk fitur Penanganan Perubahan & Bentrok Jadwal Kuliah.

Tujuannya adalah memastikan bahwa aplikasi:

- Memenuhi kebutuhan pengguna yang didefinisikan dalam PRD (Worksheet 8).
- Mengimplementasikan alur dan struktur UX sesuai UX-SPEC.
- Menggunakan komponen visual sesuai DESIGN-SYSTEM.
- Memiliki perilaku interaksi sesuai INTERACTION-SPEC.
- Berfungsi secara konsisten dan dapat diuji.

# **2. Acceptance Criteria Convention**

Setiap kriteria memiliki:

- ID: Identitas kriteria.
- Requirement: Kondisi yang harus dipenuhi.
- Expected Result: Hasil yang diharapkan.
- Priority: Tingkat kepentingan.
- Verification: Cara memverifikasi.

## **Priority**

| **Priority** | **Description** |
| --- | --- |
| Must Have | Wajib terpenuhi agar fitur dapat diterima |
| Should Have | Penting, tetapi tidak menghalangi fungsi utama |
| Could Have | Peningkatan kualitas jika waktu memungkinkan |

## **Verification Method**

- Manual Test: Pengujian langsung oleh pengguna atau penguji.
- Automated Test: Pengujian menggunakan skrip.
- Visual Inspection: Pemeriksaan tampilan dan konsistensi desain.
- Integration Test: Pemeriksaan integrasi antarkomponen.

Status pengujian hanya boleh diisi Pass, Fail, Blocked, atau Not Tested berdasarkan bukti.

# **3. Schedule Display Acceptance Criteria**

### **AC-001 — Display Schedule**

**Priority:** Must Have
**Verification:** Manual Test, Visual Inspection

Given mahasiswa membuka halaman Jadwal Kuliah,
When jadwal dimuat,
Then sistem harus menampilkan seluruh mata kuliah terurut hari lalu jam, dengan kolom Hari, Waktu, Mata Kuliah (nama, dosen, kelas), Ruang, dan Status.

### **AC-002 — Consistent Time Format**

**Priority:** Must Have
**Verification:** Visual Inspection

Given jadwal ditampilkan pada halaman mana pun,
When waktu kuliah dirender,
Then waktu harus ditulis sebagai rentang jam yang seragam (contoh 08.40–10.20), bukan kode sesi.

# **4. Change Notification & History Acceptance Criteria**

### **AC-003 — Change Notification**

**Priority:** Must Have
**Verification:** Manual Test, Integration Test

Given jadwal sebuah mata kuliah diubah oleh sistem,
When perubahan tersimpan,
Then sistem harus membuat notifikasi yang memuat mata kuliah, jadwal lama, dan jadwal baru, dan bell menampilkan jumlah belum dibaca.

### **AC-004 — Change History**

**Priority:** Must Have
**Verification:** Manual Test

Given terjadi perubahan jadwal oleh sistem atau mahasiswa,
When mahasiswa membuka Riwayat Perubahan,
Then perubahan tersebut harus tercatat dengan waktu, pelaku, jadwal lama, dan jadwal baru, terurut terbaru di atas.

### **AC-005 — No Duplicate Notification**

**Priority:** Must Have
**Verification:** Automated Test, Integration Test

Given satu perubahan jadwal terjadi,
When sistem memproses perubahan tersebut,
Then hanya satu notifikasi dan satu entri riwayat yang dibuat untuk perubahan itu.

### **AC-006 — Honest Notification Status**

**Priority:** Must Have
**Verification:** Manual Test

Given notifikasi dibuat,
When status pengiriman dicatat,
Then status "terkirim/ditampilkan" hanya dicatat setelah notifikasi benar-benar ditampilkan, dan kegagalan dicatat tanpa menghilangkan data jadwal.

### **AC-007 — Mark As Read**

**Priority:** Should Have
**Verification:** Manual Test

Given terdapat perubahan belum dibaca,
When mahasiswa memilih "Saya sudah membaca",
Then badge "Baru" dan jumlah pada bell harus hilang, dan perubahan tetap ada di riwayat.

# **5. Conflict Acceptance Criteria**

### **AC-008 — Conflict Detection**

**Priority:** Must Have
**Verification:** Automated Test

Given dua mata kuliah berada pada hari yang sama dengan jam beririsan,
When jadwal dimuat atau berubah,
Then sistem harus mendeteksi keduanya sebagai bentrok.

### **AC-009 — No False Positive**

**Priority:** Must Have
**Verification:** Automated Test

Given jam selesai sebuah mata kuliah sama dengan jam mulai mata kuliah lain pada hari yang sama,
When deteksi bentrok berjalan,
Then keduanya tidak boleh ditandai bentrok.

### **AC-010 — Conflict Visual Marker**

**Priority:** Must Have
**Verification:** Visual Inspection

Given terdapat baris bentrok,
When tabel jadwal ditampilkan,
Then baris harus ditandai warna merah **dan** label teks "BENTROK dengan {mata kuliah}", sedangkan baris lain menampilkan "Aman".

### **AC-011 — Conflict Resolved**

**Priority:** Must Have
**Verification:** Manual Test

Given bentrok telah diselesaikan dengan pindah sesi,
When jadwal diperbarui,
Then penanda bentrok pada baris terkait harus hilang kecuali masih ada bentrok lain.

# **6. Alternative Session Acceptance Criteria**

### **AC-012 — Show Alternative Sessions**

**Priority:** Must Have
**Verification:** Manual Test, Visual Inspection

Given sebuah baris ditandai bentrok,
When tabel jadwal ditampilkan,
Then panel sesi pengganti harus tampil di bawah baris tersebut dengan kelas, hari, jam, dan ruang.

### **AC-013 — Same Course Only**

**Priority:** Must Have
**Verification:** Automated Test

Given panel sesi pengganti ditampilkan,
When daftar sesi dibuat,
Then hanya kelas paralel dari mata kuliah dan dosen yang sama yang muncul, dan sesi yang sedang diikuti tidak muncul.

### **AC-014 — Disable Conflicting Alternative**

**Priority:** Must Have
**Verification:** Manual Test

Given sebuah sesi pengganti akan menimbulkan bentrok baru,
When panel ditampilkan,
Then tombol pindah harus nonaktif dan keterangan "Bentrok dengan {mata kuliah}" terlihat.

### **AC-015 — Move Session With Confirmation**

**Priority:** Must Have
**Verification:** Manual Test, Automated Test

Given mahasiswa memilih sesi pengganti yang tidak bentrok,
When mahasiswa mengonfirmasi pada dialog,
Then sistem harus memperbarui jadwal, menambahkan riwayat, menampilkan toast sukses, dan menyatakan presensi dicatat pada sesi baru.

### **AC-016 — Cancel Move**

**Priority:** Must Have
**Verification:** Manual Test

Given dialog konfirmasi terbuka,
When mahasiswa memilih Batal atau menekan Esc,
Then dialog ditutup dan jadwal tidak berubah.

### **AC-017 — Move Failure Rollback**

**Priority:** Must Have
**Verification:** Manual Test

Given penyimpanan perpindahan gagal,
When sistem menerima kegagalan,
Then jadwal sebelumnya dipertahankan dan pesan kesalahan ditampilkan.

### **AC-018 — Maximum Three Steps**

**Priority:** Must Have
**Verification:** Manual Test

Given terdapat baris bentrok,
When mahasiswa memindahkan kelas,
Then proses dari melihat bentrok hingga selesai maksimal 3 langkah (lihat, pilih sesi, konfirmasi).

### **AC-019 — No Double Submission**

**Priority:** Must Have
**Verification:** Automated Test

Given proses perpindahan sedang berjalan,
When mahasiswa mengeklik Pindah berulang kali,
Then hanya satu perpindahan dan satu entri riwayat yang dibuat.

# **7. Banner Acceptance Criteria**

### **AC-020 — Specific Banner**

**Priority:** Must Have
**Verification:** Manual Test

Given terdapat perubahan atau bentrok,
When halaman Jadwal dibuka,
Then banner harus menyebut nama mata kuliah terdampak dengan jadwal lama dan baru, serta daftar mata kuliah yang bentrok.

### **AC-021 — Attendance Statement**

**Priority:** Must Have
**Verification:** Visual Inspection

Given banner dan dialog konfirmasi ditampilkan,
When mahasiswa membacanya,
Then pernyataan bahwa presensi dicatat pada sesi yang dipilih harus tampil.

# **8. Persistence Acceptance Criteria**

### **AC-022 — Persistence After Reload**

**Priority:** Must Have
**Verification:** Manual Test

Given jadwal, riwayat, dan status dibaca telah berubah,
When halaman dimuat ulang,
Then seluruh data harus tetap sama.

# **9. UX & Design Acceptance Criteria**

### **AC-023 — Status Not Color Only**

**Priority:** Must Have
**Verification:** Visual Inspection

Given status ditampilkan,
When pengguna melihat Aman, Bentrok, atau Baru,
Then setiap status harus disertai ikon atau teks selain warna.

### **AC-024 — Design Tokens**

**Priority:** Must Have
**Verification:** Visual Inspection

Given komponen ditampilkan,
When diperiksa terhadap DESIGN-SYSTEM,
Then warna, tipografi, spasi, radius, dan komponen harus sesuai token yang ditetapkan.

### **AC-025 — Contrast & Keyboard**

**Priority:** Must Have
**Verification:** Manual Test, Visual Inspection

Given pengguna menggunakan keyboard atau membaca teks,
When berinteraksi dengan halaman,
Then kontras teks minimal 4,5:1, fokus terlihat, dan seluruh aksi dapat dijalankan dengan keyboard.

### **AC-026 — Responsive Layout**

**Priority:** Must Have
**Verification:** Manual Test, Visual Inspection

Given fitur dibuka pada desktop, tablet, dan smartphone,
When tampilan dirender,
Then tabel penuh tampil di desktop dan baris menjadi kartu pada layar di bawah 640px tanpa informasi hilang.

### **AC-027 — Empty & Error States**

**Priority:** Must Have
**Verification:** Manual Test

Given kondisi kosong atau error terjadi,
When halaman ditampilkan,
Then pesan sesuai UX-SPEC dan INTERACTION-SPEC harus muncul.

### **AC-028 — Demo Data Labeled**

**Priority:** Must Have
**Verification:** Visual Inspection

Given data contoh dipakai,
When halaman ditampilkan,
Then data harus diberi penanda jelas bahwa itu data demo, bukan data SIAKAD.

# **10. Traceability**

| **Kebutuhan (PRD / Worksheet 8)** | **Acceptance Criteria** |
| --- | --- |
| N1 / FR-02 Notifikasi & riwayat | AC-003, AC-004, AC-005, AC-006, AC-007 |
| N2 / FR-01, FR-03 Format & bentrok | AC-001, AC-002, AC-008, AC-009, AC-010, AC-011 |
| N3 / FR-04, FR-05 Sesi pengganti | AC-012 – AC-019 |
| N4 / FR-06 Banner & presensi | AC-020, AC-021 |
| FR-07 Persistensi | AC-022 |
| UX & Design | AC-023 – AC-028 |

# **11. Definition of Done**

Fitur dinyatakan selesai apabila seluruh kriteria Must Have berstatus Pass, atau memiliki alasan Blocked/Not Tested yang tercatat di CHANGELOG.md.

**End of ACCEPTANCE-CRITERIA v1.0**
