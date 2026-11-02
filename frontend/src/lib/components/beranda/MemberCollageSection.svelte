<script lang="ts">
  interface Member {
    id: number;
    name: string;
    src: string;
    left: number;
    top: number;
    width: number;
    height: number;
    fadeColor: string;
    fadeRgb: string;
  }

  const members: Member[] = [
    {
      id: 1,
      name: 'Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_1.png',
      left: 0.0,
      top: 27.015,
      width: 10.044,
      height: 67.612,
      fadeColor: '#421d6e',
      fadeRgb: '66, 29, 110'
    },
    {
      id: 2,
      name: 'Azis - Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_2.png',
      left: 10.044,
      top: 21.791,
      width: 10.0,
      height: 59.851,
      fadeColor: '#f7b638',
      fadeRgb: '247, 182, 56'
    },
    {
      id: 3,
      name: 'Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_3.png',
      left: 20.089,
      top: 27.836,
      width: 9.778,
      height: 58.731,
      fadeColor: '#421d6e',
      fadeRgb: '66, 29, 110'
    },
    {
      id: 4,
      name: 'Dilla - Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_4.png',
      left: 29.911,
      top: 16.045,
      width: 10.0,
      height: 61.269,
      fadeColor: '#f7b638',
      fadeRgb: '247, 182, 56'
    },
    {
      id: 5,
      name: 'Il - Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_5.png',
      left: 39.911,
      top: 36.119,
      width: 9.956,
      height: 58.657,
      fadeColor: '#421d6e',
      fadeRgb: '66, 29, 110'
    },
    {
      id: 6,
      name: 'Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_6.png',
      left: 49.867,
      top: 24.627,
      width: 10.044,
      height: 62.090,
      fadeColor: '#f7b638',
      fadeRgb: '247, 182, 56'
    },
    {
      id: 7,
      name: 'G.MH - Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_7.png',
      left: 59.956,
      top: 38.358,
      width: 10.0,
      height: 61.642,
      fadeColor: '#421d6e',
      fadeRgb: '66, 29, 110'
    },
    {
      id: 8,
      name: 'Lada - Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_8.png',
      left: 69.956,
      top: 19.552,
      width: 10.044,
      height: 61.940,
      fadeColor: '#f7b638',
      fadeRgb: '247, 182, 56'
    },
    {
      id: 9,
      name: 'Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_9.png',
      left: 80.0,
      top: 30.075,
      width: 9.956,
      height: 64.104,
      fadeColor: '#421d6e',
      fadeRgb: '66, 29, 110'
    },
    {
      id: 10,
      name: 'Fiq - Anggota Racana Pramuka Polidewa',
      src: '/images/beranda/collage/member_10.png',
      left: 89.956,
      top: 16.493,
      width: 10.044,
      height: 62.164,
      fadeColor: '#f7b638',
      fadeRgb: '247, 182, 56'
    }
  ];
</script>

<section class="collage-section" aria-label="Kolase Anggota dan Pengurus Racana Pramuka Polidewa">
  <div class="container collage-container">
    <div class="collage-wrap">
      <!-- Stationary Purple and Yellow Decorative Background Blocks -->
      <div class="collage-bg-layer" aria-hidden="true">
        <img
          src="/images/beranda/collage/collage_bg.png"
          alt=""
          class="collage-bg-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- Independent Interactive Member Portraits -->
      <div class="collage-portraits-layer">
        {#each members as member (member.id)}
          <button
            type="button"
            id="member-portrait-{member.id}"
            class="member-portrait"
            style="left: {member.left}%; top: {member.top}%; width: {member.width}%; height: {member.height}%; --fade-color: {member.fadeColor}; --fade-rgb: {member.fadeRgb};"
            aria-label={member.name}
            onclick={(e) => (e.currentTarget as HTMLButtonElement).blur()}
          >
            <img
              src={member.src}
              alt={member.name}
              class="member-portrait-img"
              loading="lazy"
              decoding="async"
            />
            <!-- Bottom Fade Gradient matching respective column background -->
            <div class="portrait-fade-gradient" aria-hidden="true"></div>
          </button>
        {/each}
      </div>
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

  /* Aspect-ratio matched container preserving responsive scaling */
  .collage-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 2250 / 1340;
    overflow: visible;
  }

  /* Completely stationary background decorative blocks layer */
  .collage-bg-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .collage-bg-img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: fill;
    pointer-events: none;
    user-select: none;
  }

  /* Interactive portraits layer */
  .collage-portraits-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  /* Individual member portrait with smooth subtle hover lift */
  .member-portrait {
    position: absolute;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    transform: translateY(0) scale(1);
    transform-origin: center bottom;
    transition:
      transform 300ms cubic-bezier(0.2, 0.75, 0.25, 1),
      filter 300ms cubic-bezier(0.2, 0.75, 0.25, 1);
    will-change: transform, filter;
    cursor: pointer;
    outline: none;
    touch-action: manipulation;
  }

  .member-portrait-img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: fill;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
  }

  /* Universal hover/active interaction: lifts 8px, scales 1.025x with purple ambient shadow */
  .member-portrait:hover,
  .member-portrait:active {
    z-index: 25;
    transform: translateY(-8px) scale(1.025);
    filter: drop-shadow(0 4px 12px rgba(66, 29, 110, 0.45));
  }

  /* Bottom fade gradient matching respective column background: hidden at rest, thick on hover/touch */
  .portrait-fade-gradient {
    position: absolute;
    bottom: -16px;
    left: 0;
    right: 0;
    height: 44%;
    min-height: 58px;
    max-height: 160px;
    pointer-events: none;
    z-index: 2;
    background: linear-gradient(
      to top,
      var(--fade-color) 0%,
      var(--fade-color) 32%,
      rgba(var(--fade-rgb), 0.98) 52%,
      rgba(var(--fade-rgb), 0.75) 72%,
      rgba(var(--fade-rgb), 0.28) 88%,
      transparent 100%
    );
    opacity: 0;
    transition:
      opacity 280ms cubic-bezier(0.2, 0.75, 0.25, 1),
      height 280ms cubic-bezier(0.2, 0.75, 0.25, 1);
  }

  .member-portrait:hover .portrait-fade-gradient,
  .member-portrait:focus-visible .portrait-fade-gradient,
  .member-portrait:active .portrait-fade-gradient {
    opacity: 1;
    height: 52%;
  }

  /* Accessible keyboard navigation focus indicator */
  .member-portrait:focus-visible {
    z-index: 25;
    transform: translateY(-8px) scale(1.025);
    filter: drop-shadow(0 4px 12px rgba(66, 29, 110, 0.45));
    outline: 2.5px solid #febb2b;
    outline-offset: 4px;
    border-radius: 4px;
  }

  /* Touch device interactions */
  @media (hover: none) {
    .member-portrait:hover {
      transform: none;
      filter: none;
    }

    .member-portrait:hover .portrait-fade-gradient {
      opacity: 0;
    }

    .member-portrait:active {
      z-index: 25;
      transform: translateY(-6px) scale(1.02);
      filter: drop-shadow(0 4px 10px rgba(66, 29, 110, 0.45));
    }

    .member-portrait:active .portrait-fade-gradient {
      opacity: 1;
      height: 52%;
    }
  }

  /* Respect user preferences for reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .member-portrait {
      transition: none;
    }

    .member-portrait:hover,
    .member-portrait:focus-visible {
      transform: none;
    }
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
    border: 1.5px solid #febb2b;
    border-radius: var(--radius-full);
    color: #febb2b;
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, color 0.25s ease;
  }

  .collage-btn:hover {
    background: #febb2b;
    border-color: #febb2b;
    color: #2b1248;
    transform: translateY(-2px) scale(1.02);
    box-shadow: none;
  }

  .collage-btn:hover .btn-icon {
    color: #2b1248;
  }

  .btn-icon {
    width: 18px;
    height: 18px;
    color: #febb2b;
    flex-shrink: 0;
    transition: color 0.25s ease;
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
