<template>
  <div class="dashboard">
    <div class="container lg:px-12">
      <dashboard-header></dashboard-header>
      <main class="h-full py-6">
        <failed-load-data
          v-if="error"
          :loading="$fetchState.pending"
          @fetch="$fetch"
        ></failed-load-data>
        <template v-else>
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
        </template>
      </main>
    </div>
    <Aside></Aside>
    <modal-ui></modal-ui>
  </div>
</template>
<script>
import DashboardHeader from '~/components/layout/Header.vue';
import Aside from '~/components/layout/Aside.vue';
import { database } from '~/utils/firebase';
import Language from '~/models/Language';
import FailedLoadData from '~/components/ui/FailedLoadData.vue';

export default {
  components: { Aside, DashboardHeader, FailedLoadData },
  fetch() {
    if (Language.all().length !== 0) return;

    const { localId } = this.$store.state.user;
    database
      .ref(`users/${localId}/languages`)
      .get()
      .then((languages) => {
        this.$store.dispatch('entities/create', {
          entity: 'languages',
          data: languages.map((langId) => ({ langId }))
        });
        this.error = false;
      })
      .catch(() => {
        this.error = true;
      });
  },
  data: () => ({
    retrieved: false,
    error: false
  }),
  mounted() {
    const { extension } = this.$route.query;

    if (extension) {
      this.$toasted.error('Add language that you want to learn first', {
        position: 'top-center',
        duration: null,
        action: {
          text: 'Cancel',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      });
    }
  },
  head() {
    return {
      titleTemplate: '%s - 1Word'
    };
  },
  middleware({ store, redirect }) {
    const { user } = store.state;

    if (!user) {
      redirect('/auth');
    } else if (user && !user.emailVerified) {
      redirect('/auth/verify');
    }
  }
};
</script>
<style scoped lang="scss">
@screen lg {
  .dashboard .container {
    padding-right: 320px;
  }
}
</style>
