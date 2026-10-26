<script lang="ts">
  export interface BeritaItem {
    id?: number;
    judul: string;
    slug: string;
    kategori?: string;
    ringkasan?: string;
    gambarUtama?: string;
    penulis?: string;
    tanggalPublish?: string;
  }

  let { item }: { item: BeritaItem } = $props();
</script>

<article class="berita-card">
  <div class="card-image-wrap">
    {#if item.gambarUtama}
      <img src={item.gambarUtama} alt={item.judul} class="card-image" loading="lazy" />
    {:else}
      <div class="card-image-placeholder">
        <svg viewBox="0 0 24 24" class="icon-camera" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      </div>
    {/if}
    {#if item.kategori}
      <span class="category-badge">{item.kategori}</span>
    {/if}
  </div>

  <div class="card-body">
    <div class="card-meta">
      <span class="meta-author">
        <svg viewBox="0 0 20 20" fill="currentColor" class="meta-icon">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
        </svg>
        {item.penulis || 'Admin Racana'}
      </span>
      {#if item.tanggalPublish}
        <span class="meta-date">{item.tanggalPublish}</span>
      {/if}
    </div>

    <h3 class="card-title">
      <a href="/berita/{item.slug}">{item.judul}</a>
    </h3>

    {#if item.ringkasan}
      <p class="card-excerpt">{item.ringkasan}</p>
    {/if}

    <a href="/berita/{item.slug}" class="read-more-link">
      <span>Baca Selengkapnya</span>
      <span class="arrow">&rarr;</span>
    </a>
  </div>
</article>

<style>
  .berita-card {
    background: #1e0f36;
    border: 1px solid var(--color-primary-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
  }

  .berita-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
    border-color: var(--color-accent-gold);
  }

  .card-image-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #140924;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .berita-card:hover .card-image {
    transform: scale(1.04);
  }

  .card-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-border);
  }

  .icon-camera {
    width: 48px;
    height: 48px;
  }

  .category-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(24, 9, 44, 0.85);
    backdrop-filter: blur(6px);
    border: 1px solid var(--color-accent-gold);
    color: var(--color-accent-gold-light);
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0.25rem 0.65rem;
    border-radius: var(--radius-full);
  }

  .card-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--color-text-muted);
    margin-bottom: 0.75rem;
  }

  .meta-author {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .meta-icon {
    width: 14px;
    height: 14px;
    color: var(--color-accent-gold);
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text-white);
    line-height: 1.35;
    margin-bottom: 0.75rem;
  }

  .card-title a:hover {
    color: var(--color-accent-gold-light);
  }

  .card-excerpt {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.55;
    margin-bottom: 1.5rem;
    flex: 1;
  }

  .read-more-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--color-accent-gold);
    font-size: 0.9rem;
    font-weight: 700;
    margin-top: auto;
  }

  .read-more-link:hover .arrow {
    transform: translateX(4px);
  }

  .arrow {
    transition: transform var(--transition-fast);
  }
</style>
