<template>
  <card-ui class="mb-6">
    <div class="mb-8 flex items-center">
      <flag-ui :code="langId | getLang('country')"></flag-ui>
      <div class="inline-block ml-4 flex-grow">
        <p class="font-semibold">{{ langId | getLang }}</p>
        <p class="text-lighter leading-tight">
          {{ langId | getLang('native') }}
        </p>
      </div>
      <button-ui
        v-tooltip.bottom="'Delete language'"
        icon
        @click="showDeleteModal"
      >
        <v-mdi name="mdi-delete" class="text-danger"></v-mdi>
      </button-ui>
    </div>
    <p
      v-for="tab in tabs"
      :key="tab"
      :class="{ 'active-tab': value === tab }"
      class="tabs text-lighter bg-input capitalize mr-3 inline-block"
      @click="$emit('input', tab)"
    >
      {{ tab }}
    </p>
  </card-ui>
</template>
<script>
import { request } from '~/utils/firebase';
import Language from '~/models/Language';
import Word from '~/models/Word';
import Practice from '~/models/Practice';

export default {
  props: {
    value: {
      type: String,
      default: 'words'
    },
    langId: String
  },
  data: () => ({
    tabs: ['words', 'practices']
  }),
  methods: {
    deleteLanguage() {
      const { words, practices } = Language.query()
        .where('langId', this.langId)
        .withAll()
        .first();
      const setToNull = (data) => {
        if (data.length === 0) return {};

        const ids = data.map(({ id }) => id);
        return ids.reduce((obj, key) => {
          obj[key] = null;
          return obj;
        }, {});
      };

      request(`/language/delete/${this.langId}`, {
        method: 'POST',
        body: JSON.stringify({
          words: setToNull(words),
          practices: setToNull(practices)
        })
      }).then(async () => {
        await Language.delete(this.langId);
        await Practice.delete(({ langId }) => langId === this.langId);
        await Word.delete(({ langId }) => langId === this.langId);
        this.$modal.hide('confirm');
        this.$router.replace('/dashboard');
      });
    },
    showDeleteModal() {
      const language = this.$options.filters.getLang(this.langId);

      this.$modal.show('confirm', {
        title: 'Delete language',
        text: `Are you sure want to delete ${language} language`,
        btn: {
          type: 'danger',
          text: 'Delete',
          loadingOnClick: true,
          handler: () => this.deleteLanguage()
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.tabs {
  @apply px-4 py-2 cursor-pointer rounded-lg;
  transition: all 200ms ease;
  &.active-tab {
    color: white;
    @apply bg-primary;
  }
  &:not(.active-tab):hover {
    @apply bg-input;
  }
}
</style>
