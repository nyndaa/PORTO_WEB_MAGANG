# Nadia's Portfolio — Web Portofolio Magang (Junior Frontend & Web Developer)

Sebuah situs web portofolio pribadi yang dirancang dengan estetika pastel yang lembut, tipografi klasik yang elegan, dan antarmuka yang bersih. Proyek ini dibangun untuk menampilkan profil akademik, kumpulan proyek pengembangan web, sertifikat kompetensi, serta menyediakan akses unduh CV untuk keperluan melamar program **Magang (Internship)**.

**Live Website:** <https://nyndaa.github.io/PORTO_WEB_MAGANG/>  
**Repository GitHub:** <https://github.com/nyndaa/PORTO_WEB_MAGANG>

---

## Fitur Utama

* **Desain Estetik & Responsif:** Mengusung palet warna pastel hangat yang nyaman dipandang, tata letak *mobile-first* yang menyesuaikan layar ponsel hingga desktop, serta tipografi editorial.
* **Arsitektur Komponen Modular:** Memisahkan elemen navigasi (`components/navbar.html`) dan bagian bawah (`components/footer.html`) yang dimuat secara dinamis melalui `script.js` agar pemeliharaan kode lebih rapi dan konsisten di seluruh halaman.
* **Struktur Multi-Halaman Lengkap:**
  * `index.html` — Halaman beranda utama berisi perkenalan singkat, sorotan keahlian, dan pratinjau proyek unggulan.
  * `about.html` — Halaman profil lengkap, latar belakang pendidikan Informatika, prinsip kerja, serta daftar sertifikat pelatihan/kompetensi.
  * `projects.html` — Galeri proyek dengan filter kategori interaktif (*Frontend*, *Backend*, *Cloud Computing*, dll.) beserta tautan ke repositori GitHub dan *live demo* masing-masing proyek.
  * `contact.html` — Halaman kontak langsung dan tautan media sosial profesional.
* **Akses CV & Sertifikat Terintegrasi:** Dilengkapi dokumen CV terbaru (`assets/CV-Raharjian_Sustanadia_Wijayanti_2.pdf`) dan arsip sertifikat resmi dalam format PDF yang dapat diakses langsung oleh rekruter.

---

## Teknologi yang Digunakan

* **HTML5:** Struktur semantik halaman web.
* **Tailwind CSS (via CDN):** Framework CSS *utility-first* dengan konfigurasi tema warna dan font kustom tanpa proses kompilasi (*build step*).
* **Vanilla JavaScript (`script.js`):** Menangani pemuatan komponen modular (`navbar.html` & `footer.html`), menu navigasi responsif, serta filter proyek interaktif.
* **Google Fonts:**
  * *Playfair Display* — Font *serif* elegan untuk judul (*heading*).
  * *DM Sans* — Font *sans-serif* modern untuk keterbacaan paragraf dan antarmuka.
* **GitHub Pages:** Layanan *hosting* statis untuk publikasi situs secara langsung dari repositori GitHub.

---

## Struktur Proyek

```text
PORTO_WEB_MAGANG/
├── assets/
│   ├── CV-Raharjian_Sustanadia_Wijayanti_2.pdf   # Dokumen CV siap unduh
│   ├── profil-nadia.png                          # Foto profil utama
│   └── profil-nadia2.png                         # Foto profil pendukung
├── components/
│   ├── footer.html                               # Komponen footer modular
│   └── navbar.html                               # Komponen navigasi modular
├── sertifikat/                                   # Kumpulan sertifikat pelatihan & kompetensi (PDF)
│   ├── Achievements-raharjiansustanadiawijayanti-892...pdf
│   ├── Ai_engginer_for_milenial.pdf
│   ├── BASIC_HARDWARE.pdf
│   ├── Certificate_of_Completion.pdf
│   ├── Dampak_teknologi_digital_bagi_umkm.pdf
│   ├── Ethical_hacker_for_dummies.pdf
│   ├── Internet_of_Things_(IoT)_Introduction.pdf
│   ├── Introduction_to_cloud_computing.pdf
│   ├── Konsep_pemrograman.pdf
│   ├── Mengubah-masa-depan-dengan-pola-pikir-digi...pdf
│   ├── Pola-pikir-bertumbuh_(growth mindset).pdf
│   ├── sertifikat_course_653_4290008_160125222600.pdf
│   └── Sertifikat_RAHARJIAN_SUSTANADIA_WIJAYANTI_...pdf
├── about.html                                    # Halaman profil, keahlian, & sertifikasi
├── contact.html                                  # Halaman kontak & informasi komunikasi
├── index.html                                    # Halaman utama (Beranda)
├── projects.html                                 # Halaman galeri & filter proyek
├── script.js                                     # Logika JS (load komponen, filter, interaksi UI)
└── README.md                                     # Dokumentasi proyek
```

---

## Cara Mengakses & Menjalankan Proyek

### 1. Akses Langsung (Online)
Kunjungi tautan situs portofolio yang telah dipublikasikan melalui GitHub Pages:
> <https://nyndaa.github.io/PORTO_WEB_MAGANG/>

### 2. Menjalankan di Komputer Lokal (Local Development)
Karena komponen `navbar.html` dan `footer.html` dimuat menggunakan JavaScript (`fetch`), **disarankan menjalankannya melalui local web server** (seperti *Live Server* di VS Code) agar komponen navigasi tampil sempurna dan tidak terblokir kebijakan CORS browser (`file://`).

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/nyndaa/PORTO_WEB_MAGANG.git
   ```
2. **Buka folder proyek di Visual Studio Code.**
3. **Jalankan menggunakan Live Server:**
   * Pastikan ekstensi **Live Server** sudah terpasang di VS Code.
   * Klik kanan pada file `index.html`, lalu pilih **Open with Live Server** (atau klik tombol **Go Live** di pojok kanan bawah VS Code).
   * Pastikan koneksi internet aktif agar Tailwind CSS CDN dan Google Fonts termuat dengan baik.
4. **Alternatif tanpa ekstensi VS Code (menggunakan Node.js / Python):**
   ```bash
   npx serve .
   ```
   atau
   ```bash
   python -m http.server 8000
   ```
   Lalu buka `http://localhost:8000` di browser.

---

## Deployment (GitHub Pages)

Proyek ini di-deploy secara otomatis menggunakan **GitHub Pages**:
1. Setiap perubahan kode di-push ke branch `main` pada repositori [`nyndaa/PORTO_WEB_MAGANG`](https://github.com/nyndaa/PORTO_WEB_MAGANG).
2. GitHub Pages secara otomatis memperbarui tampilan situs pada alamat [`https://nyndaa.github.io/PORTO_WEB_MAGANG/`](https://nyndaa.github.io/PORTO_WEB_MAGANG/) dalam 1–2 menit.

---

## Author

Dikembangkan oleh **Raharjian Sustanadia Wijayanti (Nadia)**
* Mahasiswi Program Studi Informatika — Universitas Teknologi Digital Indonesia, Yogyakarta
* Bidang Minat: Frontend Web Development, Full-Stack Web Development, & Cloud Computing
* GitHub: [@nyndaa](https://github.com/nyndaa)