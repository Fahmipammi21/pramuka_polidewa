<section class="news-section">
  <div class="container">
    <div class="news-header">
      <div class="ref-badge">
        <svg viewBox="0 0 24 24" class="badge-icon" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        <span>Informasi &amp; Berita Kegiatan</span>
      </div>
      <h2 class="section-heading">Tentang Kegiatan Racana</h2>
    </div>

    <div class="news-cards-grid">
      <!-- Card 1: Penerimaan Anggota Baru / LKPM -->
      <article class="news-white-card">
        <div class="card-thumb-frame">
          <img
            src="/images/beranda/FotoLKPM25.png"
            alt="Penerimaan Anggota Baru Racana Dewa Raja – Batari"
            class="card-img"
          />
        </div>
        <div class="card-content">
          <h3 class="card-title">
            <a href="/berita/penerimaan-anggota-baru-2026-2027">
              Penerimaan Anggota Baru Racana Dewa Raja – Batari Tahun 2026/2027
            </a>
          </h3>
          <p class="card-excerpt">
            Pramuka Politeknik Dewantara secara resmi membuka penerimaan anggota baru bagi mahasiswa yang bersemangat untuk mengembangkan karakter kepemimpinan, kemandirian, dan semangat persaudaraan sejati.
          </p>
          <div class="card-footer">
            <div class="author-meta">
              <svg viewBox="0 0 20 20" fill="currentColor" class="user-icon">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
              <span>Admin Racana</span>
            </div>
            <a href="/berita/penerimaan-anggota-baru-2026-2027" class="link-baca">
              Baca Selengkapnya &rarr;
            </a>
          </div>
        </div>
      </article>

      <!-- Card 2: Seminar Pramuka -->
      <article class="news-white-card">
        <div class="card-thumb-frame">
          <img
            src="/images/beranda/FotoSeminar01.png"
            alt="Seminar Pramuka Penegak & Pandega Se-Kota Palopo"
            class="card-img"
          />
        </div>
        <div class="card-content">
          <h3 class="card-title">
            <a href="/berita">
              Seminar Pramuka Penegak &amp; Pandega Se-Kota Palopo Tahun 2025
            </a>
          </h3>
          <p class="card-excerpt">
            Seminar Pramuka Penegak &amp; Pandega Se-Kota Palopo Tahun 2025 Mengangkat Tema 'Peran Pramuka Dalam Pengabdian Masyarakat Dan Kepemimpinan Karakter Generasi Organisasi'.
          </p>
          <div class="card-footer">
            <div class="author-meta">
              <svg viewBox="0 0 20 20" fill="currentColor" class="user-icon">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
              <span>Admin Racana</span>
            </div>
            <a href="/berita" class="link-baca">
              Baca Selengkapnya &rarr;
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>

<style>
  .news-section {
    padding: 3rem 0 4.5rem;
    background-color: var(--color-purple-bg);
  }

  .news-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    margin-bottom: 2.2rem;
  }

  .badge-icon {
    width: 14px;
    height: 14px;
    color: var(--color-yellow-gold);
  }

  .section-heading {
    font-size: 2.25rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.015em;
  }

  .news-cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .news-white-card {
    background: #ffffff;
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.25);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .news-white-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
  }

  .card-thumb-frame {
    width: 100%;
    aspect-ratio: 16 / 8.5;
    overflow: hidden;
    background-color: #1a0a2e;
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  .news-white-card:hover .card-img {
    transform: scale(1.03);
  }

  .card-content {
    padding: 1.5rem 1.6rem 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: 800;
    line-height: 1.35;
    color: #200e38;
    margin-bottom: 0.75rem;
  }

  .card-title a {
    color: #200e38;
    transition: color 0.2s ease;
  }

  .card-title a:hover {
    color: var(--color-purple-bg);
    text-decoration: underline;
  }

  .card-excerpt {
    font-size: 0.85rem;
    color: #666666;
    line-height: 1.55;
    margin-bottom: 1.5rem;
    flex: 1;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.85rem;
    border-top: 1px solid #eeeeee;
    font-size: 0.82rem;
  }

  .author-meta {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #888888;
  }

  .user-icon {
    width: 15px;
    height: 15px;
  }

  .link-baca {
    color: #421d6e;
    font-weight: 700;
    transition: transform 0.2s ease;
  }

  .link-baca:hover {
    transform: translateX(3px);
  }

  @media (max-width: 860px) {
    .news-cards-grid {
      grid-template-columns: 1fr;
      gap: 1.75rem;
    }

    .section-heading {
      font-size: 1.85rem;
    }
  }
</style>
