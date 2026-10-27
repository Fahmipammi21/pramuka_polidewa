<section class="cta-reg-section">
  <div class="container cta-container">
    <div class="cta-content-box">
      <h2 class="cta-main-title">
        Siap Mengabdi Bersama Racana Dewa Raja &ndash; Batari?
      </h2>

      <p class="cta-desc-text">
        Pendaftaran anggota Baru UKM Pramuka Politeknik Dewantara Terbuka Bagi Seluruh Mahasiswa Yang Ingin Berkontribusi Aktif, Menumbuhkan Jiwa Mandiri, Dan Berperan Dalam Gerakan Pramuka Perguruan Tinggi.
      </p>

      <div class="cta-btn-wrap">
        <a href="/pendaftaran" class="btn-daftar-sekarang">
          <svg viewBox="0 0 24 24" class="btn-pen-icon" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
          <span>Isi Formulir Pendaftaran Sekarang</span>
        </a>
      </div>
    </div>

    <!-- Decorative Bottom Icons (Tent, Tunas, Campfire) in dark purple -->
    <div class="cta-decor-icons">
      <!-- Left Decor: Tent & Tunas Tree -->
      <div class="decor-left">
        <!-- Stylized Tent -->
        <svg viewBox="0 0 32 32" class="decor-svg" fill="currentColor">
          <path d="M16 4L2 26h28L16 4zm0 6l9 14H7l9-14zM14 20h4v4h-4v-4z"/>
        </svg>
        <!-- Stylized Tunas / Tree -->
        <svg viewBox="0 0 32 32" class="decor-svg" fill="currentColor">
          <path d="M16 2l-6 8h4l-5 8h4l-6 10h26L27 18h4l-5-8h4l-6-8z"/>
        </svg>
      </div>

      <!-- Right Decor: Tent & Campfire -->
      <div class="decor-right">
        <!-- Stylized Tent -->
        <svg viewBox="0 0 32 32" class="decor-svg" fill="currentColor">
          <path d="M16 4L2 26h28L16 4zm0 6l9 14H7l9-14zM14 20h4v4h-4v-4z"/>
        </svg>
        <!-- Stylized Campfire -->
        <svg viewBox="0 0 32 32" class="decor-svg" fill="currentColor">
          <path d="M16 4c-1 3-3 6-3 9 0 3.3 2.7 6 6 6s6-2.7 6-6c0-3-2-6-3-9-1.5 2.5-3 5-3 7 0 1.7 1.3 3 3 3s3-1.3 3-3c0-2-1.5-4.5-3-7zm-11 20l22 4-1 2-22-4 1-2zm22 0l-22 4-1-2 22-4 1 2z"/>
        </svg>
      </div>
    </div>
  </div>
</section>

<style>
  .cta-reg-section {
    background-color: var(--color-yellow-gold);
    color: var(--color-purple-dark);
    padding: 4.5rem 0 3rem;
    position: relative;
    overflow: hidden;
  }

  .cta-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .cta-content-box {
    text-align: center;
    max-width: 1060px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;
    z-index: 2;
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
    max-width: 660px;
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

  .btn-pen-icon {
    width: 18px;
    height: 18px;
  }

  .cta-decor-icons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 2rem;
    color: var(--color-purple-dark);
    opacity: 0.9;
  }

  .decor-left,
  .decor-right {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
  }

  .decor-svg {
    width: 44px;
    height: 44px;
  }

  @media (max-width: 768px) {
    .cta-main-title {
      font-size: clamp(1.2rem, 4.5vw, 1.65rem);
      white-space: normal;
      text-wrap: balance;
    }

    .cta-decor-icons {
      margin-top: 1.5rem;
    }

    .decor-svg {
      width: 32px;
      height: 32px;
    }
  }
</style>
