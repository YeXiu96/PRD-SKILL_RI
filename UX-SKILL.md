---
name: ux-skill-portal-akademik-umm
description: UX Skill untuk fitur Penanganan Perubahan & Bentrok Jadwal Kuliah di Portal Akademik UMM. Gunakan saat merancang, membangun, atau meninjau antarmuka jadwal kuliah, notifikasi perubahan, penanda bentrok, sesi pengganti, riwayat perubahan, dan pesan sistem terkait. Berisi riset, persona, journey, requirement, UX spec, design system, interaction spec, dan acceptance criteria dari Worksheet 1–8.
---

# UX Skill — Portal Akademik UMM (Jadwal & Bentrok)

## 1. Cara memakai
1. Baca `README.md` (PRD) untuk scope fungsional, lalu skill ini untuk keputusan UX.
2. Jika PRD dan skill berbeda: **PRD menang untuk scope fungsional**, **skill menang untuk detail UX** (tampilan, teks, interaksi). Catat selisihnya di `CHANGELOG.md`.
3. Uji setiap layar dengan pertanyaan persona: *"Apakah Suryo langsung sadar apa yang berubah, di mana bentroknya, dan apa langkah berikutnya?"*
4. Sebelum selesai, jalankan checklist di bagian 10.

## 2. Konteks riset (Worksheet 1–5)
- **Produk:** Portal Akademik Mahasiswa UMM (KRS, KHS, Jadwal Perkuliahan).
- **Masalah utama (WS1):** hilangnya kendali pengguna dan tidak ada penanganan konflik jadwal ketika sistem memindahkan jadwal sepihak setelah KRS dikunci. Temuan: bentrok akibat perubahan sepihak; kolom Aksi KRS kosong; banner pindah kelas ambigu; format waktu tidak konsisten ("Rabu (3,4,2,1)" vs "08.40 - 10.20 WIB", KHS tanpa jam); tidak ada notifikasi dan riwayat perubahan.
- **Design Challenge (WS2):** memberi notifikasi perubahan jadwal, penanda visual bentrok (seperti merah pada kelas penuh), dan daftar jadwal alternatif dari dosen yang sama, agar mahasiswa segera tahu ada bentrok dan langsung mendatangi sesi pengganti tanpa cemas.
- **Pengguna (WS3):** core user mahasiswa aktif; secondary user dosen pengampu. Stakeholder: Kaprodi/Sekprodi, Tim Kurikulum & Penjadwalan, BAA. Sistem: Infokom, SIAKAD, server presensi. Asumsi (bukan bukti): merah = peringatan; jadwal pasca-KRS dianggap final; jadwal alternatif di baris bentrok akan membantu.
- **Riset (WS4–5):** wawancara 5 mahasiswa. Insight: (1) screenshot KRS dijadikan acuan dan kabar perubahan datang dari grup WhatsApp (dari satu responden, jangan digeneralisasi); (2) merah = masalah, putih = aman sehingga bentrok polos menimbulkan rasa aman palsu; (3) pindah ke sesi paralel dosen yang sama sudah praktik lapangan tetapi tidak difasilitasi portal (perspektif dosen belum diwawancarai).
- **Kutipan acuan bahasa:** "Pas jadwal kita yang tabrakan gara-gara digeser sistem, tampilannya malah putih polos biasa seolah-olah nggak ada masalah."

## 3. Persona (Worksheet 6)
**Suryo Wisodono Prayogo**, 22 tahun, mahasiswa S1 Informatika semester 7 UMM.
- **Goal:** memastikan jadwal aman dan tidak bentrok setelah KRS dikunci tanpa kehilangan presensi; cepat tahu jika jadwal digeser dan ke sesi mana harus datang.
- **Behavior:** screenshot jadwal lalu jarang membuka portal; memakai smartphone dan membaca tabel teks manual; mengandalkan grup WhatsApp; menganggap "tidak ada merah = aman".
- **Pain point:** perubahan tanpa notifikasi/riwayat, bentrok polos, kolom Aksi kosong, banner ambigu, sesi pengganti dicari manual, format waktu tidak konsisten.
- **Need:** tahu segera dan jelas saat jadwal berubah; sadar bentrok langsung; menemukan sesi pengganti di satu tempat dan yakin presensi diakui; format waktu seragam.
- **Empathy map ringkas:** *Think* — "jadwal sudah fix", takut dianggap alfa. *Say* — "nggak dijelasin matkul mana yang kena". *Do* — screenshot, cek grup WA, baca tabel baris demi baris, cari kelas dosen di Excel prodi. *Pain* — rasa aman palsu, tidak bisa memulihkan sendiri. *Gain* — notifikasi jelas, penanda visual, sesi pengganti terintegrasi, kepastian presensi.

## 4. User Journey & Moment of Truth (Worksheet 7)
| Tahap | Goal | Action | Thought | Emotion | Pain | Opportunity |
|---|---|---|---|---|---|---|
| Before | Memastikan jadwal aman | Screenshot KRS, jarang buka portal | "Jadwal sudah fix." | Tenang | Perubahan tanpa notifikasi/riwayat | Notifikasi + riwayat |
| During | Tahu jadwal terbaru, pastikan tidak bentrok | Buka portal, baca tabel, cek kolom Aksi | "Ini bentrok atau tidak, kok tidak ada merah?" | Bingung/Panik | Bentrok polos, format waktu beda, banner tidak jelas | Penanda merah, format seragam, banner spesifik |
| After | Temukan sesi pengganti, presensi aman | Cari kelas paralel lewat grup/Excel, minta izin dosen | "Masuk kelas yang mana? Dianggap alfa?" | Cemas | Sesi pengganti tidak ada di portal | Daftar sesi alternatif + kepastian presensi |

**Moment of Truth:** tahap *During* — saat mahasiswa menyadari jadwal berubah dan bentrok tanpa notifikasi, penanda, atau jalur pemulihan. Desain harus memenangkan momen ini.

## 5. UX Requirements (Worksheet 8)
| ID | Insight | User Need | Functional Req | UX Req |
|---|---|---|---|---|
| N1 | Screenshot jadi acuan; perubahan tak terdeteksi | Tahu segera saat jadwal berubah | Notifikasi otomatis + riwayat | Bahasa awam, jam lama→baru; riwayat ≤ 2 klik |
| N2 | Merah=masalah, putih=aman | Sadar bentrok langsung | Deteksi irisan jam, penanda di KRS & Jadwal, format seragam | Merah + label "BENTROK"; waktu rentang jam seragam (08.40–10.20) |
| N3 | Pindah sesi paralel masih manual | Temukan sesi pengganti di satu tempat | Daftar kelas paralel dosen yang sama + pindah kelas | Di halaman yang sama; ≤ 3 langkah |
| N4 | Banner ambigu → panik, takut alfa | Penjelasan jelas + kepastian presensi | Banner: mata kuliah terdampak, ringkasan, status presensi | Singkat, informatif, tidak menakutkan, langkah jelas |

**User stories:** (1) menerima notifikasi otomatis saat jadwal berubah; (2) melihat penanda visual pada mata kuliah bentrok; (3) melihat sesi pengganti dosen yang sama pada baris bentrok; (4) mendapat penjelasan mata kuliah terdampak di banner; (5) mendapat kepastian presensi di sesi pengganti.

## 6. Prinsip UX (wajib)
1. **Visibility of system status:** setiap perubahan jadwal harus terlihat (notifikasi, banner, riwayat), tidak pernah diam-diam.
2. **Konsistensi dengan model mental:** merah = masalah. Bentrok memakai merah yang sama dengan kelas penuh.
3. **User control & recovery:** setiap bentrok punya jalur pemulihan di layar yang sama.
4. **Jangan mengandalkan warna saja:** selalu ada ikon + label teks.
5. **Spesifik, bukan umum:** sebut nama mata kuliah, jam lama dan baru, ruang GKB.
6. **Konsistensi format:** waktu selalu "08.40–10.20" di semua halaman.
7. **Tenang, bukan panik:** nada informatif, tidak menyalahkan pengguna.

## 7. UX Spec
### Struktur halaman
Jadwal Kuliah (default) → tab Riwayat Perubahan → ikon notifikasi (bell) di header dengan jumlah yang belum dibaca.

### P1 Jadwal Kuliah — urutan komponen
1. Header: judul, identitas mahasiswa, bell notifikasi.
2. **Banner Perubahan** (muncul bila ada perubahan belum dibaca atau bentrok): judul, daftar mata kuliah terdampak (lama → baru), daftar mata kuliah bentrok, langkah lanjutan, pernyataan presensi, tombol "Saya sudah membaca".
3. Tab: Jadwal | Riwayat Perubahan.
4. Tabel jadwal terurut hari lalu jam. Kolom: Hari | Waktu | Mata Kuliah (nama, dosen, kelas) | Ruang (GKB) | Status.
5. **Panel Sesi Pengganti** langsung di bawah baris bentrok (terbuka otomatis): judul "Sesi pengganti (kelas paralel dosen yang sama)", daftar kelas dengan hari, jam, ruang, info bentrok, dan tombol "Pindah ke sesi ini" (nonaktif + alasan bila menimbulkan bentrok baru).

### Status baris
| Status | Tampilan |
|---|---|
| Aman | ✓ "Aman" (hijau) |
| Bentrok | Latar merah muda, garis kiri merah, label "⚠ BENTROK dengan {mata kuliah}" |

### P2 Riwayat Perubahan
Daftar terbaru di atas. Tiap item: waktu, pelaku (sistem/mahasiswa), mata kuliah, jadwal lama → baru, badge "Baru" bila belum dibaca.

### Microcopy (Bahasa Indonesia, sopan dan jelas)
- Banner judul: "Jadwal kuliahmu berubah" / "Ada jadwal yang bentrok".
- Item: "{Mata Kuliah} dipindahkan dari {Hari jam lama} ke {Hari jam baru}."
- Bentrok: "Bentrok terdeteksi pada {A}, {B}. Pilih sesi pengganti pada baris bertanda BENTROK."
- Presensi: "Jika kamu pindah lewat portal, presensi dicatat pada sesi yang kamu pilih." *(asumsi, konfirmasi BAA)*
- Konfirmasi: "Pindah ke Kelas {X}? Jadwal {MK} menjadi {hari jam, ruang}. Presensi dicatat pada sesi baru." [Batal] [Pindah]
- Sukses: "Sesi berhasil dipindahkan." Gagal: "Perpindahan gagal disimpan. Jadwal sebelumnya dipertahankan. Coba lagi."
- Kosong riwayat: "Belum ada perubahan jadwal." Tanpa sesi pengganti: "Belum ada sesi pengganti yang tersedia. Hubungi Program Studi." Semua sesi bentrok: "Semua sesi pengganti bertabrakan dengan jadwal lain."

### Responsif
≥1024 px tabel penuh; 640–1023 px tabel ringkas; <640 px setiap baris menjadi kartu bertumpuk, panel sesi pengganti tampil di dalam kartu, tombol tinggi minimal 44 px.

## 8. Design System
- **Warna:** primary #2563EB; bentrok/bahaya #DC2626 (latar #FEE2E2); peringatan/perubahan #D97706 (latar #FEF3C7); aman #16A34A (latar #DCFCE7); teks #0F172A, sekunder #64748B; border #E2E8F0; latar #F8FAFC.
- **Tipografi:** Inter/system-ui. Judul halaman 24, judul seksi 18, isi 14, keterangan 12–13. Bobot 400/500/600.
- **Spasi & bentuk:** skala 4/8/12/16/24/32; radius 8 (kontrol) dan 12 (kartu); bayangan tipis.
- **Komponen:** Banner, Baris Jadwal, Label Bentrok, Kartu Sesi Pengganti, Item Riwayat, Badge "Baru", Tombol (primary/outline/disabled), Dialog Konfirmasi, Toast.
- **Aksesibilitas:** kontras teks ≥ 4,5:1; status tidak hanya warna; fokus terlihat (outline 2 px); banner `role="alert"`, toast `aria-live="polite"`; dialog dapat ditutup dengan Esc; seluruh aksi dapat dijalankan dengan keyboard.

## 9. Interaction Spec
- **F1 Jadwal berubah:** perubahan tercatat → notifikasi dibuat satu kali per perubahan → bell menampilkan jumlah baru → banner muncul saat halaman dibuka → "Saya sudah membaca" menandai dibaca.
- **F2 Bentrok:** deteksi otomatis saat jadwal dimuat atau berubah (hari sama dan jam beririsan) → baris merah + label → panel sesi pengganti terbuka.
- **F3 Pindah sesi (≤ 3 langkah: lihat bentrok → pilih sesi → konfirmasi):** klik "Pindah ke sesi ini" → dialog konfirmasi → simpan → jadwal dan status bentrok diperbarui, riwayat bertambah, toast sukses.
- **F4 Baca riwayat:** tab Riwayat dapat dibuka maksimal 2 klik dari halaman jadwal.
- **Aturan:** sesi yang menimbulkan bentrok baru dinonaktifkan dengan alasan; pembaruan atomik (gagal simpan = kembali ke jadwal sebelumnya); tombol dinonaktifkan saat proses simpan (cegah klik ganda); data bertahan setelah muat ulang; kondisi loading, kosong, error, dan sukses selalu ditangani.

## 10. UX Acceptance Criteria
| ID | Kriteria | Need |
|---|---|---|
| UXAC-01 | Setiap perubahan jadwal menghasilkan notifikasi dan entri riwayat berisi jam lama dan baru | N1 |
| UXAC-02 | Banner menyebut nama mata kuliah terdampak, bukan pesan umum | N4 |
| UXAC-03 | Bentrok ditandai merah **dan** label teks "BENTROK" beserta mata kuliah lawan | N2 |
| UXAC-04 | Format waktu seragam (08.40–10.20) di seluruh halaman | N2 |
| UXAC-05 | Baris bentrok menampilkan sesi pengganti (kelas, hari, jam, ruang) di halaman yang sama | N3 |
| UXAC-06 | Sesi yang menimbulkan bentrok baru tidak dapat dipilih dan alasannya terlihat | N3 |
| UXAC-07 | Pindah sesi selesai dalam ≤ 3 langkah dan ada dialog konfirmasi | N3 |
| UXAC-08 | Pernyataan presensi tampil di banner dan dialog konfirmasi | N4 |
| UXAC-09 | Riwayat dapat dibuka ≤ 2 klik dan bertahan setelah muat ulang | N1 |
| UXAC-10 | Semua status memiliki ikon/teks selain warna; kontras ≥ 4,5:1 | — |
| UXAC-11 | Seluruh aksi dapat dijalankan dengan keyboard; fokus terlihat | — |
| UXAC-12 | Tampilan nyaman di desktop, tablet, dan smartphone (kartu <640 px) | — |
| UXAC-13 | Tersedia keadaan kosong, error, dan sukses sesuai microcopy | — |
| UXAC-14 | Data contoh/demo diberi penanda jelas bila dipakai | — |

## 11. Keterlacakan ke Worksheet
WS1–5 → bagian 2 · WS6 → bagian 3 · WS7 → bagian 4 · WS8 → bagian 5 · PRD → README.md.
