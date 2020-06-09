<template>
  <div class="input-ui" :class="[{ error, block }, type]">
    <textarea
      class="input-ui__container textarea"
      :style="$attrs"
      :type="nativeType"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
    ></textarea>
  </div>
</template>
<script>
import '~/assets/scss/components/_input.scss';

export default {
  name: 'TextareaUi',
  props: {
    name: String,
    value: String,
    error: Boolean,
    placeholder: String,
    block: Boolean,
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'outline'].includes(value);
      }
    },
    nativeType: {
      type: String,
      default: 'text'
    }
  }
};
</script>
