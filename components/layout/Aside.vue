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
          <scale-transition>
            <div
              v-if="!isEdit"
              class="absolute shadow-xl rounded-full bg-default cursor-pointer"
              style="bottom: 0; right: 0; padding: 5px 11px 10px 11px"
              @click="isEdit = true"
            >
              <v-mdi size="18" name="mdi-pencil"></v-mdi>
            </div>
          </scale-transition>
        </div>
        <p class="font-semibold mt-2">{{ user.displayName }}</p>
        <p class="text-lighter">{{ user.email }}</p>
      </div>
      <slide-transition mode="out-in" direction="left">
        <edit-profile v-if="isEdit" @close="isEdit = false"></edit-profile>
        <profile v-else></profile>
      </slide-transition>
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
import Profile from './Aside/Profile.vue';
import firebaseAuth from '~/utils/firebaseAuth';
import SlideTransition from '~/components/Transitions/SlideTransition.vue';
import ScaleTransition from '~/components/Transitions/ScaleTransition.vue';

export default {
  components: { EditProfile, Profile, SlideTransition, ScaleTransition },
  data: () => ({
    isEdit: false
  }),
  computed: {
    user() {
      return this.$store.state.user || {};
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

            this.$router.push('/redirect');
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
