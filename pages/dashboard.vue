<template>
  <div class="dashboard">
    <div class="container pl-16" style="padding-right: 300px;">
      <dashboard-header></dashboard-header>
      <main class="h-full py-6">
        <nuxt-child />
        <div class="text-lighter mt-8">
          Flag Icons made by
          <a
            class="text-primary"
            href="https://www.flaticon.com/authors/freepik"
            title="Freepik"
          >
            Freepik
          </a>
          from
          <a
            class="text-primary"
            href="https://www.flaticon.com/"
            title="Flaticon"
          >
            www.flaticon.com
          </a>
        </div>
      </main>
    </div>
    <Aside class="hidden lg:block"></Aside>
  </div>
</template>
<script>
import DashboardHeader from '~/components/layout/Header.vue';
import Aside from '~/components/layout/Aside.vue';

export default {
  components: { Aside, DashboardHeader },
  async asyncData({ store }) {
    return await store.dispatch('retrieveData');
  }
};
</script>
