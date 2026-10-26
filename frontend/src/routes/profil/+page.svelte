<script lang="ts">
  import Breadcrumb from '#lib/components/ui/Breadcrumb.svelte';

  const breadcrumbs = [
    { label: 'Profil', href: '/profil' },
    { label: 'Sejarah Racana' },
  ];

  const timelineEvents = [
    {
      tahun: 'Fase Perintisan',
      judul: 'Inisiasi Gugus Depan Perguruan Tinggi',
      deskripsi: 'Diprakarsai oleh para instruktur muda dan mahasiswa perintis di kampus Politeknik Dewantara Palopo untuk menghadirkan kepanduan tingkat Pandega yang progresif.',
    },
    {
      tahun: 'Pengukuhan Gugus Depan',
      judul: 'Penerbitan Nomor Gudep 04.017 – 04.018',
      deskripsi: 'Kwartir Cabang resmi mengukuhkan pangkalan Politeknik Dewantara dengan dua satuan terpisah: Gudep 04.017 untuk Satuan Putra dan Gudep 04.018 untuk Satuan Putri.',
    },
    {
      tahun: 'Penetapan Adat Racana',
      judul: 'Lahirnya Nama Dewa Raja & Batari',
      deskripsi: 'Musyawarah Pandega menetapkan nama racana berbasis nilai kearifan Luwu: Dewa Raja melambangkan wibawa kepemimpinan ksatria, dan Batari melambangkan kemuliaan budi pekerti pertiwi.',
    },
    {
      tahun: 'Masa Kini',
      judul: 'Eksistensi Aktif & Kiprah Pengabdian Berkelanjutan',
      deskripsi: 'Racana Dewa Raja – Batari terus aktif menyelenggarakan pendidikan kepemimpinan, SAR alam bebas, bakti sosial kemasyarakatan, dan regenerasi kepengurusan.',
    },
  ];
</script>

<svelte:head>
  <title>Profil & Sejarah — Racana Dewa Raja – Batari</title>
  <meta name="description" content="Sejarah, filosofi nama, pusaka adat, dan historiografi UKM Pramuka Politeknik Dewantara Palopo Gudep 04.017 – 04.018." />
</svelte:head>

<div class="page-profil">
  <div class="container">
    <Breadcrumb items={breadcrumbs} />

    <!-- 1. HEADER SEJARAH -->
    <header class="profil-header">
      <div class="header-main-col">
        <span class="badge-pill">🏛 Historiografi Racana</span>
        <h1 class="profil-title">Sejarah &amp; Kilas Balik Racana Dewa Raja &ndash; Batari</h1>
        <p class="profil-lead">
          Pramuka Politeknik Dewantara Palopo berhimpun dalam wadah Racana Dewa Raja &ndash; Batari sebagai kawah candradimuka bagi mahasiswa dalam memupuk watak kesatria, kemandirian berdaya, dan kecintaan pada tanah air berlandaskan Dasa Darma dan Trisatya.
        </p>
      </div>

      <div class="pangkalan-box">
        <div class="pangkalan-badge">Pangkalan Resmi</div>
        <h2 class="pangkalan-kampus">Politeknik Dewantara Palopo</h2>
        <p class="pangkalan-alamat">Jl. KH. Ahmad Razak No. 2, Wara, Kota Palopo</p>
        <div class="gudep-split">
          <div class="gudep-item">
            <span class="label">Satuan Putra</span>
            <strong class="val">Gudep 04.017</strong>
          </div>
          <div class="gudep-divider"></div>
          <div class="gudep-item">
            <span class="label">Satuan Putri</span>
            <strong class="val">Gudep 04.018</strong>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. FILOSOFI NAMA & ADAT -->
    <section class="section-filosofi">
      <div class="section-title-wrap">
        <span class="badge-purple">🔱 Filosofi Nama &amp; Adat</span>
        <h2 class="section-title">Marwah Kesatria &amp; Keluhuran Budi</h2>
        <p class="section-subtitle">
          Nama Racana Dewa Raja dan Batari berakar dari nilai luhur peradaban Tana Luwu yang sarat keteladanan watak luhur, keteguhan prinsip, dan pengayoman.
        </p>
      </div>

      <div class="racana-cards-grid">
        <!-- Satuan Putra -->
        <div class="racana-identity-card putra">
          <div class="card-icon-emblem">🛡</div>
          <div class="card-gudep-number">GUGUS DEPAN 04.017 &bull; SATUAN PUTRA</div>
          <h3 class="racana-name">Racana Dewa Raja</h3>
          <p class="racana-desc">
            Mengambil inspirasi dari ketegasan dan kepemimpinan raja-raja Luwu kuno yang mengedepankan kebijaksanaan, keberanian membela kebenaran, serta menjadi perisai bagi rakyatnya.
          </p>

          <div class="karakter-block">
            <h4>Dimensi Karakter Kunci:</h4>
            <ul>
              <li><strong>Kebangsawanan Pemikiran:</strong> Berwawasan luas dan berintelektual solutif.</li>
              <li><strong>Kepemimpinan Pengayom:</strong> Melindungi, memimpin dengan teladan nyata.</li>
              <li><strong>Integritas Perwira:</strong> Memegang teguh kehormatan janji pandega.</li>
            </ul>
          </div>

          <div class="pusaka-box">
            <span class="pusaka-label">Pusaka Adat Kehormatan:</span>
            <span class="pusaka-name">🗡 Kawali / Badik Gecong Luwu</span>
          </div>
        </div>

        <!-- Satuan Putri -->
        <div class="racana-identity-card putri">
          <div class="card-icon-emblem">👑</div>
          <div class="card-gudep-number">GUGUS DEPAN 04.018 &bull; SATUAN PUTRI</div>
          <h3 class="racana-name">Racana Batari</h3>
          <p class="racana-desc">
            Merujuk pada kemuliaan figur permaisuri dan tokoh wanita agung Luwu yang sarat martabat, keteduhan rasa, kelembutan bersikap, namun teguh dalam menjaga marwah bangsa.
          </p>

          <div class="karakter-block">
            <h4>Dimensi Karakter Kunci:</h4>
            <ul>
              <li><strong>Kemuliaan Budi &amp; Martabat:</strong> Bertutur santun dan berkepribadian anggun.</li>
              <li><strong>Kecerdasan Rasa &amp; Naluri Sosial:</strong> Peka terhadap dinamika lingkungan sosial.</li>
              <li><strong>Kemandirian Berdaya:</strong> Tanggap, terampil, dan berkemampuan adaptif.</li>
            </ul>
          </div>

          <div class="pusaka-box">
            <span class="pusaka-label">Pusaka Adat Kehormatan:</span>
            <span class="pusaka-name">🪭 Kipas Adat Kehormatan</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. SANDI RACANA -->
    <section class="section-sandi">
      <div class="sandi-card">
        <div class="sandi-header">
          <span class="badge-pill">Sandi &amp; Nilai Dasar</span>
          <h2>Pijakan Adat Racana</h2>
        </div>
        <p class="sandi-intro">
          Sebagai pedoman tingkah laku pergaulan sehari-hari dalam adat perkemahan maupun kehidupan bermasyarakat, seluruh warga racana memegang teguh falsafah:
        </p>
        <div class="sandi-badges-flex">
          <div class="sandi-pill-highlight">
            <span class="sandi-quote">&ldquo;Taro Ada Taro Gau&rdquo;</span>
            <span class="sandi-meaning">(Kesesuaian antara tutur kata dan perbuatan nyata)</span>
          </div>
          <div class="sandi-pill-highlight">
            <span class="sandi-quote">&ldquo;Adai Saling Menghormati&rdquo;</span>
            <span class="sandi-meaning">(Persaudaraan berakar pada penghormatan harkat martabat)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. LINIMASA SEJARAH -->
    <section class="section-timeline">
      <div class="section-title-wrap">
        <span class="badge-pill">Linimasa Perjalanan</span>
        <h2 class="section-title">Tonggak Sejarah Racana Polidewa</h2>
      </div>

      <div class="timeline-container">
        {#each timelineEvents as evt, i}
          <div class="timeline-item" class:left={i % 2 === 0} class:right={i % 2 !== 0}>
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <span class="timeline-year">{evt.tahun}</span>
              <h3 class="timeline-item-title">{evt.judul}</h3>
              <p class="timeline-item-desc">{evt.deskripsi}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  .page-profil {
    padding-bottom: 6rem;
  }

  .profil-header {
    display: grid;
    grid-template-columns: 1.35fr 0.85fr;
    gap: 3rem;
    align-items: center;
    margin: 2rem 0 4.5rem;
  }

  .profil-title {
    font-size: 2.8rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
    margin: 1rem 0;
    letter-spacing: -0.02em;
  }

  .profil-lead {
    font-size: 1.05rem;
    color: var(--color-text-secondary);
    line-height: 1.65;
  }

  .pangkalan-box {
    background: linear-gradient(135deg, #241142 0%, #17092c 100%);
    border: 2px solid var(--color-accent-gold);
    border-radius: var(--radius-xl);
    padding: 2.2rem 1.8rem;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  }

  .pangkalan-badge {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent-gold-light);
    background: rgba(240, 192, 64, 0.15);
    padding: 0.25rem 0.65rem;
    border-radius: var(--radius-full);
    margin-bottom: 0.85rem;
  }

  .pangkalan-kampus {
    font-size: 1.35rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.35rem;
  }

  .pangkalan-alamat {
    font-size: 0.88rem;
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }

  .gudep-split {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(14, 5, 28, 0.7);
    border-radius: var(--radius-md);
    padding: 1rem 0.5rem;
    border: 1px solid var(--color-primary-border);
  }

  .gudep-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .gudep-item .label {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    margin-bottom: 0.2rem;
  }

  .gudep-item .val {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--color-accent-gold);
  }

  .gudep-divider {
    width: 1px;
    height: 36px;
    background: var(--color-primary-border);
  }

  /* Filosofi Section */
  .section-filosofi {
    margin-bottom: 5rem;
  }

  .section-title-wrap {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .section-subtitle {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  .racana-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  .racana-identity-card {
    background: #1e0e36;
    border-radius: var(--radius-xl);
    padding: 2.8rem 2.2rem;
    border: 1px solid var(--color-primary-border);
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .racana-identity-card.putra {
    border-top: 4px solid var(--color-accent-gold);
  }

  .racana-identity-card.putri {
    border-top: 4px solid #e879f9;
  }

  .card-icon-emblem {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .card-gudep-number {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--color-accent-gold-light);
    margin-bottom: 0.5rem;
  }

  .racana-name {
    font-size: 1.85rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  .racana-desc {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: 1.75rem;
  }

  .karakter-block {
    background: rgba(14, 5, 28, 0.5);
    border-radius: var(--radius-md);
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: 1.75rem;
  }

  .karakter-block h4 {
    font-size: 0.88rem;
    color: #ffffff;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .karakter-block ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: var(--color-text-secondary);
  }

  .karakter-block strong {
    color: var(--color-text-white);
  }

  .pusaka-box {
    margin-top: auto;
    padding-top: 1.25rem;
    border-top: 1px solid var(--color-primary-border-soft);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .pusaka-label {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
  }

  .pusaka-name {
    font-size: 1rem;
    font-weight: 800;
    color: var(--color-accent-gold-light);
  }

  /* Sandi Section */
  .section-sandi {
    margin-bottom: 5.5rem;
  }

  .sandi-card {
    background: radial-gradient(circle at 50% 50%, #2b134d 0%, #190a2e 100%);
    border: 1px solid var(--color-accent-gold);
    border-radius: var(--radius-xl);
    padding: 3.5rem 2.5rem;
    text-align: center;
  }

  .sandi-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .sandi-header h2 {
    font-size: 2rem;
    font-weight: 800;
    color: #ffffff;
  }

  .sandi-intro {
    font-size: 1rem;
    color: var(--color-text-secondary);
    max-width: 650px;
    margin: 0 auto 2rem;
  }

  .sandi-badges-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .sandi-pill-highlight {
    background: rgba(14, 5, 28, 0.7);
    border: 1px solid var(--color-accent-gold);
    border-radius: var(--radius-lg);
    padding: 1.2rem 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    max-width: 360px;
  }

  .sandi-quote {
    font-size: 1.15rem;
    font-weight: 800;
    font-style: italic;
    color: var(--color-accent-gold-light);
  }

  .sandi-meaning {
    font-size: 0.8rem;
    color: var(--color-text-secondary);
  }

  /* Timeline */
  .section-timeline {
    margin-bottom: 3rem;
  }

  .timeline-container {
    position: relative;
    max-width: 820px;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .timeline-container::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: linear-gradient(180deg, var(--color-accent-gold) 0%, var(--color-primary-border) 100%);
  }

  .timeline-item {
    position: relative;
    margin-bottom: 3rem;
    width: 50%;
  }

  .timeline-item.left {
    left: 0;
    padding-right: 3rem;
    text-align: right;
  }

  .timeline-item.right {
    left: 50%;
    padding-left: 3rem;
    text-align: left;
  }

  .timeline-marker {
    position: absolute;
    top: 1rem;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-accent-gold);
    border: 3px solid #18092c;
    box-shadow: 0 0 10px var(--color-accent-gold);
  }

  .timeline-item.left .timeline-marker {
    right: -8px;
  }

  .timeline-item.right .timeline-marker {
    left: -8px;
  }

  .timeline-content {
    background: #1c0e33;
    border: 1px solid var(--color-primary-border);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
  }

  .timeline-year {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--color-accent-gold-light);
    margin-bottom: 0.4rem;
  }

  .timeline-item-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.6rem;
  }

  .timeline-item-desc {
    font-size: 0.88rem;
    color: var(--color-text-secondary);
    line-height: 1.55;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .profil-header {
      grid-template-columns: 1fr;
      margin-bottom: 3rem;
    }

    .racana-cards-grid {
      grid-template-columns: 1fr;
    }

    .timeline-container::before {
      left: 20px;
    }

    .timeline-item {
      width: 100%;
      left: 0 !important;
      padding-left: 50px !important;
      padding-right: 0 !important;
      text-align: left !important;
    }

    .timeline-marker {
      left: 12px !important;
      right: auto !important;
    }
  }

  @media (max-width: 640px) {
    .profil-title {
      font-size: 2rem;
    }
  }
</style>
