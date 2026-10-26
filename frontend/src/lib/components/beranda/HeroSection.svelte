<section class="hero-root">
  <div class="container hero-grid">
    <!-- Left Column: Information -->
    <div class="hero-left">
      <div class="ref-badge">
        <span>Pusat Informasi Resmi</span>
      </div>

      <h1 class="hero-main-title">PRAMUKA POLIDEWA</h1>

      <p class="hero-gudep">
        Racana Dewa Raja – Batari Gugus Depan 04.017 – 04.018
      </p>
      <p class="hero-pangkalan">Pangkalan Politeknik Dewantara Palopo</p>

      <div class="hero-slogan-wrap">
        <span class="hero-slogan-pill">
          &ldquo;Dari Adat Kami Berpijak, Dengan Satya Kami Melangkah, Melalui
          Darma Kami Mengabdi;
        </span>
      </div>

      <p class="hero-summary">
        Wadah Pembinaan Kepemimpinan, Karakter, Kemandirian, Dan Persaudaraan
        Bagi Mahasiswa Politeknik Dewantara Melalui Nilai-nilai Luhur Gerakan
        Pramuka.
      </p>

      <div class="hero-btn-wrap">
        <a href="/pendaftaran" class="btn-patok-tenda">
          <svg viewBox="0 0 24 24" class="btn-tent-icon" fill="currentColor">
            <path
              d="M12 2L1 21h22L12 2zm0 4.5l6.5 12.5h-13L12 6.5zM12 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-1 5h2v2h-2v-2z"
            />
          </svg>
          <span>Patok Tenda Kamu, Dan Bergabung bersama kami!</span>
        </a>
      </div>
    </div>

    <!-- Right Column: Scouts Cutout & Yellow Accent -->
    <div class="hero-right">
      <img
        src="/images/beranda/hero-beranda.svg"
        alt="Anggota Pramuka Penegak Putra dan Putri Politeknik Dewantara"
        class="hero-scouts-img"
      />
    </div>
  </div>
</section>

<style>
  .hero-root {
    background-color: var(--color-purple-bg);
    min-height: calc(100vh - 72px);
    min-height: calc(100dvh - 72px);
    display: flex;
    align-items: center;
    padding: 2.5rem 0;
    overflow: hidden;
    position: relative;
  }

  .hero-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2rem;
    align-items: center;
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    z-index: 2;
  }

  .hero-main-title {
    font-size: 3.1rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.1;
    letter-spacing: -0.015em;
    margin-top: 0.35rem;
    text-transform: uppercase;
  }

  .hero-gudep {
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-top: -0.2rem;
  }

  .hero-pangkalan {
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
    margin-top: -0.35rem;
  }

  .hero-slogan-wrap {
    margin: 0.6rem 0;
  }

  .hero-slogan-pill {
    display: inline-block;
    background-color: var(--color-yellow-slogan);
    color: var(--color-purple-dark);
    font-weight: 800;
    font-style: italic;
    font-size: 0.76rem;
    padding: 0.45rem 1.4rem;
    border-radius: var(--radius-full);
    box-shadow: 0 4px 14px rgba(247, 182, 56, 0.3);
  }

  .hero-summary {
    font-size: 0.85rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    max-width: 480px;
    margin-bottom: 0.5rem;
  }

  .hero-btn-wrap {
    margin-top: 0.25rem;
  }

  .btn-patok-tenda {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.65rem 1.4rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1.5px solid rgba(255, 255, 255, 0.28);
    border-radius: var(--radius-full);
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 600;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .btn-patok-tenda:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: var(--color-yellow-slogan);
    transform: translateY(-2px);
  }

  .btn-tent-icon {
    width: 18px;
    height: 18px;
    color: var(--color-yellow-slogan);
    flex-shrink: 0;
  }

  .hero-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }

  .hero-scouts-img {
    width: 100%;
    max-width: clamp(460px, 38vw, 680px);
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.3));
    display: block;
  }

  @media (max-width: 900px) {
    .hero-grid {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 2.5rem;
    }

    .hero-left {
      align-items: center;
    }

    .hero-main-title {
      font-size: 2.4rem;
    }

    .hero-right {
      justify-content: center;
    }

    .hero-scouts-img {
      max-width: 420px;
    }
  }

  @media (max-width: 600px) {
    .hero-main-title {
      font-size: 1.95rem;
    }

    .btn-patok-tenda {
      font-size: 0.78rem;
      padding: 0.55rem 1rem;
    }
  }
</style>
