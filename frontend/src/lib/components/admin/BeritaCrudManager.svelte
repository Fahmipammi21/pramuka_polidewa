<script lang="ts">
  import { onMount } from 'svelte';

  interface AdminBeritaItem {
    id: number;
    judul: string;
    slug: string;
    kategori: string | null;
    ringkasan: string | null;
    konten: string;
    gambarUtama: string | null;
    captionGambar: string | null;
    penulis: string;
    status: string;
    tanggalPublish: string | null;
    createdAt: string;
  }

  let beritaList = $state<AdminBeritaItem[]>([]);
  let isLoading = $state(true);
  let errorMessage = $state('');
  let successMessage = $state('');

  // Search & Filter
  let searchQuery = $state('');
  let selectedCategory = $state('Semua');
  const categories = ['Semua', 'Penerimaan Anggota', 'Kegiatan Ilmiah', 'Latihan Rutin', 'Pengabdian', 'Kegiatan Racana'];

  // Modal State
  let showModal = $state(false);
  let isEditing = $state(false);
  let editingId = $state<number | null>(null);
  let isSubmitting = $state(false);

  // Form Fields (4 Inti: Foto Kegiatan, Judul, Deskripsi, Tanggal)
  let formJudul = $state('');
  let formFoto = $state('');
  let formDeskripsi = $state('');
  let formTanggal = $state('');
  let formKategori = $state('Kegiatan Racana');
  let formStatus = $state('published');
  let photoPreview = $state('');
  let isUploadingPhoto = $state(false);

  // Delete Confirmation State
  let showDeleteModal = $state(false);
  let deleteTarget = $state<AdminBeritaItem | null>(null);
  let isDeleting = $state(false);

  onMount(async () => {
    await loadBerita();
  });

  async function loadBerita() {
    isLoading = true;
    errorMessage = '';
    try {
      const res = await fetch('http://localhost:3000/api/berita?all=true&limit=100');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          beritaList = json.data;
        }
      } else {
        errorMessage = 'Gagal mengambil data warta berita dari server.';
      }
    } catch (err) {
      console.warn('Gagal koneksi ke backend API:', err);
      errorMessage = 'Backend API tidak terhubung. Menampilkan data lokal jika ada.';
    } finally {
      isLoading = false;
    }
  }

  function getTodayDateStr(): string {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function openCreateModal() {
    isEditing = false;
    editingId = null;
    formJudul = '';
    formFoto = '/images/berita/hero-lkpm-photo.jpg';
    photoPreview = '/images/berita/hero-lkpm-photo.jpg';
    formDeskripsi = '';
    formTanggal = getTodayDateStr();
    formKategori = 'Kegiatan Racana';
    formStatus = 'published';
    showModal = true;
  }

  function openEditModal(item: AdminBeritaItem) {
    isEditing = true;
    editingId = item.id;
    formJudul = item.judul;
    formFoto = item.gambarUtama || '';
    photoPreview = item.gambarUtama || '';
    formDeskripsi = item.konten || item.ringkasan || '';
    if (item.tanggalPublish) {
      try {
        const d = new Date(item.tanggalPublish);
        if (!isNaN(d.getTime())) {
          formTanggal = d.toISOString().split('T')[0];
        } else {
          formTanggal = getTodayDateStr();
        }
      } catch {
        formTanggal = getTodayDateStr();
      }
    } else {
      formTanggal = getTodayDateStr();
    }
    formKategori = item.kategori || 'Kegiatan Racana';
    formStatus = item.status || 'published';
    showModal = true;
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      isUploadingPhoto = true;

      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        photoPreview = base64Data;
        try {
          const res = await fetch('http://localhost:3000/api/berita/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: base64Data,
              filename: file.name,
            }),
          });
          if (res.ok) {
            const json = await res.json();
            if (json.success && json.data?.url) {
              formFoto = json.data.url;
            } else {
              formFoto = base64Data;
            }
          } else {
            formFoto = base64Data;
          }
        } catch {
          formFoto = base64Data;
        } finally {
          isUploadingPhoto = false;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  async function handleSaveBerita(e: SubmitEvent) {
    e.preventDefault();
    if (!formJudul.trim() || !formDeskripsi.trim()) {
      alert('Judul dan Deskripsi kegiatan wajib diisi.');
      return;
    }

    isSubmitting = true;
    errorMessage = '';
    successMessage = '';

    const payload = {
      judul: formJudul.trim(),
      deskripsi: formDeskripsi.trim(),
      konten: formDeskripsi.trim(),
      fotoKegiatan: formFoto || photoPreview || '/images/berita/hero-lkpm-photo.jpg',
      gambarUtama: formFoto || photoPreview || '/images/berita/hero-lkpm-photo.jpg',
      tanggal: formTanggal,
      tanggalPublish: formTanggal,
      kategori: formKategori,
      status: formStatus,
    };

    try {
      const url = isEditing
        ? `http://localhost:3000/api/berita/${editingId}`
        : 'http://localhost:3000/api/berita';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        successMessage = isEditing
          ? 'Berita kegiatan berhasil diperbarui!'
          : 'Berita kegiatan baru berhasil ditambahkan!';
        showModal = false;
        await loadBerita();
        setTimeout(() => (successMessage = ''), 4000);
      } else {
        const errorJson = await res.json().catch(() => ({}));
        alert(errorJson.message || 'Gagal menyimpan berita.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data ke backend.');
    } finally {
      isSubmitting = false;
    }
  }

  function confirmDelete(item: AdminBeritaItem) {
    deleteTarget = item;
    showDeleteModal = true;
  }

  async function executeDelete() {
    if (!deleteTarget) return;
    isDeleting = true;
    try {
      const res = await fetch(`http://localhost:3000/api/berita/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        successMessage = `Berita "${deleteTarget.judul}" berhasil dihapus.`;
        showDeleteModal = false;
        deleteTarget = null;
        await loadBerita();
        setTimeout(() => (successMessage = ''), 4000);
      } else {
        alert('Gagal menghapus berita.');
      }
    } catch (err) {
      alert('Gagal menghubungi backend untuk penghapusan.');
    } finally {
      isDeleting = false;
    }
  }

  let filteredList = $derived(
    beritaList.filter((item) => {
      const matchCat =
        selectedCategory === 'Semua' || item.kategori === selectedCategory;
      const matchQuery =
        !searchQuery ||
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.konten && item.konten.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.kategori && item.kategori.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    })
  );

  function formatDateId(dateStr: string | null) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }
</script>

<div class="crud-container">
  <!-- Toast Notifikasi Sukses -->
  {#if successMessage}
    <div class="toast-success">
      <svg viewBox="0 0 24 24" class="toast-icon" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <span>{successMessage}</span>
    </div>
  {/if}

  <!-- Header CRUD Khusus Berita -->
  <div class="crud-header-card">
    <div class="header-left">
      <div class="icon-title-wrap">
        <div class="icon-box">
          <svg viewBox="0 0 24 24" class="header-icon" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
          </svg>
        </div>
        <div>
          <h2 class="crud-title">CRUD Khusus: Berita &amp; Dokumentasi Kegiatan</h2>
          <p class="crud-subtitle">
            Kontrol penuh warta berita, dokumentasi foto kegiatan, judul, deskripsi, dan tanggal pelaksanaan.
          </p>
        </div>
      </div>
    </div>

    <div class="header-right">
      <button type="button" class="btn-create-gold" onclick={openCreateModal}>
        <svg viewBox="0 0 24 24" class="btn-icon" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        <span>Tambah Kegiatan Baru</span>
      </button>
    </div>
  </div>

  <!-- Filter & Search Toolbar -->
  <div class="toolbar-card">
    <div class="search-wrap">
      <svg viewBox="0 0 24 24" class="search-svg" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Cari judul berita, topik kegiatan, atau deskripsi..."
        class="search-input"
      />
    </div>

    <div class="category-pills">
      {#each categories as cat}
        <button
          type="button"
          class="pill-btn"
          class:active={selectedCategory === cat}
          onclick={() => (selectedCategory = cat)}
        >
          {cat}
        </button>
      {/each}
    </div>
  </div>

  <!-- Data Display: Card Grid -->
  {#if isLoading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Memuat data warta berita...</p>
    </div>
  {:else if filteredList.length === 0}
    <div class="empty-state">
      <div class="empty-icon-box">📰</div>
      <h3>Belum Ada Berita Kegiatan</h3>
      <p>Mulai tambahkan kegiatan pertama Anda dengan menekan tombol di bawah ini.</p>
      <button type="button" class="btn-create-gold" onclick={openCreateModal}>
        + Tambah Kegiatan Baru
      </button>
    </div>
  {:else}
    <div class="berita-grid">
      {#each filteredList as item (item.id)}
        <div class="news-card">
          <!-- Foto Kegiatan Thumbnail -->
          <div class="news-img-wrap">
            <img
              src={item.gambarUtama || '/images/berita/hero-lkpm-photo.jpg'}
              alt={item.judul}
              class="news-thumb"
              loading="lazy"
            />
            <span class="news-category-badge">{item.kategori || 'Kegiatan Racana'}</span>
            <span class="news-status-badge" class:draft={item.status === 'draft'}>
              {item.status === 'published' ? '● Published' : '○ Draft'}
            </span>
          </div>

          <!-- Content Body -->
          <div class="news-card-body">
            <!-- Tanggal -->
            <div class="news-meta-row">
              <span class="meta-date">
                <svg viewBox="0 0 24 24" class="date-icon" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"/>
                </svg>
                {formatDateId(item.tanggalPublish)}
              </span>
              <span class="meta-id">ID: #{item.id}</span>
            </div>

            <!-- Judul -->
            <h3 class="news-title" title={item.judul}>
              {item.judul}
            </h3>

            <!-- Deskripsi Preview -->
            <p class="news-desc">
              {item.konten || item.ringkasan || 'Tidak ada deskripsi.'}
            </p>

            <!-- Action Bar (CRUD) -->
            <div class="news-actions">
              <a
                href={`/berita/${item.slug}`}
                target="_blank"
                rel="noreferrer"
                class="btn-action view"
                title="Lihat di Web Publik"
              >
                <svg viewBox="0 0 24 24" class="action-icon" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span>Lihat</span>
              </a>

              <button
                type="button"
                class="btn-action edit"
                onclick={() => openEditModal(item)}
                title="Edit Kegiatan"
              >
                <svg viewBox="0 0 24 24" class="action-icon" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                <span>Edit</span>
              </button>

              <button
                type="button"
                class="btn-action delete"
                onclick={() => confirmDelete(item)}
                title="Hapus Kegiatan"
              >
                <svg viewBox="0 0 24 24" class="action-icon" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- MODAL FORM: TAMBAH & EDIT BERITA -->
  {#if showModal}
    <div class="modal-overlay" onclick={() => (showModal = false)}>
      <div class="modal-card" onclick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <div class="modal-title-wrap">
            <span class="modal-badge">{isEditing ? 'Mode Sunting' : 'Mode Tambah'}</span>
            <h3>{isEditing ? 'Edit Warta Berita & Kegiatan' : 'Tambah Warta Berita Kegiatan Baru'}</h3>
          </div>
          <button type="button" class="btn-close-modal" onclick={() => (showModal = false)}>✕</button>
        </div>

        <form onsubmit={handleSaveBerita} class="modal-body-form">
          <!-- 1. FOTO KEGIATAN -->
          <div class="form-group">
            <label class="form-label" for="foto-upload">
              Foto Kegiatan <span class="required-star">*</span>
            </label>
            <div class="photo-upload-container">
              <div class="photo-preview-box">
                {#if photoPreview}
                  <img src={photoPreview} alt="Preview Foto Kegiatan" class="preview-img" />
                {:else}
                  <div class="no-photo-placeholder">
                    <svg viewBox="0 0 24 24" class="ph-icon" fill="currentColor">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    <span>Belum ada foto kegiatan dipilih</span>
                  </div>
                {/if}
              </div>

              <div class="photo-controls">
                <label class="btn-file-select" for="foto-file-input">
                  <svg viewBox="0 0 24 24" class="upload-icon" fill="currentColor">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                  </svg>
                  <span>{isUploadingPhoto ? 'Mengunggah...' : 'Pilih Foto dari Komputer'}</span>
                </label>
                <input
                  id="foto-file-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  class="hidden-file-input"
                  onchange={handleFileChange}
                />
                <span class="photo-help-text">
                  Format didukung: JPG, PNG, WEBP.
                </span>

                <!-- URL Alternatif -->
                <div class="url-input-wrap">
                  <span class="url-label">Atau Path / URL Foto:</span>
                  <input
                    type="text"
                    bind:value={formFoto}
                    oninput={() => (photoPreview = formFoto)}
                    placeholder="/images/berita/hero-lkpm-photo.jpg atau https://..."
                    class="input-text url-field"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 2. JUDUL KEGIATAN -->
          <div class="form-group">
            <label class="form-label" for="news-title">
              Judul Kegiatan <span class="required-star">*</span>
            </label>
            <input
              id="news-title"
              type="text"
              bind:value={formJudul}
              placeholder="Contoh: Penerimaan Anggota Baru Racana Dewa Raja – Batari 2026/2027"
              class="input-text"
              required
            />
          </div>

          <!-- ROW: TANGGAL & KATEGORI -->
          <div class="form-row-2">
            <!-- 3. TANGGAL KEGIATAN -->
            <div class="form-group">
              <label class="form-label" for="news-date">
                Tanggal Kegiatan / Publish <span class="required-star">*</span>
              </label>
              <input
                id="news-date"
                type="date"
                bind:value={formTanggal}
                class="input-text"
                required
              />
            </div>

            <!-- KATEGORI -->
            <div class="form-group">
              <label class="form-label" for="news-cat">
                Kategori Berita
              </label>
              <select id="news-cat" bind:value={formKategori} class="input-select">
                <option value="Kegiatan Racana">Kegiatan Racana</option>
                <option value="Penerimaan Anggota">Penerimaan Anggota</option>
                <option value="Kegiatan Ilmiah">Kegiatan Ilmiah</option>
                <option value="Latihan Rutin">Latihan Rutin</option>
                <option value="Pengabdian">Pengabdian</option>
              </select>
            </div>
          </div>

          <!-- 4. DESKRIPSI KEGIATAN -->
          <div class="form-group">
            <label class="form-label" for="news-desc">
              Deskripsi Lengkap Kegiatan <span class="required-star">*</span>
            </label>
            <textarea
              id="news-desc"
              bind:value={formDeskripsi}
              rows="6"
              placeholder="Tuliskan detail pelaksanaan kegiatan, tujuan, peserta, dokumentasi, dan hasil yang dicapai..."
              class="input-textarea"
              required
            ></textarea>
            <span class="field-hint">Mendukung banyak paragraf. Tekan Enter untuk membuat baris/paragraf baru.</span>
          </div>

          <!-- STATUS PUBLISH -->
          <div class="form-group">
            <label class="form-label" for="news-status">Status Publikasi</label>
            <select id="news-status" bind:value={formStatus} class="input-select">
              <option value="published">Publikasikan Langsung (Published)</option>
              <option value="draft">Simpan Sebagai Draf (Draft)</option>
            </select>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn-modal-cancel"
              onclick={() => (showModal = false)}
            >
              Batal
            </button>
            <button
              type="submit"
              class="btn-modal-submit"
              disabled={isSubmitting || isUploadingPhoto}
            >
              {#if isSubmitting}
                Menyimpan...
              {:else}
                {isEditing ? 'Simpan Perubahan' : 'Simpan & Publikasikan'}
              {/if}
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}

  <!-- MODAL KONFIRMASI HAPUS -->
  {#if showDeleteModal && deleteTarget}
    <div class="modal-overlay" onclick={() => (showDeleteModal = false)}>
      <div class="modal-delete-card" onclick={(e) => e.stopPropagation()}>
        <div class="delete-icon-box">🗑️</div>
        <h3>Konfirmasi Hapus Berita</h3>
        <p>
          Apakah Anda yakin ingin menghapus berita:
          <br />
          <strong>"{deleteTarget.judul}"</strong>?
        </p>
        <p class="delete-warning">Tindakan ini permanen dan akan menghapus data dari halaman publik.</p>

        <div class="delete-actions">
          <button
            type="button"
            class="btn-modal-cancel"
            onclick={() => (showDeleteModal = false)}
            disabled={isDeleting}
          >
            Batal
          </button>
          <button
            type="button"
            class="btn-modal-danger"
            onclick={executeDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Menghapus...' : 'Ya, Hapus Sekarang'}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .crud-container {
    width: 100%;
    margin-top: 1rem;
    position: relative;
  }

  .toast-success {
    position: sticky;
    top: 1rem;
    z-index: 100;
    background: #10b981;
    color: #ffffff;
    padding: 0.85rem 1.4rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
    font-weight: 700;
    margin-bottom: 1.5rem;
    animation: fadeIn 0.3s ease;
  }

  .toast-icon {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  /* Header Card */
  .crud-header-card {
    background: #270e42;
    border: 1px solid rgba(254, 187, 43, 0.3);
    border-radius: 18px;
    padding: 1.6rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    box-shadow: 0 12px 28px rgba(18, 6, 36, 0.25);
    margin-bottom: 1.5rem;
  }

  .icon-title-wrap {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .icon-box {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: #febb2b;
    color: #1f0a38;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .header-icon {
    width: 28px;
    height: 28px;
  }

  .crud-title {
    font-size: 1.45rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 0.3rem;
  }

  .crud-subtitle {
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.75);
    margin: 0;
  }

  .btn-create-gold {
    background: #febb2b;
    color: #1f0a38;
    border: none;
    font-weight: 800;
    font-size: 0.95rem;
    padding: 0.8rem 1.4rem;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(254, 187, 43, 0.35);
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .btn-create-gold:hover {
    background: #fca311;
    transform: translateY(-2px);
  }

  .btn-icon {
    width: 20px;
    height: 20px;
  }

  /* Toolbar Card */
  .toolbar-card {
    background: #ffffff;
    border-radius: 14px;
    padding: 1.1rem 1.4rem;
    margin-bottom: 1.8rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }

  .search-wrap {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    background: #f3f4f6;
    padding: 0.6rem 1rem;
    border-radius: 10px;
    flex: 1;
    min-width: 280px;
  }

  .search-svg {
    width: 20px;
    height: 20px;
    color: #6b7280;
  }

  .search-input {
    border: none;
    background: transparent;
    font-size: 0.9rem;
    color: #111827;
    width: 100%;
    outline: none;
  }

  .category-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .pill-btn {
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    color: #4b5563;
    font-size: 0.82rem;
    font-weight: 600;
    padding: 0.4rem 0.9rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pill-btn:hover {
    border-color: #febb2b;
    color: #1f0a38;
  }

  .pill-btn.active {
    background: #270e42;
    color: #febb2b;
    border-color: #270e42;
    font-weight: 800;
  }

  /* Grid of Cards */
  .berita-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.6rem;
  }

  .news-card {
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .news-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }

  .news-img-wrap {
    width: 100%;
    height: 190px;
    position: relative;
    background: #270e42;
    overflow: hidden;
  }

  .news-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .news-category-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(39, 14, 66, 0.88);
    color: #febb2b;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    letter-spacing: 0.02em;
    backdrop-filter: blur(6px);
  }

  .news-status-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #10b981;
    color: #ffffff;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 0.3rem 0.65rem;
    border-radius: 6px;
  }

  .news-status-badge.draft {
    background: #6b7280;
  }

  .news-card-body {
    padding: 1.3rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .news-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.6rem;
    font-size: 0.8rem;
    color: #6b7280;
  }

  .meta-date {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
    color: #4b5563;
  }

  .date-icon {
    width: 15px;
    height: 15px;
    color: #febb2b;
  }

  .meta-id {
    font-size: 0.75rem;
    font-weight: 700;
    color: #9ca3af;
  }

  .news-title {
    font-size: 1.08rem;
    font-weight: 800;
    color: #1f0a38;
    line-height: 1.4;
    margin: 0 0 0.6rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .news-desc {
    font-size: 0.86rem;
    color: #4b5563;
    line-height: 1.55;
    margin: 0 0 1.2rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  .news-actions {
    display: flex;
    gap: 0.6rem;
    border-top: 1px solid #f3f4f6;
    padding-top: 0.9rem;
  }

  .btn-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.45rem 0.8rem;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.15s ease;
    flex: 1;
  }

  .btn-action.view {
    background: #f3f4f6;
    color: #374151;
  }
  .btn-action.view:hover {
    background: #e5e7eb;
    color: #111827;
  }

  .btn-action.edit {
    background: #eff6ff;
    color: #1d4ed8;
  }
  .btn-action.edit:hover {
    background: #dbeafe;
  }

  .btn-action.delete {
    background: #fef2f2;
    color: #dc2626;
  }
  .btn-action.delete:hover {
    background: #fee2e2;
  }

  .action-icon {
    width: 15px;
    height: 15px;
  }

  /* Modal Form */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(18, 6, 36, 0.7);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .modal-card {
    background: #ffffff;
    width: 100%;
    max-width: 680px;
    max-height: 90vh;
    border-radius: 20px;
    overflow-y: auto;
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.3);
    animation: scaleUp 0.25s ease;
  }

  .modal-header {
    background: #270e42;
    color: #ffffff;
    padding: 1.4rem 1.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-badge {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 800;
    color: #febb2b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.2rem;
  }

  .modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 800;
  }

  .btn-close-modal {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: none;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-close-modal:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .modal-body-form {
    padding: 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }

  .form-label {
    font-size: 0.88rem;
    font-weight: 700;
    color: #1f0a38;
  }

  .required-star {
    color: #ef4444;
  }

  .input-text, .input-select, .input-textarea {
    border: 1.5px solid #d1d5db;
    border-radius: 10px;
    padding: 0.7rem 0.95rem;
    font-size: 0.92rem;
    color: #111827;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s ease;
  }

  .input-text:focus, .input-select:focus, .input-textarea:focus {
    border-color: #febb2b;
    box-shadow: 0 0 0 3px rgba(254, 187, 43, 0.2);
  }

  .field-hint {
    font-size: 0.78rem;
    color: #6b7280;
  }

  /* Photo Upload Container */
  .photo-upload-container {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 1.2rem;
    align-items: center;
    background: #f9fafb;
    border: 1.5px dashed #d1d5db;
    border-radius: 14px;
    padding: 1rem;
  }

  .photo-preview-box {
    width: 100%;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    background: #270e42;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-photo-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    font-size: 0.72rem;
    text-align: center;
    padding: 0.5rem;
  }

  .ph-icon {
    width: 28px;
    height: 28px;
    margin-bottom: 0.3rem;
  }

  .photo-controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-file-select {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #270e42;
    color: #febb2b;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.55rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    width: fit-content;
    transition: opacity 0.2s ease;
  }

  .btn-file-select:hover {
    opacity: 0.9;
  }

  .upload-icon {
    width: 18px;
    height: 18px;
  }

  .hidden-file-input {
    display: none;
  }

  .photo-help-text {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .url-input-wrap {
    margin-top: 0.3rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .url-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #4b5563;
  }

  .url-field {
    font-size: 0.8rem;
    padding: 0.45rem 0.7rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
    margin-top: 0.8rem;
    border-top: 1px solid #f3f4f6;
    padding-top: 1.2rem;
  }

  .btn-modal-cancel {
    background: #f3f4f6;
    color: #4b5563;
    border: none;
    padding: 0.65rem 1.3rem;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .btn-modal-cancel:hover {
    background: #e5e7eb;
  }

  .btn-modal-submit {
    background: #270e42;
    color: #febb2b;
    border: none;
    padding: 0.65rem 1.6rem;
    border-radius: 10px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-modal-submit:hover:not(:disabled) {
    background: #1b0730;
    transform: translateY(-1px);
  }

  .btn-modal-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Modal Delete */
  .modal-delete-card {
    background: #ffffff;
    width: 100%;
    max-width: 440px;
    border-radius: 18px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    animation: scaleUp 0.2s ease;
  }

  .delete-icon-box {
    font-size: 2.8rem;
    margin-bottom: 0.6rem;
  }

  .modal-delete-card h3 {
    font-size: 1.3rem;
    font-weight: 800;
    color: #1f0a38;
    margin: 0 0 0.8rem;
  }

  .delete-warning {
    font-size: 0.8rem;
    color: #dc2626;
    margin-top: 0.6rem;
    font-weight: 600;
  }

  .delete-actions {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 1.6rem;
  }

  .btn-modal-danger {
    background: #dc2626;
    color: #ffffff;
    border: none;
    padding: 0.65rem 1.4rem;
    border-radius: 10px;
    font-weight: 800;
    cursor: pointer;
  }

  .btn-modal-danger:hover:not(:disabled) {
    background: #b91c1c;
  }

  /* Loading & Empty States */
  .loading-state, .empty-state {
    background: #ffffff;
    border-radius: 16px;
    padding: 3.5rem 2rem;
    text-align: center;
    color: #4b5563;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }

  .empty-icon-box {
    font-size: 3rem;
    margin-bottom: 0.8rem;
  }

  .empty-state h3 {
    color: #1f0a38;
    font-size: 1.3rem;
    font-weight: 800;
    margin: 0 0 0.5rem;
  }

  .empty-state p {
    margin: 0 0 1.4rem;
    color: #6b7280;
  }

  .spinner {
    width: 36px;
    height: 36px;
    border: 3.5px solid #f3f4f6;
    border-top-color: #febb2b;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .crud-header-card {
      flex-direction: column;
      align-items: flex-start;
      padding: 1.3rem;
    }
    .form-row-2 {
      grid-template-columns: 1fr;
    }
    .photo-upload-container {
      grid-template-columns: 1fr;
    }
  }
</style>
