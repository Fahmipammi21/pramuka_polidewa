# Website Pramuka Polidewa

**UKM Pramuka Politeknik Dewantara — Racana Dewa Raja–Batari**

Website resmi organisasi Pramuka Politeknik Dewantara Palopo yang menyediakan informasi profil Racana, sejarah organisasi, struktur kepengurusan, warta kegiatan, serta pendaftaran anggota baru.

---

## Teknologi Utama

| Komponen  | Teknologi |
|-----------|-----------|
| Frontend  | SvelteKit (Svelte 5 Runes, TypeScript, Vite) |
| Backend   | Node.js + Express.js (TypeScript) |
| Database  | PostgreSQL (Prisma ORM) |
| Komunikasi| REST API |

---

## Struktur Folder Proyek

```
website_pramukapolidewa/
├── docs/                  # Dokumentasi perencanaan dan spesifikasi teknis
│   ├── prd.md             # Product Requirements Document (acuan utama)
│   ├── design.md          # Rancangan UI/UX berdasarkan 4 gambar referensi
│   ├── architecture.md    # Arsitektur sistem frontend, backend, dan database
│   ├── database.md        # Rancangan skema PostgreSQL & Prisma schema
│   └── fitur.md           # Katalog fitur dan perilaku interaksi website
├── frontend/              # Aplikasi SvelteKit (Port 5173)
│   ├── src/
│   │   ├── lib/
│   │   │   └── components/# Komponen modular (layout, berita, struktur, ui)
│   │   ├── routes/        # Routing multi-halaman
│   │   │   ├── +page.svelte           # / (Beranda)
│   │   │   ├── profil/+page.svelte    # /profil (Profil & Sejarah)
│   │   │   ├── struktur-racana/       # /struktur-racana (Struktur Organisasi)
│   │   │   ├── berita/                # /berita (Daftar Berita) & /berita/[slug]
│   │   │   └── pendaftaran/           # /pendaftaran (Formulir Pendaftaran)
│   │   └── app.css        # Desain token (palet ungu-emas)
│   ├── static/images/     # Aset gambar dokumentasi organisasi
│   └── .env.example
├── backend/               # REST API Express.js (Port 3000)
│   ├── src/
│   │   ├── config/        # Konfigurasi database Prisma & env
│   │   ├── controllers/   # Controller berita, struktur, pendaftaran, auth
│   │   ├── middleware/    # Error handler & JWT auth middleware
│   │   ├── routes/        # Endpoint API (/api/health, /api/berita, dll.)
│   │   └── validators/    # Validasi skema Zod
│   ├── prisma/
│   │   └── schema.prisma  # Skema database PostgreSQL
│   ├── uploads/           # Folder penyimpanan berkas statis
│   └── .env.example
├── Reference/             # 4 File referensi desain visual asli
└── README.md              # Panduan proyek
```

---

## Cara Menjalankan Proyek

### 1. Menjalankan Backend (Express.js)

```bash
cd backend
npm install
cp .env.example .env     # Sesuaikan konfigurasi DATABASE_URL jika diperlukan
npx prisma generate
npm run dev              # Berjalan di http://localhost:3000
```

Pemeriksaan kesehatan API: `http://localhost:3000/api/health`

### 2. Menjalankan Frontend (SvelteKit)

```bash
cd frontend
npm install
cp .env.example .env     # Default: PUBLIC_API_URL=http://localhost:3000/api
npm run dev              # Berjalan di http://localhost:5173
```

---

## Routing Halaman Frontend

- `/` — Beranda (Hero, Pengenalan, Berita Unggulan, Ajakan Mendaftar)
- `/profil` — Profil & Sejarah Racana (Historiografi, Filosofi Dewa Raja & Batari, Sandi Racana, Linimasa)
- `/struktur-racana` — Struktur Organisasi (Pembina, KDR Putra/Putri, Pengurus Harian, Divisi I & II)
- `/berita` — Daftar Berita & Warta Kegiatan (Filter Kategori)
- `/berita/[slug]` — Detail Artikel Berita (Drop cap format, caption Gudep, sidebar rekomendasi)
- `/pendaftaran` — Formulir Pendaftaran Anggota Baru Online

---

## Status Proyek

- [x] **Tahap 1**: Dokumentasi Perencanaan (`docs/`) & Audit Konsistensi.
- [x] **Tahap 2**: Inisialisasi Workspace (SvelteKit Frontend + Express.js Backend + Skema PostgreSQL Prisma).
- [ ] **Tahap 3**: Integrasi Database PostgreSQL aktif, Migrasi Skema, dan Penyempurnaan CMS Admin Dashboard.

---

© 2025–2026 Pramuka Politeknik Dewantara — Racana Dewa Raja–Batari
