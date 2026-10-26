<script lang="ts">
  export interface PengurusItem {
    id?: number;
    nama: string;
    jabatan: string;
    kategori?: string;
    racana?: string;
    programStudi?: string;
    angkatan?: string;
    tingkatan?: string;
    kutipan?: string;
    foto?: string;
  }

  let { item, isLeader = false }: { item: PengurusItem; isLeader?: boolean } = $props();
</script>

<div class="pengurus-card" class:leader={isLeader}>
  <div class="avatar-wrap">
    {#if item.foto}
      <img src={item.foto} alt={item.nama} class="avatar-img" />
    {:else}
      <div class="avatar-placeholder">
        <svg viewBox="0 0 24 24" class="avatar-icon" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    {/if}
    {#if item.racana}
      <span class="racana-badge" class:putra={item.racana.includes('Dewa Raja')} class:putri={item.racana.includes('Batari')}>
        {item.racana}
      </span>
    {/if}
  </div>

  <div class="card-details">
    <span class="jabatan-label">{item.jabatan}</span>
    <h3 class="pengurus-name">{item.nama}</h3>

    {#if item.programStudi || item.angkatan}
      <p class="prodi-text">
        {item.programStudi || ''} {item.angkatan ? `• ${item.angkatan}` : ''}
      </p>
    {/if}

    {#if item.tingkatan}
      <span class="tingkatan-tag">{item.tingkatan}</span>
    {/if}

    {#if item.kutipan}
      <blockquote class="kutipan-text">
        "{item.kutipan}"
      </blockquote>
    {/if}
  </div>
</div>

<style>
  .pengurus-card {
    background: #1c0e33;
    border: 1px solid var(--color-primary-border);
    border-radius: var(--radius-lg);
    padding: 1.8rem 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
  }

  .pengurus-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
    border-color: rgba(240, 192, 64, 0.5);
  }

  .pengurus-card.leader {
    border: 2px solid var(--color-accent-gold);
    background: linear-gradient(180deg, #261245 0%, #1a0a30 100%);
    box-shadow: 0 8px 24px rgba(240, 192, 64, 0.15);
  }

  .avatar-wrap {
    position: relative;
    width: 120px;
    height: 120px;
    margin-bottom: 1.25rem;
  }

  .pengurus-card.leader .avatar-wrap {
    width: 135px;
    height: 135px;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--color-accent-gold);
    box-shadow: 0 0 16px rgba(240, 192, 64, 0.3);
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b154d;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--color-primary-border);
    color: var(--color-accent-gold-light);
  }

  .avatar-icon {
    width: 60px;
    height: 60px;
    opacity: 0.7;
  }

  .racana-badge {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    font-weight: 800;
    padding: 0.2rem 0.65rem;
    border-radius: var(--radius-full);
    white-space: nowrap;
    text-transform: uppercase;
  }

  .racana-badge.putra {
    background: #18092c;
    border: 1px solid var(--color-accent-gold);
    color: var(--color-accent-gold);
  }

  .racana-badge.putri {
    background: #18092c;
    border: 1px solid #e879f9;
    color: #f0abfc;
  }

  .card-details {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .jabatan-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-accent-gold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.4rem;
  }

  .pengurus-name {
    font-size: 1.15rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.3;
    margin-bottom: 0.4rem;
  }

  .pengurus-card.leader .pengurus-name {
    font-size: 1.3rem;
  }

  .prodi-text {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
    margin-bottom: 0.5rem;
  }

  .tingkatan-tag {
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.06);
    color: var(--color-text-muted);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-sm);
    margin-bottom: 0.6rem;
  }

  .kutipan-text {
    font-size: 0.82rem;
    font-style: italic;
    color: var(--color-accent-gold-light);
    margin-top: 0.6rem;
    line-height: 1.4;
  }
</style>
