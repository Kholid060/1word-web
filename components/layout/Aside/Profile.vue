<template>
  <div class="flex-auto mt-8 mb-6 overflow-auto px-8">
    <div
      v-for="language in languages"
      :key="language.id"
      class="mb-5 flex items-center"
    >
      <p
        class="bg-input h-12 w-12 uppercase text-center py-3 font-semibold rounded-lg"
      >
        {{ language.langId }}
      </p>
      <div class="ml-4 flex-auto">
        <p class="font-semibold leading-tight">
          {{ language.langId | getLang }}
        </p>
        <p class="text-lighter leading-tight">
          {{ secondaryContent(language.langId) }}
        </p>
      </div>
      <v-mdi
        v-tooltip.left="'Delete language'"
        name="mdi-delete"
        class="text-danger cursor-pointer"
        @click="showDeleteModal(language.langId)"
      ></v-mdi>
    </div>
  </div>
</template>
<script>
import { database } from '~/utils/firebase';

export default {
  computed: {
    languages() {
      return this.languageModel
        .query()
        .with('words')
        .get();
    },
    languageModel() {
      return this.$store.$db().model('languages');
    }
  },
  methods: {
    secondaryContent(id) {
      const { words } = this.languages.find(
        (language) => language.langId === id
      );

      return words.length !== 0
        ? `${words.length} words`
        : this.$options.filters.getLang(id, 'native');
    },
    async deleteLanguage(langId) {
      try {
        const { uid } = this.$store.state.user;
        const languages = this.languageModel.all().map(({ langId }) => langId);
        languages.splice(languages.indexOf(langId), 1);

        await database.ref().update({
          [`users/${uid}/languages`]: languages,
          [`users/${uid}/words/${langId}`]: null,
          [`users/${uid}/practices/${langId}`]: null
        });
        await this.languageModel.delete(langId);

        this.$modal.hide('confirm');

        if (this.$route.name === 'dashboard-language-id')
          this.$router.replace('/dashboard');
      } catch (err) {
        /* eslint-disable-next-line */
        console.error(err);
      }
    },
    showDeleteModal(langId) {
      this.$modal.show('confirm', {
        title: 'Delete language',
        text: `Are you sure want to delete ${this.$options.filters.getLang(
          langId
        )}`,
        btn: {
          type: 'danger',
          text: 'Delete',
          handler: () => this.deleteLanguage(langId)
        }
      });
    }
  }
};
</script>
