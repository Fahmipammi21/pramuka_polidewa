<script lang="ts">
  import { onMount } from 'svelte';
  import Breadcrumb from '#lib/components/ui/Breadcrumb.svelte';
  import BeritaCard, { type BeritaItem } from '#lib/components/berita/BeritaCard.svelte';

  const breadcrumbs = [
    { label: 'Berita & Kegiatan' },
  ];

  const categories = ['Semua', 'Penerimaan Anggota', 'Kegiatan Ilmiah', 'Latihan Rutin', 'Pengabdian', 'Kegiatan Racana'];
  let activeCategory = $state('Semua');

  const defaultHero = {
    id: 1,
    judul: 'Penerimaan Anggota Baru Racana Dewa Raja – Batari Tahun 2026/2027 Resmi Dibuka',
    slug: 'penerimaan-anggota-baru-2026-2027',
    kategori: 'Penerimaan Anggota',
    ringkasan: 'UKM Pramuka Politeknik Dewantara Palopo membuka gerbang pengabdian bagi mahasiswa baru angkatan 2026 yang siap ditempa menjadi calon pemimpin berkarakter luhur.',
    konten: `Pramuka Politeknik Dewantara secara resmi mengumumkan pembukaan Penerimaan Anggota Baru (PAB) Racana Dewa Raja – Batari untuk Tahun Bakti 2026/2027. Program ini merupakan wadah kaderisasi kepemimpinan kepanduan perguruan tinggi tingkat Pandega yang dirancang untuk mengasah kecakapan profesional, kematangan emosional, dan integritas pengabdian masyarakat bagi seluruh mahasiswa kampus Politeknik Dewantara Palopo.\n\nSebagai gugus depan yang berpangkalan di perguruan tinggi vokasi terkemuka di Kota Palopo, Racana Dewa Raja (Putra) dan Batari (Putri) mengintegrasikan nilai-nilai kepanduan dunia dengan tuntutan kompetensi abad ke-21. Mahasiswa tidak hanya diajak mencintai alam dan berkemah, melainkan dilatih mengelola proyek kemanusiaan, manajemen risiko, serta kepemimpinan egaliter yang berdaya guna.`,
    gambarUtama: '/images/berita/hero-lkpm-photo.jpg',
    captionGambar: 'Dokumentasi Latihan Kepemimpinan Mahasiswa ( LKPM) Pengurus 2026/2027',
    penulis: 'Admin Racana',
    tanggalPublish: '20 Oktober 2026',
  };

  let beritaList = $state<any[]>([]);
  let isLoaded = $state(false);

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/berita?limit=50');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          beritaList = json.data.map((item: any) => ({
            ...item,
            tanggalPublish: item.tanggalPublish
              ? new Date(item.tanggalPublish).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : item.tanggalPublish,
          }));
        }
      }
    } catch (e) {
      console.warn('Gagal memuat berita dari backend API, menggunakan data cadangan.', e);
    } finally {
      isLoaded = true;
    }
  });

  // Hero Utama Berita (diambil dari item paling baru dari database admin)
  let heroBerita = $derived(
    beritaList.length > 0 ? beritaList[0] : defaultHero
  );

  // Paragraf deskripsi berita hero
  let heroParagraphs = $derived.by(() => {
    const raw = heroBerita.konten || heroBerita.ringkasan || defaultHero.konten;
    return raw
      .split('\n')
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 0);
  });

  // Daftar sisa berita untuk katalog bawah
  let catalogList = $derived(
    beritaList.length > 1
      ? beritaList.slice(1)
      : (beritaList.length === 1 ? beritaList : [defaultHero])
  );

  let filteredBerita = $derived(
    activeCategory === 'Semua'
      ? catalogList
      : catalogList.filter(b => b.kategori === activeCategory)
  );
</script>

<svelte:head>
  <title>Berita & Kegiatan — Pramuka Politeknik Dewantara</title>
  <meta name="description" content="Kilas berita terkini, pengumuman resmi, dan dokumentasi kegiatan Racana Dewa Raja – Batari Polidewa." />
</svelte:head>

<div class="page-berita">
  <div class="container">
    <Breadcrumb items={breadcrumbs} />

    <!-- SECTION AWAL BERITA (HERO PENGUMUMAN DINAMIS KONTROL ADMIN) -->
    <section class="berita-hero-section">
      <div class="hero-badge-wrap">
        <span class="announcement-pill">
          <!-- Ikon Pengumuman (Megaphone) -->
          <svg viewBox="0 0 24 24" class="badge-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 11l18-5v12L3 13v-2z" />
            <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
          </svg>
          {heroBerita.kategori ? `${heroBerita.kategori} & Dokumentasi Resmi` : 'Pengumuman Resmi & Penerimaan Anggota'}
        </span>
      </div>

      <h1 class="hero-headline">
        {heroBerita.judul}
      </h1>

      <a href={`/berita/${heroBerita.slug}`} class="hero-card-frame" title={`Buka detail pengumuman: ${heroBerita.judul}`}>
        <div class="hero-image-wrap">
          <img
            src={heroBerita.gambarUtama || '/images/berita/hero-lkpm-photo.jpg'}
            alt={heroBerita.captionGambar || heroBerita.judul}
            class="hero-image"
          />
        </div>

        <div class="hero-caption-bar">
          <div class="caption-left">
            <svg viewBox="0 0 24 24" class="camera-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <span>{heroBerita.captionGambar || `Dokumentasi: ${heroBerita.judul}`}</span>
          </div>
          <span class="caption-right">GUDEP 04.017 &ndash; 04.018</span>
        </div>
      </a>

      <!-- INFORMASI BERITA DI BAGIAN BAWAH GAMBAR -->
      <div class="hero-article-info">
        {#each heroParagraphs as p}
          <p class="article-p">{p}</p>
        {/each}
      </div>
    </section>

    <!-- SECTION ARTIKEL DAN FILTER WARTA KEGIATAN -->
    <section class="berita-list-section">
      <div class="list-heading-row">
        <div class="heading-left">
          <span class="sub-badge">📰 Warta &amp; Dokumentasi</span>
          <h2 class="section-title">Koleksi Berita &amp; Agenda Kegiatan</h2>
        </div>

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
      </div>

      <!-- Berita Grid -->
      <div class="berita-list-grid">
        {#each filteredBerita as item (item.id || item.slug)}
          <BeritaCard {item} />
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  .page-berita {
    padding-bottom: 6rem;
  }

  /* ==========================================================================
     SECTION AWAL BERITA (HERO PENGUMUMAN)
     ========================================================================== */
  .berita-hero-section {
    margin: 1.5rem 0 4.5rem;
  }

  .hero-badge-wrap {
    margin-bottom: 1.15rem;
  }

  .announcement-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 1.3rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: #ffffff;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .badge-icon {
    width: 17px;
    height: 17px;
    color: #ffffff;
    flex-shrink: 0;
  }

  .hero-headline {
    font-size: 1.72rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.35;
    letter-spacing: -0.02em;
    margin: 0 0 1.5rem;
    max-width: 950px;
  }

  .hero-card-frame {
    display: block;
    text-decoration: none;
    border-radius: 20px;
    overflow: hidden;
    background: #431e6e;
    box-shadow: 0 16px 36px rgba(18, 6, 36, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  }

  .hero-card-frame:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 48px rgba(18, 6, 36, 0.6);
  }

  .hero-image-wrap {
    width: 100%;
    overflow: hidden;
    background: #2a1148;
  }

  .hero-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    object-position: center;
  }

  .hero-caption-bar {
    background: #431e6e;
    padding: 1rem 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .caption-left {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    font-size: 0.9rem;
    color: #ffffff;
    font-weight: 600;
  }

  .camera-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: #ffffff;
    opacity: 0.95;
  }

  .caption-right {
    font-size: 0.88rem;
    font-weight: 800;
    color: #ffffff;
    white-space: nowrap;
    letter-spacing: 0.04em;
  }

  /* ==========================================================================
     INFORMASI BERITA DI BAGIAN BAWAH GAMBAR
     ========================================================================== */
  .hero-article-info {
    margin-top: 1.8rem;
    background: rgba(43, 18, 72, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    padding: 2.2rem 2.6rem;
    box-shadow: 0 14px 34px rgba(18, 6, 36, 0.35);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .article-p {
    font-size: 1.02rem;
    line-height: 1.78;
    color: #ffffff;
    margin: 0 0 1.35rem;
    letter-spacing: 0.01em;
  }

  .article-p:last-child {
    margin-bottom: 0;
  }

  /* ==========================================================================
     SECTION ARTIKEL & FILTER
     ========================================================================== */
  .berita-list-section {
    margin-top: 1rem;
  }

  .list-heading-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2.2rem;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .sub-badge {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 800;
    color: var(--color-accent-gold);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.4rem;
  }

  .section-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0;
  }

  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
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

  /* ==========================================================================
     RESPONSIVE BREAKPOINTS
     ========================================================================== */
  @media (max-width: 900px) {
    .hero-headline {
      font-size: 1.4rem;
    }

    .hero-caption-bar {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.6rem;
      padding: 0.9rem 1.2rem;
    }

    .hero-article-info {
      padding: 1.8rem 1.6rem;
    }

    .article-p {
      font-size: 0.96rem;
      line-height: 1.7;
    }

    .list-heading-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .berita-list-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .hero-headline {
      font-size: 1.22rem;
      line-height: 1.35;
    }

    .hero-article-info {
      padding: 1.4rem 1.2rem;
      border-radius: 16px;
    }

    .article-p {
      font-size: 0.88rem;
      line-height: 1.65;
    }

    .announcement-pill {
      font-size: 0.82rem;
      padding: 0.45rem 1rem;
    }

    .caption-left, .caption-right {
      font-size: 0.8rem;
    }

    .section-title {
      font-size: 1.4rem;
    }
  }
</style>
