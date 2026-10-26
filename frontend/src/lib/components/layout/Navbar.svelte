<script lang="ts">
  import { page } from '$app/state';

  let isMobileMenuOpen = $state(false);

  const navLinks = [
    { label: 'Profil', href: '/profil' },
    { label: 'Struktur Racana', href: '/struktur-racana' },
    { label: 'Berita', href: '/berita' },
  ];

  function toggleMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMenu() {
    isMobileMenuOpen = false;
  }
</script>

<header class="navbar-root">
  <div class="container navbar-inner">
    <!-- Brand -->
    <a href="/" class="brand-group" onclick={closeMenu} aria-label="Beranda Pramuka Polidewa">
      <img
        src="/images/beranda/logo.svg"
        alt="Logo Pramuka Polidewa — Racana Dewa Raja – Batari"
        class="brand-logo"
      />
    </a>

    <!-- Desktop Navigation -->
    <nav class="nav-desktop" aria-label="Menu Navigasi">
      <ul class="nav-links-list">
        {#each navLinks as link}
          <li>
            <a
              href={link.href}
              class="nav-item"
              class:active={page.url.pathname === link.href || page.url.pathname.startsWith(link.href)}
            >
              {link.label}
            </a>
          </li>
        {/each}
        <li>
          <a
            href="/pendaftaran"
            class="btn-pendaftaran-nav"
            class:active={page.url.pathname === '/pendaftaran'}
          >
            Pendaftaran
          </a>
        </li>
      </ul>
    </nav>

    <!-- Mobile Hamburger Button -->
    <button
      class="mobile-toggle-btn"
      onclick={toggleMenu}
      aria-label="Toggle navigasi"
      aria-expanded={isMobileMenuOpen}
    >
      <span class="hamburger-line" class:open={isMobileMenuOpen}></span>
      <span class="hamburger-line" class:open={isMobileMenuOpen}></span>
      <span class="hamburger-line" class:open={isMobileMenuOpen}></span>
    </button>
  </div>

  <!-- Mobile Dropdown -->
  {#if isMobileMenuOpen}
    <div class="mobile-dropdown" role="dialog" aria-modal="true">
      <div class="container">
        <ul class="mobile-links">
          <li>
            <a href="/" class="mobile-item" onclick={closeMenu}>Beranda</a>
          </li>
          {#each navLinks as link}
            <li>
              <a
                href={link.href}
                class="mobile-item"
                class:active={page.url.pathname === link.href}
                onclick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          {/each}
          <li>
            <a
              href="/pendaftaran"
              class="mobile-btn-pendaftaran"
              onclick={closeMenu}
            >
              Pendaftaran Anggota Baru
            </a>
          </li>
        </ul>
      </div>
    </div>
  {/if}
</header>

<style>
.navbar-root {
  position: sticky;
  top: 0;
  z-index: 1000;
  isolation: isolate;
  overflow: hidden;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(190, 163, 255, 0.10) 24%,
      rgba(77, 39, 126, 0.46) 58%,
      rgba(44, 20, 78, 0.58) 100%
    );
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-top-color: rgba(255, 255, 255, 0.42);
  box-shadow:
    0 10px 32px rgba(23, 8, 45, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.30),
    inset 0 -1px 0 rgba(255, 255, 255, 0.07);
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.navbar-root::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.20) 0%,
      rgba(255, 255, 255, 0.08) 18%,
      transparent 42%,
      rgba(194, 165, 255, 0.06) 70%,
      transparent 100%
    );
  border-radius: inherit;
}

.navbar-root::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.20) 12%,
    rgba(255, 255, 255, 0.70) 50%,
    rgba(255, 255, 255, 0.20) 88%,
    transparent 100%
  );
}

.navbar-root > * {
  position: relative;
  z-index: 1;
}

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }

  .brand-group {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .brand-group:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  .brand-logo {
    height: 48px;
    width: auto;
    max-width: 200px;
    object-fit: contain;
    display: block;
  }

  .nav-desktop {
    display: flex;
  }

  .nav-links-list {
    display: flex;
    align-items: center;
    gap: 2.2rem;
    list-style: none;
  }

  .nav-item {
    font-size: 0.92rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.88);
    transition: color 0.2s ease, transform 0.2s ease;
    display: inline-block;
  }

  .nav-item:hover,
  .nav-item.active {
    color: #ffffff;
    transform: translateY(-1px);
  }

  .btn-pendaftaran-nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.48rem 1.45rem;
    border: 1.5px solid rgba(255, 255, 255, 0.55);
    background: rgba(255, 255, 255, 0.1);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    color: #ffffff;
    font-weight: 700;
    font-size: 0.88rem;
    border-radius: var(--radius-full);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }

  .btn-pendaftaran-nav:hover,
  .btn-pendaftaran-nav.active {
    background: #ffffff;
    border-color: #ffffff;
    color: var(--color-purple-dark);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }

  .mobile-toggle-btn {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 26px;
    height: 19px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .hamburger-line {
    width: 100%;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .hamburger-line.open:nth-child(1) {
    transform: translateY(8.5px) rotate(45deg);
  }

  .hamburger-line.open:nth-child(2) {
    opacity: 0;
  }

  .hamburger-line.open:nth-child(3) {
    transform: translateY(-8.5px) rotate(-45deg);
  }

  .mobile-dropdown {
    display: none;
  }

  @media (max-width: 860px) {
    .nav-desktop {
      display: none;
    }

    .mobile-toggle-btn {
      display: flex;
    }

    .mobile-dropdown {
      display: block;
      background: rgba(67, 35, 115, 0.88);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      border-bottom: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
      padding: 1.25rem 0 1.75rem;
    }

    .mobile-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .mobile-item {
      font-size: 1rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      display: block;
      padding: 0.35rem 0;
      transition: color 0.2s ease;
    }

    .mobile-item:hover,
    .mobile-item.active {
      color: var(--color-yellow-slogan);
    }

    .mobile-btn-pendaftaran {
      display: block;
      text-align: center;
      padding: 0.75rem 1rem;
      border: 1.5px solid rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.1);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
      color: #ffffff;
      font-weight: 700;
      border-radius: var(--radius-full);
      margin-top: 0.5rem;
      transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }

    .mobile-btn-pendaftaran:hover {
      background: #ffffff;
      border-color: #ffffff;
      color: var(--color-purple-dark);
    }

    .brand-logo {
      height: 40px;
    }
  }
</style>
