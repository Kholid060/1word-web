<template>
  <header class="flex items-center py-6">
    <img src="~/assets/images/icon.png" />
    <div class="content ml-8 text-lighter flex-grow">
      <nuxt-link
        v-for="nav in navs"
        :key="nav.name"
        class="nav-list h-8 mr-6 capitalize"
        :to="nav.path"
      >
        {{ nav.name }}
      </nuxt-link>
    </div>
    <button-ui icon class="lg:hidden" @click="openProfile">
      <v-mdi name="mdi-account"></v-mdi>
    </button-ui>
  </header>
</template>
<script>
export default {
  data: () => ({
    navs: [
      { name: 'home', path: '/dashboard' },
      { name: 'read', path: '/dashboard/read' }
    ]
  }),
  methods: {
    openProfile() {
      this.$store.commit('updateState', {
        key: 'openProfile',
        data: true
      });
    }
  }
};
</script>
<style lang="scss">
.nav-list {
  position: relative;
  display: inline-block;
  transition: color 200ms ease;
  &:hover {
    @apply text-default;
    &:before {
      width: 50%;
    }
  }
  &.nuxt-link-exact-active {
    @apply text-default;
    &:before {
      width: 50%;
    }
  }
  &:before {
    @apply bg-primary rounded-lg;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: 0;
    transition: width 300ms ease;
  }
}
</style>
