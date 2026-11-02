<script lang="ts">
  import { onMount } from 'svelte';
  import Breadcrumb from '#lib/components/ui/Breadcrumb.svelte';

  const breadcrumbs = [
    { label: 'Struktur Racana' },
  ];

  // Data Pembina (Tingkat Penasihat & Pengarah)
  let pembinaList = $state([
    {
      nama: 'Dr. Suaedi, S.Pd., M.Si.',
      jabatan: 'Kamabigus Pramuka Politeknik Dewantara',
      avatarColor: 'purple',
      deskripsi: 'Penanggung jawab tertinggi pembinaan kepanduan kampus, pemberian kebijakan kepemimpinan karakter mahasiswa berdaya saing global.',
    },
    {
      nama: 'Muh. Fikra Nur Asri S.Kom., M.Kom.',
      jabatan: 'Pembina Dewa Raja',
      avatarColor: 'purple',
      deskripsi: 'Mengampu pembinaan kecakapan mental, manajemen lapangan, survival, serta sertifikasi keahlian teknologi kepanduan mahasiswa putra.',
    },
    {
      nama: 'Nurul Qisti',
      jabatan: 'Pembina Batari',
      avatarColor: 'gold',
      deskripsi: 'Mengawal kaderisasi dan penegakan tata nilai keputrian, pembinaan keterampilan wirausaha, serta relasi kemitraan bakti masyarakat.',
    },
  ]);

  // Data Pimpinan Inti Racana (Dwitunggal)
  let pradanaPutra = $state({
    nama: 'Nabil',
    jabatan: 'Ketua Dewan Racana Putra (Pradana Putra)',
    racana: 'Racana Dewa Raja • 04.017',
    label: 'PUTRA',
    foto: '/images/beranda/collage/member_2.png',
    kutipan: 'Menjadikan Dewa Raja kawah candradimuka kepemimpinan kesatria yang berkarakter santun dan solutif.',
    jurusan: 'Teknologi Rekayasa Perangkat Lunak \'21',
    status: 'Pandega Aktif',
  });

  let pradanaPutri = $state({
    nama: 'Sukni',
    jabatan: 'Ketua Dewan Racana Putri (Pradana Putri)',
    racana: 'Racana Batari • 04.018',
    label: 'PUTRI',
    foto: '/images/beranda/collage/member_4.png',
    kutipan: 'Membangun dedikasi kepanduan Batari yang mandiri, adaptif, dan menebar kemanfaatan sosial nyata.',
    jurusan: 'Teknologi Rekayasa Perangkat Lunak \'21',
    status: 'Pandega Aktif',
  });

  // Data Pengurus Harian
  let pengurusHarian = $state([
    {
      kategori: 'Pemangku Adat',
      badge: 'Dewa Raja',
      nama: 'Ujang Miftahuddin',
      jabatan: 'Pemangku Adat Pa',
      foto: '/images/beranda/collage/member_7.png',
      deskripsi: 'Mengawal pelaksanaan Sandi Racana, tata tertib adat musyawarah, dan sidang dewan kehormatan adat putra.',
      masaBakti: 'Masa Bakti 2025/2026',
    },
    {
      kategori: 'Pemangku Adat',
      badge: 'Batari',
      nama: 'Nurul Fadilah',
      jabatan: 'Pemangku Adat Pi',
      foto: '/images/beranda/collage/member_6.png',
      deskripsi: 'Memelihara keluhuran etika adat pusaka Batari, pembinaan adab keputrian, dan keharmonisan internal racana.',
      masaBakti: 'Masa Bakti 2025/2026',
    },
    {
      kategori: 'Sekretariat',
      badge: 'Gabungan',
      nama: 'Naila Zulaikhah',
      jabatan: '(Sekretaris)',
      foto: '/images/beranda/collage/member_8.png',
      deskripsi: 'Mengelola korespondensi dinas, buku induk anggota, pengarsipan SK dewan racana, dan notulensi musyawarah.',
      masaBakti: 'Masa Bakti 2025/2026',
    },
    {
      kategori: 'Perbendaharaan',
      badge: 'Gabungan',
      nama: 'Aylah Asqaputri',
      jabatan: '(Bendahara)',
      avatarGold: true,
      deskripsi: 'Memegang tata kelola kas organisasi, penyusunan RAB program kerja, laporan akuntabilitas dana iuran & hibah kampus.',
      masaBakti: 'Masa Bakti 2025/2026',
    },
  ]);

  // Data Divisi Pelaksana Mandat
  let divisiList = $state([
    {
      id: 1,
      divisiLabel: 'DIVISI I',
      nama: 'Keilmuan & Evaluasi | Bidang Kepramukaan, Kajian & Evaluasi',
      koordinator: 'Nurul Ilma',
      anggota: 'Desnita, Hermawati, Fhina, Suci Ramadhani, Marzyah Rusdianmurtin',
      fokusTugas: [
        'Latihan rutin kepramukaan per minggu',
        'Ekspedisi alam, navigasi darat & SAR',
        'Manajemen logistik perkemahan racana',
      ],
      email: 'divisi1.pramuka@polidewa.ac.id',
    },
    {
      id: 2,
      divisiLabel: 'DIVISI II',
      nama: 'Pengabdian Masyarakat / Pengembangan | Bidang pengabdian Masyarakat, Pengembangan & Humas',
      koordinator: 'Nurul Fitrah Amalya',
      anggota: 'Putri Wahyuni, Sitti Soffiya, Rabbayani, Audi, Sumarni',
      fokusTugas: [
        'Kursus Instruktur Muda & KMD',
        'Pengujian SKU Pandega & SKK Khusus',
        'Loka karya kepemimpinan mahasiswa',
      ],
      email: 'divisi2.pramuka@polidewa.ac.id',
    },
  ]);

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/struktur');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          // If backend has enriched data, we can optionally merge properties
          console.log('[OK] Struktur data loaded from backend API');
        }
      }
    } catch (e) {
      console.warn('Backend API offline, menggunakan data offline sesuai desain.');
    }
  });
</script>

<svelte:head>
  <title>Struktur Organisasi Dewan Racana — Pramuka Polidewa</title>
  <meta name="description" content="Struktur Organisasi Dewan Racana Dewa Raja – Batari Politeknik Dewantara Palopo Masa Bakti 2025/2026." />
</svelte:head>

<div class="page-struktur">
  <div class="container">
    <Breadcrumb items={breadcrumbs} />

    <!-- ======================================================================
         1. TOP HEADER HERO CARD
         ====================================================================== -->
    <header class="header-card">
      <div class="header-badge-row">
        <span class="pill-badge">
          <svg viewBox="0 0 24 24" class="badge-icon" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          Bagan Kepengurusan Dewan &nbsp;|&nbsp; Gudep 04.017 &ndash; 04.018
        </span>
      </div>

      <h1 class="header-title">Struktur Organisasi Dewan Racana</h1>

      <p class="header-desc">
        Bagan Kepengurusan Dewan Racana Dewa Raja &ndash; Batari Masa Bakti 2025/2026 Gugus Depan
        04.017 &ndash; 04.018 Pangkalan Politeknik Dewantara Palopo. Wadah kepemimpinan, kepekaan
        sosial, tanggung jawab, dan dedikasi pandega perguruan tinggi.
      </p>

      <div class="header-meta-row">
        <div class="meta-item">
          <span class="meta-bullet">&bull;</span>
          <span>Masa Bakti Aktif (2025/2026)</span>
        </div>
        <div class="meta-item">
          <span class="meta-bullet">&bull;</span>
          <span>Struktur Adat &amp; Pembina</span>
        </div>
        <div class="meta-item verified">
          <svg viewBox="0 0 20 20" fill="currentColor" class="check-icon">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span>Ditetapkan melalui Musyawarah Pandega 9 Mei 2025</span>
        </div>
      </div>
    </header>

    <!-- ======================================================================
         2. SECTION TINGKAT PENASIHAT & PENGARAH
         ====================================================================== -->
    <section class="section-pembina">
      <div class="section-header-row">
        <div>
          <span class="gold-subtitle">TINGKAT PENASIHAT &amp; PENGARAH</span>
          <h2 class="section-heading">Majelis Pembimbing &amp; Pembina Gugus Depan</h2>
        </div>
        <div class="pangkalan-tag">
          Pangkalan Politeknik Dewantara Palopo
        </div>
      </div>

      <div class="grid-pembina">
        {#each pembinaList as item}
          <div class="card-white pembina-card">
            <div class="pembina-avatar-wrap">
              <div class="pembina-avatar {item.avatarColor}">
                <svg viewBox="0 0 24 24" class="avatar-svg" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>

            <h3 class="pembina-name">{item.nama}</h3>
            <p class="pembina-jabatan">{item.jabatan}</p>
            <p class="pembina-desc">{item.deskripsi}</p>
          </div>
        {/each}
      </div>

      <!-- Centered Gold Connector Pill -->
      <div class="connector-row">
        <button class="gold-connector-pill" type="button">
          <svg viewBox="0 0 24 24" class="connector-icon" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
          </svg>
          <span>Garis Koordinasi &amp; Pengesahan Dewan Racana</span>
        </button>
      </div>
    </section>

    <!-- ======================================================================
         3. SECTION PIMPINAN HARIAN DEWAN RACANA
         ====================================================================== -->
    <section class="section-pimpinan">
      <div class="pimpinan-header">
        <span class="pimpinan-badge">
          <svg viewBox="0 0 24 24" class="badge-icon-sm" fill="currentColor">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
          </svg>
          Pimpinan Harian Dewan Racana
        </span>
        <h2 class="pimpinan-title">Pengurus Inti Racana Dewa Raja &amp; Racana Batari</h2>
        <p class="pimpinan-desc">
          Amanah dwitunggal kepemimpinan satuan putra dan putri yang menggerakkan ritme
          kelembagaan, musyawarah, dan pelaksanaan adat racana.
        </p>
      </div>

      <div class="grid-dwitunggal">
        <!-- CARD DEWA RAJA (PUTRA - DEEP PURPLE) -->
        <div class="leader-card dewa-raja">
          <div class="leader-tag">
            <span>&#9872; {pradanaPutra.racana}</span>
          </div>

          <div class="leader-body">
            <div class="leader-photo-box">
              <div class="photo-container">
                <img src={pradanaPutra.foto} alt={pradanaPutra.nama} class="leader-img" />
              </div>
              <span class="gender-tag putra">{pradanaPutra.label}</span>
            </div>

            <div class="leader-content">
              <h3 class="leader-name">{pradanaPutra.nama}</h3>
              <p class="leader-role">{pradanaPutra.jabatan}</p>
              <blockquote class="leader-quote">
                &ldquo;{pradanaPutra.kutipan}&rdquo;
              </blockquote>
              <div class="leader-footer-meta">
                <span class="meta-major">{pradanaPutra.jurusan}</span>
                <span class="meta-status">{pradanaPutra.status}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CARD BATARI (PUTRI - GOLD) -->
        <div class="leader-card batari">
          <div class="leader-tag">
            <span>&#9872; {pradanaPutri.racana}</span>
          </div>

          <div class="leader-body">
            <div class="leader-photo-box">
              <div class="photo-container">
                <img src={pradanaPutri.foto} alt={pradanaPutri.nama} class="leader-img" />
              </div>
              <span class="gender-tag putri">{pradanaPutri.label}</span>
            </div>

            <div class="leader-content">
              <h3 class="leader-name">{pradanaPutri.nama}</h3>
              <p class="leader-role">{pradanaPutri.jabatan}</p>
              <blockquote class="leader-quote">
                &ldquo;{pradanaPutri.kutipan}&rdquo;
              </blockquote>
              <div class="leader-footer-meta">
                <span class="meta-major">{pradanaPutri.jurusan}</span>
                <span class="meta-status">{pradanaPutri.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         4. SECTION APARATUR PENGURUS HARIAN (4 WHITE CARDS)
         ====================================================================== -->
    <section class="section-aparatur">
      <div class="grid-aparatur">
        {#each pengurusHarian as item}
          <div class="card-white aparatur-card">
            <div class="aparatur-top-bar">
              <span class="aparatur-cat">{item.kategori}</span>
              <span class="aparatur-badge {item.badge.toLowerCase()}">{item.badge}</span>
            </div>

            <div class="aparatur-avatar-wrap">
              {#if item.foto}
                <img src={item.foto} alt={item.nama} class="aparatur-avatar-img" />
              {:else}
                <div class="aparatur-avatar-gold">
                  <svg viewBox="0 0 24 24" class="avatar-svg" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              {/if}
            </div>

            <h4 class="aparatur-name">{item.nama}</h4>
            <p class="aparatur-jabatan">{item.jabatan}</p>
            <p class="aparatur-desc">{item.deskripsi}</p>

            <div class="aparatur-footer">
              <span>{item.masaBakti}</span>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- ======================================================================
         5. SECTION DIVISI PELAKSANA MANDAT
         ====================================================================== -->
    <section class="section-divisi">
      <div class="section-header-row">
        <div>
          <span class="gold-subtitle">DIVISI PELAKSANA MANDAT</span>
          <h2 class="section-heading">Bidang Operasional &amp; Pengembangan</h2>
        </div>
        <p class="divisi-desc-right">
          Empat pilar divisi kerja yang merealisasikan program kepanduan inovatif, pengabdian
          sosial berkelanjutan, dan kemahiran teknis anggota racana.
        </p>
      </div>

      <div class="grid-divisi">
        {#each divisiList as div}
          <div class="card-white divisi-card">
            <div class="divisi-header">
              <div class="divisi-icon-box">
                {#if div.id === 1}
                  <!-- Compass icon -->
                  <svg viewBox="0 0 24 24" class="divisi-icon" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  </svg>
                {:else}
                  <!-- Network / Community icon -->
                  <svg viewBox="0 0 24 24" class="divisi-icon" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                {/if}
              </div>
              <span class="divisi-pill">{div.divisiLabel}</span>
            </div>

            <h3 class="divisi-title">{div.nama}</h3>

            <div class="divisi-coordinator">
              <span class="field-label">Koordinator Bidang:</span>
              <strong class="coordinator-name">{div.koordinator}</strong>
            </div>

            <div class="divisi-members">
              <span class="field-label">Anggota:</span>
              <p class="members-text">{div.anggota}</p>
            </div>

            <div class="divisi-tasks">
              <span class="field-label">FOKUS TUGAS POKOK:</span>
              <ul class="task-list">
                {#each div.fokusTugas as tugas}
                  <li>
                    <svg viewBox="0 0 20 20" fill="currentColor" class="task-check">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span>{tugas}</span>
                  </li>
                {/each}
              </ul>
            </div>

            <div class="divisi-footer">
              <span class="divisi-email">{div.email}</span>
              <span class="arrow-icon">&nearr;</span>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- ======================================================================
         6. BOTTOM CTA (REGENERASI KEPEMIMPINAN KAMPUS)
         ====================================================================== -->
    <section class="section-regenerasi">
      <div class="regenerasi-box">
        <div class="regenerasi-content">
          <div class="regen-badge-wrap">
            <span class="regen-badge">
              <svg viewBox="0 0 24 24" class="badge-icon-sm" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.8 1.15-5.33 3-7.14"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              REGENERASI KEPEMIMPINAN KAMPUS
            </span>
          </div>

          <h2 class="regen-title">Siap Menjadi Pemimpin di Pramuka Polidewa Selanjutnya?</h2>

          <p class="regen-desc">
            Dewan Racana Dewa Raja &ndash; Batari membuka kesempatan seluas-luasnya bagi seluruh
            mahasiswa Politeknik Dewantara Palopo untuk bertumbuh, mengasah karakter kepemimpinan,
            dan mengabdi tanpa henti.
          </p>
        </div>

        <div class="regenerasi-actions">
          <a href="/pendaftaran" class="btn-daftar-regen">
            Daftar Calon Anggota Racana &rarr;
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="btn-tanya-regen">
            <svg viewBox="0 0 24 24" class="chat-icon" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
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

  /* ==========================================================================
     1. TOP HEADER HERO CARD
     ========================================================================== */
  .header-card {
    background: rgba(30, 14, 58, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    padding: 2.2rem 2.4rem;
    margin: 1.5rem 0 3.8rem;
    box-shadow: 0 16px 40px rgba(18, 6, 36, 0.35);
  }

  .header-badge-row {
    margin-bottom: 1rem;
  }

  .pill-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1.1rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #ffffff;
  }

  .badge-icon {
    width: 15px;
    height: 15px;
    color: var(--color-accent-gold);
  }

  .header-title {
    font-size: 2.15rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.2;
    margin: 0 0 1rem;
  }

  .header-desc {
    font-size: 0.96rem;
    line-height: 1.65;
    color: var(--color-text-secondary);
    max-width: 880px;
    margin-bottom: 1.8rem;
  }

  .header-meta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.8rem;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.88rem;
    color: var(--color-text-secondary);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .meta-bullet {
    color: var(--color-accent-gold);
    font-size: 1.1rem;
  }

  .meta-item.verified {
    color: #ffffff;
    font-weight: 600;
  }

  .check-icon {
    width: 17px;
    height: 17px;
    color: #4ade80;
    flex-shrink: 0;
  }

  /* ==========================================================================
     SHARED STYLES: WHITE CARDS & SECTION HEADINGS
     ========================================================================== */
  .gold-subtitle {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 800;
    color: var(--color-accent-gold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.35rem;
  }

  .section-heading {
    font-size: 1.65rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0;
  }

  .section-header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.5rem;
    margin-bottom: 2.2rem;
  }

  .pangkalan-tag {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-accent-gold);
    white-space: nowrap;
  }

  .card-white {
    background: #ffffff;
    border-radius: 18px;
    color: #1a1a2e;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  }

  .card-white:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  }

  /* ==========================================================================
     2. SECTION PEMBINA
     ========================================================================== */
  .section-pembina {
    margin-bottom: 3.5rem;
  }

  .grid-pembina {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.8rem;
    margin-bottom: 2.5rem;
  }

  .pembina-card {
    padding: 2.4rem 1.8rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pembina-avatar-wrap {
    margin-bottom: 1.3rem;
  }

  .pembina-avatar {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }

  .pembina-avatar.purple {
    background: #431e6e;
    color: #ffffff;
  }

  .pembina-avatar.gold {
    background: #f7b638;
    color: #ffffff;
  }

  .avatar-svg {
    width: 44px;
    height: 44px;
    opacity: 0.9;
  }

  .pembina-name {
    font-size: 1.05rem;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0 0 0.35rem;
  }

  .pembina-jabatan {
    font-size: 0.85rem;
    font-weight: 700;
    color: #5a2e8c;
    margin: 0 0 1rem;
  }

  .pembina-desc {
    font-size: 0.85rem;
    line-height: 1.6;
    color: #555566;
    margin: 0;
  }

  .connector-row {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }

  .gold-connector-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.75rem 1.8rem;
    background: rgba(43, 18, 72, 0.95);
    border: 1.5px solid var(--color-accent-gold);
    border-radius: 9999px;
    color: var(--color-accent-gold);
    font-size: 0.92rem;
    font-weight: 800;
    box-shadow: 0 6px 20px rgba(240, 192, 64, 0.2);
    cursor: default;
  }

  .connector-icon {
    width: 18px;
    height: 18px;
  }

  /* ==========================================================================
     3. SECTION PIMPINAN HARIAN (DWITUNGGAL)
     ========================================================================== */
  .section-pimpinan {
    margin: 3.5rem 0 3rem;
  }

  .pimpinan-header {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pimpinan-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.35rem 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.8rem;
  }

  .badge-icon-sm {
    width: 14px;
    height: 14px;
    color: var(--color-accent-gold);
  }

  .pimpinan-title {
    font-size: 1.85rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 0.8rem;
  }

  .pimpinan-desc {
    font-size: 0.92rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  .grid-dwitunggal {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 2.5rem;
  }

  .leader-card {
    border-radius: 20px;
    padding: 1.8rem;
    box-shadow: 0 16px 36px rgba(18, 6, 36, 0.35);
    display: flex;
    flex-direction: column;
    transition: transform var(--transition-normal);
  }

  .leader-card:hover {
    transform: translateY(-4px);
  }

  .leader-card.dewa-raja {
    background: #2a144e;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }

  .leader-card.batari {
    background: #febb2b;
    color: #2b1248;
  }

  .leader-tag {
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    margin-bottom: 1.2rem;
    opacity: 0.9;
  }

  .leader-body {
    display: flex;
    gap: 1.4rem;
    align-items: flex-start;
  }

  .leader-photo-box {
    width: 120px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .photo-container {
    width: 110px;
    height: 125px;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.15);
    margin-bottom: 0.45rem;
  }

  .leader-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  .gender-tag {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  .gender-tag.putra {
    color: #c4b5fd;
  }

  .gender-tag.putri {
    color: #581c87;
  }

  .leader-content {
    flex: 1;
    min-width: 0;
  }

  .leader-name {
    font-size: 1.7rem;
    font-weight: 900;
    margin: 0 0 0.25rem;
    line-height: 1.2;
  }

  .leader-role {
    font-size: 0.88rem;
    font-weight: 700;
    margin: 0 0 0.9rem;
    opacity: 0.92;
  }

  .leader-quote {
    font-size: 0.85rem;
    line-height: 1.55;
    font-style: italic;
    margin: 0 0 1.2rem;
    opacity: 0.9;
  }

  .leader-footer-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.76rem;
    font-weight: 600;
    opacity: 0.85;
    padding-top: 0.8rem;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  .leader-card.batari .leader-footer-meta {
    border-top-color: rgba(43, 18, 72, 0.15);
  }

  /* ==========================================================================
     4. SECTION APARATUR (4 WHITE CARDS)
     ========================================================================== */
  .section-aparatur {
    margin-bottom: 4.5rem;
  }

  .grid-aparatur {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  .aparatur-card {
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .aparatur-top-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.72rem;
    font-weight: 700;
    margin-bottom: 1.2rem;
  }

  .aparatur-cat {
    color: #666688;
  }

  .aparatur-badge {
    padding: 0.15rem 0.6rem;
    border-radius: 9999px;
    font-size: 0.68rem;
    font-weight: 800;
  }

  .aparatur-badge.dewa {
    background: #ede9fe;
    color: #5b21b6;
  }

  .aparatur-badge.batari {
    background: #fef3c7;
    color: #92400e;
  }

  .aparatur-badge.gabungan {
    background: #e0f2fe;
    color: #0369a1;
  }

  .aparatur-avatar-wrap {
    width: 76px;
    height: 76px;
    margin-bottom: 1rem;
  }

  .aparatur-avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #e2d9f3;
  }

  .aparatur-avatar-gold {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #fef3c7;
    color: #d97706;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #fde68a;
  }

  .aparatur-name {
    font-size: 1rem;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0 0 0.25rem;
  }

  .aparatur-jabatan {
    font-size: 0.8rem;
    font-weight: 700;
    color: #6b21a8;
    margin: 0 0 0.75rem;
  }

  .aparatur-desc {
    font-size: 0.8rem;
    line-height: 1.55;
    color: #555566;
    margin: 0 0 1.2rem;
    flex: 1;
  }

  .aparatur-footer {
    width: 100%;
    padding-top: 0.75rem;
    border-top: 1px solid #f0f0f5;
    font-size: 0.72rem;
    font-weight: 600;
    color: #888899;
  }

  /* ==========================================================================
     5. SECTION DIVISI (2 WHITE CARDS)
     ========================================================================== */
  .section-divisi {
    margin-bottom: 4.5rem;
  }

  .divisi-desc-right {
    font-size: 0.92rem;
    color: var(--color-text-secondary);
    line-height: 1.55;
    max-width: 450px;
    margin: 0;
    text-align: right;
  }

  .grid-divisi {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .divisi-card {
    padding: 2.2rem 2rem;
    display: flex;
    flex-direction: column;
  }

  .divisi-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  }

  .divisi-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #f3e8ff;
    color: #7e22ce;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .divisi-icon {
    width: 20px;
    height: 20px;
  }

  .divisi-pill {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: #7e22ce;
  }

  .divisi-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #1a1a2e;
    line-height: 1.35;
    margin: 0 0 1.3rem;
  }

  .divisi-coordinator, .divisi-members {
    margin-bottom: 1rem;
    font-size: 0.88rem;
  }

  .field-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    color: #666688;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .coordinator-name {
    color: #1a1a2e;
    font-size: 0.95rem;
  }

  .members-text {
    font-size: 0.85rem;
    color: #444455;
    line-height: 1.5;
    margin: 0;
  }

  .divisi-tasks {
    margin-bottom: 1.5rem;
    flex: 1;
  }

  .task-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin: 0.5rem 0 0;
    padding: 0;
  }

  .task-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    font-size: 0.86rem;
    color: #333344;
    line-height: 1.4;
  }

  .task-check {
    width: 17px;
    height: 17px;
    color: #7e22ce;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .divisi-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.1rem;
    border-top: 1px solid #f0f0f5;
  }

  .divisi-email {
    font-size: 0.82rem;
    font-weight: 600;
    color: #666688;
  }

  .arrow-icon {
    font-size: 1.1rem;
    color: #7e22ce;
    font-weight: bold;
  }

  /* ==========================================================================
     6. BOTTOM CTA (REGENERASI KEPEMIMPINAN KAMPUS)
     ========================================================================== */
  .section-regenerasi {
    margin-top: 2rem;
  }

  .regenerasi-box {
    background: rgba(30, 14, 58, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 20px;
    padding: 2.8rem 2.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.5rem;
    box-shadow: 0 16px 40px rgba(18, 6, 36, 0.4);
  }

  .regenerasi-content {
    flex: 1;
  }

  .regen-badge-wrap {
    margin-bottom: 0.9rem;
  }

  .regen-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.78rem;
    font-weight: 800;
    color: var(--color-accent-gold);
    letter-spacing: 0.08em;
  }

  .regen-title {
    font-size: 1.65rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.3;
    margin: 0 0 0.85rem;
    max-width: 600px;
  }

  .regen-desc {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.65;
    max-width: 620px;
    margin: 0;
  }

  .regenerasi-actions {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    flex-shrink: 0;
  }

  .btn-daftar-regen {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.8rem;
    background: transparent;
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    color: #ffffff;
    border-radius: 9999px;
    font-size: 0.92rem;
    font-weight: 700;
    text-decoration: none;
    transition: all var(--transition-fast);
  }

  .btn-daftar-regen:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #ffffff;
  }

  .btn-tanya-regen {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 0.85rem 1.8rem;
    background: rgba(66, 29, 110, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border-radius: 9999px;
    font-size: 0.92rem;
    font-weight: 700;
    text-decoration: none;
    transition: all var(--transition-fast);
  }

  .btn-tanya-regen:hover {
    background: rgba(88, 38, 148, 0.9);
  }

  .chat-icon {
    width: 17px;
    height: 17px;
  }

  /* ==========================================================================
     RESPONSIVE BREAKPOINTS
     ========================================================================== */
  @media (max-width: 1024px) {
    .grid-pembina {
      grid-template-columns: 1fr;
      max-width: 480px;
      margin: 0 auto 2rem;
    }

    .grid-dwitunggal {
      grid-template-columns: 1fr;
    }

    .grid-aparatur {
      grid-template-columns: repeat(2, 1fr);
    }

    .grid-divisi {
      grid-template-columns: 1fr;
    }

    .section-header-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.6rem;
    }

    .divisi-desc-right {
      text-align: left;
    }

    .regenerasi-box {
      flex-direction: column;
      align-items: flex-start;
    }

    .regenerasi-actions {
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 640px) {
    .header-card {
      padding: 1.6rem 1.4rem;
    }

    .header-title {
      font-size: 1.65rem;
    }

    .leader-body {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .leader-footer-meta {
      flex-direction: column;
      gap: 0.4rem;
    }

    .grid-aparatur {
      grid-template-columns: 1fr;
      max-width: 320px;
      margin: 0 auto;
    }

    .regenerasi-actions {
      flex-direction: column;
    }

    .btn-daftar-regen, .btn-tanya-regen {
      width: 100%;
    }
  }
</style>
