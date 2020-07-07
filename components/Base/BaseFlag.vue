<template>
  <img
    :src="code ? require(`~/assets/svg/flags/${code}.svg`) : ''"
    class="rounded-lg flag"
    :width="size"
    :height="size"
  />
</template>
<script>
export default {
  name: 'FlagUi',
  props: {
    code: String,
    size: {
      type: [Number, String],
      default: '50'
    }
  }
};
</script>
