<template>
  <nav
    class="w-20 fixed h-full py-10 flex items-center flex-col text-white bg-primary"
  >
    <img :src="getImage('icon')" class="rounded-lg mb-12" />
    <router-link
      v-for="item in navs"
      :key="item.name"
      :to="item.path"
      class="mb-8"
    >
      <button-ui
        v-tooltip.right="item.name"
        type="secondary"
        icon
        :plain="$route.name !== item.name"
      >
        <v-mdi :name="item.icon" size="26" fill="white"></v-mdi>
      </button-ui>
    </router-link>
  </nav>
</template>
<script>
export default {
  data: () => ({
    navs: [
      { name: 'home', icon: 'mdi-home', path: '/dashboard' },
      { name: 'read', icon: 'mdi-newspaper-variant', path: '/dashboard/read' },
      { name: 'settings', icon: 'mdi-cog', path: '/settings' }
    ]
  }),
  methods: {
    getImage(name) {
      return require(`~/assets/images/${name}.png`).default;
    }
  }
};
</script>
