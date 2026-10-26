<script lang="ts">
  import HeroSection from '#lib/components/beranda/HeroSection.svelte';
  import OrganizationBanner from '#lib/components/beranda/OrganizationBanner.svelte';
  import FeaturedNewsSection from '#lib/components/beranda/FeaturedNewsSection.svelte';
  import MemberCollageSection from '../lib/components/beranda/MemberCollageSection.svelte';
  import RegistrationCTASection from '#lib/components/beranda/RegistrationCTASection.svelte';
</script>

<svelte:head>
  <title>Pramuka Polidewa — Racana Dewa Raja – Batari</title>
  <meta name="description" content="Website resmi UKM Pramuka Politeknik Dewantara Palopo — Racana Dewa Raja – Batari Gugus Depan 04.017 – 04.018." />
</svelte:head>

<!-- SECTION 1: HERO BERANDA -->
<HeroSection />

<!-- SECTION 2: BANNER PENGENALAN ORGANISASI -->
<OrganizationBanner />

<!-- SECTION 3: TENTANG KEGIATAN RACANA -->
<FeaturedNewsSection />

<!-- SECTION 4: KOLASE FOTO ANGGOTA PRAMUKA -->
<MemberCollageSection />

<!-- SECTION 5: AJAKAN PENDAFTARAN ANGGOTA -->
<RegistrationCTASection />

<!-- SECTION 6 (FOOTER) DIKELOLA PADA +layout.svelte -->
