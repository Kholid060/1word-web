<template>
  <div id="app">
    <nuxt />
    <div
      class="toasted dark-theme ct-series-a ct-area ct-line ct-series-a ct-point ct-label"
      style="display: none"
    ></div>
  </div>
</template>
<script>
export default {
  mounted() {
    window.addEventListener('storage', () => {
      if (document.visibilityState === 'hidden')
        this.$store.commit('updateState', {
          key: 'dark',
          data: JSON.parse(localStorage.getItem('dark'))
        });
    });
  },
  head() {
    return {
      bodyAttrs: {
        class: this.$store.state.dark ? 'dark-theme' : 'light-theme'
      }
    };
  }
};
</script>
