<template>
  <div class="input-ui" :class="[{ block, disabled }, type]">
    <textarea
      class="input-ui__container textarea"
      :style="$attrs"
      :class="{ error }"
      :type="nativeType"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
    ></textarea>
    <div v-if="!hideDetails" class="input-ui__details h-6">
      <transition name="slide-fade">
        <span
          v-if="error"
          class="error-message inline-block text-sm text-danger"
        >
          {{ errorMessage }}
        </span>
      </transition>
    </div>
  </div>
</template>
<script>
import '~/assets/scss/components/_input.scss';

export default {
  name: 'TextareaUi',
  props: {
    name: String,
    value: String,
    placeholder: String,
    errorMessage: String,
    error: Boolean,
    disabled: Boolean,
    block: Boolean,
    hideDetails: Boolean,
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
