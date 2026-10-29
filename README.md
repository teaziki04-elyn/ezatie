# 📄 Website Portofolio & CV Profesional - Ezati Kamila
> **Digital Marketing Strategist & Business Analyst**

Website ini dirancang secara modern, interaktif, responsif, dan siap kerja (*production-ready*) menggunakan **HTML5, CSS3 kustom, dan Vanilla JavaScript**.

---

## 🌟 Fitur Utama Website

1. **Desain Modern & Profesional**:
   - Skema warna elegan dengan aksen biru profesional (*trust*), indigo, dan emerald (*analisis & pertumbuhan*).
   - Tipografi premium menggunakan Google Fonts **Plus Jakarta Sans** & **Outfit**.
   - Desain responsif sempurna untuk **Desktop, Laptop, Tablet, dan Smartphone**.

2. **Mode Gelap / Terang (Dark Mode & Light Mode)**:
   - Pengunjung dapat beralih tema dengan satu klik pada tombol di sudut kanan atas.
   - Pilihan tema otomatis tersimpan di `localStorage` peramban.

3. **Cetak & Unduh CV ke Format PDF (`@media print`)**:
   - Dilengkapi fungsi cetak cerdas. Saat tombol **"Unduh CV"** diklik, halaman akan membuka jendela cetak/PDF dan memformat dokumen secara otomatis menjadi resume bersih (tanpa tombol navigasi, tanpa menu, format ramah cetak A4).

4. **Kategori Interaktif (Filtering)**:
   - **Keahlian (Skills)**: Tab filter antara *Semua Keahlian*, *Digital Marketing Strategy*, *Business Analysis & Data*, dan *Software & Platform*.
   - **Portofolio (Studi Kasus)**: Tab filter antara *Semua Proyek*, *Digital & Performance Marketing*, *Business Analytics & Dashboards*, dan *Optimasi Proses & CRO*.

5. **Counter Animasi Metrik**:
   - Angka pencapaian (5+ Tahun Pengalaman, 120+ Proyek, 98% Kepuasan, 35% Efisiensi) beranimasi otomatis saat digulir (*scrolled into view*).

6. **Formulir Kontak Terintegrasi & WhatsApp Cepat**:
   - Formulir pesan dengan validasi interaktif dan notifikasi sukses.
   - Tombol **"Kirim ke WhatsApp"** yang otomatis merangkai pesan nama, email, dan kebutuhan ke tautan chat WhatsApp resmi Ezati Kamila.

7. **Reading Progress Bar & Back-to-Top**:
   - Indikator progres baca di bagian paling atas layar dan tombol kembali ke atas yang halus.

8. **Halaman Khusus Galeri Kegiatan (`galeri.html`)**:
   - Dokumentasi foto kegiatan profesional Ezati Kamila saat workshop strategi, presentasi dashboard BI ke direksi, pemetaan proses BPMN, dan pelatihan sertifikasi.
   - Fitur **Pencarian Langsung (Live Search)** berdasarkan kata kunci (contoh: "Meta Ads", "Power BI", "BPMN", "CRO").
   - Filter kategori: *Semua*, *Strategi & Marketing*, *Business Analytics & BI*, *Proses Bisnis & CRO*, dan *Sertifikasi & Pelatihan*.
   - **Pratinjau Foto Interaktif (Lightbox Modal)** lengkap dengan navigasi foto sebelumnya/berikutnya, poin capaian utama, deskripsi peran, dan dukungan tombol keyboard (`Esc`, panah kiri/kanan).

---

## 📁 Struktur Direktori

```
c:\ezati-cv\
├── index.html          # Halaman utama: CV & Portofolio Ezati Kamila
├── galeri.html         # Halaman galeri: Foto & Dokumentasi Kegiatan Nyata
├── css\
│   ├── style.css       # Desain dasar, tema terang/gelap & @media print
│   └── gallery.css     # Desain kartu galeri, filter, search, & modal lightbox
├── js\
│   ├── script.js       # Logika interaktif tema, scroll, form & drawer
│   └── gallery.js      # Logika filter galeri, live search & navigasi lightbox
├── push-ke-github.bat  # Script otomatis untuk upload ke GitHub
└── README.md           # Panduan lengkap penggunaan & kustomisasi
```

---

## 🚀 Cara Menjalankan & Membuka Website

### Cara Paling Mudah:
1. Buka folder `C:\ezati-cv` di komputer Anda melalui File Explorer.
2. Klik dua kali (*double click*) pada file **`index.html`**.
3. Website akan langsung terbuka di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll) tanpa memerlukan instalasi aplikasi tambahan!

### Menjalankan dengan Local Web Server (Opsional):
Jika Anda memiliki Python terinstal:
```bash
cd c:\ezati-cv
python -m http.server 8000
```
Lalu buka `http://localhost:8000` di browser.

---

## ✏️ Panduan Kustomisasi Data Ezati Kamila

Anda dapat membuka file `index.html` dan `galeri.html` menggunakan editor teks (VS Code, Notepad, Notepad++, Sublime Text) untuk memperbarui data:

1. **Mengubah Kontak & WhatsApp**:
   - Cari kata `6281234567890` di `index.html` dan `js/script.js`, lalu ganti dengan nomor WhatsApp aktif Anda (gunakan format kode negara `62` tanpa tanda `+` di awal link `wa.me`).
   - Cari kata `ezati.kamila@gmail.com` dan ubah sesuai email aktif Anda.

2. **Menambahkan Foto Asli**:
   - Di bagian Hero section (`<div class="avatar-circle">`), Anda dapat mengganti icon placeholder `<i class="fa-solid fa-user-tie"></i>` dengan foto Anda:
     ```html
     <img src="assets/foto-ezati.jpg" alt="Ezati Kamila" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
     ```

3. **Mengunggah Pembaruan ke GitHub**:
   - Cukup klik dua kali (*double click*) pada file **`push-ke-github.bat`** di folder `c:\ezati-cv`.
   - Script akan otomatis melakukan commit dan push seluruh perubahan ke repository GitHub Anda!
