<template>
  <button
    class="button-ui focus:outline-none"
    :style="{ width, height }"
    :disabled="disabled"
    :class="[
      type,
      {
        disabled,
        loading,
        round,
        icon,
        small,
        dark,
        plain,
        large,
        block
      }
    ]"
    v-on="$listeners"
  >
    <span class="button-ui__text">
      <circular-progress-ui
        v-if="loading"
        spinner
        :size="25"
        :color="type === 'default' ? 'var(--primary)' : 'white'"
      ></circular-progress-ui>
      <slot v-else></slot>
    </span>
  </button>
</template>
<script>
import '~/assets/scss/components/_button.scss';

export default {
  name: 'ButtonUi',
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'default',
          'secondary',
          'primary',
          'warning',
          'danger'
        ].includes(value);
      }
    },
    width: [Number, String],
    height: [Number, String],
    dark: Boolean,
    disabled: Boolean,
    block: Boolean,
    loading: Boolean,
    round: Boolean,
    small: Boolean,
    icon: Boolean,
    plain: Boolean,
    large: Boolean
  }
};
</script>
