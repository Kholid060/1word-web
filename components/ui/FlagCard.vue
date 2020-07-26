<template>
  <card-ui
    :hover="!loading"
    class="language-card cursor-pointer"
    :class="{ active }"
  >
    <skeleton-box-ui
      v-if="loading"
      height="51px"
      width="51px"
    ></skeleton-box-ui>
    <flag-ui
      v-else
      :code="id | getLang('country')"
      size="51"
      class="flag-container p-1 bg-lighter"
    ></flag-ui>
    <div class="ml-2 language-card__name inline-block align-middle">
      <template v-if="loading">
        <skeleton-box-ui
          v-if="loading"
          height="14px"
          width="90px"
        ></skeleton-box-ui>
        <skeleton-box-ui
          v-if="loading"
          height="14px"
          width="70px"
        ></skeleton-box-ui>
      </template>
      <template v-else>
        <p class="leading-snug font-semibold text-overflow">
          {{ id | getLang }}
        </p>
        <p class="leading-snug text-light text-overflow">
          {{ id | getLang('native') }}
        </p>
      </template>
    </div>
  </card-ui>
</template>
<script>
export default {
  props: {
    id: String,
    active: Boolean,
    loading: Boolean
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
