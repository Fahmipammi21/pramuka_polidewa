<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  interface AdminUser {
    id: number;
    username: string;
    namaLengkap: string;
  }

  interface PendaftaranItem {
    id: number;
    namaLengkap: string;
    nim: string;
    programStudi: string;
    angkatan?: string;
    nomorTelepon?: string;
    email?: string;
    motivasi?: string;
    status: string;
    createdAt: string;
  }

  interface DashboardStats {
    pab: { total: number; pending: number; verified: number };
    anggotaAktif: { total: number; putra: number; putri: number };
    wartaBerita: { total: number; draft: number };
    inventaris: { total: number; siapPakaiPercent: number };
  }

  // Reactive state
  let adminUser = $state<AdminUser>({
    id: 1,
    username: 'admin',
    namaLengkap: 'Pradana Utama',
  });

  let stats = $state<DashboardStats>({
    pab: { total: 68, pending: 12, verified: 56 },
    anggotaAktif: { total: 48, putra: 26, putri: 22 },
    wartaBerita: { total: 24, draft: 2 },
    inventaris: { total: 142, siapPakaiPercent: 98 },
  });

  let pendaftarList = $state<PendaftaranItem[]>([
    {
      id: 1,
      namaLengkap: 'Fahri Akbar Pratama',
      nim: '202410382',
      programStudi: 'D3 Teknik Informatika',
      status: 'baru',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      namaLengkap: 'Nurul Syahidah',
      nim: '202411015',
      programStudi: 'S1 Bisnis Digital',
      status: 'baru',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 3,
      namaLengkap: 'Dimas Aditya',
      nim: '202420042',
      programStudi: 'D3 Akuntansi Perbankan',
      status: 'terverifikasi',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: 4,
      namaLengkap: 'Rania Anggraeni',
      nim: '202410290',
      programStudi: 'D3 Teknik Informatika',
      status: 'terverifikasi',
      createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    },
  ]);

  let activeTab = $state<'semua' | 'baru' | 'terverifikasi'>('semua');
  let searchQuery = $state('');
  let isMobileSidebarOpen = $state(false);
  let showProfileDropdown = $state(false);
  let selectedPendaftar = $state<PendaftaranItem | null>(null);
  let showAddNewsModal = $state(false);

  // Form tambah berita state
  let newsTitle = $state('');
  let newsCategory = $state('Kegiatan Racana');
  let newsSummary = $state('');
  let isSubmittingNews = $state(false);

  onMount(async () => {
    // Check authentication & connect to Portal Admin
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

      // Fetch live data from backend
      await loadDashboardData();
    }
  });

  async function loadDashboardData() {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

      const [resStats, resPendaftar] = await Promise.all([
        fetch('http://localhost:3000/api/pendaftaran/stats', { headers }),
        fetch('http://localhost:3000/api/pendaftaran?limit=10', { headers }),
      ]);

      if (resStats.ok) {
        const statsData = await resStats.json();
        if (statsData.success && statsData.data) {
          stats = statsData.data;
        }
      }

      if (resPendaftar.ok) {
        const pendaftarData = await resPendaftar.json();
        if (pendaftarData.success && pendaftarData.data && pendaftarData.data.length > 0) {
          pendaftarList = pendaftarData.data;
        }
      }
    } catch (e) {
      console.warn('Backend API tidak tersambung, menggunakan data display mockup:', e);
    }
  }

  async function verifyPendaftar(id: number) {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      await fetch(`http://localhost:3000/api/pendaftaran/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: 'terverifikasi' }),
      });
    } catch (e) {
      console.warn('API error, updating local state only:', e);
    }

    pendaftarList = pendaftarList.map((p) =>
      p.id === id ? { ...p, status: 'terverifikasi' } : p
    );

    if (selectedPendaftar && selectedPendaftar.id === id) {
      selectedPendaftar = { ...selectedPendaftar, status: 'terverifikasi' };
    }
  }

  async function handleAddNews(e: SubmitEvent) {
    e.preventDefault();
    if (!newsTitle.trim()) return;

    isSubmittingNews = true;
    try {
      const slug = newsTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      await fetch('http://localhost:3000/api/berita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          judul: newsTitle,
          slug,
          kategori: newsCategory,
          ringkasan: newsSummary,
          konten: newsSummary,
          penulis: adminUser.namaLengkap,
          status: 'published',
        }),
      });

      stats.wartaBerita.total += 1;
      showAddNewsModal = false;
      newsTitle = '';
      newsSummary = '';
    } catch (err) {
      console.error(err);
    } finally {
      isSubmittingNews = false;
    }
  }

  function handleLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      goto('/admin/login');
    }
  }

  let filteredPendaftar = $derived(
    pendaftarList.filter((item) => {
      const matchStatus =
        activeTab === 'semua'
          ? true
          : activeTab === 'baru'
            ? item.status === 'baru' || item.status === 'menunggu'
            : item.status === 'terverifikasi';

      const matchSearch =
        !searchQuery ||
        item.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.programStudi.toLowerCase().includes(searchQuery.toLowerCase());

      return matchStatus && matchSearch;
    })
  );

  function getInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  function formatTime(isoString: string) {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

      if (diffHours < 24) {
        return `Hari ini, ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
      } else if (diffHours < 48) {
        return `Kemarin, ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
      }
      return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    } catch {
      return 'Hari ini';
    }
  }
</script>

<svelte:head>
  <title>Pusat Komando Racana — Dashboard Panel Admin</title>
</svelte:head>

<div class="dashboard-shell">
  <!-- Mobile Sidebar Overlay -->
  {#if isMobileSidebarOpen}
    <div
      class="sidebar-overlay"
      onclick={() => (isMobileSidebarOpen = false)}
      aria-hidden="true"
    ></div>
  {/if}

  <!-- SIDEBAR (Dark Purple #2e114d) -->
  <aside class="sidebar" class:open={isMobileSidebarOpen}>
    <!-- Brand Header -->
    <div class="sidebar-brand">
      <div class="brand-shield">
        <img
          src="/images/logo-racana.png"
          alt="Logo Resmi Pramuka Polidewa"
          class="sidebar-logo-img"
        />
      </div>
      <div class="brand-text">
        <span class="brand-title">Racana Dewa Raja</span>
        <span class="brand-sub">Gudep 04.017 – 04.018</span>
      </div>
    </div>

    <!-- Portal Admin Badge / Link ke Portal Admin -->
    <div class="portal-badge-wrap">
      <a href="/admin/login" class="portal-admin-pill" title="Kunjungi Portal Admin Login">
        <span class="pill-dot"></span>
        <span class="pill-text">Portal Admin</span>
        <span class="pill-arrow">→</span>
      </a>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <a href="/admin" class="nav-item active">
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
        <span>Dashboard</span>
      </a>

      <a href="/admin" class="nav-item">
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span>Manajemen Anggota</span>
      </a>

      <a href="/admin" class="nav-item" onclick={() => (activeTab = 'baru')}>
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        <div class="nav-label-wrap">
          <span>Pendaftaran Masuk (PAB)</span>
          <span class="badge-baru">Baru</span>
        </div>
      </a>

      <a href="/admin" class="nav-item">
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
        </svg>
        <span>Berita & Kegiatan</span>
      </a>

      <a href="/admin" class="nav-item">
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z"/>
        </svg>
        <span>Inventaris & Sarpras</span>
      </a>

      <a href="/admin" class="nav-item">
        <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>
        <span>Pengaturan Web</span>
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

  <!-- MAIN WRAPPER (Top Navbar + Gold Workspace #febb2b) -->
  <div class="main-wrapper">
    <!-- TOP NAVBAR (Dark Purple #270e42) -->
    <header class="top-navbar">
      <div class="nav-left">
        <!-- Mobile Toggle Button -->
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

        <!-- Breadcrumb -->
        <div class="nav-breadcrumbs">
          <span class="bc-parent">Sistem Racana</span>
          <span class="bc-sep">›</span>
          <span class="bc-active">Pusat Komando</span>
        </div>
      </div>

      <!-- Center Yellow Search Bar -->
      <div class="nav-center-search">
        <div class="search-pill">
          <svg viewBox="0 0 24 24" class="search-icon" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Cari berkas, data anggota, atau kegiatan..."
            class="search-input"
          />
        </div>
      </div>

      <!-- Right User Controls -->
      <div class="nav-right">
        <!-- Notification Bell with Yellow Dot -->
        <button type="button" class="icon-circle-btn" aria-label="Notifikasi">
          <span class="bell-dot"></span>
          <svg viewBox="0 0 24 24" class="icon-svg" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </button>

        <!-- Quick Add Button -->
        <button
          type="button"
          class="icon-circle-btn"
          onclick={() => (showAddNewsModal = true)}
          aria-label="Tambah Konten"
        >
          <svg viewBox="0 0 24 24" class="icon-svg" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </button>

        <!-- Profile Widget with Dropdown -->
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
              <a href="/admin/login" class="menu-item" onclick={() => (showProfileDropdown = false)}>
                <svg viewBox="0 0 24 24" class="menu-item-icon" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span>Portal Login Admin</span>
              </a>
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

    <!-- DASHBOARD WORKSPACE (Golden Yellow Canvas #febb2b) -->
    <main class="dashboard-canvas">
      <!-- 1. WELCOME HERO BANNER (Dark Purple Card) -->
      <section class="banner-hero-card">
        <div class="banner-left-group">
          <div class="banner-emblem-wrap">
            <img
              src="/images/logo-racana.png"
              alt="Logo Resmi Racana Pramuka Polidewa"
              class="banner-emblem-img"
            />
          </div>
          <div class="banner-text-col">
            <div class="banner-tag">
              <span class="tag-bullet"></span>
              <span>Masa Bakti 2025/2026</span>
            </div>

            <h1 class="banner-hero-title">
              Selamat datang<br />
              di Panel Admin, Kak Racana
            </h1>

            <p class="banner-hero-desc">
              Ringkasan data operasional Racana Dewa Raja – Batari Gudep 04.017 –
              04.018 Pangkalan Politeknik Dewantara Palopo.
            </p>
          </div>
        </div>

        <div class="banner-actions-col">
          <button
            type="button"
            class="btn-banner-gold"
            onclick={() => (activeTab = 'baru')}
          >
            <svg viewBox="0 0 24 24" class="btn-ic" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <span>Lihat Pendaftar PAB</span>
            <span class="btn-pill-count">{stats.pab.pending || 12}</span>
          </button>

          <button
            type="button"
            class="btn-banner-gold-outline"
            onclick={() => (showAddNewsModal = true)}
          >
            <svg viewBox="0 0 24 24" class="btn-ic" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span>+ Tambah Berita Baru</span>
          </button>
        </div>
      </section>

      <!-- 2. FOUR STAT CARDS ROW -->
      <section class="stats-grid">
        <!-- Stat 1: Pendaftar PAB -->
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Pendaftar PAB 2025</span>
            <div class="stat-icon-wrap bg-purple-tint">
              <svg viewBox="0 0 24 24" class="stat-svg" fill="currentColor">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
          <div class="stat-number-row">
            <span class="stat-num">{stats.pab.total || 68}</span>
            <span class="stat-unit">Calon</span>
          </div>
          <div class="stat-footer">
            <span class="footer-dot-yellow"></span>
            <span class="footer-text">{stats.pab.pending || 12} perlu verifikasi</span>
          </div>
        </div>

        <!-- Stat 2: Anggota Aktif -->
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Anggota Aktif</span>
            <div class="stat-icon-wrap bg-purple-tint">
              <svg viewBox="0 0 24 24" class="stat-svg" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
          </div>
          <div class="stat-number-row">
            <span class="stat-num">{stats.anggotaAktif.total || 48}</span>
            <span class="stat-unit">Pandega</span>
          </div>
          <div class="stat-footer">
            <span class="footer-text">
              {stats.anggotaAktif.putra || 26} Putra • {stats.anggotaAktif.putri || 22} Putri
            </span>
          </div>
        </div>

        <!-- Stat 3: Warta & Berita -->
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Warta & Berita</span>
            <div class="stat-icon-wrap bg-gold-tint">
              <svg viewBox="0 0 24 24" class="stat-svg text-gold" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
              </svg>
            </div>
          </div>
          <div class="stat-number-row">
            <span class="stat-num">{stats.wartaBerita.total || 24}</span>
            <span class="stat-unit">Terbit</span>
          </div>
          <div class="stat-footer">
            <span class="footer-text">
              {stats.wartaBerita.draft || 2} draf artikel menunggu tayang
            </span>
          </div>
        </div>

        <!-- Stat 4: Inventaris Sanggar -->
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Inventaris Sanggar</span>
            <div class="stat-icon-wrap bg-gold-tint">
              <svg viewBox="0 0 24 24" class="stat-svg text-gold" fill="currentColor">
                <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z"/>
              </svg>
            </div>
          </div>
          <div class="stat-number-row">
            <span class="stat-num">{stats.inventaris.total || 142}</span>
            <span class="stat-unit">Aset</span>
          </div>
          <div class="stat-footer">
            <span class="footer-text">
              {stats.inventaris.siapPakaiPercent || 98}% kondisi prima & siap pakai
            </span>
          </div>
        </div>
      </section>

      <!-- 3. LOWER TWO-COLUMN LAYOUT -->
      <div class="lower-grid">
        <!-- LEFT COLUMN (65%) -->
        <div class="left-col">
          <!-- CARD A: PENDAFTAR PAB TERBARU -->
          <div class="content-card">
            <div class="card-title-bar">
              <div>
                <h2 class="card-main-title">Pendaftar PAB Terbaru</h2>
                <p class="card-sub-title">Calon pandega baru Penerimaan Anggota Baru 2025</p>
              </div>

              <div class="card-actions-right">
                <!-- Filter Tabs -->
                <div class="tab-pill-group">
                  <button
                    type="button"
                    class="tab-pill"
                    class:active={activeTab === 'semua'}
                    onclick={() => (activeTab = 'semua')}
                  >
                    Semua
                  </button>
                  <button
                    type="button"
                    class="tab-pill"
                    class:active={activeTab === 'baru'}
                    onclick={() => (activeTab = 'baru')}
                  >
                    Menunggu
                  </button>
                  <button
                    type="button"
                    class="tab-pill"
                    class:active={activeTab === 'terverifikasi'}
                    onclick={() => (activeTab = 'terverifikasi')}
                  >
                    Terverifikasi
                  </button>
                </div>

                <a href="/admin" class="link-open-all">
                  <span>Buka Semua ({stats.pab.total || 68})</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            <!-- Table of Applicants -->
            <div class="table-responsive">
              <table class="pab-table">
                <thead>
                  <tr>
                    <th>Nama Mahasiswa</th>
                    <th>Program Studi</th>
                    <th>Waktu Daftar</th>
                    <th>Status</th>
                    <th class="th-action">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {#each filteredPendaftar as item}
                    <tr>
                      <td>
                        <div class="student-profile-cell">
                          <div class="student-avatar" class:av-alt={item.id % 2 === 0}>
                            <span>{getInitials(item.namaLengkap)}</span>
                          </div>
                          <div class="student-meta">
                            <span class="student-name">{item.namaLengkap}</span>
                            <span class="student-nim">NIM: {item.nim}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="prodi-text">{item.programStudi}</span>
                      </td>
                      <td>
                        <span class="time-text">{formatTime(item.createdAt)}</span>
                      </td>
                      <td>
                        {#if item.status === 'terverifikasi'}
                          <span class="badge-status badge-verified">
                            <span class="badge-icon-check">✓</span>
                            <span>Terverifikasi</span>
                          </span>
                        {:else}
                          <span class="badge-status badge-pending">
                            <span class="badge-dot-orange"></span>
                            <span>Menunggu</span>
                          </span>
                        {/if}
                      </td>
                      <td class="td-action">
                        <div class="action-btn-group">
                          {#if item.status !== 'terverifikasi'}
                            <button
                              type="button"
                              class="btn-quick-verify"
                              title="Verifikasi Berkas"
                              onclick={() => verifyPendaftar(item.id)}
                            >
                              Verifikasi
                            </button>
                          {/if}
                          <button
                            type="button"
                            class="btn-detail"
                            title="Detail Pendaftar"
                            onclick={() => (selectedPendaftar = item)}
                          >
                            Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>

          <!-- CARD B: AGENDA KEGIATAN TERDEKAT -->
          <div class="content-card agenda-card">
            <div class="card-title-bar">
              <div>
                <h2 class="card-main-title">Agenda Kegiatan Terdekat</h2>
              </div>
              <div class="agenda-filter-badge">
                <span>Bulan Ini</span>
              </div>
            </div>

            <div class="agenda-items-grid">
              <!-- Event 1 -->
              <div class="agenda-item">
                <div class="date-badge date-purple">
                  <span class="date-day">12</span>
                  <span class="date-month">APR</span>
                </div>

                <div class="agenda-info">
                  <div class="agenda-meta-row">
                    <span class="event-tag tag-pab">PAB 2025</span>
                  </div>
                  <h3 class="agenda-title">Temu Teknis PAB Calon Anggota</h3>
                  <div class="agenda-details">
                    <div class="detail-item">
                      <svg viewBox="0 0 24 24" class="detail-icon" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>Aula Utama Kampus Dewantara</span>
                    </div>
                    <div class="detail-item">
                      <svg viewBox="0 0 24 24" class="detail-icon" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      <span>14:00 - 17:30 WITA</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Event 2 -->
              <div class="agenda-item">
                <div class="date-badge date-gold">
                  <span class="date-day">18</span>
                  <span class="date-month">MEI</span>
                </div>

                <div class="agenda-info">
                  <div class="agenda-meta-row">
                    <span class="event-tag tag-rutin">Rutin</span>
                  </div>
                  <h3 class="agenda-title">Latihan Gabungan Pionering</h3>
                  <div class="agenda-details">
                    <div class="detail-item">
                      <svg viewBox="0 0 24 24" class="detail-icon" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>Taman Baca</span>
                    </div>
                    <div class="detail-item">
                      <svg viewBox="0 0 24 24" class="detail-icon" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      <span>15:30 - Selesai</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN (35%) -->
        <div class="right-col">
          <!-- CARD C: AKSI CEPAT (Lightning) -->
          <div class="content-card quick-actions-card">
            <div class="quick-title-bar">
              <h2 class="card-main-title">Aksi Cepat</h2>
              <span class="quick-bolt">⚡</span>
            </div>

            <div class="quick-links-list">
              <!-- Action 1 -->
              <button
                type="button"
                class="quick-action-row"
                onclick={() => (activeTab = 'baru')}
              >
                <div class="action-icon-circle">
                  <svg viewBox="0 0 24 24" class="act-svg" fill="currentColor">
                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div class="action-content">
                  <span class="action-heading">Kelola Pendaftar PAB</span>
                  <span class="action-desc">Verifikasi calon pandega</span>
                </div>
                <span class="action-chevron">›</span>
              </button>

              <!-- Action 2 -->
              <button
                type="button"
                class="quick-action-row"
                onclick={() => (showAddNewsModal = true)}
              >
                <div class="action-icon-circle">
                  <svg viewBox="0 0 24 24" class="act-svg" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </div>
                <div class="action-content">
                  <span class="action-heading">Tulis Berita / Warta</span>
                  <span class="action-desc">Publikasikan kegiatan baru</span>
                </div>
                <span class="action-chevron">›</span>
              </button>

              <!-- Action 3 -->
              <a href="/struktur-racana" class="quick-action-row">
                <div class="action-icon-circle">
                  <svg viewBox="0 0 24 24" class="act-svg" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <div class="action-content">
                  <span class="action-heading">Update Data Anggota</span>
                  <span class="action-desc">Buku induk & KTA Dewa Raja</span>
                </div>
                <span class="action-chevron">›</span>
              </a>

              <!-- Action 4 -->
              <button
                type="button"
                class="quick-action-row"
                onclick={() => alert('Fitur Ekspor Laporan PDF & Spreadsheet berhasil diinisiasi!')}
              >
                <div class="action-icon-circle">
                  <svg viewBox="0 0 24 24" class="act-svg" fill="currentColor">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
                  </svg>
                </div>
                <div class="action-content">
                  <span class="action-heading">Unduh Laporan</span>
                  <span class="action-desc">Ekspor PDF & Spreadsheet</span>
                </div>
                <span class="action-chevron">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

<!-- MODAL: DETAIL CALON ANGGOTA -->
{#if selectedPendaftar}
  <div
    class="modal-backdrop"
    role="button"
    tabindex="0"
    onclick={() => (selectedPendaftar = null)}
    onkeydown={(e) => e.key === 'Escape' && (selectedPendaftar = null)}
  >
    <div
      class="modal-box"
      role="dialog"
      tabindex="-1"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
    >
      <div class="modal-header">
        <h3 class="modal-title">Detail Berkas Pendaftar PAB</h3>
        <button
          type="button"
          class="modal-close-btn"
          onclick={() => (selectedPendaftar = null)}
        >
          ✕
        </button>
      </div>

      <div class="modal-body">
        <div class="applicant-profile-card">
          <div class="app-avatar-big">
            {getInitials(selectedPendaftar.namaLengkap)}
          </div>
          <div>
            <h4 class="app-name-big">{selectedPendaftar.namaLengkap}</h4>
            <p class="app-nim-big">NIM: {selectedPendaftar.nim}</p>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-lbl">Program Studi</span>
            <span class="info-val">{selectedPendaftar.programStudi}</span>
          </div>
          <div class="info-item">
            <span class="info-lbl">Waktu Registrasi</span>
            <span class="info-val">{formatTime(selectedPendaftar.createdAt)}</span>
          </div>
          <div class="info-item">
            <span class="info-lbl">Status Verifikasi</span>
            <span class="info-val">
              {#if selectedPendaftar.status === 'terverifikasi'}
                <span class="badge-status badge-verified">✓ Terverifikasi</span>
              {:else}
                <span class="badge-status badge-pending">● Menunggu Verifikasi</span>
              {/if}
            </span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        {#if selectedPendaftar.status !== 'terverifikasi'}
          <button
            type="button"
            class="btn-modal-primary"
            onclick={() => verifyPendaftar(selectedPendaftar!.id)}
          >
            Verifikasi Calon Anggota Ini
          </button>
        {/if}
        <button
          type="button"
          class="btn-modal-secondary"
          onclick={() => (selectedPendaftar = null)}
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- MODAL: TAMBAH BERITA BARU -->
{#if showAddNewsModal}
  <div
    class="modal-backdrop"
    role="button"
    tabindex="0"
    onclick={() => (showAddNewsModal = false)}
    onkeydown={(e) => e.key === 'Escape' && (showAddNewsModal = false)}
  >
    <div
      class="modal-box"
      role="dialog"
      tabindex="-1"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
    >
      <div class="modal-header">
        <h3 class="modal-title">Publikasi Warta / Berita Baru</h3>
        <button
          type="button"
          class="modal-close-btn"
          onclick={() => (showAddNewsModal = false)}
        >
          ✕
        </button>
      </div>

      <form onsubmit={handleAddNews} class="modal-form">
        <div class="form-group">
          <label for="news-title" class="form-label">Judul Berita / Kegiatan</label>
          <input
            id="news-title"
            type="text"
            bind:value={newsTitle}
            placeholder="Contoh: Latihan Gabungan Penegak & Pandega Polidewa"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="news-cat" class="form-label">Kategori Warta</label>
          <select id="news-cat" bind:value={newsCategory} class="form-select">
            <option value="Kegiatan Racana">Kegiatan Racana</option>
            <option value="Penerimaan Anggota">Penerimaan Anggota</option>
            <option value="Pengabdian Masyarakat">Pengabdian Masyarakat</option>
            <option value="Prestasi & Penghargaan">Prestasi & Penghargaan</option>
          </select>
        </div>

        <div class="form-group">
          <label for="news-summary" class="form-label">Ringkasan / Isi Kegiatan</label>
          <textarea
            id="news-summary"
            rows="4"
            bind:value={newsSummary}
            placeholder="Tulis ringkasan kegiatan kepramukaan..."
            class="form-textarea"
          ></textarea>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn-modal-primary" disabled={isSubmittingNews}>
            {isSubmittingNews ? 'Menyimpan...' : 'Tayangkan Warta'}
          </button>
          <button
            type="button"
            class="btn-modal-secondary"
            onclick={() => (showAddNewsModal = false)}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  /* -------------------------------------------------------------
     DASHBOARD SHELL
     ------------------------------------------------------------- */
  .dashboard-shell {
    display: flex;
    min-height: 100vh;
    min-height: 100dvh;
    background-color: #2e114d;
    color: #ffffff;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* -------------------------------------------------------------
     SIDEBAR (#2e114d / #3a1860)
     ------------------------------------------------------------- */
  .sidebar {
    width: 255px;
    background: #2b0f47;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100dvh;
    z-index: 100;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1.5rem 1.25rem 1.15rem;
  }

  .brand-shield {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(254, 187, 43, 0.15);
    border: 1.5px solid rgba(254, 187, 43, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    flex-shrink: 0;
  }

  .sidebar-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
  }

  .brand-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .brand-sub {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.65);
    margin-top: 2px;
  }

  /* Portal Admin Pill Selector */
  .portal-badge-wrap {
    padding: 0 1.25rem 1rem;
  }

  .portal-admin-pill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #febb2b;
    color: #2b0f47;
    padding: 0.45rem 0.85rem;
    border-radius: 9999px;
    font-size: 0.82rem;
    font-weight: 800;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(254, 187, 43, 0.35);
    transition: transform 0.2s ease, filter 0.2s ease;
  }

  .portal-admin-pill:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
  }

  .pill-dot {
    width: 7px;
    height: 7px;
    background-color: #2b0f47;
    border-radius: 50%;
  }

  .pill-arrow {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  /* Navigation Items */
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.5rem 0.85rem;
    flex: 1;
    overflow-y: auto;
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
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    font-weight: 700;
  }

  .nav-icon {
    width: 19px;
    height: 19px;
    flex-shrink: 0;
    color: inherit;
    opacity: 0.9;
  }

  .nav-label-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }

  .badge-baru {
    background: #febb2b;
    color: #2b0f47;
    font-size: 0.65rem;
    font-weight: 800;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
    text-transform: uppercase;
  }

  /* Sidebar Footer */
  .sidebar-footer {
    padding: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .btn-back-public {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.65rem 0.9rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-back-public:hover {
    background: rgba(254, 187, 43, 0.15);
    border-color: #febb2b;
    color: #febb2b;
  }

  .btn-icon {
    width: 15px;
    height: 15px;
  }

  /* -------------------------------------------------------------
     MAIN CONTENT WRAPPER
     ------------------------------------------------------------- */
  .main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  /* -------------------------------------------------------------
     TOP NAVBAR (#270e42)
     ------------------------------------------------------------- */
  .top-navbar {
    background: #250b3e;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1.85rem;
    gap: 1.5rem;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;
    padding: 0.25rem;
  }

  .menu-icon {
    width: 24px;
    height: 24px;
  }

  .nav-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.85rem;
  }

  .bc-parent {
    color: rgba(255, 255, 255, 0.65);
    font-weight: 500;
  }

  .bc-sep {
    color: rgba(255, 255, 255, 0.35);
  }

  .bc-active {
    color: #ffffff;
    font-weight: 700;
  }

  /* Yellow Search Bar */
  .nav-center-search {
    flex: 1;
    max-width: 480px;
  }

  .search-pill {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    background: #febb2b;
    padding: 0.45rem 1rem;
    border-radius: 9999px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  }

  .search-icon {
    width: 17px;
    height: 17px;
    color: #2b0f47;
    flex-shrink: 0;
  }

  .search-input {
    width: 100%;
    background: transparent;
    border: none;
    color: #2b0f47;
    font-size: 0.84rem;
    font-weight: 600;
    font-family: inherit;
    outline: none;
  }

  .search-input::placeholder {
    color: rgba(43, 15, 71, 0.7);
    font-weight: 500;
  }

  /* Right User Controls */
  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .icon-circle-btn {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .icon-circle-btn:hover {
    background: rgba(254, 187, 43, 0.2);
    border-color: #febb2b;
    color: #febb2b;
  }

  .icon-svg {
    width: 18px;
    height: 18px;
  }

  .bell-dot {
    position: absolute;
    top: 7px;
    right: 8px;
    width: 7px;
    height: 7px;
    background-color: #febb2b;
    border-radius: 50%;
    border: 1.5px solid #250b3e;
  }

  .profile-widget {
    position: relative;
  }

  .profile-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: right;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
  }

  .profile-name {
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .profile-role {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.72rem;
  }

  .profile-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(254, 187, 43, 0.2);
    border: 1.5px solid rgba(254, 187, 43, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #febb2b;
  }

  .avatar-svg {
    width: 24px;
    height: 24px;
  }

  .profile-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 0.65rem);
    width: 200px;
    background: #341256;
    border: 1.5px solid rgba(254, 187, 43, 0.3);
    border-radius: 14px;
    padding: 0.75rem;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
    z-index: 100;
  }

  .menu-user-meta {
    display: flex;
    flex-direction: column;
    padding: 0.25rem 0.5rem;
  }

  .user-user {
    font-size: 0.82rem;
    font-weight: 700;
    color: #febb2b;
  }

  .user-unit {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.65);
  }

  .menu-divider {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin: 0.5rem 0;
  }

  .menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 0.65rem;
    border: none;
    background: none;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 600;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .menu-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .menu-item.text-danger {
    color: #fca5a5;
  }

  .menu-item.text-danger:hover {
    background: rgba(239, 68, 68, 0.15);
  }

  .menu-item-icon {
    width: 16px;
    height: 16px;
  }

  /* -------------------------------------------------------------
     DASHBOARD CANVAS (Rich Gold #febb2b)
     ------------------------------------------------------------- */
  .dashboard-canvas {
    flex: 1;
    background: #f7b733;
    padding: 1.65rem 1.85rem;
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
    overflow-y: auto;
  }

  /* -------------------------------------------------------------
     1. WELCOME HERO BANNER (Dark Purple Card)
     ------------------------------------------------------------- */
  .banner-hero-card {
    background: #351556;
    border-radius: 24px;
    padding: 2.25rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  }

  .banner-left-group {
    display: flex;
    align-items: center;
    gap: 1.65rem;
  }

  .banner-emblem-wrap {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    background: rgba(43, 15, 71, 0.6);
    border: 2px solid rgba(254, 187, 43, 0.6);
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), 0 0 16px rgba(254, 187, 43, 0.2);
  }

  .banner-emblem-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }

  .banner-text-col {
    max-width: 580px;
  }

  .banner-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.78rem;
    font-weight: 700;
    color: #febb2b;
    margin-bottom: 0.65rem;
    letter-spacing: 0.02em;
  }

  .tag-bullet {
    width: 6px;
    height: 6px;
    background: #febb2b;
    border-radius: 50%;
  }

  .banner-hero-title {
    color: #ffffff;
    font-size: 2.15rem;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 0.75rem;
  }

  .banner-hero-desc {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .banner-actions-col {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    flex-shrink: 0;
  }

  .btn-banner-gold {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    background: #febb2b;
    color: #2b0f47;
    border: none;
    border-radius: 9999px;
    padding: 0.75rem 1.45rem;
    font-size: 0.88rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    transition: all 0.2s ease;
  }

  .btn-banner-gold:hover {
    background: #ffc952;
    transform: translateY(-2px);
  }

  .btn-pill-count {
    background: #2b0f47;
    color: #febb2b;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 0.15rem 0.55rem;
    border-radius: 9999px;
  }

  .btn-banner-gold-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    color: #febb2b;
    border: 1.5px solid #febb2b;
    border-radius: 9999px;
    padding: 0.7rem 1.45rem;
    font-size: 0.88rem;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-banner-gold-outline:hover {
    background: rgba(254, 187, 43, 0.15);
    transform: translateY(-2px);
  }

  .btn-ic {
    width: 17px;
    height: 17px;
  }

  /* -------------------------------------------------------------
     2. FOUR STAT CARDS ROW
     ------------------------------------------------------------- */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }

  .stat-card {
    background: #351556;
    border-radius: 20px;
    padding: 1.35rem 1.45rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
  }

  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.85rem;
  }

  .stat-label {
    font-size: 0.84rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
  }

  .stat-icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bg-purple-tint {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
  }

  .bg-gold-tint {
    background: rgba(254, 187, 43, 0.2);
    color: #febb2b;
  }

  .stat-svg {
    width: 17px;
    height: 17px;
  }

  .stat-number-row {
    display: flex;
    align-items: baseline;
    gap: 0.45rem;
    margin-bottom: 0.45rem;
  }

  .stat-num {
    font-size: 2.35rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .stat-unit {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
  }

  .stat-footer {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.76rem;
    color: rgba(255, 255, 255, 0.68);
    font-weight: 500;
  }

  .footer-dot-yellow {
    width: 6px;
    height: 6px;
    background-color: #febb2b;
    border-radius: 50%;
  }

  /* -------------------------------------------------------------
     3. LOWER TWO-COLUMN LAYOUT
     ------------------------------------------------------------- */
  .lower-grid {
    display: grid;
    grid-template-columns: 1.8fr 1.05fr;
    gap: 1.35rem;
    align-items: start;
  }

  .left-col,
  .right-col {
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
  }

  .content-card {
    background: #351556;
    border-radius: 22px;
    padding: 1.65rem 1.75rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .card-title-bar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    gap: 1rem;
  }

  .card-main-title {
    font-size: 1.25rem;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  .card-sub-title {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.65);
    margin-top: 2px;
  }

  .card-actions-right {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .tab-pill-group {
    display: flex;
    background: rgba(0, 0, 0, 0.2);
    padding: 3px;
    border-radius: 9999px;
  }

  .tab-pill {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tab-pill.active {
    background: #febb2b;
    color: #2b0f47;
  }

  .link-open-all {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .link-open-all:hover {
    color: #febb2b;
  }

  /* Table */
  .table-responsive {
    overflow-x: auto;
  }

  .pab-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.84rem;
    text-align: left;
  }

  .pab-table th {
    padding: 0.75rem 0.85rem;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .pab-table td {
    padding: 0.9rem 0.85rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    vertical-align: middle;
  }

  .student-profile-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .student-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #4a2176;
    color: #ffffff;
    font-size: 0.78rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .student-avatar.av-alt {
    background: #febb2b;
    color: #2b0f47;
  }

  .student-meta {
    display: flex;
    flex-direction: column;
  }

  .student-name {
    font-weight: 700;
    color: #ffffff;
  }

  .student-nim {
    font-size: 0.73rem;
    color: rgba(255, 255, 255, 0.55);
  }

  .prodi-text {
    color: rgba(255, 255, 255, 0.85);
  }

  .time-text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.78rem;
  }

  /* Status Badges */
  .badge-status {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.65rem;
    border-radius: 9999px;
  }

  .badge-pending {
    background: rgba(254, 187, 43, 0.15);
    color: #febb2b;
    border: 1px solid rgba(254, 187, 43, 0.35);
  }

  .badge-dot-orange {
    width: 6px;
    height: 6px;
    background: #febb2b;
    border-radius: 50%;
  }

  .badge-verified {
    background: rgba(142, 68, 237, 0.25);
    color: #d8b4fe;
    border: 1px solid rgba(142, 68, 237, 0.4);
  }

  .badge-icon-check {
    font-size: 0.75rem;
  }

  .action-btn-group {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .btn-quick-verify {
    background: #febb2b;
    color: #2b0f47;
    border: none;
    padding: 0.25rem 0.55rem;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 800;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .btn-quick-verify:hover {
    opacity: 0.85;
  }

  .btn-detail {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: none;
    padding: 0.25rem 0.55rem;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-detail:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Agenda Card */
  .agenda-card {
    padding-bottom: 1.5rem;
  }

  .agenda-filter-badge {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.25rem 0.65rem;
    border-radius: 9999px;
  }

  .agenda-items-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .agenda-item {
    background: rgba(0, 0, 0, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    padding: 1.15rem;
    display: flex;
    gap: 1rem;
  }

  .date-badge {
    width: 52px;
    height: 58px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .date-purple {
    background: #4a2176;
    color: #ffffff;
  }

  .date-gold {
    background: #febb2b;
    color: #2b0f47;
  }

  .date-day {
    font-size: 1.35rem;
    font-weight: 900;
    line-height: 1;
  }

  .date-month {
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .agenda-info {
    display: flex;
    flex-direction: column;
  }

  .event-tag {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 0.15rem 0.45rem;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .tag-pab {
    background: rgba(254, 187, 43, 0.2);
    color: #febb2b;
  }

  .tag-rutin {
    background: rgba(142, 68, 237, 0.3);
    color: #d8b4fe;
  }

  .agenda-title {
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 800;
    margin: 0.35rem 0 0.55rem;
    line-height: 1.25;
  }

  .agenda-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.74rem;
    color: rgba(255, 255, 255, 0.65);
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .detail-icon {
    width: 13px;
    height: 13px;
    color: rgba(254, 187, 43, 0.8);
  }

  /* -------------------------------------------------------------
     RIGHT COLUMN (Aksi Cepat & Catatan Sanggar)
     ------------------------------------------------------------- */
  .quick-title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .quick-bolt {
    color: #febb2b;
    font-size: 1.1rem;
  }

  .quick-links-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .quick-action-row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    background: rgba(0, 0, 0, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    padding: 0.85rem 1rem;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: all 0.2s ease;
  }

  .quick-action-row:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(254, 187, 43, 0.4);
    transform: translateX(3px);
  }

  .action-icon-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(254, 187, 43, 0.15);
    color: #febb2b;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .act-svg {
    width: 18px;
    height: 18px;
  }

  .action-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .action-heading {
    font-size: 0.86rem;
    font-weight: 800;
    color: #ffffff;
  }

  .action-desc {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .action-chevron {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.2rem;
    font-weight: 700;
  }


  /* -------------------------------------------------------------
     MODALS
     ------------------------------------------------------------- */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: 1000;
  }

  .modal-box {
    background: #341256;
    border: 1.5px solid rgba(254, 187, 43, 0.4);
    border-radius: 20px;
    width: 100%;
    max-width: 520px;
    padding: 1.85rem;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes modalPop {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .modal-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #ffffff;
  }

  .modal-close-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.2rem;
    cursor: pointer;
  }

  .modal-close-btn:hover {
    color: #ffffff;
  }

  .applicant-profile-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(0, 0, 0, 0.25);
    padding: 1rem;
    border-radius: 14px;
    margin-bottom: 1.25rem;
  }

  .app-avatar-big {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #febb2b;
    color: #2b0f47;
    font-size: 1.1rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app-name-big {
    font-size: 1.05rem;
    font-weight: 800;
    color: #ffffff;
  }

  .app-nim-big {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.65);
  }

  .info-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-size: 0.85rem;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .info-lbl {
    color: rgba(255, 255, 255, 0.6);
  }

  .info-val {
    font-weight: 700;
    color: #ffffff;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .btn-modal-primary {
    background: #febb2b;
    color: #2b0f47;
    border: none;
    padding: 0.65rem 1.25rem;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 800;
    cursor: pointer;
  }

  .btn-modal-primary:hover {
    background: #ffc952;
  }

  .btn-modal-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: none;
    padding: 0.65rem 1.25rem;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-modal-secondary:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-label {
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
  }

  .form-input,
  .form-select,
  .form-textarea {
    width: 100%;
    padding: 0.75rem 0.95rem;
    background: rgba(22, 6, 38, 0.65);
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    color: #ffffff;
    font-size: 0.88rem;
    font-family: inherit;
    outline: none;
  }

  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    border-color: #febb2b;
  }

  /* -------------------------------------------------------------
     RESPONSIVE BREAKPOINTS
     ------------------------------------------------------------- */
  @media (max-width: 1200px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .lower-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 900px) {
    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      transform: translateX(-100%);
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .sidebar-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 90;
    }

    .mobile-menu-btn {
      display: block;
    }

    .nav-center-search {
      display: none;
    }

    .banner-hero-card {
      flex-direction: column;
      align-items: flex-start;
      padding: 1.85rem 1.75rem;
    }

    .banner-hero-title {
      font-size: 1.75rem;
    }
  }

  @media (max-width: 640px) {
    .dashboard-canvas {
      padding: 1rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .agenda-items-grid {
      grid-template-columns: 1fr;
    }

    .card-title-bar {
      flex-direction: column;
      align-items: flex-start;
    }

    .banner-left-group {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .banner-emblem-wrap {
      width: 68px;
      height: 68px;
    }
  }
</style>
