<script lang="ts">
  import Breadcrumb from '#lib/components/ui/Breadcrumb.svelte';
  import BeritaCard, { type BeritaItem } from '#lib/components/berita/BeritaCard.svelte';

  const breadcrumbs = [
    { label: 'Berita & Kegiatan' },
  ];

  const categories = ['Semua', 'Penerimaan Anggota', 'Kegiatan Ilmiah', 'Latihan Rutin', 'Pengabdian'];
  let activeCategory = $state('Semua');

  const beritaList: BeritaItem[] = [
    {
      id: 1,
      judul: 'Penerimaan Anggota Baru Racana Dewa Raja – Batari Tahun 2026/2027 Resmi Dibuka',
      slug: 'penerimaan-anggota-baru-2026-2027',
      kategori: 'Penerimaan Anggota',
      ringkasan: 'UKM Pramuka Politeknik Dewantara Palopo membuka gerbang pengabdian bagi mahasiswa baru angkatan 2026 yang siap ditempa menjadi calon pemimpin berkarakter luhur.',
      gambarUtama: '/images/Berita pramuka Polidewa.png',
      penulis: 'Admin Racana',
      tanggalPublish: '20 Oktober 2026',
    },
    {
      id: 2,
      judul: 'Seminar Pramuka Penegak & Pandega Se-Kota Palopo Berlangsung Khidmat',
      slug: 'seminar-pramuka-penegak-pandega-se-kota-palopo',
      kategori: 'Kegiatan Ilmiah',
      ringkasan: 'Racana Dewa Raja – Batari sukses menggelar seminar kepemimpinan pemuda dengan menghadirkan narasumber Kwartir Cabang dan praktisi navigasi alam terbuka.',
      gambarUtama: '/images/Beranda Pramuka Polidewa (Desktop).png',
      penulis: 'Divisi Humas',
      tanggalPublish: '12 Mei 2025',
    },
    {
      id: 3,
      judul: 'Latihan Gabungan Navigasi Darat dan Pemetaan Wilayah di Bukit Kambo',
      slug: 'latihan-gabungan-navigasi-darat-kambo',
      kategori: 'Latihan Rutin',
      ringkasan: 'Mengasah ketangkasan kompas bidik, resection-intersection, serta pembacaan kontur topografi oleh Divisi Keilmuan & Evaluasi.',
      gambarUtama: '/images/Profil Sejarah Pramuka Polidewa.png',
      penulis: 'Divisi Keilmuan',
      tanggalPublish: '28 September 2025',
    },
    {
      id: 4,
      judul: 'Bakti Lingkungan Bersih Pesisir Teluk Bone Bersama Warga Nelayan',
      slug: 'bakti-lingkungan-pesisir-teluk-bone',
      kategori: 'Pengabdian',
      ringkasan: 'Wujud nyata pengabdian Dasa Darma kedua: Cinta alam dan kasih sayang sesama manusia melalui penanaman bibit mangrove dan aksi bersih pantai.',
      gambarUtama: '/images/Struktur Racana Pramuka Polidewa.png',
      penulis: 'Divisi Humas & Pengabdian',
      tanggalPublish: '14 Agustus 2025',
    },
  ];

  let filteredBerita = $derived(
    activeCategory === 'Semua'
      ? beritaList
      : beritaList.filter(b => b.kategori === activeCategory)
  );
</script>

<svelte:head>
  <title>Berita & Kegiatan — Pramuka Politeknik Dewantara</title>
  <meta name="description" content="Kilas berita terkini, pengumuman resmi, dan dokumentasi kegiatan Racana Dewa Raja – Batari Polidewa." />
</svelte:head>

<div class="page-berita">
  <div class="container">
    <Breadcrumb items={breadcrumbs} />

    <header class="berita-header">
      <span class="badge-pill">📰 Warta &amp; Dokumentasi</span>
      <h1 class="page-title">Berita &amp; Agenda Kegiatan Racana</h1>
      <p class="header-subtitle">
        Pusat informasi publikasi resmi, kabar perkemahan, kegiatan pelatihan, dan agenda kepengurusan Racana Dewa Raja &ndash; Batari.
      </p>

      <!-- Category Filter Pills -->
      <div class="category-filters">
        {#each categories as cat}
          <button
            class="filter-pill"
            class:active={activeCategory === cat}
            onclick={() => activeCategory = cat}
          >
            {cat}
          </button>
        {/each}
      </div>
    </header>

    <!-- Berita Grid -->
    <div class="berita-list-grid">
      {#each filteredBerita as item}
        <BeritaCard {item} />
      {/each}
    </div>
  </div>
</div>

<style>
  .page-berita {
    padding-bottom: 6rem;
  }

  .berita-header {
    text-align: center;
    max-width: 780px;
    margin: 2rem auto 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .page-title {
    font-size: 2.8rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .header-subtitle {
    font-size: 1.05rem;
    color: var(--color-text-secondary);
  }

  .category-filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
    margin-top: 1rem;
  }

  .filter-pill {
    background: #1e0f36;
    border: 1px solid var(--color-primary-border);
    color: var(--color-text-secondary);
    padding: 0.45rem 1.1rem;
    border-radius: var(--radius-full);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .filter-pill:hover {
    color: #ffffff;
    border-color: var(--color-accent-gold);
  }

  .filter-pill.active {
    background: var(--color-accent-gold);
    color: #18092c;
    border-color: var(--color-accent-gold);
    font-weight: 800;
  }

  .berita-list-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.2rem;
  }

  @media (max-width: 900px) {
    .berita-list-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .page-title {
      font-size: 2rem;
    }
  }
</style>
