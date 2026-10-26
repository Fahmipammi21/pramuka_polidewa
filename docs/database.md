# Dokumen Rancangan Database

## Website Pramuka Polidewa — MySQL

---

## 1. Tujuan dan Prinsip Perancangan

### Tujuan

Menyediakan skema database yang mendukung seluruh fitur website Pramuka Polidewa: berita, struktur kepengurusan, pendaftaran anggota baru, dan autentikasi admin.

### Prinsip

1. **Sesuai kebutuhan:** Hanya membuat tabel yang diperlukan oleh fitur yang direncanakan di `prd.md` dan `fitur.md`.
2. **Integritas data:** Menggunakan foreign key, constraint, dan tipe data yang tepat.
3. **Normalisasi yang wajar:** Menghindari duplikasi data tanpa over-normalisasi.
4. **Keamanan:** Password di-hash, data sensitif dilindungi.
5. **Skalabilitas yang proporsional:** Tidak over-engineering untuk skala website organisasi.

---

## 2. Daftar Entitas

| No | Entitas (Tabel)          | Deskripsi                                                    |
|----|--------------------------|--------------------------------------------------------------|
| 1  | `admins`                 | Akun admin untuk login ke dashboard                          |
| 2  | `berita`                 | Artikel, pengumuman, dan berita kegiatan                     |
| 3  | `periode_kepengurusan`   | Periode masa bakti kepengurusan                              |
| 4  | `pembina`                | Data penasihat dan pembina Gugus Depan                       |
| 5  | `pengurus`               | Data pengurus (pimpinan harian dan pengurus harian)          |
| 6  | `divisi`                 | Data divisi pelaksana                                        |
| 7  | `anggota_divisi`         | Anggota setiap divisi                                        |
| 8  | `pendaftaran`            | Data calon anggota baru yang mendaftar                       |

---

## 3. Skema Detail Per Tabel

### 3.1 Tabel `admins`

Menyimpan akun admin untuk akses dashboard.

| Kolom           | Tipe             | Constraint                        | Deskripsi                      |
|-----------------|------------------|-----------------------------------|--------------------------------|
| `id`            | `SERIAL`         | PRIMARY KEY                       | ID auto-increment              |
| `username`      | `VARCHAR(50)`    | NOT NULL, UNIQUE                  | Username login                 |
| `password_hash` | `VARCHAR(255)`   | NOT NULL                          | Password ter-hash (bcrypt)     |
| `nama_lengkap`  | `VARCHAR(100)`   | NOT NULL                          | Nama tampilan admin            |
| `created_at`    | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu pembuatan akun           |
| `updated_at`    | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu update terakhir          |

**Catatan:** Asumsi admin hanya 1–3 orang pengurus. Tidak diperlukan sistem role atau permission yang kompleks.

---

### 3.2 Tabel `berita`

Menyimpan artikel berita dan pengumuman organisasi.

| Kolom             | Tipe             | Constraint                        | Deskripsi                              |
|-------------------|------------------|-----------------------------------|----------------------------------------|
| `id`              | `SERIAL`         | PRIMARY KEY                       | ID auto-increment                      |
| `judul`           | `VARCHAR(255)`   | NOT NULL                          | Judul berita                           |
| `slug`            | `VARCHAR(255)`   | NOT NULL, UNIQUE                  | URL-friendly identifier                |
| `kategori`        | `VARCHAR(100)`   | NULL                              | Label kategori (mis: "Pengumuman Resmi") |
| `ringkasan`       | `TEXT`           | NULL                              | Ringkasan singkat untuk kartu preview  |
| `konten`          | `TEXT`           | NOT NULL                          | Isi artikel (HTML atau Markdown)       |
| `gambar_utama`    | `VARCHAR(500)`   | NULL                              | Path/URL gambar utama                  |
| `caption_gambar`  | `VARCHAR(255)`   | NULL                              | Keterangan gambar utama                |
| `penulis`         | `VARCHAR(100)`   | DEFAULT 'Admin Racana'            | Nama penulis                           |
| `status`          | `VARCHAR(20)`    | NOT NULL, DEFAULT 'draft'         | Status: 'draft' atau 'published'       |
| `tanggal_publish` | `TIMESTAMP`      | NULL                              | Tanggal publikasi                      |
| `created_at`      | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu pembuatan                        |
| `updated_at`      | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu update terakhir                  |

**Constraint tambahan:**
- `CHECK (status IN ('draft', 'published'))`

**Indeks:**
- `idx_berita_slug` pada kolom `slug` (sudah UNIQUE).
- `idx_berita_status_publish` pada (`status`, `tanggal_publish` DESC) — untuk query berita publik terbaru.

---

### 3.3 Tabel `periode_kepengurusan`

Menyimpan periode masa bakti kepengurusan yang aktif.

| Kolom           | Tipe             | Constraint                        | Deskripsi                              |
|-----------------|------------------|-----------------------------------|----------------------------------------|
| `id`            | `SERIAL`         | PRIMARY KEY                       | ID auto-increment                      |
| `nama_periode`  | `VARCHAR(50)`    | NOT NULL                          | Nama periode (mis: "2025/2026")        |
| `gudep_putra`   | `VARCHAR(20)`    | NOT NULL                          | Nomor Gudep Putra (mis: "04.017")      |
| `gudep_putri`   | `VARCHAR(20)`    | NOT NULL                          | Nomor Gudep Putri (mis: "04.018")      |
| `tanggal_mulai` | `DATE`           | NULL                              | Tanggal mulai periode                  |
| `tanggal_selesai`| `DATE`          | NULL                              | Tanggal selesai periode                |
| `is_aktif`      | `BOOLEAN`        | NOT NULL, DEFAULT false           | Menandai periode yang sedang aktif     |
| `keterangan`    | `TEXT`           | NULL                              | Keterangan tambahan                    |
| `created_at`    | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu pembuatan                        |

**Catatan:** Hanya satu periode yang memiliki `is_aktif = true` pada satu waktu. Logika ini ditegakkan di level aplikasi.

---

### 3.4 Tabel `pembina`

Menyimpan data penasihat dan pembina Gugus Depan.

| Kolom           | Tipe             | Constraint                        | Deskripsi                              |
|-----------------|------------------|-----------------------------------|----------------------------------------|
| `id`            | `SERIAL`         | PRIMARY KEY                       | ID auto-increment                      |
| `periode_id`    | `INTEGER`        | NOT NULL, FK → `periode_kepengurusan(id)` | Periode kepengurusan         |
| `nama`          | `VARCHAR(100)`   | NOT NULL                          | Nama lengkap (beserta gelar)           |
| `jabatan`       | `VARCHAR(100)`   | NOT NULL                          | Jabatan (Kamabigus, Pembina Dewa Raja, dll.) |
| `deskripsi`     | `TEXT`           | NULL                              | Deskripsi tanggung jawab               |
| `foto`          | `VARCHAR(500)`   | NULL                              | Path/URL foto                          |
| `urutan`        | `INTEGER`        | NOT NULL, DEFAULT 0               | Urutan tampilan                        |
| `created_at`    | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu pembuatan                        |
| `updated_at`    | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu update terakhir                  |

**Indeks:**
- `idx_pembina_periode` pada `periode_id`.

---

### 3.5 Tabel `pengurus`

Menyimpan data pengurus (pimpinan harian dan pengurus harian).

| Kolom           | Tipe             | Constraint                        | Deskripsi                              |
|-----------------|------------------|-----------------------------------|----------------------------------------|
| `id`            | `SERIAL`         | PRIMARY KEY                       | ID auto-increment                      |
| `periode_id`    | `INTEGER`        | NOT NULL, FK → `periode_kepengurusan(id)` | Periode kepengurusan         |
| `nama`          | `VARCHAR(100)`   | NOT NULL                          | Nama lengkap                           |
| `jabatan`       | `VARCHAR(100)`   | NOT NULL                          | Jabatan resmi                          |
| `kategori`      | `VARCHAR(50)`    | NOT NULL                          | Kategori: 'pimpinan' atau 'pengurus_harian' |
| `racana`        | `VARCHAR(20)`    | NULL                              | 'dewa_raja', 'batari', atau 'gabungan' |
| `program_studi` | `VARCHAR(100)`   | NULL                              | Program studi                          |
| `angkatan`      | `VARCHAR(10)`    | NULL                              | Tahun angkatan (mis: "'25")            |
| `tingkatan`     | `VARCHAR(50)`    | NULL                              | Tingkatan Pramuka (mis: "Pandega Aktif")|
| `kutipan`       | `TEXT`           | NULL                              | Kutipan atau motto                     |
| `deskripsi`     | `TEXT`           | NULL                              | Deskripsi tugas                        |
| `foto`          | `VARCHAR(500)`   | NULL                              | Path/URL foto                          |
| `urutan`        | `INTEGER`        | NOT NULL, DEFAULT 0               | Urutan tampilan                        |
| `created_at`    | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu pembuatan                        |
| `updated_at`    | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu update terakhir                  |

**Constraint tambahan:**
- `CHECK (kategori IN ('pimpinan', 'pengurus_harian'))`
- `CHECK (racana IN ('dewa_raja', 'batari', 'gabungan') OR racana IS NULL)`

**Indeks:**
- `idx_pengurus_periode` pada `periode_id`.
- `idx_pengurus_kategori` pada `kategori`.

---

### 3.6 Tabel `divisi`

Menyimpan data divisi pelaksana.

| Kolom              | Tipe             | Constraint                        | Deskripsi                              |
|--------------------|------------------|-----------------------------------|----------------------------------------|
| `id`               | `SERIAL`         | PRIMARY KEY                       | ID auto-increment                      |
| `periode_id`       | `INTEGER`        | NOT NULL, FK → `periode_kepengurusan(id)` | Periode kepengurusan         |
| `nama_divisi`      | `VARCHAR(100)`   | NOT NULL                          | Nama divisi                            |
| `bidang`           | `VARCHAR(200)`   | NULL                              | Bidang cakupan divisi                  |
| `koordinator_nama` | `VARCHAR(100)`   | NOT NULL                          | Nama koordinator bidang                |
| `email`            | `VARCHAR(100)`   | NULL                              | Email kontak divisi                    |
| `deskripsi`        | `TEXT`           | NULL                              | Deskripsi divisi                       |
| `urutan`           | `INTEGER`        | NOT NULL, DEFAULT 0               | Urutan tampilan                        |
| `created_at`       | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu pembuatan                        |
| `updated_at`       | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu update terakhir                  |

**Indeks:**
- `idx_divisi_periode` pada `periode_id`.

---

### 3.7 Tabel `anggota_divisi`

Menyimpan anggota setiap divisi.

| Kolom         | Tipe             | Constraint                        | Deskripsi                    |
|---------------|------------------|-----------------------------------|------------------------------|
| `id`          | `SERIAL`         | PRIMARY KEY                       | ID auto-increment            |
| `divisi_id`   | `INTEGER`        | NOT NULL, FK → `divisi(id)` ON DELETE CASCADE | Divisi terkait   |
| `nama`        | `VARCHAR(100)`   | NOT NULL                          | Nama anggota                 |
| `urutan`      | `INTEGER`        | NOT NULL, DEFAULT 0               | Urutan tampilan              |

**Indeks:**
- `idx_anggota_divisi` pada `divisi_id`.

---

### 3.8 Tabel `fokus_tugas_divisi`

Menyimpan fokus tugas pokok setiap divisi.

| Kolom         | Tipe             | Constraint                        | Deskripsi                    |
|---------------|------------------|-----------------------------------|------------------------------|
| `id`          | `SERIAL`         | PRIMARY KEY                       | ID auto-increment            |
| `divisi_id`   | `INTEGER`        | NOT NULL, FK → `divisi(id)` ON DELETE CASCADE | Divisi terkait   |
| `tugas`       | `VARCHAR(255)`   | NOT NULL                          | Deskripsi tugas              |
| `urutan`      | `INTEGER`        | NOT NULL, DEFAULT 0               | Urutan tampilan              |

**Indeks:**
- `idx_fokus_tugas_divisi` pada `divisi_id`.

---

### 3.9 Tabel `pendaftaran`

Menyimpan data calon anggota baru.

| Kolom             | Tipe             | Constraint                        | Deskripsi                              |
|-------------------|------------------|-----------------------------------|----------------------------------------|
| `id`              | `SERIAL`         | PRIMARY KEY                       | ID auto-increment                      |
| `nama_lengkap`    | `VARCHAR(100)`   | NOT NULL                          | Nama lengkap calon anggota             |
| `nim`             | `VARCHAR(20)`    | NOT NULL                          | Nomor Induk Mahasiswa                  |
| `program_studi`   | `VARCHAR(100)`   | NOT NULL                          | Program studi                          |
| `angkatan`        | `VARCHAR(10)`    | NOT NULL                          | Tahun angkatan                         |
| `jenis_kelamin`   | `VARCHAR(10)`    | NOT NULL                          | 'Laki-laki' atau 'Perempuan'          |
| `nomor_telepon`   | `VARCHAR(20)`    | NOT NULL                          | Nomor telepon / WhatsApp               |
| `email`           | `VARCHAR(100)`   | NOT NULL                          | Alamat email                           |
| `motivasi`        | `TEXT`           | NULL                              | Alasan ingin bergabung                 |
| `status`          | `VARCHAR(20)`    | NOT NULL, DEFAULT 'baru'          | Status: 'baru', 'ditinjau', 'diterima', 'ditolak' |
| `created_at`      | `TIMESTAMP`      | NOT NULL, DEFAULT NOW()           | Waktu pendaftaran                      |

**Constraint tambahan:**
- `CHECK (jenis_kelamin IN ('Laki-laki', 'Perempuan'))`
- `CHECK (status IN ('baru', 'ditinjau', 'diterima', 'ditolak'))`

**Indeks:**
- `idx_pendaftaran_status` pada `status`.
- `idx_pendaftaran_created` pada `created_at` DESC.

> **[KEPUTUSAN DIPERLUKAN]** Field pendaftaran di atas adalah asumsi minimum. Field yang dibutuhkan perlu dikonfirmasi oleh pengurus organisasi. Kemungkinan tambahan: alamat, pengalaman kepramukaan, ukuran seragam, dll.

---

## 4. Diagram Relasi Antar Tabel

```
┌──────────────────────────┐
│    periode_kepengurusan   │
│  (id, nama_periode, ...) │
└──────┬───────────────────┘
       │ 1
       ├──────── * ──── pembina (periode_id FK)
       │
       ├──────── * ──── pengurus (periode_id FK)
       │
       └──────── * ──── divisi (periode_id FK)
                              │ 1
                              ├──── * ──── anggota_divisi (divisi_id FK)
                              │
                              └──── * ──── fokus_tugas_divisi (divisi_id FK)


┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│    admins     │     │     berita       │     │   pendaftaran    │
│  (mandiri)   │     │   (mandiri)      │     │   (mandiri)      │
└──────────────┘     └──────────────────┘     └──────────────────┘
```

### Ringkasan Relasi

| Relasi                                    | Tipe     | Deskripsi                              |
|-------------------------------------------|----------|----------------------------------------|
| `periode_kepengurusan` → `pembina`        | 1:N      | Satu periode memiliki banyak pembina   |
| `periode_kepengurusan` → `pengurus`       | 1:N      | Satu periode memiliki banyak pengurus  |
| `periode_kepengurusan` → `divisi`         | 1:N      | Satu periode memiliki banyak divisi    |
| `divisi` → `anggota_divisi`               | 1:N      | Satu divisi memiliki banyak anggota    |
| `divisi` → `fokus_tugas_divisi`           | 1:N      | Satu divisi memiliki banyak tugas pokok|
| `admins`                                  | Mandiri  | Tidak berelasi ke tabel lain           |
| `berita`                                  | Mandiri  | Tidak berelasi ke tabel lain           |
| `pendaftaran`                             | Mandiri  | Tidak berelasi ke tabel lain           |

---

## 5. Prisma Schema (Gambaran)

Berikut gambaran awal Prisma schema. Schema ini akan menjadi acuan saat implementasi.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id           Int      @id @default(autoincrement())
  username     String   @unique @db.VarChar(50)
  passwordHash String   @map("password_hash") @db.VarChar(255)
  namaLengkap  String   @map("nama_lengkap") @db.VarChar(100)
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @default(now()) @updatedAt @map("updated_at")

  @@map("admins")
}

model Berita {
  id             Int       @id @default(autoincrement())
  judul          String    @db.VarChar(255)
  slug           String    @unique @db.VarChar(255)
  kategori       String?   @db.VarChar(100)
  ringkasan      String?
  konten         String
  gambarUtama    String?   @map("gambar_utama") @db.VarChar(500)
  captionGambar  String?   @map("caption_gambar") @db.VarChar(255)
  penulis        String    @default("Admin Racana") @db.VarChar(100)
  status         String    @default("draft") @db.VarChar(20)
  tanggalPublish DateTime? @map("tanggal_publish")
  createdAt      DateTime  @default(now()) @map("created_at")
  updatedAt      DateTime  @default(now()) @updatedAt @map("updated_at")

  @@index([status, tanggalPublish(sort: Desc)], name: "idx_berita_status_publish")
  @@map("berita")
}

model PeriodeKepengurusan {
  id              Int       @id @default(autoincrement())
  namaPeriode     String    @map("nama_periode") @db.VarChar(50)
  gudepPutra      String    @map("gudep_putra") @db.VarChar(20)
  gudepPutri      String    @map("gudep_putri") @db.VarChar(20)
  tanggalMulai    DateTime? @map("tanggal_mulai") @db.Date
  tanggalSelesai  DateTime? @map("tanggal_selesai") @db.Date
  isAktif         Boolean   @default(false) @map("is_aktif")
  keterangan      String?
  createdAt       DateTime  @default(now()) @map("created_at")

  pembina  Pembina[]
  pengurus Pengurus[]
  divisi   Divisi[]

  @@map("periode_kepengurusan")
}

model Pembina {
  id         Int      @id @default(autoincrement())
  periodeId  Int      @map("periode_id")
  nama       String   @db.VarChar(100)
  jabatan    String   @db.VarChar(100)
  deskripsi  String?
  foto       String?  @db.VarChar(500)
  urutan     Int      @default(0)
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @default(now()) @updatedAt @map("updated_at")

  periode PeriodeKepengurusan @relation(fields: [periodeId], references: [id])

  @@index([periodeId], name: "idx_pembina_periode")
  @@map("pembina")
}

model Pengurus {
  id           Int      @id @default(autoincrement())
  periodeId    Int      @map("periode_id")
  nama         String   @db.VarChar(100)
  jabatan      String   @db.VarChar(100)
  kategori     String   @db.VarChar(50)
  racana       String?  @db.VarChar(20)
  programStudi String?  @map("program_studi") @db.VarChar(100)
  angkatan     String?  @db.VarChar(10)
  tingkatan    String?  @db.VarChar(50)
  kutipan      String?
  deskripsi    String?
  foto         String?  @db.VarChar(500)
  urutan       Int      @default(0)
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @default(now()) @updatedAt @map("updated_at")

  periode PeriodeKepengurusan @relation(fields: [periodeId], references: [id])

  @@index([periodeId], name: "idx_pengurus_periode")
  @@index([kategori], name: "idx_pengurus_kategori")
  @@map("pengurus")
}

model Divisi {
  id              Int      @id @default(autoincrement())
  periodeId       Int      @map("periode_id")
  namaDivisi      String   @map("nama_divisi") @db.VarChar(100)
  bidang          String?  @db.VarChar(200)
  koordinatorNama String   @map("koordinator_nama") @db.VarChar(100)
  email           String?  @db.VarChar(100)
  deskripsi       String?
  urutan          Int      @default(0)
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @default(now()) @updatedAt @map("updated_at")

  periode    PeriodeKepengurusan @relation(fields: [periodeId], references: [id])
  anggota    AnggotaDivisi[]
  fokusTugas FokusTugasDivisi[]

  @@index([periodeId], name: "idx_divisi_periode")
  @@map("divisi")
}

model AnggotaDivisi {
  id       Int    @id @default(autoincrement())
  divisiId Int    @map("divisi_id")
  nama     String @db.VarChar(100)
  urutan   Int    @default(0)

  divisi Divisi @relation(fields: [divisiId], references: [id], onDelete: Cascade)

  @@index([divisiId], name: "idx_anggota_divisi")
  @@map("anggota_divisi")
}

model FokusTugasDivisi {
  id       Int    @id @default(autoincrement())
  divisiId Int    @map("divisi_id")
  tugas    String @db.VarChar(255)
  urutan   Int    @default(0)

  divisi Divisi @relation(fields: [divisiId], references: [id], onDelete: Cascade)

  @@index([divisiId], name: "idx_fokus_tugas_divisi")
  @@map("fokus_tugas_divisi")
}

model Pendaftaran {
  id            Int      @id @default(autoincrement())
  namaLengkap   String   @map("nama_lengkap") @db.VarChar(100)
  nim           String   @db.VarChar(20)
  programStudi  String   @map("program_studi") @db.VarChar(100)
  angkatan      String   @db.VarChar(10)
  jenisKelamin  String   @map("jenis_kelamin") @db.VarChar(10)
  nomorTelepon  String   @map("nomor_telepon") @db.VarChar(20)
  email         String   @db.VarChar(100)
  motivasi      String?
  status        String   @default("baru") @db.VarChar(20)
  createdAt     DateTime @default(now()) @map("created_at")

  @@index([status], name: "idx_pendaftaran_status")
  @@index([createdAt(sort: Desc)], name: "idx_pendaftaran_created")
  @@map("pendaftaran")
}
```

---

## 6. Strategi Validasi dan Konsistensi Data

### Di Level Database

- Primary key `SERIAL` menjamin keunikan ID.
- `UNIQUE` constraint pada `berita.slug` dan `admins.username`.
- `NOT NULL` constraint pada field yang wajib diisi.
- `CHECK` constraint pada field enum (status, kategori, jenis_kelamin).
- `ON DELETE CASCADE` pada anggota_divisi dan fokus_tugas_divisi → menghapus data anak saat divisi dihapus.
- Foreign key menjamin referential integrity.

### Di Level Aplikasi

- Validasi input menggunakan Zod/Joi sebelum menyentuh database.
- Slug berita di-generate otomatis dari judul (slugify) dengan pengecekan keunikan.
- Status berita hanya bisa diubah melalui transisi yang valid (draft → published, published → draft).
- Hanya satu `periode_kepengurusan` yang boleh `is_aktif = true` — ditegakkan di service layer.
- Tanggal publish otomatis diisi saat status berubah ke 'published'.

---

## 7. Pengamanan Akses Database

1. **Kredensial database** disimpan di `.env` backend, tidak di kode.
2. **Connection string** PostgreSQL menggunakan user yang memiliki hak akses minimum (read/write pada database proyek saja).
3. **Password admin** di-hash menggunakan bcrypt (cost factor ≥ 10) sebelum disimpan.
4. **Prepared statements** — Prisma menggunakan parameterized queries secara default, mencegah SQL injection.
5. **Environment terpisah** — database development dan production harus berbeda.

---

## 8. Migrasi Skema dan Data Awal

### Migrasi

- Menggunakan **Prisma Migrate** untuk mengelola evolusi skema.
- Setiap perubahan skema menghasilkan file migrasi yang dapat di-track di version control.
- Command:
  - `npx prisma migrate dev` — development (buat dan jalankan migrasi).
  - `npx prisma migrate deploy` — production (jalankan migrasi yang sudah ada).

### Data Awal (Seed)

Berikut data yang perlu di-seed untuk development dan setup awal:

1. **Admin default:**
   - Username: `admin` (atau sesuai kebijakan organisasi).
   - Password: di-hash dari password sementara yang harus segera diganti.

2. **Periode kepengurusan:**
   - Periode "2025/2026" dengan `is_aktif = true`.
   - Gudep Putra: 04.017, Gudep Putri: 04.018.

3. **Data pembina, pengurus, dan divisi:**
   - Data sesuai gambar referensi Struktur Racana.
   - Seed hanya jika data sudah diverifikasi. Jika belum, tandai sebagai `[DATA PERLU DILENGKAPI]`.

> **Penting:** Data seed untuk pengurus menggunakan data yang terlihat di gambar referensi Struktur Racana. Data ini dianggap valid berdasarkan referensi. Jika ada perbedaan, perlu diperbarui berdasarkan konfirmasi pengurus.

---

## 9. Catatan Tambahan

### Konten Profil (Sejarah, Filosofi, Linimasa)

> **[KEPUTUSAN DIPERLUKAN]** Konten halaman Profil (sejarah, filosofi, sandi racana, linimasa) saat ini diasumsikan **ditulis langsung di frontend** karena bersifat semi-statis dan jarang berubah. Jika di kemudian hari dibutuhkan pengelolaan dari admin, tabel tambahan untuk konten halaman perlu dirancang.

### Skala Data yang Diharapkan

| Tabel                   | Estimasi Volume      | Pola Akses                    |
|-------------------------|----------------------|-------------------------------|
| `admins`                | 1–3 baris            | Login (jarang)                |
| `berita`                | < 50 per tahun       | Read publik (sering), CRUD admin (jarang) |
| `periode_kepengurusan`  | 1–2 baris            | Read (sering)                 |
| `pembina`               | 3–5 per periode      | Read (sering)                 |
| `pengurus`              | 6–10 per periode     | Read (sering)                 |
| `divisi`                | 2–4 per periode      | Read (sering)                 |
| `anggota_divisi`        | 5–10 per divisi      | Read (sering)                 |
| `pendaftaran`           | 20–100 per musim     | Write publik, Read admin      |

Skala ini menunjukkan bahwa PostgreSQL sangat mampu menangani beban kerja ini tanpa memerlukan optimasi yang kompleks.

---

*Dokumen ini harus dibaca bersama `prd.md` untuk kebutuhan produk, `architecture.md` untuk arsitektur teknis, dan `fitur.md` untuk perilaku fitur yang membutuhkan data.*
