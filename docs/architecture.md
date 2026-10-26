# Dokumen Arsitektur Teknis

## Website Pramuka Polidewa

---

## 1. Gambaran Arsitektur Sistem

Website Pramuka Polidewa menggunakan arsitektur **client-server** dengan pemisahan frontend dan backend:

```
┌─────────────────┐       HTTP/REST        ┌──────────────────┐       SQL         ┌────────────────┐
│                 │  ──────────────────►    │                  │ ───────────────►  │                │
│   SvelteKit     │                         │   Express.js     │                   │  PostgreSQL    │
│   (Frontend)    │  ◄──────────────────    │   (Backend API)  │ ◄───────────────  │  (Database)    │
│                 │       JSON Response     │                  │    Query Result   │                │
└─────────────────┘                         └──────────────────┘                   └────────────────┘
     Port 5173                                   Port 3000                              Port 5432
   (development)                              (development)                          (default)
```

### Prinsip Utama

1. **Frontend dan backend adalah dua aplikasi terpisah** dalam satu monorepo.
2. Frontend bertanggung jawab atas tampilan, navigasi, interaksi, dan pengiriman HTTP request ke API.
3. Backend bertanggung jawab atas logika bisnis, validasi server-side, autentikasi, dan akses database.
4. Frontend **tidak** mengakses database secara langsung.
5. Kredensial database **hanya** berada di environment backend.
6. Komunikasi menggunakan **REST API** dengan format JSON.

---

## 2. Teknologi Stack

| Layer      | Teknologi                | Versi (Rekomendasi)       | Keterangan                        |
|------------|--------------------------|---------------------------|-----------------------------------|
| Frontend   | SvelteKit                | Latest stable (Svelte 5)  | SSR + CSR                         |
| Frontend   | TypeScript               | ≥ 5.x                    | Type safety                       |
| Frontend   | CSS                      | Native (scoped di Svelte) | Styling per komponen              |
| Backend    | Node.js                  | ≥ 20 LTS                  | Runtime                           |
| Backend    | Express.js               | ≥ 4.x                    | HTTP framework                    |
| Backend    | TypeScript               | ≥ 5.x                    | Opsional, direkomendasikan        |
| ORM        | Prisma                   | Latest stable              | Query builder + migrasi skema     |
| Database   | PostgreSQL               | ≥ 15                      | Database relasional               |
| Auth       | JWT (jsonwebtoken)       | -                         | Autentikasi admin                 |
| Validation | Zod atau Joi             | -                         | Validasi input                    |
| Upload     | Multer                   | -                         | Upload gambar (jika dibutuhkan)   |

### Alasan Pemilihan Prisma sebagai ORM

- **Type-safe queries:** Prisma menghasilkan tipe TypeScript otomatis dari skema database.
- **Migration management:** Prisma Migrate mengelola evolusi skema database.
- **Mudah dipelajari:** Sintaks deklaratif, dokumentasi lengkap.
- **Cocok untuk skala proyek ini:** Tidak over-engineering, cukup untuk website organisasi.

> **[KEPUTUSAN DIPERLUKAN]** Apakah backend menggunakan TypeScript atau JavaScript? Rekomendasi: TypeScript untuk konsistensi dengan frontend. Asumsi saat ini: TypeScript.

---

## 3. Struktur Folder

### 3.1 Root Proyek

```
website_pramukapolidewa/
├── docs/                           # Dokumentasi proyek
│   ├── prd.md
│   ├── design.md
│   ├── architecture.md
│   ├── database.md
│   └── fitur.md
├── frontend/                       # Aplikasi SvelteKit
├── backend/                        # API Express.js
├── Reference/                      # Gambar referensi desain
└── README.md
```

### 3.2 Frontend (SvelteKit)

```
frontend/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── global/             # Komponen digunakan di banyak halaman
│   │   │   │   ├── Navbar.svelte
│   │   │   │   ├── Footer.svelte
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Badge.svelte
│   │   │   │   ├── Breadcrumb.svelte
│   │   │   │   └── Card.svelte
│   │   │   ├── beranda/            # Komponen khusus Beranda
│   │   │   │   ├── HeroSection.svelte
│   │   │   │   ├── AboutSection.svelte
│   │   │   │   ├── NewsPreview.svelte
│   │   │   │   ├── PhotoCollage.svelte
│   │   │   │   └── CtaSection.svelte
│   │   │   ├── profil/             # Komponen khusus Profil
│   │   │   │   ├── ProfilHeader.svelte
│   │   │   │   ├── FilosofiSection.svelte
│   │   │   │   ├── RacanaCard.svelte
│   │   │   │   ├── SandiRacana.svelte
│   │   │   │   ├── Timeline.svelte
│   │   │   │   └── ArsipGallery.svelte
│   │   │   ├── struktur/           # Komponen khusus Struktur
│   │   │   │   ├── StrukturHeader.svelte
│   │   │   │   ├── PembinaCard.svelte
│   │   │   │   ├── PimpinanCard.svelte
│   │   │   │   ├── PengurusCard.svelte
│   │   │   │   └── DivisiCard.svelte
│   │   │   ├── berita/             # Komponen khusus Berita
│   │   │   │   ├── ArticleHeader.svelte
│   │   │   │   ├── ArticleContent.svelte
│   │   │   │   └── NewsCard.svelte
│   │   │   └── pendaftaran/        # Komponen khusus Pendaftaran
│   │   │       ├── RegistrationForm.svelte
│   │   │       └── FormField.svelte
│   │   ├── services/               # Fungsi untuk memanggil API backend
│   │   │   ├── api.ts              # Base API client (fetch wrapper)
│   │   │   ├── berita.ts
│   │   │   ├── struktur.ts
│   │   │   └── pendaftaran.ts
│   │   ├── types/                  # Definisi TypeScript types/interfaces
│   │   │   └── index.ts
│   │   └── utils/                  # Fungsi utilitas umum
│   │       └── index.ts
│   ├── routes/
│   │   ├── +layout.svelte          # Layout utama (Navbar + Footer)
│   │   ├── +page.svelte            # Beranda (/)
│   │   ├── profil/
│   │   │   └── +page.svelte        # Profil Racana (/profil)
│   │   ├── struktur-racana/
│   │   │   └── +page.svelte        # Struktur Racana (/struktur-racana)
│   │   ├── berita/
│   │   │   ├── +page.svelte        # Daftar Berita (/berita)
│   │   │   └── [slug]/
│   │   │       └── +page.svelte    # Detail Berita (/berita/[slug])
│   │   ├── pendaftaran/
│   │   │   └── +page.svelte        # Pendaftaran (/pendaftaran)
│   │   └── admin/
│   │       ├── +layout.svelte      # Layout admin (tanpa Navbar/Footer publik)
│   │       ├── +page.svelte        # Login admin
│   │       ├── dashboard/
│   │       │   └── +page.svelte    # Dashboard utama
│   │       ├── berita/
│   │       │   ├── +page.svelte    # Daftar berita admin
│   │       │   ├── buat/
│   │       │   │   └── +page.svelte
│   │       │   └── [id]/
│   │       │       └── +page.svelte # Edit berita
│   │       ├── struktur/
│   │       │   └── +page.svelte    # Kelola struktur
│   │       └── pendaftaran/
│   │           └── +page.svelte    # Lihat pendaftaran
│   └── app.html
├── static/
│   ├── images/                     # Gambar statis (logo, dekorasi)
│   └── favicon.png
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### 3.3 Backend (Express.js)

```
backend/
├── src/
│   ├── routes/                     # Definisi endpoint API
│   │   ├── index.ts                # Router utama
│   │   ├── berita.routes.ts
│   │   ├── struktur.routes.ts
│   │   ├── pendaftaran.routes.ts
│   │   └── auth.routes.ts
│   ├── controllers/                # Handler logika request-response
│   │   ├── berita.controller.ts
│   │   ├── struktur.controller.ts
│   │   ├── pendaftaran.controller.ts
│   │   └── auth.controller.ts
│   ├── services/                   # Logika bisnis
│   │   ├── berita.service.ts
│   │   ├── struktur.service.ts
│   │   ├── pendaftaran.service.ts
│   │   └── auth.service.ts
│   ├── middleware/                  # Middleware Express
│   │   ├── auth.middleware.ts       # Verifikasi JWT
│   │   ├── validate.middleware.ts   # Validasi input
│   │   └── error.middleware.ts      # Error handler global
│   ├── validators/                 # Skema validasi (Zod/Joi)
│   │   ├── berita.validator.ts
│   │   ├── pendaftaran.validator.ts
│   │   └── auth.validator.ts
│   ├── config/                     # Konfigurasi
│   │   ├── database.ts             # Koneksi Prisma
│   │   └── env.ts                  # Environment variables
│   ├── utils/                      # Utilitas
│   │   └── index.ts
│   └── app.ts                      # Express app setup
├── prisma/
│   ├── schema.prisma               # Skema database Prisma
│   └── seed.ts                     # Data awal (jika diperlukan)
├── uploads/                        # Folder upload gambar (jika ada)
├── tsconfig.json
├── .env.example
└── package.json
```

---

## 4. Pembagian Tanggung Jawab

### Frontend (SvelteKit)

| Tanggung Jawab                        | Detail                                               |
|---------------------------------------|------------------------------------------------------|
| Rendering halaman                     | SSR untuk halaman publik, CSR untuk interaksi dinamis |
| Routing                               | File-based routing SvelteKit                         |
| Komponen UI                           | Komponen Svelte terstruktur per halaman/fitur         |
| Fetch data API                        | Melalui service layer (`$lib/services/`)              |
| Validasi input (client-side)          | Sebelum mengirim ke API                              |
| State management                      | Svelte stores jika diperlukan (admin session, dll.)   |
| Responsive layout                     | CSS media queries                                    |
| SEO                                   | Meta tags, semantic HTML, heading hierarchy           |

### Backend (Express.js)

| Tanggung Jawab                        | Detail                                               |
|---------------------------------------|------------------------------------------------------|
| REST API endpoints                    | Menyajikan data JSON ke frontend                     |
| Validasi input (server-side)          | Zod/Joi sebelum memproses request                    |
| Logika bisnis                         | Service layer                                        |
| Autentikasi                           | JWT untuk admin                                      |
| Akses database                        | Melalui Prisma ORM                                   |
| Upload file                           | Multer untuk gambar berita/pengurus                   |
| Error handling                        | Middleware error handler global                      |
| Keamanan                              | CORS, rate limiting, input sanitasi                  |

---

## 5. Pola Komponen SvelteKit

### Layout Bersama

```
+layout.svelte (root)
├── Navbar
├── <slot /> (konten halaman)
└── Footer
```

Halaman admin menggunakan layout terpisah (`/admin/+layout.svelte`) tanpa Navbar dan Footer publik.

### Alur Data Komponen

```
+page.svelte (halaman)
  └── load() function → memanggil service → fetch API backend
  └── Template menggunakan komponen dari $lib/components/
```

### Konvensi

- Komponen menggunakan PascalCase: `HeroSection.svelte`, `NewsCard.svelte`.
- Komponen menerima data melalui props.
- Styling menggunakan scoped CSS di dalam tag `<style>` setiap komponen.
- Global styles di `app.css` untuk reset, font, dan CSS custom properties (variabel warna).

---

## 6. Alur Permintaan (Request Flow)

### Halaman Publik — Contoh: Membuka Daftar Berita

```
1. User mengakses /berita
2. SvelteKit menjalankan +page.ts load() function
3. load() memanggil beritaService.getAll() dari $lib/services/berita.ts
4. beritaService melakukan fetch('http://backend:3000/api/berita')
5. Express.js menerima request di berita.routes.ts
6. Route memanggil beritaController.getAll()
7. Controller memanggil beritaService.getAll()
8. Service menggunakan Prisma client untuk query PostgreSQL
9. Data dikembalikan sebagai JSON response
10. SvelteKit menerima data dan merender halaman
```

### Halaman Admin — Contoh: Admin Membuat Berita Baru

```
1. Admin mengisi form berita dan klik Simpan
2. Frontend mengirim POST /api/berita dengan body JSON + JWT token di header
3. Express.js middleware auth memverifikasi JWT
4. Middleware validate memvalidasi body request
5. Controller memanggil service untuk menyimpan berita
6. Service menggunakan Prisma untuk INSERT ke PostgreSQL
7. Response success dikembalikan
8. Frontend menampilkan pesan sukses dan redirect ke daftar berita
```

---

## 7. Konvensi Routing Frontend

| Route                  | File SvelteKit                              | Deskripsi                    |
|------------------------|---------------------------------------------|------------------------------|
| `/`                    | `src/routes/+page.svelte`                   | Beranda                     |
| `/profil`              | `src/routes/profil/+page.svelte`            | Profil Racana                |
| `/struktur-racana`     | `src/routes/struktur-racana/+page.svelte`   | Struktur Racana              |
| `/berita`              | `src/routes/berita/+page.svelte`            | Daftar Berita                |
| `/berita/[slug]`       | `src/routes/berita/[slug]/+page.svelte`     | Detail Berita                |
| `/pendaftaran`         | `src/routes/pendaftaran/+page.svelte`       | Pendaftaran Anggota          |
| `/admin`               | `src/routes/admin/+page.svelte`             | Login Admin                  |
| `/admin/dashboard`     | `src/routes/admin/dashboard/+page.svelte`   | Dashboard Admin              |
| `/admin/berita`        | `src/routes/admin/berita/+page.svelte`      | Kelola Berita                |
| `/admin/berita/buat`   | `src/routes/admin/berita/buat/+page.svelte` | Buat Berita Baru             |
| `/admin/berita/[id]`   | `src/routes/admin/berita/[id]/+page.svelte` | Edit Berita                  |
| `/admin/struktur`      | `src/routes/admin/struktur/+page.svelte`    | Kelola Struktur              |
| `/admin/pendaftaran`   | `src/routes/admin/pendaftaran/+page.svelte` | Lihat Pendaftaran            |

**Aturan kritis:**
- Setiap route adalah halaman terpisah, bukan anchor section.
- Navigasi menggunakan `<a href="/profil">` atau SvelteKit `goto()`.
- **Tidak boleh** menggunakan `<a href="#profil">` untuk navigasi antar halaman.

---

## 8. Gambaran Endpoint REST API

### 8.1 Berita

| Method | Endpoint                | Auth   | Deskripsi                         |
|--------|-------------------------|--------|-----------------------------------|
| GET    | `/api/berita`           | Tidak  | Daftar berita (publik, paginated) |
| GET    | `/api/berita/:slug`     | Tidak  | Detail berita berdasarkan slug    |
| POST   | `/api/berita`           | Admin  | Buat berita baru                  |
| PUT    | `/api/berita/:id`       | Admin  | Edit berita                       |
| DELETE | `/api/berita/:id`       | Admin  | Hapus berita                      |

### 8.2 Struktur Kepengurusan

| Method | Endpoint                      | Auth   | Deskripsi                              |
|--------|-------------------------------|--------|----------------------------------------|
| GET    | `/api/struktur`               | Tidak  | Data struktur kepengurusan aktif       |
| GET    | `/api/struktur/pembina`       | Tidak  | Data pembina                           |
| GET    | `/api/struktur/pimpinan`      | Tidak  | Data pimpinan harian                   |
| GET    | `/api/struktur/pengurus`      | Tidak  | Data pengurus harian                   |
| GET    | `/api/struktur/divisi`        | Tidak  | Data divisi pelaksana                  |
| PUT    | `/api/struktur/pengurus/:id`  | Admin  | Update data pengurus                   |
| POST   | `/api/struktur/pengurus`      | Admin  | Tambah pengurus                        |
| DELETE | `/api/struktur/pengurus/:id`  | Admin  | Hapus pengurus                         |

### 8.3 Pendaftaran

| Method | Endpoint                    | Auth   | Deskripsi                              |
|--------|-----------------------------|--------|----------------------------------------|
| POST   | `/api/pendaftaran`          | Tidak  | Kirim formulir pendaftaran             |
| GET    | `/api/pendaftaran`          | Admin  | Daftar pendaftaran masuk               |
| GET    | `/api/pendaftaran/:id`      | Admin  | Detail satu pendaftaran                |
| DELETE | `/api/pendaftaran/:id`      | Admin  | Hapus pendaftaran                      |

### 8.4 Autentikasi

| Method | Endpoint                | Auth   | Deskripsi                              |
|--------|-------------------------|--------|----------------------------------------|
| POST   | `/api/auth/login`       | Tidak  | Login admin, mendapat JWT token        |
| POST   | `/api/auth/logout`      | Admin  | Invalidasi token (opsional)            |
| GET    | `/api/auth/me`          | Admin  | Cek session/admin yang sedang login    |

---

## 9. Penanganan Error dan Validasi

### Frontend

- Validasi input formulir sebelum submit (required fields, format email, panjang teks).
- Menangani HTTP error dari API (4xx, 5xx) dan menampilkan pesan yang sesuai.
- State: loading, success, error untuk setiap operasi async.

### Backend

- Middleware validasi menggunakan Zod/Joi pada setiap endpoint yang menerima body.
- Error handler global di Express untuk menangkap error yang tidak tertangani.
- Response error konsisten:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Deskripsi error yang jelas",
    "details": []
  }
}
```

- Response sukses konsisten:

```json
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 10 }
}
```

---

## 10. Konfigurasi Environment

### Backend `.env`

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/pramuka_polidewa

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:5173

# Upload (jika dibutuhkan)
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### Frontend `.env`

```env
# API Backend URL
PUBLIC_API_URL=http://localhost:3000/api
```

**Aturan:**
- File `.env` **tidak** boleh di-commit ke repository. Sediakan `.env.example`.
- Kredensial database **hanya** ada di environment backend.
- Frontend hanya memiliki `PUBLIC_API_URL` (prefix `PUBLIC_` agar diizinkan oleh SvelteKit).

---

## 11. Keamanan API dan Autentikasi

### Autentikasi Admin (JWT)

1. Admin login dengan username + password.
2. Backend memverifikasi kredensial terhadap database (password di-hash dengan bcrypt).
3. Jika valid, backend menghasilkan JWT token.
4. Frontend menyimpan token (httpOnly cookie atau localStorage — **[KEPUTUSAN DIPERLUKAN]**).
5. Setiap request ke endpoint admin menyertakan token di header `Authorization: Bearer <token>`.
6. Middleware `auth.middleware.ts` memverifikasi token pada setiap endpoint admin.

### Keamanan Umum

| Aspek            | Implementasi                                              |
|------------------|-----------------------------------------------------------|
| CORS             | Hanya mengizinkan origin frontend                        |
| Rate Limiting    | Middleware rate limiter pada endpoint sensitif (login, pendaftaran) |
| Input Sanitasi   | Semua input dari user di-sanitasi sebelum diproses        |
| SQL Injection    | Dicegah oleh Prisma (parameterized queries)              |
| XSS              | Svelte secara default melakukan HTML escaping             |
| Password Hashing | bcrypt atau argon2                                        |
| File Upload      | Validasi tipe file, ukuran maksimum, nama file aman      |

---

## 12. Penanganan File/Gambar

### Kebutuhan Upload

- Foto untuk berita (gambar utama artikel).
- Foto pengurus (jika dikelola dari admin).

### Strategi

- Upload melalui API backend menggunakan Multer.
- File disimpan di folder `backend/uploads/` (development).
- Untuk production, pertimbangkan cloud storage (misalnya Cloudinary atau S3) — **[KEPUTUSAN DIPERLUKAN]**.
- Backend menyajikan file statis melalui Express static middleware.
- Validasi: tipe file (JPG, PNG, WebP), ukuran maksimum (5MB).

---

## 13. Strategi Pengujian

### Frontend

| Tipe           | Tools                     | Cakupan                                  |
|----------------|---------------------------|------------------------------------------|
| Unit Test      | Vitest                    | Fungsi utilitas, services                |
| Component Test | Vitest + Testing Library  | Komponen UI kritis                       |
| E2E Test       | Playwright (opsional)     | Alur navigasi, formulir pendaftaran      |

### Backend

| Tipe           | Tools                     | Cakupan                                  |
|----------------|---------------------------|------------------------------------------|
| Unit Test      | Vitest atau Jest          | Services, validators                     |
| Integration    | Supertest                 | Endpoint API                             |

### Prioritas Pengujian

1. **Kritis:** Navigasi antar halaman, formulir pendaftaran, autentikasi admin.
2. **Penting:** CRUD berita, tampilan struktur kepengurusan.
3. **Bagus untuk dimiliki:** Responsivitas, aksesibilitas.

---

## 14. Deployment

### Gambaran Lingkungan

| Lingkungan   | Tujuan                                | Database                |
|--------------|---------------------------------------|-------------------------|
| Development  | Pengembangan lokal                    | PostgreSQL lokal        |
| Production   | Website live                          | PostgreSQL managed/VPS  |

### Opsi Deployment

> **[KEPUTUSAN DIPERLUKAN]** Platform hosting belum ditentukan. Berikut opsi yang masuk akal:

| Opsi              | Frontend              | Backend              | Database              |
|-------------------|-----------------------|----------------------|-----------------------|
| VPS (Satu Server) | Node.js + PM2         | Node.js + PM2        | PostgreSQL di server  |
| Vercel + Railway   | Vercel (SvelteKit)    | Railway (Express)    | Railway PostgreSQL    |
| Manual VPS         | Nginx reverse proxy   | PM2 process manager  | PostgreSQL lokal      |

### Proses Build

- **Frontend:** `npm run build` → menghasilkan build SvelteKit (adapter-node).
- **Backend:** `npx tsc` → compile TypeScript ke JavaScript.
- **Database:** `npx prisma migrate deploy` → menjalankan migrasi.

---

## 15. Prinsip Arsitektur

### Yang Diterapkan

1. **Separation of Concerns:** Frontend, backend, dan database memiliki tanggung jawab terpisah.
2. **Component-Based UI:** Frontend menggunakan komponen Svelte yang modular.
3. **Layered Architecture (Backend):** Routes → Controllers → Services → Prisma (Data Access).
4. **Convention over Configuration:** Menggunakan konvensi penamaan dan struktur folder yang konsisten.
5. **Environment-Based Configuration:** Konfigurasi sensitif di `.env`, bukan di kode.

### Yang Tidak Diterapkan (dengan alasan)

1. **Microservices:** Tidak diperlukan — website organisasi dengan traffic rendah-menengah.
2. **CQRS / Event Sourcing:** Tidak diperlukan — operasi CRUD sederhana.
3. **Domain-Driven Design:** Terlalu kompleks untuk ruang lingkup ini.
4. **GraphQL:** REST API cukup untuk kebutuhan saat ini.
5. **Repository Pattern terpisah:** Prisma sudah berfungsi sebagai data access layer, tidak perlu abstraksi tambahan.

---

*Dokumen ini harus dibaca bersama `prd.md` untuk kebutuhan produk, `design.md` untuk rancangan UI, `database.md` untuk skema database, dan `fitur.md` untuk perilaku fitur.*
