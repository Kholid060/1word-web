<template>
  <div class="landing-page">
    <Menu></Menu>
    <main-section></main-section>
    <languages-section></languages-section>
    <dashboard-section></dashboard-section>
    <practice-section></practice-section>
  </div>
</template>
<script>
import Menu from '~/components/Pages/Landing/Menu.vue';
import MainSection from '~/components/Pages/Landing/MainSection.vue';
import LanguagesSection from '~/components/Pages/Landing/LanguagesSection.vue';
import DashboardSection from '~/components/Pages/Landing/DashboardSection.vue';
import PracticeSection from '~/components/Pages/Landing/PracticeSection.vue';

export default {
  components: {
    Menu,
    MainSection,
    LanguagesSection,
    DashboardSection,
    PracticeSection
  }
};
</script>
