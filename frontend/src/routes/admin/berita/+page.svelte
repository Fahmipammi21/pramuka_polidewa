<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import BeritaCrudManager from '#lib/components/admin/BeritaCrudManager.svelte';

  interface AdminUser {
    id: number;
    username: string;
    namaLengkap: string;
  }

  let adminUser = $state<AdminUser>({
    id: 1,
    username: 'admin',
    namaLengkap: 'Pradana Utama',
  });

  let isMobileSidebarOpen = $state(false);
  let showProfileDropdown = $state(false);

  onMount(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        goto('/admin/login');
        return;
      }
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        try {
          adminUser = JSON.parse(storedUser);
        } catch (e) {
          console.error(e);
        }
      }
    }
  });

  function handleLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      goto('/admin/login');
    }
  }
</script>

<svelte:head>
  <title>CRUD Berita & Kegiatan — Portal Admin Pramuka Polidewa</title>
</svelte:head>

<div class="admin-layout">
  <!-- Mobile Sidebar Overlay -->
  {#if isMobileSidebarOpen}
    <div
      class="sidebar-overlay"
      role="button"
      tabindex="0"
      onclick={() => (isMobileSidebarOpen = false)}
      onkeydown={(e) => e.key === 'Escape' && (isMobileSidebarOpen = false)}
      aria-label="Tutup Menu"
    ></div>
  {/if}

  <!-- SIDEBAR (Dark Purple #2e114d) -->
  <aside class="sidebar" class:open={isMobileSidebarOpen}>
    <div class="sidebar-brand">
      <div class="sidebar-logo-group">
        <div class="sidebar-logo-frame">
          <img
            src="/images/logo-racana.png"
            alt="Logo Racana"
            class="sidebar-logo-img"
          />
        </div>
        <div class="sidebar-brand-text">
          <h2 class="sidebar-title">Pramuka Polidewa</h2>
          <span class="sidebar-sub">Racana Dewa Raja &ndash; Batari</span>
        </div>
      </div>

      <a href="/admin" class="sidebar-portal-pill">
        <span class="pill-dot"></span>
        <span class="pill-text">Portal Admin</span>
        <span class="pill-arrow">→</span>
      </a>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <a href="/admin" class="nav-item">
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
        <span>Dashboard Utama</span>
      </a>

      <a href="/admin/berita" class="nav-item active">
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
        </svg>
        <div class="nav-label-wrap">
          <span>CRUD Berita &amp; Kegiatan</span>
          <span class="badge-baru">Aktif</span>
        </div>
      </a>

      <a href="/admin" class="nav-item">
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        <div class="nav-label-wrap">
          <span>Pendaftaran Masuk (PAB)</span>
        </div>
      </a>

      <a href="/admin" class="nav-item">
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span>Manajemen Anggota</span>
      </a>
    </nav>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer">
      <a href="/" class="btn-back-public">
        <svg viewBox="0 0 24 24" class="btn-icon" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        <span>Kembali ke Web Publik</span>
      </a>
    </div>
  </aside>

  <!-- MAIN WRAPPER -->
  <div class="main-wrapper">
    <!-- TOP NAVBAR -->
    <header class="top-navbar">
      <div class="nav-left">
        <button
          type="button"
          class="mobile-menu-btn"
          onclick={() => (isMobileSidebarOpen = !isMobileSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="menu-icon">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>

        <div class="nav-breadcrumbs">
          <span class="bc-parent">Sistem Racana</span>
          <span class="bc-sep">›</span>
          <span class="bc-active">CRUD Berita &amp; Kegiatan</span>
        </div>
      </div>

      <div class="nav-right">
        <a href="/berita" target="_blank" rel="noreferrer" class="btn-view-public" title="Buka Halaman Berita Publik">
          <svg viewBox="0 0 24 24" class="icon-svg" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          <span>Lihat Halaman Berita</span>
        </a>

        <!-- Profile Widget -->
        <div class="profile-widget">
          <button
            type="button"
            class="profile-btn"
            onclick={() => (showProfileDropdown = !showProfileDropdown)}
          >
            <div class="profile-info">
              <span class="profile-name">{adminUser.namaLengkap}</span>
              <span class="profile-role">Administrator</span>
            </div>
            <div class="profile-avatar">
              <svg viewBox="0 0 24 24" class="avatar-svg" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
          </button>

          {#if showProfileDropdown}
            <div class="profile-menu">
              <div class="menu-user-meta">
                <span class="user-user">@{adminUser.username}</span>
                <span class="user-unit">Racana Dewa Raja – Batari</span>
              </div>
              <hr class="menu-divider" />
              <button type="button" class="menu-item text-danger" onclick={handleLogout}>
                <svg viewBox="0 0 24 24" class="menu-item-icon" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                <span>Keluar (Logout)</span>
              </button>
            </div>
          {/if}
        </div>
      </div>
    </header>

    <!-- MAIN CRUD WORKSPACE -->
    <main class="dashboard-canvas">
      <BeritaCrudManager />
    </main>
  </div>
</div>

<style>
  .admin-layout {
    display: flex;
    min-height: 100vh;
    background: #febb2b;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  }

  .sidebar {
    width: 270px;
    background: #270e42;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    z-index: 50;
    border-right: 1px solid rgba(254, 187, 43, 0.2);
  }

  .sidebar-brand {
    padding: 1.6rem 1.4rem 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .sidebar-logo-group {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  .sidebar-logo-frame {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(254, 187, 43, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }

  .sidebar-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .sidebar-title {
    font-size: 1.05rem;
    font-weight: 800;
    margin: 0;
    color: #ffffff;
  }

  .sidebar-sub {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.65);
  }

  .sidebar-portal-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(254, 187, 43, 0.15);
    border: 1px solid rgba(254, 187, 43, 0.4);
    padding: 0.35rem 0.8rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #febb2b;
    text-decoration: none;
  }

  .pill-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
  }

  .sidebar-nav {
    padding: 1.2rem 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    flex: 1;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.7rem 0.95rem;
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .nav-item:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }

  .nav-item.active {
    background: #febb2b;
    color: #1f0a38;
    font-weight: 800;
  }

  .nav-icon {
    width: 19px;
    height: 19px;
    flex-shrink: 0;
  }

  .nav-label-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .badge-baru {
    background: #10b981;
    color: #ffffff;
    font-size: 0.68rem;
    font-weight: 800;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
  }

  .sidebar-footer {
    padding: 1.2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .btn-back-public {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 700;
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .btn-back-public:hover {
    color: #febb2b;
    background: rgba(255, 255, 255, 0.05);
  }

  .btn-icon {
    width: 16px;
    height: 16px;
  }

  .main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .top-navbar {
    background: #270e42;
    padding: 0.9rem 1.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(254, 187, 43, 0.2);
    position: sticky;
    top: 0;
    z-index: 40;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .mobile-menu-btn {
    display: none;
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
  }

  .menu-icon {
    width: 24px;
    height: 24px;
  }

  .nav-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.86rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .bc-sep {
    color: rgba(255, 255, 255, 0.4);
  }

  .bc-active {
    color: #febb2b;
    font-weight: 700;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .btn-view-public {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-size: 0.82rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-view-public:hover {
    background: #febb2b;
    color: #1f0a38;
  }

  .icon-svg {
    width: 17px;
    height: 17px;
  }

  .profile-widget {
    position: relative;
  }

  .profile-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: right;
  }

  .profile-name {
    display: block;
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 700;
  }

  .profile-role {
    display: block;
    font-size: 0.72rem;
    color: #febb2b;
  }

  .profile-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #febb2b;
    color: #1f0a38;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-svg {
    width: 24px;
    height: 24px;
  }

  .profile-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    width: 220px;
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    padding: 0.8rem;
    z-index: 100;
  }

  .menu-user-meta {
    padding: 0.4rem 0.6rem;
  }

  .user-user {
    display: block;
    font-weight: 700;
    color: #1f0a38;
    font-size: 0.85rem;
  }

  .user-unit {
    display: block;
    font-size: 0.75rem;
    color: #6b7280;
  }

  .menu-divider {
    border: none;
    border-top: 1px solid #f3f4f6;
    margin: 0.5rem 0;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    padding: 0.55rem 0.6rem;
    border: none;
    background: transparent;
    font-size: 0.85rem;
    font-weight: 600;
    color: #374151;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
  }

  .menu-item:hover {
    background: #f3f4f6;
  }

  .menu-item.text-danger {
    color: #dc2626;
  }

  .menu-item.text-danger:hover {
    background: #fee2e2;
  }

  .menu-item-icon {
    width: 18px;
    height: 18px;
  }

  .dashboard-canvas {
    padding: 2rem;
    flex: 1;
  }

  @media (max-width: 900px) {
    .mobile-menu-btn {
      display: block;
    }

    .sidebar {
      position: fixed;
      left: -280px;
      transition: left 0.3s ease;
    }

    .sidebar.open {
      left: 0;
    }

    .sidebar-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 45;
    }

    .profile-info {
      display: none;
    }
  }
</style>

