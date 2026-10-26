<section class="banner-section">
  <div class="container">
    <div class="banner-card">
      <!-- Background Photo -->
      <img
        src="/images/beranda/FotoBersama01.jpg"
        alt="Foto Bersama Pengurus dan Anggota Pramuka Politeknik Dewantara Palopo"
        class="banner-bg-img"
      />

      <!-- Multi-layer Gradient Overlay for Seamless Theme Blending -->
      <div class="banner-gradient-overlay" aria-hidden="true"></div>

      <!-- Content Overlay -->
      <div class="banner-content">
        <div class="banner-left">
          <div class="banner-badge">
            <svg viewBox="0 0 24 24" class="badge-icon" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
              />
            </svg>
            <span>Mengenal Pramuka Polidewa</span>
          </div>

          <h2 class="banner-title">
            Membangun Karakter Mahasiswa Melalui Pengabdian Nyata
          </h2>
        </div>

        <div class="banner-right">
          <div class="banner-desc-box">
            <p>
              Wadah Pembinaan Kepemimpinan, Karakter, Kemandirian, Dan
              Persaudaraan Bagi Mahasiswa Politeknik Dewantara Melalui
              Nilai-nilai Luhur Gerakan Pramuka.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .banner-section {
    padding: 2rem 0 3.5rem;
    background-color: var(--color-purple-bg);
    position: relative;
  }

  .banner-card {
    position: relative;
    width: 100%;
    min-height: 480px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 12px 32px -6px rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.16);
    background-color: #241140;
    display: flex;
    align-items: flex-end;
  }

  .banner-bg-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 36%;
    display: block;
    transform: scale(1.01);
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .banner-card:hover .banner-bg-img {
    transform: scale(1.03);
  }

  /* Softened gradient overlay with lighter shadows so the photo stays bright and clear */
  .banner-gradient-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      /* Soft bottom gradient to ensure text readability without darkening faces */
      linear-gradient(
        180deg,
        rgba(36, 17, 64, 0.1) 0%,
        rgba(36, 17, 64, 0) 40%,
        rgba(26, 10, 48, 0.55) 70%,
        rgba(20, 7, 38, 0.85) 100%
      ),
      /* Light top vignette for smooth blending with background */
        linear-gradient(
          180deg,
          rgba(42, 18, 69, 0.25) 0%,
          rgba(42, 18, 69, 0) 25%
        ),
      /* Subtle side peripheral shading */
        linear-gradient(
          90deg,
          rgba(26, 10, 48, 0.35) 0%,
          rgba(26, 10, 48, 0) 15%,
          rgba(26, 10, 48, 0) 85%,
          rgba(26, 10, 48, 0.35) 100%
        );
  }

  .banner-content {
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 2.5rem 3rem;
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 2.5rem;
    align-items: flex-end;
  }

  .banner-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.9rem;
  }

  .banner-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1.1rem;
    background: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: var(--radius-full);
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .badge-icon {
    width: 15px;
    height: 15px;
    color: var(--color-yellow-gold);
    flex-shrink: 0;
  }

  .banner-title {
    font-size: clamp(1.8rem, 2.6vw, 2.7rem);
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -0.015em;
    text-shadow: 0 3px 12px rgba(0, 0, 0, 0.6);
    max-width: 580px;
  }

  .banner-right {
    display: flex;
    justify-content: flex-end;
  }

  .banner-desc-box {
    padding: 1.4rem 1.7rem;
    background: rgba(20, 8, 36, 0.65);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: var(--radius-lg);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
    max-width: 440px;
  }

  .banner-desc-box p {
    color: rgba(255, 255, 255, 0.92);
    font-size: 0.88rem;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 980px) {
    .banner-card {
      min-height: 440px;
    }

    .banner-content {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 2rem 2rem;
    }

    .banner-right {
      justify-content: flex-start;
    }

    .banner-desc-box {
      max-width: 100%;
    }
  }

  @media (max-width: 640px) {
    .banner-card {
      min-height: 400px;
      border-radius: var(--radius-lg);
    }

    .banner-content {
      padding: 1.5rem 1.25rem;
      gap: 1.2rem;
    }

    .banner-title {
      font-size: 1.5rem;
    }

    .banner-desc-box {
      padding: 1.1rem 1.25rem;
    }

    .banner-desc-box p {
      font-size: 0.8rem;
    }
  }
</style>
