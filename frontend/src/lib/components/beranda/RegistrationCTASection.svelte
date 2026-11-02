<section class="cta-reg-section">
  <div class="container cta-container">
    <div class="cta-content-box">
      <h2 class="cta-main-title">
        Siap Mengabdi Bersama Racana Dewa Raja &ndash; Batari?
      </h2>

      <p class="cta-desc-text">
        Pendaftaran Anggota Baru UKM Pramuka Politeknik Dewantara Terbuka Bagi Seluruh Mahasiswa
        Yang Ingin Berkontribusi Aktif, Menumbuhkan Jiwa Mandiri, Dan Berproses Dalam Gerakan Pramuka
        Perguruan Tinggi
      </p>

      <div class="cta-btn-wrap">
        <a href="/pendaftaran" class="btn-daftar-sekarang">
          <svg viewBox="0 0 24 24" class="btn-reg-icon" fill="currentColor" aria-hidden="true">
            <!-- User head -->
            <circle cx="9.5" cy="7.5" r="3.5" />
            <!-- User torso -->
            <path d="M2.5 19.5c0-3.3 3.1-5.5 7-5.5 1.5 0 2.9.35 4.1 1a5.6 5.6 0 0 0-.6 2.5c0 .7.15 1.4.4 2H2.5z" />
            <!-- Checkmark -->
            <path d="M15.5 12l2.3 2.3 4.7-4.7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Isi Formulir Pendaftaran Sekarang</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Decorative Bottom Scout Elements & Ground Baseline (Element01 & Element02 from asset) -->
  <div class="cta-ground-wrapper">
    <div class="cta-baseline"></div>
    <div class="container cta-elements-container">
      <div class="cta-decor-box decor-left">
        <img
          src="/images/beranda/Element01.png"
          alt="Elemen Tenda dan Pohon Pinus Pramuka"
          class="decor-element-img"
          width="149"
          height="83"
          loading="lazy"
        />
      </div>

      <div class="cta-decor-box decor-right">
        <img
          src="/images/beranda/Element02.png"
          alt="Elemen Tenda dan Api Unggun Pramuka"
          class="decor-element-img"
          width="154"
          height="86"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>

<style>
  .cta-reg-section {
    background-color: var(--color-yellow-gold);
    color: var(--color-purple-dark);
    padding: 3.75rem 0 0;
    position: relative;
    overflow: hidden;
  }

  .cta-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 3;
  }

  .cta-content-box {
    text-align: center;
    max-width: 1060px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.15rem;
  }

  .cta-main-title {
    font-size: clamp(1.35rem, 2.25vw, 2.2rem);
    font-weight: 900;
    color: var(--color-purple-dark);
    line-height: 1.25;
    letter-spacing: -0.015em;
    white-space: nowrap;
  }

  .cta-desc-text {
    font-size: 0.88rem;
    line-height: 1.65;
    color: var(--color-purple-dark);
    font-weight: 500;
    max-width: 680px;
  }

  .cta-btn-wrap {
    margin-top: 0.6rem;
  }

  .btn-daftar-sekarang {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.75rem 2rem;
    background: transparent;
    border: 1.8px solid var(--color-purple-dark);
    border-radius: var(--radius-full);
    color: var(--color-purple-dark);
    font-size: 0.95rem;
    font-weight: 800;
    box-shadow: 0 4px 15px rgba(42, 18, 69, 0.15);
    transition: all 0.2s ease;
  }

  .btn-daftar-sekarang:hover {
    background: var(--color-purple-dark);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(42, 18, 69, 0.3);
  }

  .btn-reg-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  /* Ground Baseline Wrapper */
  .cta-ground-wrapper {
    position: relative;
    width: 100%;
    margin-top: -1.25rem;
    z-index: 2;
  }

  .cta-baseline {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5px;
    background-color: #392c54;
    z-index: 1;
  }

  .cta-elements-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    z-index: 2;
    pointer-events: none;
    max-width: 1060px;
    padding: 0 1.25rem;
  }

  .cta-decor-box {
    display: flex;
    align-items: flex-end;
    line-height: 0;
  }

  .decor-element-img {
    display: block;
    height: clamp(52px, 6.2vw, 84px);
    width: auto;
    margin-bottom: -1px;
    transition: transform 0.25s ease;
  }

  @media (max-width: 768px) {
    .cta-reg-section {
      padding: 3rem 0 0;
    }

    .cta-main-title {
      font-size: clamp(1.2rem, 4.5vw, 1.65rem);
      white-space: normal;
      text-wrap: balance;
    }

    .cta-ground-wrapper {
      margin-top: 1.5rem;
    }

    .decor-element-img {
      height: clamp(40px, 8vw, 60px);
    }
  }
</style>
