import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Memulai Seeding Database Pramuka Polidewa ---');

  // 1. Seed Admin
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: 'admin' },
  });

  const passwordHash = await bcrypt.hash('admin123', 10);
  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        username: 'admin',
        passwordHash,
        namaLengkap: 'Pradana Utama',
      },
    });
    console.log('[OK] Admin dibuat: username "admin", password "admin123"');
  } else {
    // Ensure password matches admin123
    await prisma.admin.update({
      where: { username: 'admin' },
      data: { passwordHash },
    });
    console.log('[OK] Password admin disinkronkan ke "admin123"');
  }

  // 2. Periode Kepengurusan (Masa Bakti 2026/2027)
  let periode = await prisma.periodeKepengurusan.findFirst({
    where: { isAktif: true },
  });

  if (!periode) {
    periode = await prisma.periodeKepengurusan.create({
      data: {
        namaPeriode: 'Masa Bakti 2026/2027',
        gudepPutra: '04.017',
        gudepPutri: '04.018',
        tanggalMulai: new Date('2026-01-01'),
        tanggalSelesai: new Date('2027-12-31'),
        isAktif: true,
        keterangan: 'Kepengurusan Racana Dewa Raja – Batari Politeknik Dewantara Palopo',
      },
    });
    console.log('[OK] Periode kepengurusan dibuat:', periode.namaPeriode);
  } else {
    console.log('[OK] Periode kepengurusan aktif:', periode.namaPeriode);
  }

  // 3. Seed Pembina
  const countPembina = await prisma.pembina.count({ where: { periodeId: periode.id } });
  if (countPembina === 0) {
    await prisma.pembina.createMany({
      data: [
        {
          periodeId: periode.id,
          nama: 'Dr. Suaedi, M.Si.',
          jabatan: 'Ketua Mabigus (Direktur Politeknik)',
          deskripsi: 'Kepramukaan membentuk sarjana terampil yang menjunjung etika dan pengabdian.',
          foto: '/images/profil/mabigus.png',
          urutan: 1,
        },
        {
          periodeId: periode.id,
          nama: 'Kak Askar, S.Kom., M.Kom.',
          jabatan: 'Pembina Gugus Depan 04.017 (Putra)',
          deskripsi: 'Disiplin dan loyalitas adalah nafas pergerakan pandega.',
          foto: '/images/profil/pembina-putra.png',
          urutan: 2,
        },
        {
          periodeId: periode.id,
          nama: 'Kak Nurhafizah, S.Pd., M.Pd.',
          jabatan: 'Pembina Gugus Depan 04.018 (Putri)',
          deskripsi: 'Kemandirian sejati bermula dari ketulusan berbakti.',
          foto: '/images/profil/pembina-putri.png',
          urutan: 3,
        },
      ],
    });
    console.log('[OK] 3 Pembina Gugus Depan berhasil di-seed.');
  }

  // 4. Seed Pengurus
  const countPengurus = await prisma.pengurus.count({ where: { periodeId: periode.id } });
  if (countPengurus === 0) {
    await prisma.pengurus.createMany({
      data: [
        {
          periodeId: periode.id,
          nama: 'Muh. Rifqi Ramadhan',
          jabatan: 'Ketua Dewan Racana Putra',
          kategori: 'pimpinan_harian',
          racana: 'Dewa Raja',
          programStudi: 'Teknologi Informasi',
          angkatan: '2023',
          tingkatan: 'Pandega',
          kutipan: 'Memimpin dengan keteladanan watak kesatria Luwu.',
          urutan: 1,
        },
        {
          periodeId: periode.id,
          nama: 'Nurul Qolbi',
          jabatan: 'Ketua Dewan Racana Putri',
          kategori: 'pimpinan_harian',
          racana: 'Batari',
          programStudi: 'Akuntansi Komputer',
          angkatan: '2023',
          tingkatan: 'Pandega',
          kutipan: 'Menjaga marwah adat dan merajut persaudaraan ikhlas beramal.',
          urutan: 2,
        },
        {
          periodeId: periode.id,
          nama: 'Andi Fauzan',
          jabatan: 'Pemangku Adat Putra',
          kategori: 'pengurus_harian',
          racana: 'Dewa Raja',
          programStudi: 'Teknik Rekayasa Mesin',
          angkatan: '2024',
          tingkatan: 'Pandega',
          urutan: 3,
        },
        {
          periodeId: periode.id,
          nama: 'Siti Rahmawati',
          jabatan: 'Pemangku Adat Putri',
          kategori: 'pengurus_harian',
          racana: 'Batari',
          programStudi: 'Teknologi Informasi',
          angkatan: '2024',
          tingkatan: 'Pandega',
          urutan: 4,
        },
        {
          periodeId: periode.id,
          nama: 'Ahmad Faisal',
          jabatan: 'Kerani (Sekretaris)',
          kategori: 'pengurus_harian',
          racana: 'Dewa Raja',
          programStudi: 'Administrasi Bisnis Terapan',
          angkatan: '2024',
          tingkatan: 'Pandega',
          urutan: 5,
        },
        {
          periodeId: periode.id,
          nama: 'Dina Lestari',
          jabatan: 'Juru Uang (Bendahara)',
          kategori: 'pengurus_harian',
          racana: 'Batari',
          programStudi: 'Akuntansi Komputer',
          angkatan: '2024',
          tingkatan: 'Pandega',
          urutan: 6,
        },
      ],
    });
    console.log('[OK] 6 Pengurus Inti & Harian berhasil di-seed.');
  }

  // 5. Seed Divisi
  const countDivisi = await prisma.divisi.count({ where: { periodeId: periode.id } });
  if (countDivisi === 0) {
    const divisi1 = await prisma.divisi.create({
      data: {
        periodeId: periode.id,
        namaDivisi: 'Divisi Kegiatan & Operasional (Giatops)',
        bidang: 'Perencanaan dan pelaksanaan giat lapangan, perkemahan, dan ekspedisi',
        koordinatorNama: 'Ilham Syahputra',
        email: 'giatops@pramukapolidewa.ac.id',
        deskripsi: 'Bertanggung jawab atas manajemen kegiatan lapangan dan ketangkasan kepanduan.',
        urutan: 1,
        anggota: {
          create: [
            { nama: 'Budi Santoso', urutan: 1 },
            { nama: 'Rian Hidayat', urutan: 2 },
          ],
        },
        fokusTugas: {
          create: [
            { tugas: 'Manajemen giat perkemahan dan penjelajahan alam terbuka', urutan: 1 },
            { tugas: 'Penyusunan jadwal latihan berkala kecakapan pandega', urutan: 2 },
          ],
        },
      },
    });

    const divisi2 = await prisma.divisi.create({
      data: {
        periodeId: periode.id,
        namaDivisi: 'Divisi Hubungan Masyarakat & Pengabdian (Humas)',
        bidang: 'Kemitraan eksternal, bakti kemasyarakatan, publikasi, dan dokumentasi',
        koordinatorNama: 'Citra Kirana',
        email: 'humas@pramukapolidewa.ac.id',
        deskripsi: 'Mengelola komunikasi publik, media sosial, dan program bakti kemasyarakatan.',
        urutan: 2,
        anggota: {
          create: [
            { nama: 'Annisa Putri', urutan: 1 },
            { nama: 'Dewi Sartika', urutan: 2 },
          ],
        },
        fokusTugas: {
          create: [
            { tugas: 'Publikasi warta berita, dokumentasi giat, dan media digital racana', urutan: 1 },
            { tugas: 'Kemitraan dengan kwartir, perguruan tinggi lain, dan lembaga sosial', urutan: 2 },
          ],
        },
      },
    });

    console.log('[OK] Divisi Giatops & Humas berhasil di-seed beserta anggota & fokus tugas.');
  }

  // 6. Seed Pendaftaran
  const countPendaftaran = await prisma.pendaftaran.count();
  if (countPendaftaran === 0) {
    const samplePendaftaran = [
      {
        namaLengkap: 'Fahri Akbar Pratama',
        nim: '202410382',
        programStudi: 'Teknologi Informasi (D4/S1 Terapan)',
        angkatan: '2026',
        jenisKelamin: 'Laki-laki',
        nomorTelepon: '081234567891',
        email: 'fahri.akbar@student.polidewa.ac.id',
        motivasi: 'Ingin mengasah jiwa kepemimpinan dan belajar kepanduan perguruan tinggi.',
        status: 'baru',
        createdAt: new Date(Date.now() - 1000 * 60 * 35),
      },
      {
        namaLengkap: 'Nurul Syahidah',
        nim: '202411015',
        programStudi: 'Administrasi Bisnis Terapan',
        angkatan: '2026',
        jenisKelamin: 'Perempuan',
        nomorTelepon: '081234567892',
        email: 'nurul.syahidah@student.polidewa.ac.id',
        motivasi: 'Tertarik dengan kegiatan sosial kemasyarakatan Racana Dewa Raja – Batari.',
        status: 'baru',
        createdAt: new Date(Date.now() - 1000 * 60 * 120),
      },
      {
        namaLengkap: 'Dimas Aditya',
        nim: '202420042',
        programStudi: 'Akuntansi Komputer',
        angkatan: '2026',
        jenisKelamin: 'Laki-laki',
        nomorTelepon: '081234567893',
        email: 'dimas.aditya@student.polidewa.ac.id',
        motivasi: 'Ingin aktif berorganisasi di lingkungan kampus.',
        status: 'terverifikasi',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        namaLengkap: 'Rania Anggraeni',
        nim: '202410290',
        programStudi: 'Teknologi Informasi (D4/S1 Terapan)',
        angkatan: '2026',
        jenisKelamin: 'Perempuan',
        nomorTelepon: '081234567894',
        email: 'rania.anggraeni@student.polidewa.ac.id',
        motivasi: 'Melanjutkan komitmen kepramukaan dari bangku penegak di SMA.',
        status: 'terverifikasi',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
      },
    ];

    for (const p of samplePendaftaran) {
      await prisma.pendaftaran.create({ data: p });
    }
    console.log(`[OK] Seeded ${samplePendaftaran.length} sample pendaftaran.`);
  }

  // 7. Seed Berita
  const countBerita = await prisma.berita.count();
  if (countBerita === 0) {
    await prisma.berita.createMany({
      data: [
        {
          judul: 'Penerimaan Anggota Baru Racana Dewa Raja – Batari Tahun 2026/2027 Resmi Dibuka',
          slug: 'penerimaan-anggota-baru-2026-2027',
          kategori: 'Penerimaan Anggota',
          ringkasan: 'UKM Pramuka Politeknik Dewantara Palopo membuka gerbang pengabdian bagi mahasiswa baru angkatan 2026 yang siap ditempa menjadi calon pemimpin berkarakter luhur.',
          konten: 'Pramuka Politeknik Dewantara secara resmi membuka penerimaan anggota baru bagi mahasiswa yang bersemangat untuk mengembangkan karakter kepemimpinan, kemandirian, dan semangat persaudaraan sejati di pangkalan kampus.',
          gambarUtama: '/images/beranda/FotoLKPM25.png',
          penulis: 'Admin Racana',
          status: 'published',
          tanggalPublish: new Date(),
        },
        {
          judul: 'Seminar Pramuka Penegak & Pandega Se-Kota Palopo Berlangsung Khidmat',
          slug: 'seminar-pramuka-penegak-pandega-se-kota-palopo',
          kategori: 'Kegiatan Ilmiah',
          ringkasan: 'Racana Dewa Raja – Batari sukses menggelar seminar kepemimpinan pemuda dengan menghadirkan narasumber Kwartir Cabang dan praktisi navigasi alam terbuka.',
          konten: 'Seminar Pramuka Penegak & Pandega Se-Kota Palopo Mengangkat Tema "Peran Pramuka Dalam Pengabdian Masyarakat Dan Kepemimpinan Karakter Generasi Muda". Berlangsung khidmat di Auditorium Kampus Politeknik Dewantara.',
          gambarUtama: '/images/beranda/FotoSeminar01.png',
          penulis: 'Divisi Humas',
          status: 'published',
          tanggalPublish: new Date(),
        },
      ],
    });
    console.log('[OK] Seeded sample berita.');
  }

  console.log('--- Seeding Selesai dengan Sukses ---');
}

main()
  .catch((e) => {
    console.error('Error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
