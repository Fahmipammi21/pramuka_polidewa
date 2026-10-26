# Dokumen Desain UI/UX

## Website Pramuka Polidewa

---

## 1. Identitas Visual dan Karakter Desain

Website Pramuka Polidewa memiliki karakter visual yang kuat berdasarkan empat gambar referensi. Identitas visual didominasi oleh:

- **Warna ungu gelap** sebagai warna utama latar belakang, menciptakan kesan formal, modern, dan profesional.
- **Warna kuning/emas** sebagai warna aksen untuk tombol, footer, dekorasi, badge, dan elemen highlight — mewakili identitas Pramuka.
- **Elemen dekoratif** berupa garis diagonal kuning, ikon tunas kelapa (simbol Pramuka), dan ornamen geometris.
- **Foto organisasi asli** yang menampilkan anggota Pramuka dalam seragam, kegiatan, dan momen organisasi.
- **Tipografi modern** dengan heading besar dan tebal, kontras terhadap latar gelap.

Karakter desain secara keseluruhan: **modern, gelap (dark theme), organisasional, dan beridentitas Pramuka.**

---

## 2. Sistem Warna

> **Catatan:** Nilai hex di bawah ini adalah estimasi berdasarkan observasi gambar referensi. Nilai pasti perlu divalidasi atau disesuaikan saat implementasi.

### Warna Utama

| Nama                  | Estimasi Hex | Penggunaan                                        |
|-----------------------|-------------|---------------------------------------------------|
| Ungu Gelap (Primary)  | `#1a0a2e` ~ `#1e1040` | Latar utama body, navbar, section              |
| Ungu Medium           | `#2d1b4e` ~ `#3a2060` | Latar kartu, section alternatif                |
| Ungu Terang           | `#4a2d7a` ~ `#5a3590` | Hover state, border, aksen sekunder            |
| Kuning/Emas (Accent)  | `#f0c040` ~ `#e8b830` | Footer, tombol, badge, label, dekorasi         |
| Kuning Terang         | `#ffd54f` ~ `#ffe066` | Highlight, ikon, garis dekoratif               |

### Warna Teks

| Nama           | Estimasi Hex | Penggunaan                                    |
|----------------|-------------|-----------------------------------------------|
| Putih           | `#ffffff`   | Teks utama pada latar gelap                   |
| Putih Pudar     | `#c0c0d0` ~ `#b0b0c0` | Teks sekunder, deskripsi, caption    |
| Gelap           | `#1a1a2e` ~ `#2d2d3d` | Teks pada footer kuning                |
| Kuning Teks     | `#f0c040`   | Label, tautan highlight                        |

### Warna Latar Kartu

| Nama           | Estimasi Hex | Penggunaan                                     |
|----------------|-------------|------------------------------------------------|
| Kartu Gelap     | `#1e1040` ~ `#251550` | Kartu berita, kartu profil, kartu divisi |
| Kartu Border    | `#3a2060` ~ `#4a3070` | Border kartu, separator                  |

### Warna Footer

| Nama           | Estimasi Hex | Penggunaan                                     |
|----------------|-------------|------------------------------------------------|
| Kuning Footer   | `#e8b830` ~ `#f0c040` | Latar footer                            |
| Teks Footer     | `#1a1a2e`   | Teks pada footer                               |

---

## 3. Analisis Gambar Referensi

### 3.1 Referensi 1 — Beranda (`Beranda Pramuka Polidewa (Desktop).png`)

**Halaman:** `/` (Beranda)

**Struktur visual dari atas ke bawah:**

1. **Navbar**
   - Latar: ungu gelap.
   - Kiri: logo Pramuka Polidewa (logo bulat) + teks "Pramuka Polidewa" dan subteks "Racana Dewa Raja – Batari".
   - Kanan: menu navigasi teks: Profil, Struktur Racana, Berita, Pendaftaran.
   - Menu "Pendaftaran" menggunakan gaya tombol/pill (latar kuning, teks gelap, border-radius).

2. **Hero Section**
   - Latar: ungu gelap penuh.
   - Kiri atas: badge/label kecil "Pusat Informasi Resmi".
   - Heading utama sangat besar dan tebal: **"PRAMUKA POLIDEWA"**.
   - Subteks: "Racana Dewa Raja – Batari Gugus Depan 04.017 – 04.018".
   - Subteks: "Pangkalan Politeknik Dewantara Palopo".
   - Kotak kuning berisi slogan: *"Satya ku Dharmakan, Dharma ku Baktikan"*.
   - Paragraf deskripsi di bawah slogan.
   - Tombol ajakan: ikon + "Patok Tenda Kamu, Dan Bergabung bersama kami!" (teks kuning).
   - Kanan: foto 2 anggota Pramuka (putra dan putri) dalam seragam Penegak.
   - Elemen dekoratif: garis diagonal kuning besar di sudut kanan atas.

3. **Section Pengenalan Organisasi**
   - Badge/label: "Mengenai Pramuka Polidewa".
   - Heading: **"Membangun Karakter Mahasiswa Melalui Pengabdian Nyata"**.
   - Foto besar anggota organisasi bersama di latar outdoor.
   - Kotak teks overlay di kanan bawah foto: deskripsi organisasi.

4. **Section Berita & Kegiatan**
   - Badge/label: ikon + "Informasi & Berita Kegiatan".
   - Heading: **"Tentang Kegiatan Racana"**.
   - 2 kartu berita berdampingan (grid 2 kolom):
     - Setiap kartu memiliki: foto, judul berita, ringkasan, ikon "Admin Racana", tautan "Baca Selengkapnya →".
   - Kartu dengan latar gelap, sudut membulat.

5. **Section Kolase Foto Anggota**
   - Kumpulan foto anggota dalam komposisi kolase (foto tumpang tindih dan berjajar).
   - Tombol/label: "Ingin Mengenal Lebih Jauh?" dengan ikon.
   - Elemen dekoratif tunas kelapa kuning di kanan bawah.

6. **Section Ajakan Mendaftar**
   - Heading: **"Siap Mengabdi Bersama Racana Dewa Raja – Batari?"**.
   - Paragraf deskripsi ajakan.
   - Tombol pill kuning: ikon + **"Isi Formulir Pendaftaran Sekarang"**.
   - Elemen dekoratif: ikon tunas kelapa kuning di kiri dan kanan.

7. **Footer**
   - Latar: kuning/emas.
   - 4 kolom:
     - **Pramuka Politeknik Dewantara**: deskripsi singkat organisasi, tombol kecil.
     - **Navigasi Halaman**: Beranda, Berita & Kegiatan, Profil Anggota, Struktur Racana, Pendaftaran Anggota Baru.
     - **Pangkalan & Lokasi**: alamat kampus, tanggal berdiri.
     - **Media Sosial**: ikon Instagram dan TikTok.
   - Baris paling bawah: copyright "© 2025 – 2026 Pramuka Politeknik Dewantara …" di kiri, "Politeknik Dewantara Palopo" di kanan.

---

### 3.2 Referensi 2 — Profil Racana (`Profil Sejarah Pramuka Polidewa.png`)

**Halaman:** `/profil`

**Struktur visual dari atas ke bawah:**

1. **Navbar** — Sama dengan Beranda.

2. **Breadcrumb**
   - "Beranda / Profil / Sejarah Racana" — teks kecil di bawah navbar.

3. **Header Halaman**
   - Badge: "🏛 HISTORIOGRAFI RACANA".
   - Heading besar: **"Sejarah & Kilas Balik Racana Dewa Raja – Batari"**.
   - Paragraf deskripsi pengantar.
   - Kotak info di kanan: **"PANGKALAN RESMI"** — Politeknik Dewantara Palopo, alamat, dan info Gugus Depan:
     - Satuan Putra: **Gudep 04.017**
     - Satuan Putri: **Gudep 04.018**

4. **Section Filosofi Nama & Adat**
   - Badge: "🔱 FILOSOFI NAMA & ADAT".
   - Subjudul: *"Marwah Kesatria & Keluhuran Budi"*.
   - Paragraf penjelasan filosofi.
   - 2 kartu identitas Racana berdampingan:
     - **Kartu Kiri — Gugus Depan 04.017 (Satuan Putra)**
       - Ikon: perisai/tameng kuning.
       - Nama: **Racana Dewa Raja**.
       - Deskripsi filosofi.
       - **Dimensi Karakter Kunci:** Kebangsawanan Pemikiran, Kepemimpinan Pengayom, Integritas Perwira.
       - **Pusaka Adat:** Kawali / Badik Gecong Luwu.
     - **Kartu Kanan — Gugus Depan 04.018 (Satuan Putri)**
       - Ikon: mahkota/tiara kuning.
       - Nama: **Racana Batari**.
       - Deskripsi filosofi.
       - **Dimensi Karakter Kunci:** Kemuliaan Budi & Martabat, Kecerdasan Rasa & Naluri Sosial, Kemandirian Berdaya.
       - **Pusaka Adat:** Kipas.

5. **Section Sandi Racana & Pusaka Kehormatan**
   - Deskripsi tentang sandi racana.
   - 2 badge/label: "Taro Ada Taro Gau" dan "Adai Saling Menghormati".

6. **Section Linimasa Kronologis**
   - Badge: "📅 LINIMASA KRONOLOGIS".
   - Subjudul: **"Tonggak Perjalanan & Histori"**.
   - Paragraf pengantar.
   - **Entri 1:** 22 September Tahun 2022
     - Judul: "Awal Inisiasi & Mandat Pembentukan Gugus Depan"
     - Paragraf detail.
     - 2 label: "Audiensi Kwarcab Palopo" dan "Dukungan Senat Polidewa".
     - Label kanan atas: "Musyawarah Awal Mahasiswa".
   - **Entri 2:** 9 MEI 2025
     - Badge: "Hari Lahir Resmi".
     - Judul: "Peresmian Racana Sekaligus Pengesahan SK Pengurus"
     - Paragraf detail tentang penandatanganan berita acara, registrasi nomor Gudep 04.017 (Putra) dan 04.018 (Putri).
     - 2 poin: "Keputusan Kwarcab Palopo" dan "Pencapaian Pusaka Perdana".
     - Label kanan atas: "SK Kwarcab Palopo Terbit".

7. **Section Arsip Sejarah**
   - Badge: "📷 ARSIP SEJARAH".
   - Heading: **"Dokumentasi Tonggak Perjuangan"**.
   - Subjudul kanan: deskripsi arsip.
   - 3 kartu foto dokumentasi berdampingan:
     - Kartu 1: foto pelantikan — "Pelantikan Mabigus & Pengurus Angkatan Pertama Racana Dewa Raja – Batari Pangkalan Politeknik Dewantara".
     - Kartu 2: foto bersama — "Dokumentasi Foto Bareng dan sekaligus peresmian pengurus Racana Pertama".
     - Kartu 3: foto musyawarah — "Musyawarah Perumusan Sandi & Adat Racana".

8. **Section Tinta Sejarah Baru**
   - Badge: "✨ TINTA SEJARAH BARU".
   - Heading: **"Jadilah Bagian dari Tinta Sejarah Selanjutnya di Racana Dewa Raja – Batari"**.
   - Paragraf ajakan.
   - 2 tombol: "🔍 Lihat Struktur Pengurus" dan "📋 Daftar Calon Anggota".

9. **Footer** — Sama dengan Beranda (kuning, 4 kolom).

---

### 3.3 Referensi 3 — Struktur Racana (`Struktur Racana Pramuka Polidewa.png`)

**Halaman:** `/struktur-racana`

**Struktur visual dari atas ke bawah:**

1. **Navbar** — Sama.

2. **Breadcrumb**
   - "Beranda / Struktur Racana / Struktur Racana".

3. **Header Halaman**
   - Badge: "Bagan Kepengurusan Resmi | Gudep 04.017 – 04.018".
   - Heading: **"Struktur Organisasi Dewan Racana"**.
   - Paragraf: "Bagan Kepengurusan Dewan Racana Dewa Raja – Batari Masa Bakti 2025/2026 Gugus Depan 04.017 – 04.018 Pangkalan Politeknik Dewantara Palopo…".
   - 3 info pill/badge di bawah: Masa Bakti Aktif (2025/2026), Struktur Adat & Pembina, Ditetapkan melalui Musyawarah Palopo 9 Mei 2025.

4. **Section Tingkat Penasihat & Pengarah**
   - Label: "TINGKAT PENASIHAT & PENGARAH" + "Majelis Pembimbing & Pembina Gugus Depan".
   - Label kanan: "Pangkalan Politeknik Dewantara Palopo".
   - 3 kartu pembina berdampingan:
     - **Dr. Suaedi, S.Pd., M.Si.** — Kamabigus Pramuka Politeknik Dewantara. Foto avatar (lingkaran). Deskripsi tanggung jawab.
     - **Muh. Fitra Nur Asri S. Kom., M.Kom.** — Pembina Dewa Raja. Foto avatar. Deskripsi tanggung jawab.
     - **Nurul Qisti** — Pembina Batari. Foto avatar (kuning). Deskripsi tanggung jawab.

5. **Garis Koordinasi & Pengesahan Dewan Racana**
   - Badge kuning: "Garis Koordinasi & Pengesahan Dewan Racana".

6. **Section Pimpinan Harian Dewan Racana**
   - Label: "Pimpinan Harian Dewan Racana".
   - Subjudul: "Pengurus Inti Racana Dewa Raja & Racana Batari".
   - Paragraf: "Amanah dwitunggal kepemimpinan satuan putera dan puteri yang menggerakkan ritme kelembagaan, musyawarah, dan keluhuran adat racana."
   - 2 kartu pimpinan berdampingan:
     - **Racana Dewa Raja • 04.017**: **Nabil** — Ketua Dewan Racana Putra (Pradana Putra). Foto. Kutipan. "Teknologi Rekayasa Metalurgi '25" + "Pandega Aktif". Label: PUTRA.
     - **Racana Batari • 04.018**: **Sukni** — Ketua Dewan Racana Putri (Pradana Putri). Foto. Kutipan. "Teknologi Rekayasa Metalurgi '25" + "Pandega Aktif". Label: PUTRI.

7. **Section Pengurus Harian**
   - 4 kartu pengurus berdampingan:
     - **Ujang Miftahuddin** — Penjaga Norma Dewa Raja, Pemangku Adat Pa. Deskripsi tugas. Masa Bakti: 2025/2026.
     - **Nurul Fadilah** — Penjaga Norma Batari, Pemangku Ada Pi. Deskripsi tugas. Masa Bakti: 2025/2026.
     - **Nalla Zalzabilah** — Tata Usaha Gabungan (Sekretaris). Deskripsi tugas. Masa Bakti: 2025/2026.
     - **Aylah Assyurah** — Perbendaharaan Gabungan (Bendahara). Deskripsi tugas. Masa Bakti: 2025/2026.

8. **Section Divisi Pelaksana**
   - Label: "DIVISI PELAKSANA MANDAT" + "Bidang Operasional & Pengembangan".
   - Paragraf deskripsi 4 pilar divisi (pada referensi terlihat 2 divisi):
   - 2 kartu divisi berdampingan:
     - **DIVISI I**: Keilmuan & Evaluasi (Bidang Kepramukaan, Kajian & Evaluasi)
       - Koordinator Bidang: **Nurul Ilma**
       - Anggota: Desnita, Hermawati, Fhina, Suci Ramadhani, Marzyah Rusdianmurtin
       - Fokus Tugas Pokok: Latihan rutin kepramukaan per minggu, Ekspedisi alam/navigasi darat & SAR, Manajemen logistik perkemahan racana.
       - Tautan email.
     - **DIVISI II**: Pengabdian Masyarakat, Pengembangan (Bidang pengabdian Masyarakat, Pengembangan & Humas)
       - Koordinator Bidang: **Nurul Fitrah Amalya**
       - Anggota: Putri Wahyuni, Sitti Soffiya, Rabbayani, Audi, Sumarni.
       - Fokus Tugas Pokok: Kursus Instruktur Muda & KMD, Pengujian SKU Pandega & SKK Khusus, Loka Kerja kepemimpinan mahasiswa.
       - Tautan email.

9. **Section Regenerasi Kepemimpinan Kampus**
   - Badge: "🌱 REGENERASI KEPEMIMPINAN KAMPUS".
   - Heading: **"Siap Menjadi Pemimpin Pramuka Polidewa Selanjutnya?"**.
   - Paragraf ajakan.
   - 2 tombol: "Daftar Calon Anggota Racana →" dan "Tanya Kakak Racana".

10. **Footer** — Sama.

---

### 3.4 Referensi 4 — Berita Racana (`Berita pramuka Polidewa.png`)

**Halaman:** `/berita` atau `/berita/[slug]`

**Struktur visual dari atas ke bawah:**

1. **Navbar** — Sama.

2. **Header Berita**
   - Badge/label: "📢 Pengumuman Resmi & Penerimaan Anggota".
   - Judul berita: **"Penerimaan Anggota Baru Racana Dewa Raja – Batari Tahun 2026/2027 Resmi Dibuka"**.

3. **Foto Utama**
   - Foto besar dokumentasi kegiatan (lebar penuh).
   - Caption di bawah foto: "📷 Dokumentasi Latihan Kepemimpinan Mahasiswa (LKPM) Pengurus 2026/2027" — di kiri.
   - "GUDEP 04.017 – 04.018" — di kanan.

4. **Isi Artikel**
   - Latar: kotak gelap (kartu) dengan padding.
   - Huruf pertama diperbesar (drop cap "P").
   - Beberapa paragraf isi berita.
   - Subjudul di dalam artikel: "Jadwal dan Persyaratan Pendaftaran".

5. **Section Berita & Agenda Lainnya**
   - Badge: "📋 Pilihan Redaksi".
   - Heading kiri: **"Berita & Agenda Lainnya"**.
   - Tautan kanan: "Lihat Semua Berita →".
   - Kartu berita lain:
     - Foto besar kegiatan seminar.
     - Label: "SEMINAR SE-KOTA PALOPO".
     - Judul: "Seminar Pramuka Penegak & Pandega Se-Kota Palopo Tahun…".
     - Ringkasan teks.
     - Tanggal: "12 Mei 2025".
     - Tautan: "Baca →".

6. **Footer** — Sama.

**Catatan desain:** Halaman ini menampilkan **detail artikel berita**, bukan daftar berita. Dibutuhkan juga halaman daftar berita yang belum ada referensi desainnya. Untuk daftar berita, gunakan gaya kartu yang konsisten dengan kartu berita di Beranda dan section "Berita & Agenda Lainnya" pada halaman ini.

---

## 4. Struktur Visual Per Halaman — Ringkasan

| Halaman            | Section Utama                                                                                  |
|--------------------|------------------------------------------------------------------------------------------------|
| Beranda `/`        | Navbar → Hero → Pengenalan Organisasi → Berita & Kegiatan → Kolase Foto → Ajakan Mendaftar → Footer |
| Profil `/profil`   | Navbar → Breadcrumb → Header Sejarah → Filosofi & Adat → Kartu Identitas Racana → Sandi Racana → Linimasa → Arsip Sejarah → Tinta Sejarah Baru → Footer |
| Struktur `/struktur-racana` | Navbar → Breadcrumb → Header Struktur → Penasihat & Pembina → Garis Koordinasi → Pimpinan Harian → Pengurus Harian → Divisi Pelaksana → Regenerasi → Footer |
| Berita `/berita/[slug]` | Navbar → Header Berita → Foto Utama → Isi Artikel → Berita Lainnya → Footer                     |
| Pendaftaran `/pendaftaran` | Navbar → Header Pendaftaran → Formulir → Footer (desain mengikuti karakter visual yang konsisten, belum ada referensi gambar) |

---

## 5. Tipografi dan Hierarki Teks

> **Catatan:** Font family pasti belum ditentukan dari referensi. Estimasi berdasarkan observasi: font sans-serif modern (kemungkinan Poppins, Inter, atau font serupa). Perlu divalidasi.

### Hierarki

| Level                 | Estimasi Ukuran (Desktop) | Berat   | Contoh Penggunaan                          |
|-----------------------|--------------------------|---------|---------------------------------------------|
| Heading Utama (H1)    | ~40–56px                 | 800–900 | "PRAMUKA POLIDEWA", judul halaman          |
| Heading Sekunder (H2) | ~28–36px                 | 700     | Judul section                              |
| Heading Tersier (H3)  | ~20–24px                 | 600–700 | Subjudul, nama kartu                       |
| Body Text             | ~14–16px                 | 400     | Paragraf, deskripsi                        |
| Caption / Label       | ~12–14px                 | 400–500 | Badge, breadcrumb, keterangan foto         |
| Badge / Pill          | ~12–13px                 | 500–600 | Label kategori, status                     |

### Aturan Tipografi

- Heading menggunakan huruf kapital atau title case sesuai referensi.
- "PRAMUKA POLIDEWA" di hero section menggunakan huruf kapital semua (uppercase).
- Body text menggunakan sentence case normal.
- Warna teks utama putih pada latar gelap.
- Warna teks pada footer adalah gelap pada latar kuning.

---

## 6. Spacing, Container, Kartu, Border, dan Radius

### Container

- Lebar maksimum konten: estimasi ~1200px (perlu validasi).
- Padding horizontal container: ~24–40px.
- Centering horizontal.

### Spacing

- Jarak antar section vertikal: ~60–100px.
- Jarak antar elemen dalam section: ~16–32px.
- Padding dalam kartu: ~20–32px.

### Kartu (Card)

- Latar: ungu medium/gelap.
- Border: tipis, warna ungu terang atau transparan.
- Border radius: ~12–16px (sudut membulat).
- Beberapa kartu memiliki aksen/border kuning (terutama kartu pimpinan dan divisi).

### Badge / Pill

- Latar: transparan atau semi-transparan.
- Border: tipis, warna kuning atau putih.
- Border radius: ~20–30px (pill shape).
- Padding: ~6–12px horizontal, ~4–8px vertikal.
- Teks: kecil, uppercase atau small caps, kuning atau putih.

---

## 7. Navbar

### Desktop

- Posisi: fixed atau sticky di atas.
- Latar: ungu gelap.
- Kiri: logo bulat Pramuka + teks "Pramuka Polidewa" + subteks "Racana Dewa Raja – Batari".
- Kanan: menu teks (Profil, Struktur Racana, Berita) + tombol "Pendaftaran" (pill kuning).
- Klik logo → route `/`.
- Klik menu → route terkait.

### Mobile

- Hamburger menu icon di kanan.
- Menu dropdown atau sidebar saat hamburger diklik.
- Logo tetap tampil di kiri.
- Menu item sama dengan desktop.

### Perilaku

- Menu aktif ditandai secara visual (misalnya underline, warna berbeda, atau bold).
- Hover pada menu: perubahan warna atau opacity.
- Transisi halus saat menu mobile dibuka/ditutup.

---

## 8. Footer

### Struktur

- Latar: kuning/emas penuh.
- 4 kolom pada desktop:
  1. **Pramuka Politeknik Dewantara** — deskripsi, tombol kecil.
  2. **Navigasi Halaman** — daftar tautan halaman.
  3. **Pangkalan & Lokasi** — alamat, tanggal berdiri.
  4. **Media Sosial** — ikon Instagram dan TikTok.
- Baris copyright di bawah.

### Responsivitas Footer

- Tablet: 2 kolom.
- Mobile: 1 kolom, vertikal.

---

## 9. Aturan Responsivitas

### Breakpoint

| Kategori | Lebar            | Perilaku                                              |
|----------|------------------|-------------------------------------------------------|
| Desktop  | ≥ 1024px         | Layout penuh, grid multi-kolom, navbar horizontal     |
| Tablet   | 768px – 1023px   | Grid 2 kolom, spacing dikurangi                       |
| Mobile   | < 768px          | Grid 1 kolom, navbar hamburger, kartu full-width      |

### Aturan Responsive Per Elemen

| Elemen             | Desktop                  | Tablet          | Mobile           |
|--------------------|--------------------------|-----------------|------------------|
| Navbar             | Horizontal menu          | Horizontal menu | Hamburger        |
| Hero Section       | Teks kiri + foto kanan   | Teks atas + foto bawah | Stack vertikal |
| Kartu Berita       | Grid 2 kolom             | Grid 2 kolom    | Stack 1 kolom    |
| Kartu Pembina      | Grid 3 kolom             | Grid 2 kolom    | Stack 1 kolom    |
| Kartu Pimpinan     | Grid 2 kolom             | Grid 2 kolom    | Stack 1 kolom    |
| Kartu Pengurus     | Grid 4 kolom             | Grid 2 kolom    | Stack 1 kolom    |
| Kartu Divisi       | Grid 2 kolom             | Grid 1 kolom    | Stack 1 kolom    |
| Footer             | Grid 4 kolom             | Grid 2 kolom    | Stack 1 kolom    |
| Galeri Arsip       | Grid 3 kolom             | Grid 2 kolom    | Stack 1 kolom    |
| Linimasa           | Layout horizontal/card   | Stack vertikal  | Stack vertikal   |

---

## 10. Perilaku Navigasi, Hover, Focus, dan Interaksi

### Navigasi

- Transisi antar halaman menggunakan routing SvelteKit (bukan anchor scroll).
- Saat halaman berpindah, scroll kembali ke atas.
- Breadcrumb pada halaman Profil dan Struktur Racana.

### Hover

- Menu navbar: perubahan opacity atau warna.
- Tombol: perubahan brightness atau shadow.
- Kartu berita: subtle lift (transform scale atau shadow).
- Tautan "Baca Selengkapnya": perubahan warna atau underline.

### Focus (Keyboard)

- Outline atau ring yang terlihat pada elemen interaktif saat fokus keyboard.
- Tab order yang logis: navbar → konten utama → footer.

### Loading State

- Indikator loading saat fetch data dari API.
- Skeleton placeholder atau spinner.

### Scroll

- Smooth scroll di dalam halaman.
- Scroll **tidak** memunculkan halaman lain.

---

## 11. Komponen UI Bersama

Komponen yang digunakan pada lebih dari satu halaman:

| Komponen         | Digunakan Di                              | Deskripsi                                          |
|------------------|-------------------------------------------|----------------------------------------------------|
| Navbar           | Semua halaman                             | Navigasi utama dengan logo dan menu                |
| Footer           | Semua halaman                             | Footer kuning dengan 4 kolom informasi             |
| Badge/Pill       | Semua halaman                             | Label kategori, status, heading marker             |
| Button           | Beranda, Profil, Struktur, Pendaftaran    | Tombol pill kuning dengan ikon                     |
| Card             | Beranda, Profil, Struktur, Berita         | Container konten dengan border radius              |
| Breadcrumb       | Profil, Struktur                          | Navigasi hierarkis                                 |
| NewsCard         | Beranda, Berita                           | Kartu cuplikan berita dengan foto dan ringkasan    |

---

## 12. Panduan Penggunaan Foto dan Aset

### Foto Organisasi

- Gunakan foto asli yang disediakan oleh organisasi.
- Foto yang terlihat di gambar referensi harus direproduksi menggunakan aset yang sama.
- **Jangan** mengganti foto organisasi dengan gambar stok, gambar AI, atau placeholder visual tanpa persetujuan.
- Jika foto belum tersedia, gunakan placeholder dengan label `[FOTO DIPERLUKAN]`.

### Logo

- Logo Pramuka Polidewa berbentuk bulat, digunakan di navbar dan footer.
- File logo harus disediakan oleh organisasi.
- Jika belum tersedia, tandai sebagai `[LOGO DIPERLUKAN]`.

### Ikon

- Ikon tunas kelapa (simbol Pramuka) digunakan sebagai elemen dekoratif.
- Ikon UI (hamburger, panah, dll.) menggunakan icon library yang konsisten (misalnya Lucide atau Heroicons).

### Format dan Optimasi

- Gambar disimpan dalam format modern (WebP atau AVIF jika didukung, fallback ke PNG/JPG).
- Lazy loading untuk gambar di bawah fold.
- Ukuran responsif dengan `srcset` atau pendekatan SvelteKit yang sesuai.

---

## 13. Larangan Desain

1. **Jangan** mengubah identitas warna ungu-kuning menjadi warna lain.
2. **Jangan** menjadikan semua halaman sebagai satu landing page panjang.
3. **Jangan** mengganti desain halaman menjadi template dashboard atau admin generik untuk halaman publik.
4. **Jangan** menghilangkan elemen dekoratif khas (garis diagonal kuning, tunas kelapa).
5. **Jangan** mengarang data organisasi (nama pengurus, sejarah, alamat, kontak).
6. **Jangan** mengganti foto organisasi tanpa persetujuan.
7. **Jangan** menggunakan font default browser tanpa menetapkan font family yang konsisten.
8. **Jangan** membuat perubahan desain besar tanpa merujuk kembali ke gambar referensi.

---

*Dokumen ini harus dibaca bersama `prd.md` untuk memahami kebutuhan produk dan `fitur.md` untuk memahami perilaku setiap elemen.*
