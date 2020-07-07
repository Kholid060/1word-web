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
import { database } from '~/utils/firebase';

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
    async deleteLanguage() {
      try {
        const languageModel = this.$store.$db().model('languages');
        const { uid } = this.$store.state.user;
        const languages = languageModel.all().map(({ langId }) => langId);
        languages.splice(languages.indexOf(this.langId), 1);

        await database.ref().update({
          [`users/${uid}/languages`]: languages,
          [`users/${uid}/words/${this.langId}`]: null,
          [`users/${uid}/practices/${this.langId}`]: null
        });
        await languageModel.delete(this.langId);

        this.$modal.hide('confirm');

        if (this.$route.name === 'dashboard-language-id')
          this.$router.replace('/dashboard');
      } catch (err) {
        /* eslint-disable-next-line */
        console.error(err);
      }
    },
    showDeleteModal() {
      this.$modal.show('confirm', {
        title: 'Delete language',
        text: `Are you sure want to delete ${this.$options.filters.getLang(
          this.langId
        )} language`,
        btn: {
          type: 'danger',
          text: 'Delete',
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
