# Katalog Fitur Website

## Website Pramuka Polidewa

---

## 1. Ringkasan Fitur Per Halaman

| Halaman              | Route              | Fitur Utama                                          | Prioritas |
|----------------------|--------------------|------------------------------------------------------|-----------|
| Beranda              | `/`                | Hero, pengenalan, cuplikan berita, kolase, CTA       | Wajib     |
| Profil Racana        | `/profil`          | Sejarah, filosofi, identitas Racana, linimasa, arsip | Wajib     |
| Struktur Racana      | `/struktur-racana` | Pembina, pimpinan, pengurus, divisi                  | Wajib     |
| Berita Racana        | `/berita`          | Daftar berita                                        | Wajib     |
| Detail Berita        | `/berita/[slug]`   | Artikel lengkap, berita terkait                      | Wajib     |
| Pendaftaran          | `/pendaftaran`     | Formulir pendaftaran anggota baru                    | Wajib     |
| Admin — Login        | `/admin`           | Autentikasi admin                                    | Wajib     |
| Admin — Dashboard    | `/admin/dashboard` | Ringkasan data                                       | Wajib     |
| Admin — Berita       | `/admin/berita`    | CRUD berita                                          | Wajib     |
| Admin — Struktur     | `/admin/struktur`  | Kelola data kepengurusan                             | Wajib     |
| Admin — Pendaftaran  | `/admin/pendaftaran`| Lihat data pendaftaran                              | Wajib     |

---

## 2. Fitur Per Halaman — Detail

---

### F-01: Navbar (Komponen Global)

**Tujuan:** Menyediakan navigasi utama yang konsisten di seluruh halaman publik.

**Perilaku:**

| Aksi                                    | Respons Sistem                                         |
|------------------------------------------|-------------------------------------------------------|
| Klik logo Pramuka Polidewa              | Navigasi ke route `/` (Beranda)                       |
| Klik menu "Profil"                      | Navigasi ke route `/profil`                           |
| Klik menu "Struktur Racana"             | Navigasi ke route `/struktur-racana`                  |
| Klik menu "Berita"                      | Navigasi ke route `/berita`                           |
| Klik tombol "Pendaftaran"               | Navigasi ke route `/pendaftaran`                      |
| Halaman aktif                           | Menu aktif ditandai visual (underline, warna, atau bold) |
| Layar mobile (< 768px)                  | Menu diganti hamburger icon, dropdown/sidebar saat diklik |
| Hover pada menu (desktop)               | Perubahan opacity atau warna                          |

**Kriteria Penerimaan:**
- [ ] Semua tautan navigasi mengarah ke route yang benar.
- [ ] Perpindahan halaman menggunakan routing SvelteKit, bukan anchor link.
- [ ] Hamburger menu berfungsi pada mobile.
- [ ] Menu aktif teridentifikasi secara visual.

---

### F-02: Footer (Komponen Global)

**Tujuan:** Menyediakan informasi organisasi, navigasi tambahan, lokasi, dan kontak di setiap halaman.

**Perilaku:**

| Elemen                    | Detail                                                          |
|---------------------------|-----------------------------------------------------------------|
| Kolom 1 — Organisasi      | Nama: Pramuka Politeknik Dewantara. Deskripsi singkat.         |
| Kolom 2 — Navigasi        | Tautan: Beranda, Berita & Kegiatan, Profil Anggota, Struktur Racana, Pendaftaran Anggota Baru. |
| Kolom 3 — Pangkalan       | Alamat: Kampus Politeknik Dewantara, Jl. KH. Ahmad Razak Lorong 2 No.7 Wara Selatan, Kota Palopo, Sulawesi Selatan. Berdiri: 9 Mei 2025. |
| Kolom 4 — Media Sosial    | Ikon Instagram dan TikTok dengan tautan.                       |
| Baris copyright            | "© 2025 – 2026 Pramuka Politeknik Dewantara – Racana Dewa Raja – Batari. Seluruh hak cipta dilindungi" |

**Kriteria Penerimaan:**
- [ ] Footer ditampilkan di semua halaman publik.
- [ ] Tautan navigasi di footer berfungsi.
- [ ] Warna latar kuning sesuai referensi.
- [ ] Responsif: 4 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile).

---

### F-03: Halaman Beranda (`/`)

**Tujuan:** Pusat pengenalan organisasi dan titik masuk utama website.

#### Section 1 — Hero

| Elemen                  | Detail                                                           |
|-------------------------|------------------------------------------------------------------|
| Badge                   | "Pusat Informasi Resmi"                                          |
| Heading                 | "PRAMUKA POLIDEWA" (uppercase, sangat besar)                     |
| Subheading              | "Racana Dewa Raja – Batari Gugus Depan 04.017 – 04.018"         |
|                         | "Pangkalan Politeknik Dewantara Palopo"                          |
| Slogan                  | "Satya ku Dharmakan, Dharma ku Baktikan" (kotak kuning)          |
| Deskripsi               | Paragraf tentang wadah pembinaan                                 |
| CTA                     | "Patok Tenda Kamu, Dan Bergabung bersama kami!" → navigasi ke `/pendaftaran` |
| Foto                    | 2 anggota Pramuka (putra dan putri) di sebelah kanan             |
| Dekorasi                | Garis diagonal kuning di sudut kanan atas                        |

#### Section 2 — Pengenalan Organisasi

| Elemen                  | Detail                                                           |
|-------------------------|------------------------------------------------------------------|
| Badge                   | "Mengenai Pramuka Polidewa"                                      |
| Heading                 | "Membangun Karakter Mahasiswa Melalui Pengabdian Nyata"          |
| Foto                    | Foto kelompok anggota organisasi                                 |
| Teks overlay            | Deskripsi organisasi di kotak overlay pada foto                  |

#### Section 3 — Berita & Kegiatan

| Elemen                  | Detail                                                           |
|-------------------------|------------------------------------------------------------------|
| Badge                   | "Informasi & Berita Kegiatan"                                    |
| Heading                 | "Tentang Kegiatan Racana"                                        |
| Kartu berita            | 2 kartu berdampingan, masing-masing berisi:                     |
|                         | - Foto kegiatan                                                  |
|                         | - Judul berita                                                   |
|                         | - Ringkasan                                                      |
|                         | - "Admin Racana" (penulis)                                       |
|                         | - "Baca Selengkapnya →" (tautan ke `/berita/[slug]`)             |

| Aksi                    | Respons Sistem                                                   |
|-------------------------|------------------------------------------------------------------|
| Klik "Baca Selengkapnya"| Navigasi ke `/berita/[slug]` berita terkait                      |

**Sumber data:** Kartu berita mengambil 2 berita terbaru dari API `GET /api/berita?limit=2&status=published`.

#### Section 4 — Kolase Foto Anggota

| Elemen                  | Detail                                                           |
|-------------------------|------------------------------------------------------------------|
| Foto                    | Kumpulan foto anggota dalam komposisi kolase                     |
| Label                   | "Ingin Mengenal Lebih Jauh?"                                     |
| Dekorasi                | Ikon tunas kelapa kuning                                         |

#### Section 5 — Ajakan Mendaftar (CTA)

| Elemen                  | Detail                                                           |
|-------------------------|------------------------------------------------------------------|
| Heading                 | "Siap Mengabdi Bersama Racana Dewa Raja – Batari?"               |
| Deskripsi               | Paragraf ajakan pendaftaran                                      |
| Tombol                  | "Isi Formulir Pendaftaran Sekarang" → navigasi ke `/pendaftaran` |
| Dekorasi                | Ikon tunas kelapa kuning                                         |

**Kriteria Penerimaan:**
- [ ] Seluruh 5 section ditampilkan dengan scroll.
- [ ] Scroll Beranda **tidak** menampilkan halaman Profil/Struktur/Berita.
- [ ] Kartu berita menampilkan data dari API (2 berita terbaru).
- [ ] Tombol CTA mengarah ke `/pendaftaran`.
- [ ] Tautan "Baca Selengkapnya" mengarah ke detail berita.

---

### F-04: Halaman Profil Racana (`/profil`)

**Tujuan:** Menampilkan sejarah, filosofi, dan identitas Racana Dewa Raja–Batari.

#### Struktur Section

1. **Breadcrumb:** Beranda > Profil > Sejarah Racana.
2. **Header:** Badge historiografi, heading sejarah, paragraf pengantar, kotak pangkalan resmi (Gudep 04.017 & 04.018).
3. **Filosofi Nama & Adat:** Badge, subjudul, paragraf filosofi.
4. **Kartu Identitas Racana:** 2 kartu (Dewa Raja & Batari) — nama, deskripsi, dimensi karakter, pusaka adat.
5. **Sandi Racana:** Deskripsi sandi, badge "Taro Ada Taro Gau" dan "Adai Saling Menghormati".
6. **Linimasa Kronologis:** Badge, heading, 2 entri sejarah (22 September 2022 & 9 Mei 2025).
7. **Arsip Sejarah:** Badge, heading, 3 kartu foto dokumentasi.
8. **Tinta Sejarah Baru:** Badge, heading, paragraf, 2 tombol CTA.

| Aksi                               | Respons Sistem                                |
|-------------------------------------|-----------------------------------------------|
| Klik breadcrumb "Beranda"           | Navigasi ke `/`                               |
| Klik "Lihat Struktur Pengurus"      | Navigasi ke `/struktur-racana`                |
| Klik "Daftar Calon Anggota"         | Navigasi ke `/pendaftaran`                    |

**Sumber data:** Konten halaman ini bersifat semi-statis (ditulis langsung di frontend). Lihat catatan di `database.md` bagian 9.

**Kriteria Penerimaan:**
- [ ] Semua section dari referensi ditampilkan.
- [ ] Breadcrumb berfungsi.
- [ ] Tombol CTA mengarah ke route yang benar.
- [ ] Data sejarah sesuai gambar referensi (tidak dikarang).
- [ ] Data yang belum terverifikasi ditandai `[DATA PERLU DILENGKAPI]`.

---

### F-05: Halaman Struktur Racana (`/struktur-racana`)

**Tujuan:** Menampilkan bagan kepengurusan Dewan Racana periode aktif.

#### Struktur Section

1. **Breadcrumb:** Beranda > Struktur Racana.
2. **Header:** Badge kepengurusan, heading, paragraf, 3 info pill.
3. **Tingkat Penasihat & Pengarah:** 3 kartu pembina.
4. **Garis Koordinasi:** Badge visual.
5. **Pimpinan Harian Dewan Racana:** 2 kartu pimpinan (Ketua Dewa Raja & Ketua Batari).
6. **Pengurus Harian:** 4 kartu pengurus (Penjaga Norma × 2, Tata Usaha, Perbendaharaan).
7. **Divisi Pelaksana:** 2 kartu divisi dengan anggota dan fokus tugas.
8. **Regenerasi Kepemimpinan:** Heading, paragraf, 2 tombol CTA.

| Aksi                               | Respons Sistem                                |
|-------------------------------------|-----------------------------------------------|
| Klik breadcrumb "Beranda"           | Navigasi ke `/`                               |
| Klik "Daftar Calon Anggota Racana"  | Navigasi ke `/pendaftaran`                    |
| Klik "Tanya Kakak Racana"           | Membuka kontak (WhatsApp atau link terkait) — [KEPUTUSAN DIPERLUKAN: kontak siapa?] |

**Sumber data:** API `GET /api/struktur` (pembina, pengurus, divisi dari database berdasarkan periode aktif).

**State handling:**

| State       | Perilaku                                               |
|-------------|--------------------------------------------------------|
| Loading     | Skeleton placeholder atau spinner                      |
| Berhasil    | Menampilkan data kepengurusan                          |
| Kosong      | Pesan: "Data struktur kepengurusan belum tersedia"     |
| Error       | Pesan error yang ramah pengguna                        |

**Kriteria Penerimaan:**
- [ ] Data pembina, pimpinan, pengurus, dan divisi ditampilkan sesuai referensi.
- [ ] Data berasal dari API (periode aktif).
- [ ] Breadcrumb berfungsi.
- [ ] Tombol CTA mengarah ke route yang benar.
- [ ] Foto pengurus ditampilkan (atau placeholder jika belum ada).

---

### F-06: Halaman Berita — Daftar Berita (`/berita`)

**Tujuan:** Menampilkan daftar semua berita dan pengumuman organisasi.

> **Catatan:** Gambar referensi menampilkan halaman detail berita, bukan daftar berita. Desain daftar berita menggunakan gaya kartu yang konsisten dengan kartu berita di Beranda dan section "Berita & Agenda Lainnya" pada gambar referensi Berita.

**Elemen:**

| Elemen                  | Detail                                                           |
|-------------------------|------------------------------------------------------------------|
| Heading                 | "Berita & Kegiatan Racana"                                       |
| Kartu berita            | Grid kartu berita, masing-masing berisi:                         |
|                         | - Foto utama                                                     |
|                         | - Kategori/label                                                 |
|                         | - Judul                                                          |
|                         | - Ringkasan                                                      |
|                         | - Tanggal                                                        |
|                         | - "Baca →" / "Baca Selengkapnya →"                               |

| Aksi                        | Respons Sistem                                               |
|------------------------------|-------------------------------------------------------------|
| Klik kartu atau "Baca →"    | Navigasi ke `/berita/[slug]`                                 |
| Scroll ke bawah              | Pagination atau load more (jika berita > 6)                 |

**Sumber data:** API `GET /api/berita?status=published&page=1&limit=6`.

**Kriteria Penerimaan:**
- [ ] Daftar berita ditampilkan dalam grid kartu.
- [ ] Hanya berita berstatus "published" yang ditampilkan.
- [ ] Klik kartu mengarah ke detail berita.
- [ ] Desain konsisten dengan identitas visual website.

---

### F-07: Halaman Berita — Detail Berita (`/berita/[slug]`)

**Tujuan:** Menampilkan isi lengkap satu artikel berita.

**Elemen (berdasarkan referensi):**

| Elemen                  | Detail                                                           |
|-------------------------|------------------------------------------------------------------|
| Badge kategori          | Mis: "📢 Pengumuman Resmi & Penerimaan Anggota"                 |
| Judul                   | Judul berita lengkap                                             |
| Foto utama              | Gambar besar lebar penuh                                         |
| Caption foto            | Keterangan foto di bawah gambar                                  |
| Gudep info              | "GUDEP 04.017 – 04.018" di kanan caption                        |
| Isi artikel             | Paragraf dengan drop cap pada huruf pertama                      |
| Subjudul dalam artikel  | Mis: "Jadwal dan Persyaratan Pendaftaran"                        |
| Section berita lainnya  | Badge "Pilihan Redaksi", heading "Berita & Agenda Lainnya"       |
|                         | Tautan "Lihat Semua Berita →" → navigasi ke `/berita`            |
|                         | Kartu berita lain (1–2 item)                                     |

| Aksi                             | Respons Sistem                                          |
|-----------------------------------|---------------------------------------------------------|
| Klik "Lihat Semua Berita →"      | Navigasi ke `/berita`                                   |
| Klik kartu berita lain            | Navigasi ke `/berita/[slug-lain]`                       |
| Slug tidak ditemukan              | Halaman 404 atau pesan "Berita tidak ditemukan"         |

**Sumber data:**
- Artikel utama: API `GET /api/berita/:slug`.
- Berita lainnya: API `GET /api/berita?status=published&limit=2&exclude=:currentSlug` (atau logika serupa).

**Kriteria Penerimaan:**
- [ ] Artikel ditampilkan lengkap sesuai referensi.
- [ ] Drop cap pada huruf pertama paragraf.
- [ ] Foto utama dan caption ditampilkan.
- [ ] Berita lainnya ditampilkan di bawah artikel.
- [ ] Slug yang tidak valid menampilkan halaman 404.

---

### F-08: Halaman Pendaftaran (`/pendaftaran`)

**Tujuan:** Menyediakan formulir bagi mahasiswa untuk mendaftar sebagai anggota baru.

> **Catatan:** Tidak ada gambar referensi untuk halaman Pendaftaran. Desain mengikuti karakter visual website (warna, tipografi, kartu) dan mengacu pada gaya form yang bersih dan modern.

**Elemen Formulir:**

| Field              | Tipe Input     | Validasi                                   | Wajib  |
|--------------------|----------------|---------------------------------------------|--------|
| Nama Lengkap       | Text           | Min 3 karakter                             | Ya     |
| NIM                | Text           | Format NIM valid                           | Ya     |
| Program Studi      | Dropdown/Text  | Tidak boleh kosong                         | Ya     |
| Angkatan           | Text/Number    | Tahun valid                                | Ya     |
| Jenis Kelamin      | Radio/Select   | Harus dipilih                              | Ya     |
| Nomor Telepon      | Tel            | Format nomor telepon Indonesia             | Ya     |
| Email              | Email          | Format email valid                         | Ya     |
| Motivasi           | Textarea       | Max 500 karakter                           | Tidak  |

> **[KEPUTUSAN DIPERLUKAN]** Field di atas adalah asumsi minimum. Perlu dikonfirmasi oleh pengurus apakah ada field tambahan.

**Perilaku:**

| State                | Tampilan                                                   |
|----------------------|------------------------------------------------------------|
| Default              | Formulir kosong, tombol "Kirim Pendaftaran"                |
| Validasi gagal       | Pesan error di bawah field yang salah (warna merah)        |
| Mengirim (loading)   | Tombol disabled, spinner/loading indicator                 |
| Berhasil             | Pesan sukses: "Pendaftaran berhasil dikirim! Tim kami akan menghubungi Anda." |
| Gagal (server error) | Pesan error: "Terjadi kesalahan. Silakan coba lagi."       |

| Aksi                      | Respons Sistem                                            |
|---------------------------|-----------------------------------------------------------|
| Submit form (valid)       | POST ke `/api/pendaftaran`, tampilkan status               |
| Submit form (invalid)     | Tampilkan pesan validasi, tidak kirim ke server            |
| Klik tombol saat loading  | Tidak ada aksi (disabled)                                  |

**Sumber data:** API `POST /api/pendaftaran`.

**Kriteria Penerimaan:**
- [ ] Formulir menampilkan semua field yang diperlukan.
- [ ] Validasi frontend berjalan sebelum submit.
- [ ] Data terkirim ke API dan tersimpan di database.
- [ ] Pesan sukses atau error ditampilkan sesuai state.
- [ ] Tombol disabled selama loading untuk mencegah double submit.

---

### F-09: Admin — Login (`/admin`)

**Tujuan:** Mengautentikasi admin sebelum mengakses dashboard.

**Elemen:**

| Elemen              | Detail                                       |
|---------------------|----------------------------------------------|
| Heading             | "Login Admin"                                |
| Field Username      | Input teks                                   |
| Field Password      | Input password (hidden)                      |
| Tombol              | "Masuk"                                      |

**Perilaku:**

| Aksi                      | Respons Sistem                                            |
|---------------------------|-----------------------------------------------------------|
| Login berhasil            | Redirect ke `/admin/dashboard`, simpan JWT token           |
| Login gagal               | Pesan error: "Username atau password salah"                |
| Akses `/admin/*` tanpa login | Redirect ke `/admin` (halaman login)                   |

**Sumber data:** API `POST /api/auth/login`.

**Kriteria Penerimaan:**
- [ ] Login berhasil mengarahkan ke dashboard.
- [ ] Login gagal menampilkan pesan error.
- [ ] Halaman admin dilindungi autentikasi.

---

### F-10: Admin — Dashboard (`/admin/dashboard`)

**Tujuan:** Menyediakan ringkasan data dan pintu masuk ke fitur pengelolaan.

**Elemen:**

| Elemen              | Detail                                                 |
|---------------------|--------------------------------------------------------|
| Kartu ringkasan     | Jumlah berita, jumlah pendaftaran baru, jumlah pengurus |
| Menu navigasi       | Kelola Berita, Kelola Struktur, Lihat Pendaftaran       |

**Sumber data:** API endpoints terkait (count query).

---

### F-11: Admin — Kelola Berita (`/admin/berita`)

**Tujuan:** CRUD berita organisasi.

#### Daftar Berita Admin

| Elemen              | Detail                                                 |
|---------------------|--------------------------------------------------------|
| Tabel/daftar        | Judul, kategori, status (draft/published), tanggal      |
| Tombol              | "Buat Berita Baru" → `/admin/berita/buat`               |
| Aksi per baris      | Edit, Hapus                                             |

#### Buat/Edit Berita (`/admin/berita/buat` atau `/admin/berita/[id]`)

| Field              | Tipe Input     | Validasi                | Wajib  |
|--------------------|----------------|--------------------------|--------|
| Judul              | Text           | Min 5 karakter          | Ya     |
| Kategori           | Text/Dropdown  | -                        | Tidak  |
| Ringkasan          | Textarea       | Max 300 karakter         | Tidak  |
| Konten             | Rich text/Markdown editor | Tidak boleh kosong | Ya   |
| Gambar Utama       | File upload    | JPG/PNG/WebP, max 5MB   | Tidak  |
| Caption Gambar     | Text           | -                        | Tidak  |
| Status             | Toggle/Select  | draft atau published     | Ya     |

| Aksi                      | Respons Sistem                                          |
|---------------------------|--------------------------------------------------------|
| Simpan berita              | POST/PUT ke API, redirect ke daftar berita             |
| Hapus berita               | Konfirmasi dialog, DELETE ke API, update daftar        |
| Upload gambar              | Preview gambar sebelum simpan                          |

**Sumber data:** API berita (lihat `architecture.md` bagian 8.1).

**Kriteria Penerimaan:**
- [ ] Admin dapat membuat berita baru.
- [ ] Admin dapat mengedit berita yang ada.
- [ ] Admin dapat menghapus berita (dengan konfirmasi).
- [ ] Slug di-generate otomatis dari judul.
- [ ] Status draft/published berfungsi (hanya published yang tampil di publik).

---

### F-12: Admin — Kelola Struktur (`/admin/struktur`)

**Tujuan:** Mengelola data kepengurusan (pembina, pengurus, divisi).

**Elemen:**

| Section              | Aksi yang Tersedia                                    |
|----------------------|-------------------------------------------------------|
| Pembina              | Lihat, edit, tambah, hapus data pembina               |
| Pimpinan             | Lihat, edit, tambah, hapus data pimpinan              |
| Pengurus Harian      | Lihat, edit, tambah, hapus data pengurus              |
| Divisi               | Lihat, edit, tambah, hapus divisi, anggota, dan tugas |
| Periode              | Lihat, set periode aktif                              |

**Sumber data:** API struktur (lihat `architecture.md` bagian 8.2).

**Kriteria Penerimaan:**
- [ ] Admin dapat memperbarui data pengurus.
- [ ] Admin dapat menambah dan menghapus pengurus.
- [ ] Perubahan data langsung tercermin di halaman publik `/struktur-racana`.

---

### F-13: Admin — Lihat Pendaftaran (`/admin/pendaftaran`)

**Tujuan:** Melihat dan mengelola data calon anggota yang mendaftar.

**Elemen:**

| Elemen                | Detail                                               |
|-----------------------|------------------------------------------------------|
| Tabel daftar          | Nama, NIM, prodi, tanggal daftar, status              |
| Filter                | Status (baru, ditinjau, diterima, ditolak)             |
| Detail                | Klik baris → detail pendaftaran lengkap               |
| Aksi                  | Ubah status, hapus                                    |

| Aksi                      | Respons Sistem                                         |
|---------------------------|--------------------------------------------------------|
| Ubah status               | PUT ke API, update tampilan                             |
| Hapus pendaftaran         | Konfirmasi, DELETE ke API, update daftar                |

**Sumber data:** API pendaftaran (lihat `architecture.md` bagian 8.3).

**Kriteria Penerimaan:**
- [ ] Admin dapat melihat daftar pendaftaran.
- [ ] Admin dapat mengubah status pendaftaran.
- [ ] Filter status berfungsi.

---

## 3. Hubungan Fitur — API — Database

| Fitur                  | Endpoint API                     | Tabel Database                                |
|------------------------|----------------------------------|-----------------------------------------------|
| F-03: Cuplikan berita  | `GET /api/berita?limit=2`        | `berita`                                      |
| F-05: Struktur Racana  | `GET /api/struktur`              | `periode_kepengurusan`, `pembina`, `pengurus`, `divisi`, `anggota_divisi`, `fokus_tugas_divisi` |
| F-06: Daftar berita    | `GET /api/berita`                | `berita`                                      |
| F-07: Detail berita    | `GET /api/berita/:slug`          | `berita`                                      |
| F-08: Pendaftaran      | `POST /api/pendaftaran`          | `pendaftaran`                                 |
| F-09: Login admin      | `POST /api/auth/login`           | `admins`                                      |
| F-11: CRUD berita      | `POST/PUT/DELETE /api/berita`    | `berita`                                      |
| F-12: Kelola struktur  | `PUT/POST/DELETE /api/struktur/*`| `pembina`, `pengurus`, `divisi`, `anggota_divisi`, `fokus_tugas_divisi` |
| F-13: Lihat pendaftaran| `GET/PUT/DELETE /api/pendaftaran` | `pendaftaran`                                 |

---

## 4. State Handling — Pola Umum

Setiap fitur yang mengambil data dari API harus menangani state berikut:

| State       | Tampilan                                                     |
|-------------|--------------------------------------------------------------|
| **Loading** | Skeleton placeholder, spinner, atau teks "Memuat..."         |
| **Berhasil**| Menampilkan data/konten                                      |
| **Kosong**  | Pesan informatif (mis: "Belum ada berita")                   |
| **Error**   | Pesan error yang ramah (mis: "Gagal memuat data. Coba lagi.")|

---

## 5. Aturan Navigasi — Penegasan

> Diulang dari `prd.md` untuk memastikan tidak terlewat saat implementasi.

1. Setiap halaman memiliki **route terpisah** — bukan section dalam satu halaman panjang.
2. Perpindahan halaman menggunakan **routing SvelteKit** — bukan anchor link (`#`).
3. **Scroll di Beranda** hanya menggulir konten Beranda.
4. **Scroll tidak boleh** otomatis menampilkan halaman Profil, Struktur, atau Berita.
5. Klik **logo** → `/`.
6. Klik **menu** → route terkait.
7. Navigasi berfungsi di **desktop dan mobile**.

---

## 6. Prioritas Fitur

| Prioritas | Fitur                                                      |
|-----------|------------------------------------------------------------|
| P0 (Wajib)| Navbar, Footer, Beranda, Profil, Struktur Racana           |
| P0 (Wajib)| Daftar Berita, Detail Berita, Pendaftaran                  |
| P0 (Wajib)| Login Admin, CRUD Berita                                   |
| P1 (Penting)| Dashboard Admin, Kelola Struktur, Lihat Pendaftaran      |
| P2 (Bagus) | Filter/search berita, pagination, animasi/transisi halus  |

---

## 7. Keputusan yang Belum Dipastikan

| No | Keputusan                                                         | Default/Asumsi                    |
|----|-------------------------------------------------------------------|-----------------------------------|
| 1  | Field formulir pendaftaran yang pasti                              | Nama, NIM, prodi, angkatan, jenis kelamin, telepon, email, motivasi |
| 2  | Konten Profil dikelola dari admin atau hardcoded?                 | Hardcoded di frontend             |
| 3  | Kontak "Tanya Kakak Racana" mengarah ke mana?                    | [BELUM DITENTUKAN]                |
| 4  | Apakah halaman Pendaftaran memiliki batas waktu?                  | Tidak ada batas waktu             |
| 5  | Apakah jumlah divisi bisa bertambah?                             | Ya (dinamis dari database)        |
| 6  | Apakah perlu halaman galeri foto terpisah?                       | Tidak (di luar ruang lingkup)     |

---

*Dokumen ini harus konsisten dengan `prd.md`, `design.md`, `architecture.md`, dan `database.md`. Setiap perubahan fitur harus diperbarui di semua dokumen terkait.*
