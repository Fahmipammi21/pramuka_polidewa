<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    goto('/admin/login', { replaceState: true });
  });
</script>

<div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #220c38; color: white;">
  <p>Mengarahkan ke Portal Login...</p>
</div>
