<template>
  <card-ui>
    <div class="text-center">
      <div class="inline-block p-1 shadow-inner bg-light mb-2 rounded-lg">
        <flag-ui :code="languageId | getLang('country')" size="65"></flag-ui>
      </div>
      <p class="text-xl font-bold leading-tight">{{ languageId | getLang }}</p>
      <p class="text-light leading-tight">
        {{ languageId | getLang('native') }}
      </p>
    </div>
    <div class="flex mt-6 justify-center">
      <div class="text-center">
        <p class="text-xl font-semibold mt-2">{{ wordLength }}</p>
        <p class="text-light">Words</p>
      </div>
      <div
        class="mx-8 border-card"
        style="width: 1px; background-color: #e2e8f0"
      ></div>
      <div class="text-center">
        <p class="text-xl font-semibold mt-2">{{ practiceLength }}x</p>
        <p class="text-light">Practice</p>
      </div>
    </div>
    <button-ui block class="mt-8" type="danger" plain @click="deleteLanguage">
      Delete
    </button-ui>
  </card-ui>
</template>
<script>
export default {
  props: {
    languageId: String,
    wordLength: [String, Number],
    practiceLength: [String, Number]
  },
  methods: {
    deleteLanguage() {
      this.$modal.show('confirm', {
        title: 'Delete language',
        text: `Are you sure want to delete ${this.$options.filters.getLang(
          this.languageId
        )}`,
        btn: {
          type: 'danger',
          text: 'Delete',
          handler: () => {
            this.$emit('delete');
          }
        }
      });
    }
  }
};
</script>
