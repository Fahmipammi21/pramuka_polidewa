<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let username = $state('');
  let password = $state('');
  let showPassword = $state(false);
  let rememberMe = $state(true);
  let isLoading = $state(false);
  let errorMessage = $state('');

  onMount(() => {
    // Check if already authenticated
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (token) {
        goto('/admin');
      }
    }
  });

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    errorMessage = '';

    if (!username.trim() || !password) {
      errorMessage = 'Mohon isi username dan kata sandi Anda.';
      return;
    }

    isLoading = true;

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Username atau password salah.');
      }

      // Save session
      localStorage.setItem('admin_token', resData.data.token);
      localStorage.setItem('admin_user', JSON.stringify(resData.data.admin));

      // Redirect to Admin Dashboard
      goto('/admin');
    } catch (err: any) {
      // If backend is unreachable or demo testing
      if (err.message && err.message.includes('Failed to fetch')) {
        // Fallback for offline demo mode
        if (username === 'admin' && password === 'admin123') {
          localStorage.setItem('admin_token', 'demo_token_racana_2025');
          localStorage.setItem(
            'admin_user',
            JSON.stringify({ id: 1, username: 'admin', namaLengkap: 'Pradana Utama' })
          );
          goto('/admin');
          return;
        }
        errorMessage = 'Tidak dapat menghubungi server backend. Pastikan server aktif atau gunakan demo (admin / admin123).';
      } else {
        errorMessage = err.message || 'Terjadi kesalahan saat masuk.';
      }
    } finally {
      isLoading = false;
    }
  }

  function fillDemo() {
    username = 'admin';
    password = 'admin123';
    errorMessage = '';
  }
</script>

<svelte:head>
  <title>Portal Login Admin — Racana Dewa Raja – Batari</title>
</svelte:head>

<div class="login-wrapper">
  <!-- Decorative Background Glow -->
  <div class="bg-glow bg-glow-1" aria-hidden="true"></div>
  <div class="bg-glow bg-glow-2" aria-hidden="true"></div>

  <div class="login-container">
    <div class="login-card">
      <!-- Header -->
      <div class="card-header">
        <a href="/" class="brand-badge" title="Kembali ke Beranda Publik">
          <img src="/images/logo-racana.png" alt="Logo Pramuka Politeknik Dewantara" class="brand-logo" />
        </a>

        <div class="portal-tag">
          <span class="tag-dot"></span>
          <span>Sistem Informasi Racana Dewa Raja &ndash; Batari</span>
        </div>

        <h1 class="login-title">Portal Akses Pengurus</h1>
        <p class="login-subtitle">
          Gugus Depan 04.017 &ndash; 04.018 Pangkalan Politeknik Dewantara Palopo
        </p>
      </div>

      <!-- Error Alert -->
      {#if errorMessage}
        <div class="alert-error" role="alert">
          <svg viewBox="0 0 24 24" class="alert-icon" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>{errorMessage}</span>
        </div>
      {/if}

      <!-- Form -->
      <form class="login-form" onsubmit={handleLogin}>
        <!-- Username Field -->
        <div class="form-group">
          <label for="username" class="form-label">Username / Akun Pengurus</label>
          <div class="input-wrap">
            <svg viewBox="0 0 24 24" class="input-icon" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <input
              type="text"
              id="username"
              name="username"
              bind:value={username}
              placeholder="Contoh: admin"
              autocomplete="username"
              required
              class="form-input"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <div class="label-row">
            <label for="password" class="form-label">Kata Sandi</label>
          </div>
          <div class="input-wrap">
            <svg viewBox="0 0 24 24" class="input-icon" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              bind:value={password}
              placeholder="Masukkan kata sandi"
              autocomplete="current-password"
              required
              class="form-input"
            />
            <button
              type="button"
              class="toggle-pwd-btn"
              onclick={() => (showPassword = !showPassword)}
              aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
            >
              {#if showPassword}
                <svg viewBox="0 0 24 24" fill="currentColor" class="pwd-svg">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
              {:else}
                <svg viewBox="0 0 24 24" fill="currentColor" class="pwd-svg">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              {/if}
            </button>
          </div>
        </div>

        <!-- Options Row -->
        <div class="form-row-between">
          <label class="remember-wrap">
            <input type="checkbox" bind:checked={rememberMe} class="checkbox-input" />
            <span>Ingat sesi perangkat ini</span>
          </label>

          <button type="button" class="btn-demo-fill" onclick={fillDemo}>
            ⚡ Isi Akun Demo
          </button>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-submit-login" disabled={isLoading}>
          {#if isLoading}
            <span class="spinner"></span>
            <span>Memverifikasi Akses...</span>
          {:else}
            <span>Masuk ke Pusat Komando</span>
            <svg viewBox="0 0 24 24" class="btn-arrow" fill="currentColor">
              <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z"/>
            </svg>
          {/if}
        </button>
      </form>

      <!-- Footer Info -->
      <div class="card-footer">
        <a href="/" class="link-back">
          <svg viewBox="0 0 24 24" class="back-icon" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          <span>Kembali ke Website Publik</span>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .login-wrapper {
    min-height: 100vh;
    min-height: 100dvh;
    background: radial-gradient(circle at 50% 20%, #431b73 0%, #220c38 65%, #150624 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    position: relative;
    overflow: hidden;
  }

  /* Decorative Ambient Glow */
  .bg-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 1;
  }

  .bg-glow-1 {
    width: 480px;
    height: 480px;
    background: rgba(254, 187, 43, 0.15);
    top: -10%;
    right: 15%;
  }

  .bg-glow-2 {
    width: 420px;
    height: 420px;
    background: rgba(142, 68, 237, 0.2);
    bottom: -10%;
    left: 10%;
  }

  .login-container {
    width: 100%;
    max-width: 480px;
    position: relative;
    z-index: 2;
  }

  .login-card {
    background: rgba(46, 17, 77, 0.85);
    backdrop-filter: blur(16px);
    border: 1.5px solid rgba(254, 187, 43, 0.35);
    border-radius: 28px;
    padding: 2.75rem 2.25rem 2.25rem;
    box-shadow:
      0 24px 50px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(254, 187, 43, 0.12);
  }

  .card-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .brand-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 84px;
    background: rgba(43, 18, 72, 0.7);
    border: 2px solid rgba(254, 187, 43, 0.65);
    border-radius: 50%;
    padding: 0.35rem;
    margin-bottom: 1.25rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(254, 187, 43, 0.25);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .brand-badge:hover {
    transform: scale(1.06);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45), 0 0 22px rgba(254, 187, 43, 0.45);
  }

  .brand-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .portal-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(254, 187, 43, 0.12);
    border: 1px solid rgba(254, 187, 43, 0.3);
    color: #febb2b;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    margin-bottom: 0.85rem;
  }

  .tag-dot {
    width: 7px;
    height: 7px;
    background-color: #febb2b;
    border-radius: 50%;
    box-shadow: 0 0 8px #febb2b;
  }

  .login-title {
    color: #ffffff;
    font-size: 1.65rem;
    font-weight: 900;
    letter-spacing: -0.015em;
    margin-bottom: 0.35rem;
  }

  .login-subtitle {
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.86rem;
    line-height: 1.45;
  }

  /* Alert */
  .alert-error {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(239, 68, 68, 0.16);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #fca5a5;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
    animation: shake 0.35s ease;
  }

  .alert-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: #ef4444;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  /* Form */
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-label {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.86rem;
    font-weight: 600;
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 1rem;
    width: 19px;
    height: 19px;
    color: rgba(254, 187, 43, 0.85);
    pointer-events: none;
  }

  .form-input {
    width: 100%;
    padding: 0.85rem 1rem 0.85rem 2.85rem;
    background: rgba(22, 6, 38, 0.65);
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 14px;
    color: #ffffff;
    font-size: 0.92rem;
    font-family: inherit;
    outline: none;
    transition: all 0.2s ease;
  }

  .form-input::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  .form-input:focus {
    border-color: #febb2b;
    background: rgba(22, 6, 38, 0.9);
    box-shadow: 0 0 0 3px rgba(254, 187, 43, 0.2);
  }

  .toggle-pwd-btn {
    position: absolute;
    right: 0.75rem;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    padding: 0.35rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: color 0.2s ease;
  }

  .toggle-pwd-btn:hover {
    color: #febb2b;
  }

  .pwd-svg {
    width: 20px;
    height: 20px;
  }

  /* Options */
  .form-row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.82rem;
    margin-top: -0.25rem;
  }

  .remember-wrap {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: rgba(255, 255, 255, 0.75);
    cursor: pointer;
  }

  .checkbox-input {
    accent-color: #febb2b;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  .btn-demo-fill {
    background: rgba(254, 187, 43, 0.15);
    border: 1px solid rgba(254, 187, 43, 0.4);
    color: #febb2b;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 0.3rem 0.65rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-demo-fill:hover {
    background: #febb2b;
    color: #2b1248;
  }

  /* Submit Button */
  .btn-submit-login {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    width: 100%;
    padding: 0.95rem 1.5rem;
    background: #febb2b;
    color: #2b1248;
    border: none;
    border-radius: 14px;
    font-size: 0.95rem;
    font-weight: 800;
    cursor: pointer;
    margin-top: 0.5rem;
    box-shadow: 0 8px 24px rgba(254, 187, 43, 0.35);
    transition: all 0.25s ease;
  }

  .btn-submit-login:hover:not(:disabled) {
    background: #ffc952;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(254, 187, 43, 0.5);
  }

  .btn-submit-login:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  .btn-arrow {
    width: 18px;
    height: 18px;
    transition: transform 0.2s ease;
  }

  .btn-submit-login:hover:not(:disabled) .btn-arrow {
    transform: translateX(4px);
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(43, 18, 72, 0.3);
    border-top-color: #2b1248;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Footer */
  .card-footer {
    text-align: center;
    margin-top: 1.75rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .link-back {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.85rem;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .link-back:hover {
    color: #febb2b;
  }

  .back-icon {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 480px) {
    .login-card {
      padding: 2rem 1.5rem;
    }

    .login-title {
      font-size: 1.45rem;
    }
  }
</style>
