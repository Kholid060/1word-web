<template>
  <aside
    class="bg-default h-full aside-content py-8 lg:block"
    :class="{ open: $store.state.openProfile }"
  >
    <div class="flex flex-col h-full">
      <button-ui
        v-if="$store.state.openProfile"
        icon
        class="absolute top-0 right-0 m-6"
        @click="closeProfile"
      >
        <v-mdi name="mdi-close"></v-mdi>
      </button-ui>
      <div class="profile text-center">
        <div class="relative rounded-full border inline-block p-2">
          <img src="~/assets/svg/male-avatar.svg" class="h-32" />
        </div>
        <p class="font-semibold mt-2">{{ user.displayName }}</p>
        <p class="text-lighter">{{ user.email }}</p>
      </div>
      <div class="flex-auto mt-8 mb-6 overflow-auto px-8">
        <slide-transition mode="out-in" direction="left">
          <edit-profile v-if="isEdit" @close="isEdit = false"></edit-profile>
          <div v-else class="h-full">
            <list-ui>
              <v-mdi slot="prefix" name="mdi-weather-night"></v-mdi>
              <p class="flex-grow">Dark Mode</p>
              <switch-ui v-model="darkMode"></switch-ui>
            </list-ui>
            <list-ui class="my-2" @click="isEdit = true">
              <v-mdi slot="prefix" name="mdi-cog"></v-mdi>
              Settings
            </list-ui>
            <list-ui
              tag="a"
              href="https://chrome.google.com/webstore/detail/1word/egkkjgnnebpeldfhiljmgfachakbbmph"
              target="_blank"
              rel="noreferrer"
            >
              <v-mdi slot="prefix" name="mdi-google-chrome"></v-mdi>
              Get Extension
            </list-ui>
          </div>
        </slide-transition>
      </div>
      <div class="px-8">
        <button-ui block plain type="danger" class="logout-btn" @click="logout">
          Logout
          <v-mdi name="mdi-logout"></v-mdi>
        </button-ui>
      </div>
    </div>
  </aside>
</template>
<script>
import EditProfile from './Aside/EditProfile.vue';
import firebaseAuth from '~/utils/firebaseAuth';
import SlideTransition from '~/components/Transitions/SlideTransition.vue';

export default {
  components: { EditProfile, SlideTransition },
  data: () => ({
    isEdit: false
  }),
  computed: {
    user() {
      return this.$store.state.user || {};
    },
    darkMode: {
      set(value) {
        localStorage.setItem('dark', value);

        this.$store.commit('updateState', {
          key: 'dark',
          data: value
        });
      },
      get() {
        return this.$store.state.dark;
      }
    }
  },
  methods: {
    closeProfile() {
      this.$store.commit('updateState', {
        key: 'openProfile',
        data: false
      });
    },
    logout() {
      this.$modal.show('confirm', {
        title: 'Logout',
        text: 'Are you sure you want to logout?',
        btn: {
          type: 'danger',
          text: 'Logout',
          handler: async () => {
            await firebaseAuth.signOut();
            await this.$store.dispatch('cleanup');

            this.$router.push('/auth');
            this.$modal.hide('confirm');
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
.logout-btn span {
  width: 100%;
  display: flex;
  @apply py-1;
  justify-content: space-between;
}

.aside-content {
  transform: translateX(100%);
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  transition: all 500ms cubic-bezier(0, 0.9, 0.4, 1);
  &.open {
    display: block !important;
    transform: translateX(0);
  }
}

@screen md {
  .aside-content {
    width: 300px;
  }
}
@screen lg {
  .aside-content {
    transform: translateX(0);
  }
}
</style>
