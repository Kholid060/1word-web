<template>
  <empty-state-ui
    class="mt-6"
    title="Failed to load data"
    description="Click button below to try again"
  >
    <img slot="header" src="~/assets/svg/taken.svg" width="200px" />
    <button-ui
      slot="action"
      :loading="loading"
      width="150px"
      block
      @click="$emit('fetch')"
    >
      Load data
    </button-ui>
  </empty-state-ui>
</template>
<script>
export default {
  props: {
    loading: Boolean
  }
};
</script>
