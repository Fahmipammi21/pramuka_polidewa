<script lang="ts">
  import '../app.css';
  import Navbar from '#lib/components/layout/Navbar.svelte';
  import Footer from '#lib/components/layout/Footer.svelte';
  import { page } from '$app/state';
  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();
  let isAdminRoute = $derived(
    page.url.pathname.startsWith('/admin') ||
    page.url.pathname.startsWith('/login')
  );
</script>

<svelte:head>
  <title>Pramuka Polidewa — Racana Dewa Raja – Batari</title>
  <meta name="description" content="Website resmi UKM Pramuka Politeknik Dewantara Palopo — Racana Dewa Raja – Batari Gudep 04.017 – 04.018." />
</svelte:head>

{#if isAdminRoute}
  {@render children()}
{:else}
  <div class="app-shell">
    <Navbar />
    <main class="main-content" id="main-content">
      {@render children()}
    </main>
    <Footer />
  </div>
{/if}

<style>
  .app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
