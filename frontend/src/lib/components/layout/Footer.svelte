<footer class="footer-root">
  <div class="container">
    <div class="footer-grid">
      <!-- Kolom 1: Identitas Pramuka Polidewa -->
      <div class="footer-col col-identity">
        <h3 class="footer-brand-title">Pramuka Politeknik Dewantara</h3>
        <p class="footer-brand-sub">Racana Dewa Raja – Batari</p>
        <p class="footer-brand-text">
          Wadah pembinaan kepemimpinan mahasiswa dalam gerakan pramuka di tingkat perguruan tinggi, membangun karakter kepemimpinan, kemandirian dan semangat persaudaraan berdasarkan Tri Satya dan Dasa Dharma.
        </p>
        <div class="footer-badge-wrap">
          <span class="footer-pill-btn">Politeknik Dewantara Palopo</span>
        </div>
      </div>

      <!-- Kolom 2: Navigasi Halaman -->
      <div class="footer-col">
        <h4 class="col-title">Navigasi Halaman</h4>
        <ul class="footer-menu-list">
          <li><a href="/">Beranda</a></li>
          <li><a href="/berita">Berita &amp; Kegiatan</a></li>
          <li><a href="/profil">Profil Anggota</a></li>
          <li><a href="/struktur-racana">Struktur Racana</a></li>
          <li><a href="/pendaftaran">Pendaftaran Anggota Baru</a></li>
        </ul>
      </div>

      <!-- Kolom 3: Pangkalan & Lokasi -->
      <div class="footer-col">
        <h4 class="col-title">Pangkalan &amp; Lokasi</h4>
        <div class="location-item">
          <svg viewBox="0 0 24 24" class="loc-icon" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span class="loc-text">
            Kampus Politeknik Dewantara, Jl. K.H. Ahmad Razak Lorong 2 No. 7 Bina Satria, Wara, Kota Palopo, Sulawesi Selatan
          </span>
        </div>
        <div class="location-item date-item">
          <svg viewBox="0 0 24 24" class="loc-icon" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/>
          </svg>
          <span class="loc-text">Berdiri : 17 Mei 2023</span>
        </div>
      </div>

      <!-- Kolom 4: Media Sosial -->
      <div class="footer-col">
        <h4 class="col-title">Media Sosial</h4>
        <div class="social-icons-group">
          <!-- Instagram -->
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            class="social-circle-btn"
            aria-label="Instagram Pramuka Polidewa"
          >
            <svg viewBox="0 0 24 24" class="social-svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          <!-- TikTok -->
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            class="social-circle-btn"
            aria-label="TikTok Pramuka Polidewa"
          >
            <svg viewBox="0 0 24 24" class="social-svg" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.38 6.38 0 0 0-.86-.06A6.33 6.33 0 0 0 3.12 15.6a6.34 6.34 0 0 0 10.82 4.48c.36-.36.68-.76.94-1.2V9.92a8.28 8.28 0 0 0 4.71 1.48v-3.46a4.84 4.84 0 0 1-.001-1.25z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Copyright Row -->
    <div class="footer-bottom-row">
      <p class="copy-text">
        &copy; 2025 &ndash; 2026 Pramuka Politeknik Dewantara &ndash; Racana Dewa Raja &ndash; Batari. Seluruh hak cipta dilindungi.
      </p>
      <div class="footer-bottom-links">
        <span class="campus-text">Politeknik Dewantara Palopo</span>
        <span class="dot-sep">•</span>
        <a href="/admin/login" class="link-admin-portal">Portal Pengurus (Admin)</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-root {
    background-color: var(--color-yellow-gold);
    color: var(--color-purple-dark);
    padding: 3.5rem 0 1.75rem;
    border-top: 1px solid rgba(42, 18, 69, 0.15);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1.3fr 0.8fr;
    gap: 2.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid rgba(42, 18, 69, 0.16);
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .footer-brand-title {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--color-purple-dark);
    line-height: 1.25;
  }

  .footer-brand-sub {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--color-purple-dark);
    margin-top: -0.35rem;
  }

  .footer-brand-text {
    font-size: 0.78rem;
    line-height: 1.55;
    color: rgba(42, 18, 69, 0.88);
    margin-top: 0.4rem;
  }

  .footer-badge-wrap {
    margin-top: 0.6rem;
  }

  .footer-pill-btn {
    display: inline-block;
    background-color: var(--color-purple-dark);
    color: #ffffff;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.35rem 0.9rem;
    border-radius: var(--radius-full);
  }

  .col-title {
    font-size: 0.98rem;
    font-weight: 800;
    color: var(--color-purple-dark);
    margin-bottom: 0.5rem;
  }

  .footer-menu-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-menu-list a {
    font-size: 0.84rem;
    font-weight: 600;
    color: rgba(42, 18, 69, 0.9);
    transition: color 0.15s ease, transform 0.15s ease;
    display: inline-block;
  }

  .footer-menu-list a:hover {
    color: #000000;
    transform: translateX(3px);
  }

  .location-item {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    font-size: 0.8rem;
    line-height: 1.45;
    color: rgba(42, 18, 69, 0.9);
  }

  .date-item {
    margin-top: 0.6rem;
    font-weight: 700;
  }

  .loc-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--color-purple-dark);
  }

  .social-icons-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.25rem;
  }

  .social-circle-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1.5px solid var(--color-purple-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-purple-dark);
    transition: all 0.2s ease;
  }

  .social-circle-btn:hover {
    background-color: var(--color-purple-dark);
    color: #ffffff;
    transform: translateY(-2px);
  }

  .social-svg {
    width: 18px;
    height: 18px;
  }

  .footer-bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(42, 18, 69, 0.85);
  }

  .footer-bottom-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dot-sep {
    opacity: 0.5;
  }

  .link-admin-portal {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--color-purple-dark);
    text-decoration: underline;
    opacity: 0.85;
    transition: opacity 0.2s ease;
  }

  .link-admin-portal:hover {
    opacity: 1;
  }

  @media (max-width: 900px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }

  @media (max-width: 600px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 1.75rem;
    }

    .footer-bottom-row {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
</style>
