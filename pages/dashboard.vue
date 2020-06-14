<template>
  <div class="dashboard">
    <div class="container lg:px-12">
      <dashboard-header></dashboard-header>
      <main class="h-full py-6">
        <expand-transition mode="out-in" :duration="5000">
          <div v-if="$route.name !== 'dashboard-read'" class="w-full">
            <language-list></language-list>
          </div>
        </expand-transition>
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
    <modal-ui></modal-ui>
  </div>
</template>
<script>
import DashboardHeader from '~/components/layout/Header.vue';
import Aside from '~/components/layout/Aside.vue';
import languageList from '~/components/Pages/Dashboard/languageList.vue';
import ExpandTransition from '~/components/Transitions/ExpandTransition.vue';

export default {
  components: { Aside, DashboardHeader, languageList, ExpandTransition },
  async fetch({ store }) {
    if (!this.retrieved) {
      this.retrieved = true;
      return await store.dispatch('retrieveData');
    }
  },
  data: () => ({
    retrieved: false
  })
  // middleware({ store }) {
  //   const { user } = store.state;
  //   if (!user) {
  //     redirect('/auth');
  //   } else if (user && !user.emailVerified) {
  //     redirect('/auth/verify');
  //   }
  // }
};
</script>
<style scoped lang="scss">
@screen lg {
  .dashboard .container {
    padding-right: 320px;
  }
}
</style>
