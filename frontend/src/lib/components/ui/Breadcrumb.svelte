<script lang="ts">
  interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  let { items = [] }: { items: BreadcrumbItem[] } = $props();
</script>

<nav class="breadcrumb-nav" aria-label="Breadcrumb">
  <ol class="breadcrumb-list">
    <li>
      <a href="/" class="crumb-link">Beranda</a>
    </li>
    {#each items as item, i}
      <li class="crumb-separator" aria-hidden="true">/</li>
      <li>
        {#if item.href && i < items.length - 1}
          <a href={item.href} class="crumb-link">{item.label}</a>
        {:else}
          <span class="crumb-current" aria-current="page">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .breadcrumb-nav {
    padding: 1.25rem 0 0.5rem;
  }

  .breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }

  .crumb-link {
    color: var(--color-accent-gold-light);
    font-weight: 500;
  }

  .crumb-link:hover {
    text-decoration: underline;
  }

  .crumb-separator {
    color: var(--color-primary-border);
  }

  .crumb-current {
    color: var(--color-text-secondary);
  }
</style>
