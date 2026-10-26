<script lang="ts">
  import Breadcrumb from '#lib/components/ui/Breadcrumb.svelte';
  import PengurusCard, { type PengurusItem } from '#lib/components/struktur/PengurusCard.svelte';

  const breadcrumbs = [
    { label: 'Struktur Organisasi' },
  ];

  const pembinaList: PengurusItem[] = [
    {
      nama: 'Dr. Suaedi, M.Si.',
      jabatan: 'Ketua Mabigus (Direktur Politeknik)',
      tingkatan: 'Pembina Utama Pangkalan',
      kutipan: 'Kepramukaan membentuk sarjana terampil yang menjunjung etika dan pengabdian.',
    },
    {
      nama: 'Kak Askar, S.Kom., M.Kom.',
      jabatan: 'Pembina Gugus Depan 04.017 (Putra)',
      tingkatan: 'Pembina Mahir Dewasa',
      kutipan: 'Disiplin dan loyalitas adalah nafas pergerakan pandega.',
    },
    {
      nama: 'Kak Nurhafizah, S.Pd., M.Pd.',
      jabatan: 'Pembina Gugus Depan 04.018 (Putri)',
      tingkatan: 'Pembina Mahir Dewasa',
      kutipan: 'Kemandirian sejati bermula dari ketulusan berbakti.',
    },
  ];

  const pimpinanHarian: PengurusItem[] = [
    {
      nama: 'Muh. Rifqi Ramadhan',
      jabatan: 'Ketua Dewan Racana Putra',
      racana: 'Dewa Raja',
      programStudi: 'Teknologi Informasi',
      angkatan: '2023',
      tingkatan: 'Pandega',
      kutipan: 'Memimpin dengan keteladanan watak kesatria Luwu.',
    },
    {
      nama: 'Nurul Qolbi',
      jabatan: 'Ketua Dewan Racana Putri',
      racana: 'Batari',
      programStudi: 'Akuntansi Komputer',
      angkatan: '2023',
      tingkatan: 'Pandega',
      kutipan: 'Menjaga marwah adat dan merajut persaudaraan ikhlas beramal.',
    },
  ];

  const pengurusHarian: PengurusItem[] = [
    {
      nama: 'Andi Fauzan',
      jabatan: 'Pemangku Adat Putra',
      racana: 'Dewa Raja',
      programStudi: 'Teknik Mesin',
      angkatan: '2024',
      tingkatan: 'Pandega',
    },
    {
      nama: 'Siti Rahmawati',
      jabatan: 'Pemangku Adat Putri',
      racana: 'Batari',
      programStudi: 'Teknologi Informasi',
      angkatan: '2024',
      tingkatan: 'Pandega',
    },
    {
      nama: 'Ahmad Faisal',
      jabatan: 'Kerani (Sekretaris)',
      racana: 'Dewa Raja',
      programStudi: 'Administrasi Bisnis',
      angkatan: '2024',
      tingkatan: 'Pandega',
    },
    {
      nama: 'Dina Lestari',
      jabatan: 'Juru Uang (Bendahara)',
      racana: 'Batari',
      programStudi: 'Akuntansi Komputer',
      angkatan: '2024',
      tingkatan: 'Pandega',
    },
  ];
</script>

<svelte:head>
  <title>Struktur Kepengurusan — Racana Dewa Raja – Batari</title>
  <meta name="description" content="Susunan organisasi kepengurusan UKM Pramuka Politeknik Dewantara Palopo masa bakti aktif." />
</svelte:head>

<div class="page-struktur">
  <div class="container">
    <Breadcrumb items={breadcrumbs} />

    <!-- 1. HEADER HALAMAN -->
    <header class="struktur-header">
      <span class="badge-pill">⚖ Kepengurusan Racana</span>
      <h1 class="page-title">Struktur Organisasi Racana Dewa Raja &ndash; Batari</h1>
      <p class="header-subtitle">
        Dewan Racana masa bakti aktif 2026/2027 Gugus Depan 04.017 &ndash; 04.018 Pangkalan Politeknik Dewantara Palopo.
      </p>
    </header>

    <!-- 2. PEMBINA GUGUS DEPAN -->
    <section class="struktur-level-section">
      <div class="level-header">
        <span class="badge-purple">Penasihat &amp; Majelis Pembimbing</span>
        <h2 class="level-title">Pembina Gugus Depan</h2>
      </div>

      <div class="grid-pembina">
        {#each pembinaList as item}
          <PengurusCard {item} />
        {/each}
      </div>
    </section>

    <!-- 3. PIMPINAN HARIAN (KDR) -->
    <section class="struktur-level-section">
      <div class="level-header">
        <span class="badge-pill">Garis Komando Utama</span>
        <h2 class="level-title">Pimpinan Dewan Racana</h2>
        <p class="level-desc">Ketua Dewan Racana Putra dan Putri mengoordinasikan seluruh gerak operasional dan mandat adat.</p>
      </div>

      <div class="grid-pimpinan">
        {#each pimpinanHarian as item}
          <PengurusCard {item} isLeader={true} />
        {/each}
      </div>
    </section>

    <!-- 4. PENGURUS HARIAN -->
    <section class="struktur-level-section">
      <div class="level-header">
        <span class="badge-purple">Aparatur Dewan</span>
        <h2 class="level-title">Pengurus Harian &amp; Adat</h2>
      </div>

      <div class="grid-pengurus-harian">
        {#each pengurusHarian as item}
          <PengurusCard {item} />
        {/each}
      </div>
    </section>

    <!-- 5. DIVISI PELAKSANA MANDAT -->
    <section class="struktur-level-section">
      <div class="level-header">
        <span class="badge-pill">Divisi Pelaksana Mandat</span>
        <h2 class="level-title">Bidang Operasional &amp; Pengembangan</h2>
        <p class="level-desc">Motor penggerak kegiatan kepramukaan, pelatihan, pengabdian, dan kemitraan masyarakat.</p>
      </div>

      <div class="grid-divisi">
        <!-- DIVISI I -->
        <div class="divisi-card">
          <div class="divisi-badge">DIVISI I &bull; KEILMUAN &amp; EVALUASI</div>
          <h3 class="divisi-title">Bidang Kepramukaan, Kajian &amp; Evaluasi</h3>
          
          <div class="divisi-koordinator-box">
            <span class="koor-label">Koordinator Bidang:</span>
            <strong class="koor-name">Nurul Ilma</strong>
          </div>

          <div class="divisi-block">
            <h4 class="block-title">Anggota Bidang:</h4>
            <p class="anggota-names">Desnita, Hermawati, Fhina, Suci Ramadhani, Marzyah Rusdianmurtin</p>
          </div>

          <div class="divisi-block">
            <h4 class="block-title">Fokus Tugas Pokok:</h4>
            <ul class="tugas-list">
              <li>Latihan rutin kepramukaan per minggu di pangkalan kampus.</li>
              <li>Ekspedisi alam terbuka, navigasi darat, survival, &amp; SAR.</li>
              <li>Manajemen logistik perlengkapan dan perkemahan racana.</li>
            </ul>
          </div>

          <div class="divisi-contact">
            <span class="contact-label">Email Koordinasi:</span>
            <a href="mailto:divisi1.pramuka@polidewa.ac.id" class="contact-email">divisi1.pramuka@polidewa.ac.id</a>
          </div>
        </div>

        <!-- DIVISI II -->
        <div class="divisi-card">
          <div class="divisi-badge">DIVISI II &bull; PENGABDIAN MASYARAKAT</div>
          <h3 class="divisi-title">Bidang Pengabdian Masyarakat, Pengembangan &amp; Humas</h3>
          
          <div class="divisi-koordinator-box">
            <span class="koor-label">Koordinator Bidang:</span>
            <strong class="koor-name">Nurul Fitrah Amalya</strong>
          </div>

          <div class="divisi-block">
            <h4 class="block-title">Anggota Bidang:</h4>
            <p class="anggota-names">Putri Wahyuni, Sitti Soffiya, Rabbayani, Audi, Sumarni</p>
          </div>

          <div class="divisi-block">
            <h4 class="block-title">Fokus Tugas Pokok:</h4>
            <ul class="tugas-list">
              <li>Kursus Instruktur Muda &amp; Kursus Mahir Dasar (KMD).</li>
              <li>Pengujian SKU Pandega &amp; sertifikasi SKK Kejuruan Khusus.</li>
              <li>Loka kerja kepemimpinan pemuda, bakti desa binaan, &amp; humas.</li>
            </ul>
          </div>

          <div class="divisi-contact">
            <span class="contact-label">Email Koordinasi:</span>
            <a href="mailto:divisi2.pramuka@polidewa.ac.id" class="contact-email">divisi2.pramuka@polidewa.ac.id</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. REGENERASI CTA -->
    <section class="section-regenerasi">
      <div class="regenerasi-box">
        <span class="badge-pill">🌱 Regenerasi Kepemimpinan Kampus</span>
        <h2 class="regen-title">Siap Menjadi Pemimpin Pramuka Polidewa Selanjutnya?</h2>
        <p class="regen-desc">
          Setiap generasi melahirkan pemimpin baru. Bergabunglah bersama kami untuk mengasah ketajaman pikir, ketegasan sikap, dan empati sosial.
        </p>
        <div class="regen-buttons">
          <a href="/pendaftaran" class="btn-primary-regen">
            Daftar Calon Anggota Racana &rarr;
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="btn-secondary-regen">
            Tanya Kakak Racana
          </a>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .page-struktur {
    padding-bottom: 6rem;
  }

  .struktur-header {
    text-align: center;
    max-width: 800px;
    margin: 2rem auto 4.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .page-title {
    font-size: 2.8rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .header-subtitle {
    font-size: 1.05rem;
    color: var(--color-text-secondary);
  }

  .struktur-level-section {
    margin-bottom: 5rem;
  }

  .level-header {
    text-align: center;
    max-width: 650px;
    margin: 0 auto 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .level-title {
    font-size: 1.85rem;
    font-weight: 800;
    color: #ffffff;
  }

  .level-desc {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
  }

  .grid-pembina {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .grid-pimpinan {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
    max-width: 850px;
    margin: 0 auto;
  }

  .grid-pengurus-harian {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  /* Divisi */
  .grid-divisi {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  .divisi-card {
    background: #1c0e33;
    border: 1px solid var(--color-primary-border);
    border-radius: var(--radius-xl);
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    border-top: 4px solid var(--color-accent-gold);
    transition: transform var(--transition-normal);
  }

  .divisi-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  }

  .divisi-badge {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--color-accent-gold-light);
    margin-bottom: 0.5rem;
  }

  .divisi-title {
    font-size: 1.35rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.3;
    margin-bottom: 1.5rem;
  }

  .divisi-koordinator-box {
    background: rgba(14, 5, 28, 0.7);
    padding: 0.85rem 1.2rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-primary-border);
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .koor-label {
    font-size: 0.82rem;
    color: var(--color-text-muted);
  }

  .koor-name {
    font-size: 1rem;
    color: var(--color-accent-gold);
  }

  .divisi-block {
    margin-bottom: 1.5rem;
  }

  .block-title {
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-white);
    margin-bottom: 0.5rem;
  }

  .anggota-names {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }

  .tugas-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.88rem;
    color: var(--color-text-secondary);
  }

  .tugas-list li {
    position: relative;
    padding-left: 1.25rem;
  }

  .tugas-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--color-accent-gold);
    font-weight: bold;
  }

  .divisi-contact {
    margin-top: auto;
    padding-top: 1.25rem;
    border-top: 1px solid var(--color-primary-border-soft);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .contact-label {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .contact-email {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--color-accent-gold);
  }

  .contact-email:hover {
    text-decoration: underline;
  }

  /* Regenerasi CTA */
  .section-regenerasi {
    margin-top: 2rem;
  }

  .regenerasi-box {
    background: radial-gradient(circle at 50% 50%, #2e1552 0%, #17092c 100%);
    border: 2px solid var(--color-accent-gold);
    border-radius: var(--radius-xl);
    padding: 3.5rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .regen-title {
    font-size: 2rem;
    font-weight: 900;
    color: #ffffff;
    max-width: 650px;
    line-height: 1.25;
  }

  .regen-desc {
    font-size: 1rem;
    color: var(--color-text-secondary);
    max-width: 600px;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .regen-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .btn-primary-regen {
    padding: 0.85rem 1.8rem;
    background: var(--color-accent-gold);
    color: #18092c;
    font-weight: 800;
    border-radius: var(--radius-full);
    font-size: 0.95rem;
    box-shadow: 0 4px 16px rgba(240, 192, 64, 0.35);
  }

  .btn-secondary-regen {
    padding: 0.85rem 1.6rem;
    border: 1px solid var(--color-primary-border);
    color: #ffffff;
    font-weight: 700;
    border-radius: var(--radius-full);
    font-size: 0.95rem;
  }

  /* Responsive */
  @media (max-width: 992px) {
    .grid-pembina {
      grid-template-columns: 1fr;
      max-width: 450px;
      margin: 0 auto;
    }

    .grid-pengurus-harian {
      grid-template-columns: 1fr 1fr;
    }

    .grid-divisi {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .page-title {
      font-size: 2rem;
    }

    .grid-pimpinan {
      grid-template-columns: 1fr;
    }

    .grid-pengurus-harian {
      grid-template-columns: 1fr;
      max-width: 400px;
      margin: 0 auto;
    }
  }
</style>
