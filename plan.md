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

## Catatan Teknis
- Semua data disimpan di **LocalStorage** (tidak ada backend)
- Setiap entitas punya ID unik (generated via `Date.now()` atau `crypto.randomUUID()`)
- Navigasi antar halaman menggunakan link biasa (multi-page)
- Bootstrap 5 CDN untuk UI components (modal, table, card, navbar)
- Chart.js CDN untuk grafik di dashboard
