<template>
  <card-ui hover class="language-card cursor-pointer" :class="{ active }">
    <flag-ui
      :code="id | getLang('country')"
      size="51"
      class="flag-container p-1 bg-lighter"
    ></flag-ui>
    <div class="ml-2 language-card__name inline-block align-middle">
      <p class="leading-snug font-semibold text-overflow">
        {{ id | getLang }}
      </p>
      <p class="leading-snug text-light text-overflow">
        {{ id | getLang('native') }}
      </p>
    </div>
  </card-ui>
</template>
<script>
export default {
  props: {
    id: String,
    active: Boolean
  }
};
</script>
<style lang="scss">
.language-card {
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  &.active {
    @apply border-primary;
  }
  .flag-container {
    display: inline-block;
    transition: transform 0.3s ease;
  }
  &__name {
    max-width: 80px;
  }
  &:hover {
    .flag-container {
      transform: translateY(-3px);
    }
  }
}
</style>
