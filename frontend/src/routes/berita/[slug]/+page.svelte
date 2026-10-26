<script lang="ts">
  import Breadcrumb from '#lib/components/ui/Breadcrumb.svelte';

  const breadcrumbs = [
    { label: 'Berita', href: '/berita' },
    { label: 'Penerimaan Anggota Baru 2026/2027' },
  ];
</script>

<svelte:head>
  <title>Penerimaan Anggota Baru Racana Dewa Raja – Batari 2026/2027 — Pramuka Polidewa</title>
  <meta name="description" content="Pengumuman resmi pembukaan pendaftaran calon anggota baru Racana Dewa Raja – Batari Politeknik Dewantara Palopo." />
</svelte:head>

<div class="page-detail-berita">
  <div class="container">
    <Breadcrumb items={breadcrumbs} />

    <!-- Article Header -->
    <header class="article-header">
      <div class="badge-pill">
        📢 Pengumuman Resmi &amp; Penerimaan Anggota
      </div>
      <h1 class="article-title">
        Penerimaan Anggota Baru Racana Dewa Raja &ndash; Batari Tahun 2026/2027 Resmi Dibuka
      </h1>
      <div class="article-meta-bar">
        <span>Ditulis oleh <strong>Admin Racana</strong></span>
        <span>&bull;</span>
        <span>20 Oktober 2026</span>
        <span>&bull;</span>
        <span class="read-time">5 Menit Membaca</span>
      </div>
    </header>

    <!-- Main Feature Photo -->
    <figure class="article-figure">
      <div class="figure-img-frame">
        <img
          src="/images/Berita pramuka Polidewa.png"
          alt="Dokumentasi Latihan Kepemimpinan Mahasiswa LKPM"
          class="feature-image"
        />
      </div>
      <figcaption class="figure-caption-bar">
        <span class="caption-text">
          📷 Dokumentasi Latihan Kepemimpinan Mahasiswa (LKPM) Pengurus 2026/2027
        </span>
        <span class="caption-gudep">
          GUDEP 04.017 &ndash; 04.018
        </span>
      </figcaption>
    </figure>

    <!-- Article Content -->
    <main class="article-body-wrapper">
      <article class="article-content-card">
        <p class="dropcap-lead">
          Pramuka Politeknik Dewantara Palopo dengan bangga mengumumkan dibukanya masa penerimaan calon anggota baru Racana Dewa Raja &ndash; Batari untuk masa bakti 2026/2027. Kesempatan ini terbuka luas bagi seluruh mahasiswa aktif Politeknik Dewantara Palopo dari seluruh program studi yang memiliki tekad untuk menempa jiwa kepemimpinan, kedisiplinan, serta mengabdi kepada masyarakat.
        </p>

        <p>
          Racana Dewa Raja (Satuan Putra) dan Racana Batari (Satuan Putri) merupakan ruang aktualisasi diri tingkat Pandega di perguruan tinggi yang menggabungkan kecakapan navigasi alam bebas, manajemen organisasi, hingga pengabdian sosial berbasis Dasa Darma dan Trisatya.
        </p>

        <h2 class="sub-heading">Jadwal dan Persyaratan Pendaftaran</h2>
        <p>
          Proses penerimaan anggota baru akan dilaksanakan dalam beberapa tahapan seleksi berkas, wawancara minat bakat, serta masa orientasi pengenalan adat racana (Kembara Adat):
        </p>

        <ul class="article-list">
          <li><strong>Pendaftaran Online:</strong> 20 Oktober &ndash; 15 November 2026</li>
          <li><strong>Verifikasi Berkas &amp; Administrasi:</strong> 16 &ndash; 18 November 2026</li>
          <li><strong>Wawancara &amp; Temu Ramah:</strong> 20 November 2026</li>
          <li><strong>Prapendidikan &amp; Orientasi Ruang:</strong> 25 &ndash; 27 November 2026</li>
        </ul>

        <div class="inline-cta-box">
          <h3>Ingin Bergabung Bersama Kami?</h3>
          <p>Daftarkan diri Anda sekarang melalui formulir online resmi.</p>
          <a href="/pendaftaran" class="btn-daftar-inline">
            Isi Formulir Pendaftaran Sekarang &rarr;
          </a>
        </div>
      </article>

      <!-- Sidebar / Berita Lainnya -->
      <aside class="article-sidebar">
        <div class="sidebar-header">
          <span class="badge-pill">📋 Pilihan Redaksi</span>
          <h3 class="sidebar-title">Berita &amp; Agenda Lainnya</h3>
        </div>

        <div class="related-card">
          <img
            src="/images/Beranda Pramuka Polidewa (Desktop).png"
            alt="Seminar Se-Kota Palopo"
            class="related-thumb"
          />
          <div class="related-body">
            <span class="related-tag">SEMINAR SE-KOTA PALOPO</span>
            <h4 class="related-title">
              <a href="/berita">Seminar Pramuka Penegak &amp; Pandega Se-Kota Palopo Tahun 2025</a>
            </h4>
            <span class="related-date">12 Mei 2025</span>
          </div>
        </div>

        <a href="/berita" class="btn-all-news">
          Lihat Semua Berita &rarr;
        </a>
      </aside>
    </main>
  </div>
</div>

<style>
  .page-detail-berita {
    padding-bottom: 6rem;
  }

  .article-header {
    text-align: center;
    max-width: 860px;
    margin: 1.5rem auto 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .article-title {
    font-size: 2.7rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .article-meta-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }

  .article-meta-bar strong {
    color: var(--color-accent-gold);
  }

  /* Figure Frame */
  .article-figure {
    max-width: 1040px;
    margin: 0 auto 3.5rem;
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 2px solid var(--color-primary-border);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  }

  .figure-img-frame {
    width: 100%;
    max-height: 520px;
    overflow: hidden;
    background: #140924;
  }

  .feature-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .figure-caption-bar {
    background: #160a2c;
    padding: 1rem 1.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--color-primary-border);
    font-size: 0.88rem;
  }

  .caption-text {
    color: var(--color-text-secondary);
  }

  .caption-gudep {
    color: var(--color-accent-gold);
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  /* Body & Layout */
  .article-body-wrapper {
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 3rem;
    max-width: 1040px;
    margin: 0 auto;
    align-items: start;
  }

  .article-content-card {
    background: #1c0e33;
    border: 1px solid var(--color-primary-border);
    border-radius: var(--radius-xl);
    padding: 3rem 2.5rem;
    color: var(--color-text-light);
    line-height: 1.8;
    font-size: 1.05rem;
  }

  .dropcap-lead::first-letter {
    font-size: 3.8rem;
    float: left;
    line-height: 0.8;
    padding-right: 0.75rem;
    padding-top: 0.3rem;
    color: var(--color-accent-gold);
    font-weight: 900;
    font-family: var(--font-heading);
  }

  .sub-heading {
    font-size: 1.6rem;
    font-weight: 800;
    color: #ffffff;
    margin: 2.2rem 0 1rem;
    border-bottom: 2px solid var(--color-primary-border);
    padding-bottom: 0.5rem;
  }

  .article-list {
    margin: 1.25rem 0 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .inline-cta-box {
    margin-top: 2.5rem;
    background: linear-gradient(135deg, #2a144e 0%, #1a0a30 100%);
    border: 1px solid var(--color-accent-gold);
    border-radius: var(--radius-lg);
    padding: 2rem;
    text-align: center;
  }

  .inline-cta-box h3 {
    font-size: 1.3rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }

  .inline-cta-box p {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    margin-bottom: 1.25rem;
  }

  .btn-daftar-inline {
    display: inline-block;
    background: var(--color-accent-gold);
    color: #18092c;
    font-weight: 800;
    padding: 0.8rem 1.6rem;
    border-radius: var(--radius-full);
    font-size: 0.92rem;
  }

  /* Sidebar */
  .article-sidebar {
    background: #190a2e;
    border: 1px solid var(--color-primary-border);
    border-radius: var(--radius-xl);
    padding: 2rem 1.75rem;
  }

  .sidebar-header {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sidebar-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #ffffff;
  }

  .related-card {
    background: #120520;
    border: 1px solid var(--color-primary-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .related-thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .related-body {
    padding: 1.25rem;
  }

  .related-tag {
    font-size: 0.7rem;
    font-weight: 800;
    color: var(--color-accent-gold);
    display: block;
    margin-bottom: 0.4rem;
  }

  .related-title {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.35;
    margin-bottom: 0.5rem;
  }

  .related-title a {
    color: #ffffff;
  }

  .related-title a:hover {
    color: var(--color-accent-gold-light);
  }

  .related-date {
    font-size: 0.78rem;
    color: var(--color-text-muted);
  }

  .btn-all-news {
    display: block;
    text-align: center;
    padding: 0.75rem;
    border: 1px solid var(--color-primary-border);
    border-radius: var(--radius-md);
    color: var(--color-accent-gold);
    font-weight: 700;
    font-size: 0.9rem;
  }

  .btn-all-news:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 900px) {
    .article-body-wrapper {
      grid-template-columns: 1fr;
    }

    .article-title {
      font-size: 2rem;
    }

    .figure-caption-bar {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
</style>
