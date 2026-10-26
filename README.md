# ✿ Nadia's Portfolio — Junior Frontend Developer

Sebuah portofolio web statis yang dirancang dengan estetika pastel yang lembut, tipografi yang elegan, dan antarmuka yang bersih. Proyek ini dibuat khusus untuk memamerkan proyek-proyek frontend, latihan desain, dan untuk mencari peluang magang (internship) di bidang Frontend Development.

## ✦ Fitur Utama

- **Desain Estetik & Personal:** Menggunakan palet warna pastel khusus, font serif yang elegan (Playfair Display), dan elemen dekoratif berbasis murni HTML/CSS (tanpa mengandalkan banyak aset gambar eksternal).
- **Responsive & Mobile-First:** Tampilan yang menyesuaikan dengan mulus dari layar HP hingga Desktop.
- **Konfigurasi Tema Terpusat:** Menggunakan Tailwind CSS CDN dengan konfigurasi tema warna dan font kustom langsung di dalam file HTML sehingga mudah dimodifikasi.
- **Struktur Multi-Halaman:** 
  - `index.html` - Halaman utama dengan hero section dan sorotan proyek.
  - `about.html` - Halaman profil, prinsip kerja, dan pengenalan diri.
  - `projects.html` - Halaman galeri proyek dengan fitur filter kategori.

## 🛠️ Teknologi yang Digunakan

- **HTML5** untuk kerangka dan semantik halaman.
- **Tailwind CSS (via CDN)** untuk styling yang cepat dan responsif tanpa proses build (cocok untuk prototipe statis).
- **Google Fonts:**
  - *DM Sans* (Font sans-serif untuk teks paragraf)
  - *Playfair Display* (Font serif elegan untuk heading)
- **Vanilla JavaScript** (pada `script.js` - *opsional, untuk logika interaksi seperti filter proyek atau mobile menu*).

## 🚀 Cara Menjalankan (Local Development)

Karena proyek ini menggunakan pendekatan web statis murni tanpa bundler (seperti Vite atau Webpack) dan mengambil Tailwind melalui CDN, cara menjalankannya sangat mudah:

1. Clone atau unduh repositori/file ini ke komputer Anda.
2. Pastikan Anda memiliki koneksi internet (untuk memuat Tailwind CSS dari CDN dan Google Fonts).
3. Buka file `index.html` langsung dengan cara double-click, ATAU seret (drag & drop) file tersebut ke browser pilihan Anda (Chrome, Firefox, Safari, Edge).
4. *(Opsional)* Jika Anda menggunakan VS Code, Anda bisa menggunakan ekstensi **Live Server** untuk mendapatkan fitur *hot-reload*.

## 📝 Panduan Kustomisasi (Penting sebelum Publish)

Sebelum mempublikasikan portofolio ini, pastikan Anda mengubah beberapa *placeholder* berikut:

1. **Alamat Email:** 
   Cari teks `mailto:your.email@example.com` di seluruh file HTML (biasanya ada di Header dan Footer) dan ganti dengan email asli Anda (contoh: `raharjiansustanadiawijayanti@gmail.com`).
2. **File `script.js`:**
   Tag `<script src="script.js"></script>` sudah disematkan di bagian bawah setiap halaman. Pastikan Anda membuat file ini jika ingin menambahkan logika JavaScript (misalnya, untuk menghidupkan fitur filter tombol kategori di halaman `projects.html`). Jika tidak digunakan, Anda dapat menghapus baris tersebut.
3. **Link Proyek Asli:**
   Ganti tautan pada tombol-tombol studi kasus (seperti Matchup AI atau Little Finds) untuk mengarah ke repositori GitHub Anda atau *live demo* proyek tersebut.

## ♡ Author

Dibuat dengan perlahan dan penuh cinta oleh **Nadia**. 
- Mahasiswi Informatika
- Calon Junior Frontend Developer