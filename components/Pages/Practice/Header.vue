<template>
  <header class="justify-between flex items-center">
    <nuxt-link :to="`/dashboard/language/${$route.params.id}`">
      <button-ui v-tooltip.right="'Go back'" icon>
        <v-mdi name="mdi-chevron-down" :rotate="90"></v-mdi>
      </button-ui>
    </nuxt-link>
    <progress-ui :value="progress" class="w-6/12"></progress-ui>
    <p class="px-4 py-2 bg-input rounded-lg">{{ number }}</p>
  </header>
</template>
<script>
export default {
  props: {
    number: Number,
    length: Number
  },
  computed: {
    progress() {
      return (this.number / this.length) * 100;
    }
  }
};
</script>
