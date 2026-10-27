<section class="collage-section">
  <div class="container collage-container">
    <div class="collage-wrap">
      <!-- High Resolution Collage Photo from Asset -->
      <img
        src="/images/beranda/FotoSectionTerakhir copy.png"
        alt="Kolase Anggota dan Pengurus Racana Dewa Raja – Batari Pramuka Politeknik Dewantara"
        class="collage-img"
      />
    </div>

    <!-- Interactive Profile CTA Button with clear distance from image -->
    <div class="collage-btn-wrapper">
      <a
        href="/profil"
        class="collage-btn"
        aria-label="Kenali Profil Anggota Pramuka Polidewa Lebih Jauh"
      >
        <svg viewBox="0 0 24 24" class="btn-icon" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span>Ingin Mengenal Lebih Jauh?</span>
      </a>
    </div>
  </div>
</section>

<style>
  .collage-section {
    padding: 3rem 0 3.5rem;
    background-color: var(--color-purple-bg);
    position: relative;
    overflow: hidden;
  }

  .collage-container {
    position: relative;
  }

  .collage-wrap {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .collage-img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  /* Wrapper to provide comfortable spacing between image and button */
  .collage-btn-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    position: relative;
    z-index: 10;
  }

  /* Interactive pill button matching reference style */
  .collage-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.75rem 1.6rem;
    background: #3c1a68;
    border: 1.5px solid rgba(254, 187, 43, 0.7);
    border-radius: var(--radius-full);
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .collage-btn:hover {
    background: #4a2180;
    border-color: #febb2b;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 24px rgba(254, 187, 43, 0.35);
  }

  .btn-icon {
    width: 18px;
    height: 18px;
    color: #febb2b;
    flex-shrink: 0;
  }


  @media (max-width: 900px) {
    .collage-btn-wrapper {
      margin-top: 1.75rem;
    }

    .collage-btn {
      padding: 0.65rem 1.35rem;
      font-size: 0.82rem;
    }

  }

  @media (max-width: 600px) {
    .collage-section {
      padding: 2rem 0 2.5rem;
    }

    .collage-btn-wrapper {
      margin-top: 1.25rem;
    }

    .collage-btn {
      padding: 0.6rem 1.2rem;
      font-size: 0.8rem;
    }

  }
</style>
