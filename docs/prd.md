# Product Requirements Document (PRD)

## Website Pramuka Polidewa

---

## 1. Identitas dan Ringkasan Proyek

| Atribut               | Nilai                                                                |
|------------------------|----------------------------------------------------------------------|
| Nama Proyek            | Website Pramuka Polidewa                                             |
| Organisasi             | UKM Pramuka Politeknik Dewantara — Racana Dewa Raja–Batari           |
| Gugus Depan            | 04.017 (Putra) dan 04.018 (Putri)                                   |
| Pangkalan              | Politeknik Dewantara Palopo, Sulawesi Selatan                        |
| Tanggal Berdiri        | 9 Mei 2025                                                          |
| Teknologi              | SvelteKit (frontend), Express.js (backend), PostgreSQL (database)    |
| Tipe Produk            | Website multi-halaman dengan dashboard admin                         |

Website ini adalah pusat informasi resmi organisasi Pramuka Politeknik Dewantara yang menampilkan profil Racana, sejarah, struktur kepengurusan, berita dan kegiatan, serta pendaftaran anggota baru.

---

## 2. Latar Belakang dan Masalah

UKM Pramuka Politeknik Dewantara — Racana Dewa Raja–Batari saat ini belum memiliki platform digital resmi yang menyatukan informasi organisasi. Informasi mengenai sejarah, kepengurusan, kegiatan, dan pendaftaran anggota tersebar di berbagai media sosial atau disampaikan secara lisan.

**Masalah yang ingin diselesaikan:**

- Tidak ada sumber informasi resmi terpusat tentang organisasi.
- Informasi sejarah, struktur kepengurusan, dan kegiatan sulit diakses oleh mahasiswa baru.
- Proses pendaftaran anggota baru belum terdigitalisasi.
- Identitas visual organisasi belum terpresentasikan secara profesional di dunia digital.

---

## 3. Tujuan Website

1. Menyediakan pusat informasi resmi yang mudah diakses oleh seluruh mahasiswa Politeknik Dewantara.
2. Menampilkan profil, sejarah, dan identitas Racana Dewa Raja–Batari secara lengkap dan terstruktur.
3. Menyajikan struktur kepengurusan yang jelas dan terkini.
4. Menjadi media publikasi berita, kegiatan, dan pengumuman resmi organisasi.
5. Menyediakan formulir pendaftaran anggota baru secara digital.
6. Memperkuat identitas visual organisasi melalui desain website yang profesional dan modern.

---

## 4. Pengguna Sasaran

### 4.1 Pengunjung Umum (Publik)

- Mahasiswa Politeknik Dewantara yang ingin mengenal Pramuka.
- Calon anggota baru yang ingin mengetahui informasi dan mendaftar.
- Anggota Pramuka dari perguruan tinggi lain yang ingin berkolaborasi.
- Masyarakat umum yang mencari informasi tentang organisasi.

**Kebutuhan:**
- Mengakses informasi profil, sejarah, dan kepengurusan.
- Membaca berita dan kegiatan terbaru.
- Mendaftar sebagai anggota baru melalui formulir.
- Navigasi yang intuitif dan desain yang mudah dipahami.

### 4.2 Admin (Pengurus Organisasi)

- Pengurus yang bertanggung jawab mengelola konten website.

**Kebutuhan:**
- Mengelola konten berita (membuat, mengedit, menghapus, mempublikasikan).
- Mengelola data struktur kepengurusan.
- Melihat dan mengelola data pendaftaran anggota baru.
- Dashboard yang sederhana dan mudah digunakan.

---

## 5. Ruang Lingkup dan Batasan

### 5.1 Dalam Ruang Lingkup (In Scope)

- Halaman Beranda sebagai pusat pengenalan organisasi.
- Halaman Profil Racana beserta sejarah.
- Halaman Struktur organisasi dan kepengurusan.
- Halaman Berita dan kegiatan organisasi.
- Halaman Pendaftaran anggota baru.
- Dashboard admin untuk mengelola konten (berita, struktur, pendaftaran).
- Autentikasi admin.
- REST API untuk komunikasi frontend-backend.

### 5.2 Di Luar Ruang Lingkup (Out of Scope)

- Forum diskusi.
- Fitur chat atau pesan langsung.
- Sistem pembayaran atau marketplace.
- Gamifikasi atau sistem poin.
- Aplikasi mobile terpisah.
- Integrasi media sosial selain menampilkan tautan.
- Sistem notifikasi push.
- Multi-bahasa.

### 5.3 Fitur yang Dapat Dipertimbangkan di Masa Depan

- Galeri foto dan video kegiatan terpisah.
- Unduhan dokumen resmi organisasi.
- Kalender kegiatan interaktif.
- Sistem komentar pada berita.

---

## 6. Daftar Halaman dan Tujuan

| Route              | Halaman              | Tujuan                                                                     |
|--------------------|----------------------|----------------------------------------------------------------------------|
| `/`                | Beranda              | Pusat pengenalan organisasi, cuplikan berita, ajakan mendaftar              |
| `/profil`          | Profil Racana        | Sejarah, filosofi, identitas Racana Dewa Raja dan Batari                   |
| `/struktur-racana` | Struktur Racana      | Bagan kepengurusan, pembina, pimpinan, divisi                              |
| `/berita`          | Berita Racana        | Daftar berita dan pengumuman resmi                                         |
| `/berita/[slug]`   | Detail Berita        | Isi lengkap satu berita dengan artikel dan foto                            |
| `/pendaftaran`     | Pendaftaran          | Formulir pendaftaran anggota baru                                          |
| `/admin`           | Dashboard Admin      | Halaman login dan pengelolaan konten (dipisahkan dari halaman publik)      |

**Catatan:** Halaman `/berita` pada gambar referensi menampilkan format detail artikel berita. Dibutuhkan baik halaman daftar berita maupun detail berita. Perilaku tepatnya didokumentasikan di `fitur.md`.

---

## 7. Kebutuhan Fungsional

### KF-01: Navigasi Antar Halaman

- Website memiliki navbar yang muncul di setiap halaman.
- Menu navigasi: Profil, Struktur Racana, Berita, Pendaftaran.
- Klik logo Pramuka Polidewa pada navbar → kembali ke route `/`.
- Klik menu Profil → route `/profil`.
- Klik menu Struktur Racana → route `/struktur-racana`.
- Klik menu Berita → route `/berita`.
- Klik menu Pendaftaran → route `/pendaftaran`.
- Perpindahan halaman menggunakan mekanisme routing SvelteKit.
- Navbar berfungsi pada desktop dan mobile (hamburger menu pada layar kecil).

### KF-02: Halaman Beranda

- Menampilkan hero section dengan identitas organisasi, slogan, dan tombol ajakan.
- Menampilkan bagian pengenalan organisasi.
- Menampilkan cuplikan berita/kegiatan terbaru (maksimal 2–3 item).
- Menampilkan komposisi foto anggota (kolase).
- Menampilkan bagian ajakan mendaftar dengan tautan ke halaman Pendaftaran.
- Cuplikan berita di Beranda mengarahkan ke halaman `/berita` atau `/berita/[slug]`.

### KF-03: Halaman Profil Racana

- Menampilkan judul sejarah dan kilas balik Racana.
- Menampilkan informasi pangkalan resmi, nomor Gugus Depan Putra (04.017) dan Putri (04.018).
- Menampilkan filosofi nama dan adat.
- Menampilkan dua kartu identitas Racana: Dewa Raja (Satuan Putra) dan Batari (Satuan Putri).
- Menampilkan dimensi karakter kunci untuk masing-masing Racana.
- Menampilkan pusaka adat dan sandi racana.
- Menampilkan linimasa kronologis sejarah organisasi.
- Menampilkan galeri arsip dokumentasi sejarah.
- Menampilkan bagian penutup yang mengarahkan ke Struktur Racana atau Pendaftaran.
- Breadcrumb navigasi: Beranda > Profil > Sejarah Racana.

### KF-04: Halaman Struktur Racana

- Menampilkan informasi periode kepengurusan, nomor Gugus Depan, dan masa bakti.
- Menampilkan bagian penasihat dan pembina (Majelis Pembimbing & Pembina Gugus Depan).
- Menampilkan garis koordinasi dan pengesahan Dewan Racana.
- Menampilkan pimpinan harian Dewan Racana (Ketua Dewa Raja dan Ketua Batari).
- Menampilkan pengurus harian (Penjaga Norma, Tata Usaha, Perbendaharaan, dll.).
- Menampilkan divisi pelaksana (Divisi I: Keilmuan & Evaluasi, Divisi II: Pengabdian Masyarakat, dll.) beserta koordinator, anggota, dan fokus tugas pokok.
- Menampilkan bagian regenerasi kepemimpinan dengan tautan ke Pendaftaran.
- Breadcrumb navigasi: Beranda > Struktur Racana.

### KF-05: Halaman Berita

- Menampilkan artikel berita dengan judul, foto utama, keterangan foto, dan isi artikel.
- Menampilkan bagian berita dan agenda lainnya.
- Setiap berita memiliki kategori/label (misalnya: Pengumuman Resmi & Penerimaan Anggota).
- Berita dapat diakses melalui slug unik.
- Tautan "Lihat Semua Berita" dan "Baca Selengkapnya" berfungsi sesuai navigasi.

### KF-06: Halaman Pendaftaran

- Menampilkan formulir pendaftaran anggota baru.
- Field formulir mencakup data diri yang relevan untuk pendaftaran Pramuka perguruan tinggi.
- Validasi input di sisi frontend (field wajib, format email, nomor telepon).
- Pengiriman data ke backend melalui REST API.
- Menampilkan status pengiriman: loading, berhasil, atau gagal.
- Setelah berhasil, menampilkan pesan konfirmasi.

### KF-07: Dashboard Admin

- Admin harus login sebelum mengakses dashboard.
- Fitur admin:
  - Mengelola berita (CRUD: buat, baca, edit, hapus).
  - Mengelola data struktur kepengurusan.
  - Melihat daftar pendaftaran anggota baru yang masuk.
- Halaman admin dipisahkan dari halaman publik (route berbeda, misalnya `/admin/*`).

### KF-08: Footer

- Footer ditampilkan di setiap halaman.
- Berisi: informasi organisasi, navigasi halaman, pangkalan & lokasi, media sosial.
- Warna dasar kuning sesuai identitas visual referensi.

---

## 8. Kebutuhan Nonfungsional

### KNF-01: Performa

- Halaman harus dimuat dalam waktu wajar (target < 3 detik pada koneksi rata-rata).
- Gambar dioptimalkan untuk web (format modern, lazy loading).

### KNF-02: Responsivitas

- Website harus berfungsi dan tampil baik pada desktop (≥1024px), tablet (768–1023px), dan mobile (< 768px).
- Navbar berubah menjadi hamburger menu pada layar mobile.
- Kartu, grid, dan tabel menyesuaikan jumlah kolom sesuai lebar layar.

### KNF-03: Aksesibilitas

- Semantic HTML (header, nav, main, section, article, footer).
- Label formulir yang benar dan terhubung ke input.
- Kontras teks yang memadai terhadap latar belakang.
- Fokus keyboard yang terlihat pada elemen interaktif.
- Alt text pada gambar.

### KNF-04: Keamanan

- Kredensial database hanya di environment backend.
- Input pengguna divalidasi di frontend dan backend.
- Autentikasi admin menggunakan mekanisme yang aman (misalnya JWT atau session).
- API admin dilindungi middleware autentikasi.
- Perlindungan terhadap serangan umum (SQL injection, XSS, CSRF).

### KNF-05: Kompatibilitas Browser

- Mendukung browser modern: Chrome, Firefox, Safari, Edge (versi terbaru dan satu versi sebelumnya).

### KNF-06: Maintainability

- Kode frontend menggunakan komponen Svelte yang terpisah dan dapat digunakan kembali.
- Backend menggunakan pemisahan tanggung jawab (routes, controllers, services).
- Dokumentasi kode yang memadai.

---

## 9. Persyaratan Navigasi dan Routing

> **ATURAN KRITIS — Harus ditaati dalam implementasi.**

### 9.1 Setiap Halaman Memiliki Route Terpisah

Website **bukan** satu landing page panjang. Setiap halaman harus berdiri sendiri melalui sistem routing SvelteKit.

| Aksi Pengguna                           | Perilaku yang Diharapkan                              |
|------------------------------------------|-------------------------------------------------------|
| Membuka website                          | Masuk ke route `/` (Beranda)                          |
| Klik menu **Profil**                     | Berpindah ke route `/profil`                          |
| Klik menu **Struktur Racana**            | Berpindah ke route `/struktur-racana`                 |
| Klik menu **Berita**                     | Berpindah ke route `/berita`                          |
| Klik menu **Pendaftaran**                | Berpindah ke route `/pendaftaran`                     |
| Klik **logo Pramuka Polidewa** di navbar | Kembali ke route `/`                                  |
| Scroll di halaman Beranda                | Hanya menggulir konten Beranda, tidak memunculkan halaman lain |

### 9.2 Aturan Rinci

1. Scroll hanya menggerakkan konten di dalam halaman yang sedang dibuka. Scroll **tidak boleh** otomatis mengganti halaman atau menampilkan halaman lain seolah section dari Beranda.
2. Perpindahan halaman **wajib** menggunakan routing SvelteKit (`<a href="/profil">` atau `goto()`), **bukan** anchor link ke ID section (`<a href="#profil">`).
3. Halaman Beranda memiliki beberapa section (hero, pengenalan, cuplikan berita, kolase, ajakan mendaftar), tetapi section tersebut adalah bagian dari Beranda — bukan halaman Profil, Struktur, atau Berita yang ditempelkan.
4. Cuplikan berita di Beranda boleh berisi ringkasan dan tautan ke `/berita` atau `/berita/[slug]`, tetapi halaman Berita itu sendiri **bukan** kelanjutan scroll Beranda.
5. Navbar dan footer digunakan sebagai komponen bersama (shared layout), tetapi konten utama setiap halaman harus terpisah.
6. Navigasi harus berfungsi pada desktop dan mobile.

---

## 10. Aturan Desain yang Wajib Dipertahankan

Aturan ini berasal dari analisis empat gambar referensi desain. Detail lengkap ada di `design.md`.

1. **Identitas warna utama:** ungu gelap (latar utama) dan kuning/emas (aksen, tombol, footer, dekorasi).
2. **Hierarki visual** yang jelas: judul besar, subjudul, body text, dan caption dengan ukuran dan berat font yang berbeda.
3. **Kartu (card)** dengan sudut membulat, latar gelap, dan border/aksen kuning.
4. **Foto organisasi asli** digunakan, bukan placeholder atau gambar AI.
5. **Elemen dekoratif** kuning (garis diagonal, ikon tunas kelapa) sebagai identitas Pramuka.
6. **Footer berwarna kuning** dengan teks gelap, berisi navigasi, lokasi, dan media sosial.
7. **Navbar** dengan latar ungu gelap, logo di kiri, menu di kanan.
8. **Desain per halaman** harus sesuai dengan gambar referensi masing-masing (bukan desain bebas).

---

## 11. Gambaran Fitur Frontend, Backend, dan Admin

### 11.1 Frontend (SvelteKit)

- Rendering halaman publik (Beranda, Profil, Struktur Racana, Berita, Pendaftaran).
- Komponen UI yang terstruktur dan dapat digunakan kembali.
- Fetch data dari REST API backend.
- Validasi input formulir di sisi klien.
- Navigasi berbasis routing SvelteKit.
- Responsive layout.

### 11.2 Backend (Express.js)

- REST API untuk menyajikan data ke frontend.
- Endpoint berita: daftar berita, detail berita, CRUD admin.
- Endpoint struktur: data kepengurusan.
- Endpoint pendaftaran: menerima dan menyimpan data pendaftaran.
- Endpoint autentikasi admin.
- Validasi input di sisi server.
- Koneksi ke PostgreSQL.

### 11.3 Admin

- Login admin.
- Kelola berita (buat, edit, hapus, publish/draft).
- Kelola struktur kepengurusan (perbarui data pengurus per periode).
- Lihat daftar pendaftaran anggota baru.

---

## 12. Gambaran Kebutuhan Data

Data utama yang dikelola oleh website:

| Entitas            | Deskripsi                                                         | Sumber         |
|--------------------|-------------------------------------------------------------------|----------------|
| Berita             | Artikel, pengumuman, dan kegiatan organisasi                      | Admin (CRUD)   |
| Struktur Pengurus  | Data pengurus per periode, jabatan, foto, deskripsi               | Admin (CRUD)   |
| Pembina            | Data penasihat dan pembina Gugus Depan                            | Admin (CRUD)   |
| Divisi             | Data divisi pelaksana, koordinator, anggota, dan fokus tugas      | Admin (CRUD)   |
| Pendaftaran        | Data calon anggota baru yang mendaftar melalui formulir           | Pengunjung     |
| Admin/User         | Akun admin untuk login ke dashboard                               | Konfigurasi    |
| Profil Organisasi  | Informasi statis (sejarah, filosofi, linimasa)                    | [KEPUTUSAN DIPERLUKAN: Dikelola dari admin atau hardcoded?] |

> **[KEPUTUSAN DIPERLUKAN]** Apakah konten halaman Profil (sejarah, filosofi, linimasa) dikelola melalui dashboard admin atau ditulis langsung di kode frontend? Asumsi saat ini: konten Profil bersifat semi-statis dan ditulis di frontend, kecuali ada kebutuhan untuk mengubahnya secara rutin.

---

## 13. Keamanan, Privasi, Aksesibilitas, dan Responsivitas

### Keamanan

- Password admin di-hash sebelum disimpan (bcrypt atau argon2).
- Token autentikasi memiliki masa berlaku.
- API admin dilindungi middleware.
- Environment variables untuk kredensial database dan secret key.
- Validasi dan sanitasi semua input pengguna.

### Privasi

- Data pendaftaran hanya dapat diakses oleh admin yang terautentikasi.
- Tidak ada data pribadi yang ditampilkan di halaman publik tanpa izin.
- Formulir pendaftaran menyertakan persetujuan penggunaan data (jika diperlukan).

### Aksesibilitas

- Semantic HTML5.
- Heading hierarchy yang benar (satu `<h1>` per halaman).
- Formulir dengan label, placeholder, dan pesan error yang deskriptif.
- Kontras warna memadai.
- Keyboard navigable.
- Alt text pada semua gambar.

### Responsivitas

- Breakpoint: mobile (< 768px), tablet (768–1023px), desktop (≥ 1024px).
- Mobile-first approach.
- Navbar hamburger pada mobile.
- Grid dan kartu yang menyesuaikan layout.

---

## 14. Kriteria Penerimaan (Acceptance Criteria)

### AC-01: Navigasi

- [ ] Klik menu Profil membuka route `/profil`.
- [ ] Klik menu Struktur Racana membuka route `/struktur-racana`.
- [ ] Klik menu Berita membuka route `/berita`.
- [ ] Klik menu Pendaftaran membuka route `/pendaftaran`.
- [ ] Klik logo di navbar kembali ke route `/`.
- [ ] Scroll di halaman Beranda **tidak** memunculkan halaman Profil, Struktur, Berita, atau halaman lain sebagai section selanjutnya.
- [ ] Setiap route memiliki konten terpisah dan lengkap.

### AC-02: Beranda

- [ ] Hero section menampilkan identitas organisasi dan tombol ajakan.
- [ ] Cuplikan berita menampilkan 2–3 berita terbaru dengan tautan ke detail.
- [ ] Bagian ajakan mendaftar dengan tautan ke `/pendaftaran`.
- [ ] Footer kuning dengan informasi lengkap.

### AC-03: Profil

- [ ] Menampilkan sejarah, filosofi, identitas kedua Racana.
- [ ] Linimasa kronologis ditampilkan sesuai referensi.
- [ ] Galeri arsip dokumentasi ditampilkan.
- [ ] Breadcrumb navigasi berfungsi.

### AC-04: Struktur Racana

- [ ] Menampilkan pembina, pimpinan harian, pengurus, dan divisi.
- [ ] Kartu pengurus menampilkan nama, jabatan, foto, dan deskripsi.
- [ ] Data sesuai periode kepengurusan aktif.
- [ ] Breadcrumb navigasi berfungsi.

### AC-05: Berita

- [ ] Halaman berita menampilkan artikel dengan foto, judul, isi, dan label kategori.
- [ ] Bagian berita lainnya ditampilkan.
- [ ] Tautan "Baca Selengkapnya" berfungsi.

### AC-06: Pendaftaran

- [ ] Formulir pendaftaran memiliki validasi input.
- [ ] Data terkirim ke backend dan tersimpan di database.
- [ ] Pesan sukses atau error ditampilkan.

### AC-07: Admin

- [ ] Admin dapat login.
- [ ] Admin dapat mengelola berita (CRUD).
- [ ] Admin dapat melihat daftar pendaftaran.
- [ ] Halaman admin tidak dapat diakses tanpa autentikasi.

### AC-08: Responsivitas

- [ ] Website berfungsi dan tampil baik pada desktop, tablet, dan mobile.
- [ ] Navbar berubah menjadi hamburger menu pada mobile.

### AC-09: Desain

- [ ] Identitas warna ungu dan kuning dipertahankan.
- [ ] Desain setiap halaman sesuai dengan gambar referensi.
- [ ] Tidak ada halaman yang menggunakan template generik yang berbeda dari referensi.

---

## 15. Risiko, Asumsi, Dependensi, dan Hal yang Belum Dipastikan

### Risiko

| Risiko                                      | Dampak  | Mitigasi                                               |
|---------------------------------------------|---------|--------------------------------------------------------|
| Foto organisasi asli belum tersedia lengkap | Sedang  | Gunakan placeholder dengan label `[FOTO DIPERLUKAN]`  |
| Data sejarah organisasi belum lengkap       | Sedang  | Tandai dengan `[DATA PERLU DILENGKAPI]`                |
| Desain responsif sulit presisi tanpa mockup mobile | Rendah  | Gunakan prinsip responsive yang konsisten              |

### Asumsi

1. Website akan diakses melalui browser desktop dan mobile modern.
2. Admin hanya terdiri dari 1–3 orang pengurus yang terpercaya (tidak perlu sistem role kompleks).
3. Volume berita tidak terlalu tinggi (estimasi < 50 berita per tahun).
4. Konten halaman Profil bersifat semi-statis dan jarang berubah.
5. Pendaftaran anggota baru bersifat musiman (awal tahun akademik).

### Dependensi

- Foto asli organisasi harus disediakan oleh pengurus.
- Data sejarah, struktur kepengurusan, dan identitas Racana harus diverifikasi oleh pengurus.
- Domain dan hosting harus disiapkan untuk deployment.

### Hal yang Belum Dipastikan

- [ ] **Konten Profil:** Dikelola dari admin atau hardcoded di frontend?
- [ ] **Field pendaftaran:** Apa saja data yang harus diisi oleh calon anggota? (Asumsi minimum: nama, NIM, program studi, angkatan, nomor telepon, email, motivasi.)
- [ ] **Upload foto pengurus:** Apakah admin mengunggah foto pengurus melalui dashboard atau disediakan secara statis?
- [ ] **Mekanisme autentikasi admin:** JWT token atau session-based? (Asumsi: JWT karena frontend dan backend terpisah.)
- [ ] **Berapa banyak divisi yang ada?** Gambar referensi menunjukkan 2 divisi. Apakah bisa bertambah?
- [ ] **Halaman pendaftaran:** Apakah ada batas waktu pendaftaran yang ditampilkan?
- [ ] **Domain dan hosting:** Platform hosting apa yang akan digunakan?

---

## 16. Indikator Keberhasilan Proyek

| Indikator                                             | Target                                   |
|-------------------------------------------------------|------------------------------------------|
| Semua halaman publik dapat diakses dan ditampilkan     | 5 halaman berfungsi                      |
| Navigasi antar halaman berfungsi tanpa error           | 100% menu dan tautan berfungsi           |
| Formulir pendaftaran berhasil menyimpan data           | Data masuk ke database                   |
| Dashboard admin berfungsi untuk kelola berita           | CRUD berita operasional                  |
| Desain sesuai referensi pada desktop                   | Kesesuaian visual ≥ 90%                  |
| Website responsif pada mobile dan tablet               | Semua halaman dapat digunakan            |
| Waktu muat halaman                                     | < 3 detik pada koneksi rata-rata         |
| Tidak ada data organisasi yang dikarang                | 0 data fiktif yang disajikan sebagai fakta |

---

*Dokumen ini adalah acuan utama. Seluruh dokumentasi teknis (`design.md`, `architecture.md`, `database.md`, `fitur.md`) harus konsisten dengan PRD ini.*
