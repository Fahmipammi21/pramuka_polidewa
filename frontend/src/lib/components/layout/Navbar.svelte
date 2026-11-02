<script lang="ts">
  import { page } from '$app/state';

  let isMobileMenuOpen = $state(false);

  const navLinks = [
    { label: 'Profil', href: '/profil' },
    { label: 'Struktur Racana', href: '/struktur-racana' },
    { label: 'Berita', href: '/berita' },
    { label: 'Pendaftaran', href: '/pendaftaran' },
  ];

  function toggleMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMenu() {
    isMobileMenuOpen = false;
  }
</script>

<header class="navbar-wrapper">
  <div class="container navbar-container">
    <div class="navbar-pill">
      <!-- Brand Logo + Teks -->
      <a href="/" class="brand-group" onclick={closeMenu} aria-label="Beranda Pramuka Polidewa">
        <img
          src="/images/beranda/logo.svg"
          alt="Logo Pramuka Polidewa — Racana Dewa Raja – Batari"
          class="brand-logo"
        />
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="nav-desktop" aria-label="Menu Navigasi">
        <ul class="nav-links-list">
          {#each navLinks as link}
            <li>
              <a
                href={link.href}
                class="nav-item"
                class:active={page.url.pathname === link.href || (link.href !== '/' && page.url.pathname.startsWith(link.href))}
              >
                {link.label}
              </a>
            </li>
          {/each}
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
        <ul class="mobile-links">
          <li>
            <a href="/" class="mobile-item" class:active={page.url.pathname === '/'} onclick={closeMenu}>Beranda</a>
          </li>
          {#each navLinks as link}
            <li>
              <a
                href={link.href}
                class="mobile-item"
                class:active={page.url.pathname === link.href || page.url.pathname.startsWith(link.href)}
                onclick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</header>

<style>
  .navbar-wrapper {
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    padding: 1.15rem 0 0.5rem;
    pointer-events: none;
    transition: padding 0.3s ease;
  }

  .navbar-container {
    pointer-events: auto;
    position: relative;
  }

  /* Floating Translucent Glass Pill Bar matching exact user reference design */
  .navbar-pill {
    width: 100%;
    height: 66px;
    background: rgba(255, 255, 255, 0.05);
    -webkit-backdrop-filter: blur(20px) saturate(170%);
    backdrop-filter: blur(20px) saturate(170%);
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-top: 1px solid rgba(255, 255, 255, 0.36);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.25rem 0 1.5rem;
    box-shadow:
      0 8px 30px rgba(18, 6, 36, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .brand-group {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .brand-group:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }

  .brand-logo {
    height: 44px;
    width: auto;
    object-fit: contain;
    display: block;
  }

  .nav-desktop {
    display: flex;
    align-items: center;
  }

  .nav-links-list {
    display: flex;
    align-items: center;
    gap: 2.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-item {
    font-size: 0.95rem;
    font-weight: 700;
    color: #ffffff;
    text-decoration: none;
    transition: color 0.2s ease, transform 0.2s ease;
    display: inline-block;
    letter-spacing: -0.01em;
  }

  .nav-item:hover,
  .nav-item.active {
    color: var(--color-yellow-gold);
    transform: translateY(-1px);
  }

  /* Mobile Toggle */
  .mobile-toggle-btn {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
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
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger-line.open:nth-child(2) {
    opacity: 0;
  }

  .hamburger-line.open:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  /* Mobile Dropdown */
  .mobile-dropdown {
    display: none;
  }

  @media (max-width: 860px) {
    .navbar-wrapper {
      padding: 0.75rem 0 0.25rem;
    }

    .navbar-pill {
      height: 60px;
      padding: 0 1.25rem 0 1rem;
    }

    .brand-logo {
      height: 38px;
    }

    .nav-desktop {
      display: none;
    }

    .mobile-toggle-btn {
      display: flex;
    }

    .mobile-dropdown {
      display: block;
      margin-top: 0.65rem;
      background: rgba(43, 18, 72, 0.92);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
      animation: dropdownFadeIn 0.25s ease;
    }

    @keyframes dropdownFadeIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .mobile-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      margin: 0;
      padding: 0;
    }

    .mobile-item {
      font-size: 0.95rem;
      font-weight: 700;
      color: #ffffff;
      text-decoration: none;
      display: block;
      padding: 0.4rem 0;
      transition: color 0.2s ease;
    }

    .mobile-item:hover,
    .mobile-item.active {
      color: var(--color-yellow-gold);
    }
  }
</style>
