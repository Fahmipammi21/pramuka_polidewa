import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed Admin
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: 'admin' },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.admin.create({
      data: {
        username: 'admin',
        passwordHash,
        namaLengkap: 'Pradana Utama',
      },
    });
    console.log('Admin account created: username "admin", password "admin123"');
  } else {
    console.log('Admin account already exists.');
  }

  // 2. Seed Periode Kepengurusan (Masa Bakti 2025/2026)
  let periode = await prisma.periodeKepengurusan.findFirst({
    where: { isAktif: true },
  });

  if (!periode) {
    periode = await prisma.periodeKepengurusan.create({
      data: {
        namaPeriode: 'Masa Bakti 2025/2026',
        gudepPutra: '04.017',
        gudepPutri: '04.018',
        tanggalMulai: new Date('2025-01-01'),
        tanggalSelesai: new Date('2026-12-31'),
        isAktif: true,
        keterangan: 'Kepengurusan Racana Dewa Raja – Batari Politeknik Dewantara',
      },
    });
    console.log('Periode created:', periode.namaPeriode);
  }

  // 3. Seed Pendaftaran (PAB 2025)
  const countPendaftaran = await prisma.pendaftaran.count();
  if (countPendaftaran === 0) {
    const samplePendaftaran = [
      {
        namaLengkap: 'Fahri Akbar Pratama',
        nim: '202410382',
        programStudi: 'D3 Teknik Informatika',
        angkatan: '2024',
        jenisKelamin: 'Laki-laki',
        nomorTelepon: '081234567891',
        email: 'fahri.akbar@student.polidewa.ac.id',
        motivasi: 'Ingin mengasah jiwa kepemimpinan dan belajar kepanduan perguruan tinggi.',
        status: 'baru',
        createdAt: new Date(Date.now() - 1000 * 60 * 35), // 35 mins ago
      },
      {
        namaLengkap: 'Nurul Syahidah',
        nim: '202411015',
        programStudi: 'S1 Bisnis Digital',
        angkatan: '2024',
        jenisKelamin: 'Perempuan',
        nomorTelepon: '081234567892',
        email: 'nurul.syahidah@student.polidewa.ac.id',
        motivasi: 'Tertarik dengan kegiatan sosial kemasyarakatan Racana Dewa Raja – Batari.',
        status: 'baru',
        createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      },
      {
        namaLengkap: 'Dimas Aditya',
        nim: '202420042',
        programStudi: 'D3 Akuntansi Perbankan',
        angkatan: '2024',
        jenisKelamin: 'Laki-laki',
        nomorTelepon: '081234567893',
        email: 'dimas.aditya@student.polidewa.ac.id',
        motivasi: 'Ingin aktif berorganisasi di lingkungan kampus.',
        status: 'terverifikasi',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // yesterday
      },
      {
        namaLengkap: 'Rania Anggraeni',
        nim: '202410290',
        programStudi: 'D3 Teknik Informatika',
        angkatan: '2024',
        jenisKelamin: 'Perempuan',
        nomorTelepon: '081234567894',
        email: 'rania.anggraeni@student.polidewa.ac.id',
        motivasi: 'Melanjutkan komitmen kepramukaan dari bangku penegak di SMA.',
        status: 'terverifikasi',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28), // yesterday
      },
    ];

    for (const p of samplePendaftaran) {
      await prisma.pendaftaran.create({ data: p });
    }
    console.log(`Seeded ${samplePendaftaran.length} sample pendaftaran.`);
  }

  // 4. Seed sample Berita if empty
  const countBerita = await prisma.berita.count();
  if (countBerita === 0) {
    await prisma.berita.createMany({
      data: [
        {
          judul: 'Penerimaan Anggota Baru Racana Dewa Raja – Batari Tahun 2026/2027',
          slug: 'penerimaan-anggota-baru-racana-dewa-raja-batari-tahun-2026-2027',
          kategori: 'Penerimaan Anggota',
          ringkasan: 'Pramuka Politeknik Dewantara secara resmi membuka penerimaan anggota baru bagi mahasiswa yang bersemangat untuk mengembangkan karakter kepemimpinan.',
          konten: 'Pramuka Politeknik Dewantara secara resmi membuka penerimaan anggota baru bagi mahasiswa yang bersemangat untuk mengembangkan karakter kepemimpinan, kemandirian, dan semangat persaudaraan sejati.',
          gambarUtama: '/images/beranda/news-penerimaan.png',
          penulis: 'Admin Racana',
          status: 'published',
          tanggalPublish: new Date(),
        },
        {
          judul: 'Seminar Pramuka Penegak & Pandega Se-Kota Palopo Tahun 2025',
          slug: 'seminar-pramuka-penegak-dan-pandega-se-kota-palopo-tahun-2025',
          kategori: 'Kegiatan Ilmiah',
          ringkasan: "Seminar Pramuka Penegak & Pandega Se-Kota Palopo Tahun 2025 Mengangkat Tema 'Peran Pramuka Dalam Pengabdian Masyarakat Dan Kepemimpinan Karakter Generasi Organisasi'.",
          konten: "Seminar Pramuka Penegak & Pandega Se-Kota Palopo Tahun 2025 Mengangkat Tema 'Peran Pramuka Dalam Pengabdian Masyarakat Dan Kepemimpinan Karakter Generasi Organisasi'.",
          gambarUtama: '/images/beranda/news-seminar.png',
          penulis: 'Admin Racana',
          status: 'published',
          tanggalPublish: new Date(),
        },
      ],
    });
    console.log('Seeded sample berita.');
  }

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
