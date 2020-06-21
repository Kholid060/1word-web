<template>
  <div
    class="h-16 landing-menu w-full shadow-xl"
    :class="{ show: show && !isGoDown }"
  >
    <div class="container flex h-full items-center">
      <img src="~/assets/images/icon.png" />
      <div class="flex-grow"></div>
      <nuxt-link to="/auth">
        <button-ui type="primary">
          Login
        </button-ui>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: false,
    lastScroll: 0,
    isGoDown: false
  }),
  mounted() {
    this.lastScroll = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  methods: {
    scrollHandler() {
      const scrollPosition = window.pageYOffset;
      const st = window.pageYOffset || document.documentElement.scrollTopl;

      this.show = scrollPosition >= 255;
      this.isGoDown = st > this.lastScrollTop && scrollPosition >= 255;
      this.lastScrollTop = st <= 0 ? 0 : st;
    }
  }
};
</script>
<style scoped lang="scss">
.landing-menu {
  &.show {
    transform: translateY(0);
  }
  background-color: rgba(247, 250, 252, 0.9);
  z-index: 99;
  transition: transform 400ms cubic-bezier(0.25, 0.6, 0.3, 1);
  position: fixed;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  top: 0;
  left: 0;
  transform: translateY(-90px);
}
</style>
