# **DESIGN SYSTEM**

## **Project: Penanganan Perubahan & Bentrok Jadwal Kuliah — Portal Akademik UMM**

**Version:** 1.0
**Status:** Draft
**Reference:** README.md (PRD) v1.0, UX-SPEC.md v1.0

# **1. Design Direction**

## **1.1 Design Concept**

Modern Minimalist Academic Portal.

Karakteristik desain:

- Clean and minimal interface.
- Clear visual hierarchy.
- Consistent spacing.
- Soft neutral background.
- Professional appearance.
- Status bentrok yang langsung terlihat.
- Responsive across desktop, tablet, and mobile.

## **1.2 Design Principles**

- Clarity: Status jadwal harus mudah dibaca.
- Consistency: Semua halaman menggunakan aturan visual yang sama; merah selalu berarti masalah.
- Simplicity: Hindari elemen dekoratif yang tidak diperlukan.
- Accessibility: Pastikan kontras warna dan keterbacaan memadai.
- Scalability: Komponen harus dapat digunakan kembali.

# **2. Color System**

## **2.1 Primary Colors**

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| Primary | #2563EB | Tombol utama, link, active navigation |
| Primary Hover | #1D4ED8 | Hover button |
| Primary Light | #EFF6FF | Highlight dan selected background |
| Primary Dark | #1E40AF | Active emphasis |

## **2.2 Neutral Colors**

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| Background | #F8FAFC | Main background |
| Surface | #FFFFFF | Card dan panel |
| Surface Secondary | #F1F5F9 | Header tabel dan secondary surface |
| Border | #E2E8F0 | Divider dan border |
| Text Primary | #0F172A | Heading dan teks utama |
| Text Secondary | #64748B | Supporting text |
| Text Muted | #94A3B8 | Placeholder dan disabled text |

## **2.3 Semantic Colors**

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| Success | #16A34A | Jadwal aman |
| Success Light | #DCFCE7 | Background success |
| Warning | #D97706 | Perubahan jadwal dan banner perubahan |
| Warning Light | #FEF3C7 | Warning background |
| Danger | #DC2626 | Bentrok dan error |
| Danger Light | #FEE2E2 | Background baris bentrok |
| Info | #0284C7 | Informasi dan notifikasi |

## **2.4 Schedule Status Colors**

| **Status** | **Color** | **Background** | **Penanda Teks/Ikon** |
| --- | --- | --- | --- |
| Aman | #16A34A | #DCFCE7 | Ikon centang + "Aman" |
| Bentrok | #DC2626 | #FEE2E2 | Ikon peringatan + "BENTROK" |
| Berubah (belum dibaca) | #D97706 | #FEF3C7 | Badge "Baru" |

Warna status tidak boleh menjadi satu-satunya penanda. Setiap status harus disertai teks atau ikon.

# **3. Typography System**

## **3.1 Font Family**

Primary Font: Inter

Fallback:

- system-ui
- sans-serif

## **3.2 Typography Scale**

| **Token** | **Size** | **Weight** | **Usage** |
| --- | --- | --- | --- |
| H1 | 28px | 700 | Page title |
| H2 | 22px | 600 | Section heading |
| H3 | 18px | 600 | Card dan banner heading |
| Body Large | 16px | 400 | Main content |
| Body | 14px | 400 | Default text |
| Body Small | 13px | 400 | Supporting text (dosen, kelas) |
| Caption | 12px | 400 | Metadata dan waktu riwayat |

Line height:

- Heading: 1.2–1.4
- Body: 1.5
- Caption: 1.4

# **4. Spacing System**

Gunakan kelipatan 4px.

| **Token** | **Value** | **Usage** |
| --- | --- | --- |
| space-1 | 4px | Small inline gap |
| space-2 | 8px | Compact spacing |
| space-3 | 12px | Component spacing |
| space-4 | 16px | Standard padding |
| space-6 | 24px | Card spacing |
| space-8 | 32px | Large section spacing |

# **5. Layout System**

## **5.1 Main Layout**

Desktop:

- Page padding: 32px.
- Content maximum width: 1100px.

Tablet:

- Page padding: 24px.

Mobile:

- Single-column layout.
- Page padding: 16px.
- Row jadwal menjadi kartu.
- Full-width primary actions.

## **5.2 Responsive Breakpoints**

| **Breakpoint** | **Width** | **Layout** |
| --- | --- | --- |
| Mobile | < 640px | Kartu bertumpuk |
| Tablet | 640–1023px | Tabel ringkas |
| Desktop | ≥ 1024px | Tabel penuh |

# **6. Component Design Specifications**

## **6.1 Buttons**

Types:

- Primary Button (Pindah ke sesi ini, Pindah)
- Outline Button (Batal, Saya sudah membaca)
- Danger Button
- Disabled Button (sesi yang menimbulkan bentrok baru)

Specifications:

- Default height: 40px (44px pada mobile).
- Horizontal padding: 16px.
- Border radius: 8px.
- Font size: 14px.
- Font weight: 600.
- Transition: 150ms.

## **6.2 Banner Perubahan**

Specifications:

- Background: Warning Light (#FEF3C7), border Warning (#D97706).
- Border radius: 12px, padding: 16px.
- Berisi judul, daftar mata kuliah terdampak, daftar bentrok, pernyataan presensi, dan tombol.
- Atribut `role="alert"`.

## **6.3 Baris Jadwal**

Specifications:

- Padding: 12px 16px, border atas 1px solid #E2E8F0.
- Baris bentrok: background Danger Light, garis kiri 4px Danger.
- Header tabel: Surface Secondary, teks Text Secondary, bobot 600.

## **6.4 Label Bentrok & Status Badge**

Specifications:

- Border radius: 999px.
- Padding: 2px 8px (label) dan 4px 10px (badge).
- Font size: 12px, weight 600.
- Variants: Aman, Bentrok, Baru.

## **6.5 Kartu Sesi Pengganti**

Specifications:

- Background: #FFFFFF, border atas dashed Danger.
- Menampilkan kelas, hari, jam, ruang, info bentrok, dan tombol Pindah.
- Sesi bentrok: tombol disabled + keterangan "Bentrok dengan {mata kuliah}".

## **6.6 Item Riwayat**

Specifications:

- Padding: 12px 16px.
- Teks utama Body, waktu Caption.
- Badge "Baru" berwarna Danger dengan teks putih.

## **6.7 Navigation**

- Tab Jadwal dan Riwayat Perubahan; tab aktif memakai Primary Light.
- Ikon bell menampilkan jumlah notifikasi baru.

## **6.8 Modal**

Specifications:

- Background: white.
- Border radius: 12px.
- Maximum width: 480px.
- Padding: 24px.
- Overlay: dark translucent background.
- Dapat ditutup dengan tombol Esc.

Usage:

- Konfirmasi pindah sesi.

## **6.9 Toast Notification**

Types:

- Success.
- Error.
- Warning.
- Information.

Specifications:

- Position: top-right on desktop, top on mobile.
- Duration: 3–5 seconds (pengingat/notifikasi perubahan 6–8 detik).
- Pesan kesalahan penting tetap tampil sampai ditutup.
- Atribut `aria-live="polite"`.

# **7. Iconography**

Use Lucide Icons.

Rules:

- Consistent icon family.
- Standard size: 20px, small 16px, large 24px.
- Icons accompanying actions should have accessible labels.

Recommended icons:

- Jadwal: Calendar Days.
- Riwayat: History.
- Notifikasi: Bell.
- Bentrok: Triangle Alert.
- Aman: Circle Check.
- Pindah sesi: Arrow Left Right.
- Waktu: Clock.

# **8. Accessibility**

- Kontras teks minimal 4,5:1.
- Status tidak hanya dibedakan oleh warna.
- Fokus terlihat (outline 2px Primary).
- Seluruh aksi dapat dijalankan dengan keyboard.
- Target sentuh minimal 44px pada mobile.

# **9. Design Tokens**

All design values should be maintained as reusable tokens.

Example:

```json
{
  "color": {
    "primary": "#2563EB",
    "background": "#F8FAFC",
    "surface": "#FFFFFF",
    "textPrimary": "#0F172A",
    "textSecondary": "#64748B",
    "success": "#16A34A",
    "warning": "#D97706",
    "danger": "#DC2626",
    "dangerLight": "#FEE2E2"
  },
  "radius": { "sm": "6px", "md": "8px", "lg": "12px", "full": "999px" },
  "spacing": { "1": "4px", "2": "8px", "3": "12px", "4": "16px", "6": "24px", "8": "32px" }
}
```

**End of DESIGN-SYSTEM v1.0**
