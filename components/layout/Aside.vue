<template>
  <aside
    class="bg-default h-full aside-content py-8 hidden lg:block"
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
          <div
            class="absolute shadow-xl rounded-full bg-default cursor-pointer"
            style="bottom: 0; right: 0; padding: 5px 11px 10px 11px"
            @click="isEdit = !isEdit"
          >
            <v-mdi size="18" name="mdi-pencil"></v-mdi>
          </div>
        </div>
        <p class="font-semibold mt-2">{{ user.displayName }}</p>
        <p class="text-lighter">{{ user.email }}</p>
      </div>
      <component :is="isEdit ? 'EditProfile' : 'Profile'"></component>
      <div v-if="!isEdit" class="px-8">
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
import SlideTransition from '~/components/Transitions/SlideTransition.vue';

export default {
  components: { EditProfile, Profile, SlideTransition },
  data: () => ({
    isEdit: false
  }),
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    closeProfile() {
      this.$store.commit('updateState', {
        key: 'openProfile',
        data: false
      });
    }
  }
};
</script>
<style lang="scss">
.logout-btn span {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.aside-content {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  &.open {
    display: block !important;
    z-index: 99;
  }
}

@screen md {
  .aside-content {
    width: 300px;
  }
}
</style>
