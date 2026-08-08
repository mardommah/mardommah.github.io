# Plan: Sistem Manajemen Rumah Sakit Sederhana

## Tech Stack
- HTML5, CSS3, JavaScript (Vanilla)
- Bootstrap 5 (CDN)
- LocalStorage (simulasi database)

---

## Struktur Folder

```
/
├── index.html              # Landing page / Dashboard
├── plan.md
├── css/
│   └── style.css           # Custom styles
├── js/
│   ├── app.js              # Main app logic, routing, sidebar
│   ├── pasien.js           # CRUD pasien
│   ├── dokter.js           # CRUD dokter
│   ├── jadwal.js           # Jadwal praktek dokter
│   ├── rawat-inap.js       # Manajemen rawat inap
│   ├── rekam-medis.js      # Rekam medis pasien
│   └── laporan.js          # Laporan & statistik
├── pages/
│   ├── pasien.html         # Halaman manajemen pasien
│   ├── dokter.html         # Halaman manajemen dokter
│   ├── jadwal.html         # Halaman jadwal praktek
│   ├── rawat-inap.html     # Halaman rawat inap
│   ├── rekam-medis.html    # Halaman rekam medis
│   └── laporan.html        # Halaman laporan
└── assets/
    └── img/                # Gambar/icon
```

---

## Fitur & Halaman

### 1. Dashboard (`index.html`)
- Sidebar navigasi (Bootstrap offcanvas/collapse)
- Kartu statistik: total pasien, dokter, rawat inap aktif, jadwal hari ini
- Grafik sederhana (chart ringkasan menggunakan Chart.js CDN)
- Tabel aktivitas terbaru

### 2. Manajemen Pasien (`pages/pasien.html`)
- Tabel daftar pasien (No. RM, Nama, Umur, Jenis Kelamin, Alamat, No. HP)
- Tombol Tambah → Modal form input pasien
- Tombol Edit & Hapus per baris
- Pencarian & filter
- Data disimpan di LocalStorage

### 3. Manajemen Dokter (`pages/dokter.html`)
- Tabel daftar dokter (ID, Nama, Spesialisasi, No. HP, Status)
- CRUD via modal form
- Filter berdasarkan spesialisasi
- Data disimpan di LocalStorage

### 4. Jadwal Praktek (`pages/jadwal.html`)
- Tabel jadwal (Dokter, Hari, Jam Mulai, Jam Selesai, Ruangan)
- Form tambah/edit jadwal (pilih dokter dari data dokter)
- Filter berdasarkan hari/dokter
- Data disimpan di LocalStorage

### 5. Rawat Inap (`pages/rawat-inap.html`)
- Tabel pasien rawat inap (Pasien, Dokter, Ruangan, Tgl Masuk, Tgl Keluar, Status)
- Form pendaftaran rawat inap (pilih pasien & dokter dari data)
- Update status: Aktif / Selesai
- Data disimpan di LocalStorage

### 6. Rekam Medis (`pages/rekam-medis.html`)
- Tabel rekam medis (Pasien, Dokter, Tanggal, Diagnosa, Tindakan, Obat)
- Form tambah rekam medis (pilih pasien & dokter)
- Detail rekam medis per pasien
- Data disimpan di LocalStorage

### 7. Laporan (`pages/laporan.html`)
- Ringkasan jumlah pasien per bulan
- Ringkasan kunjungan per spesialisasi
- Daftar rawat inap aktif
- Export tabel ke print (window.print)

---

## Tahapan Pengerjaan

### Fase 1: Setup & Layout Dasar
1. Setup struktur folder
2. Buat layout utama: sidebar + topbar + content area (Bootstrap)
3. Buat `css/style.css` untuk custom styling
4. Buat `js/app.js` untuk navigasi antar halaman

### Fase 2: Dashboard
5. Buat kartu statistik dashboard
6. Integrasikan Chart.js untuk grafik ringkasan
7. Tabel aktivitas terbaru

### Fase 3: CRUD Pasien & Dokter
8. Implementasi CRUD pasien (LocalStorage)
9. Implementasi CRUD dokter (LocalStorage)
10. Pencarian & filter tabel

### Fase 4: Jadwal & Rawat Inap
11. Implementasi jadwal praktek dokter
12. Implementasi manajemen rawat inap
13. Relasi data antar modul (pasien ↔ dokter ↔ jadwal)

### Fase 5: Rekam Medis & Laporan
14. Implementasi rekam medis
15. Halaman laporan & statistik
16. Fitur print laporan

### Fase 6: Polish & Testing
17. Responsive design check (mobile/tablet/desktop)
18. Validasi form input
19. Seed data dummy untuk demo
20. Final testing semua fitur CRUD

---

## Responsive Design & Mobile-First Approach

### Breakpoints & Layout Strategy
- **Mobile (< 768px)**: Sidebar collapse ke offcanvas/toggle, layout single column, table scroll horizontal
- **Tablet (768px - 1024px)**: Sidebar tetap visible (fixed), grid 2 kolom untuk cards, table responsive
- **Desktop (> 1024px)**: Sidebar fixed, full layout, grid responsive 4 kolom untuk statistik

### Implementasi Responsive
1. **Bootstrap 5 Grid System**: Menggunakan `col-lg-6`, `col-md-6`, `col-sm-12` untuk adaptive layout
2. **Responsive Tables**: Wrapper `.table-responsive` untuk scroll horizontal di perangkat kecil
3. **Sidebar Toggle**: Sidebar otomatis collapse di mobile, button toggle tersedia
4. **Form Modal**: Modal `modal-dialog` responsive, form field stack vertical di mobile
5. **Spacing & Padding**: Menggunakan Bootstrap utilities (`p-3`, `p-md-4`, `px-sm-2`) untuk adaptif spacing
6. **Icons & Typography**: Font scaling via Bootstrap (`fs-1` hingga `fs-6`), icon size adjust per device
7. **Search Box**: Max-width constraint untuk desktop, full-width di mobile
8. **Action Buttons**: Button size responsive, group vertical di mobile (flex-column)

### Testing Checklist
- ✅ Mobile (375px - 480px): iPhone/Android
- ✅ Tablet (768px - 1024px): iPad, tablet Android
- ✅ Desktop (1920px+): Monitor standar
- ✅ Landscape & Portrait orientation
- ✅ Touch interaction: modal, buttons, form input

---

## Catatan Teknis
- Semua data disimpan di **LocalStorage** (tidak ada backend)
- Setiap entitas punya ID unik (generated via `Date.now()` atau `crypto.randomUUID()`)
- Navigasi antar halaman menggunakan link biasa (multi-page)
- Bootstrap 5 CDN untuk UI components (modal, table, card, navbar)
- Chart.js CDN untuk grafik di dashboard
- CSS media queries custom di `css/style.css` untuk refinement responsive
