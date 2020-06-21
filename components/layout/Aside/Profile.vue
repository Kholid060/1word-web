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
        {{ language.languageId }}
      </p>
      <div class="ml-4 flex-auto">
        <p class="font-semibold leading-tight">
          {{ language.languageId | getLang }}
        </p>
        <p class="text-lighter leading-tight">
          {{ language.words.length }} words
        </p>
      </div>
      <v-mdi
        v-tooltip.left="'Delete language'"
        name="mdi-delete"
        class="text-danger cursor-pointer"
        @click="showDeletModal(language.languageId)"
      ></v-mdi>
    </div>
  </div>
</template>
<script>
import firestore, { transaction } from '~/utils/firestore';

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
    async deleteLanguage(languageId) {
      const { words, practices } = this.languageModel
        .query()
        .where('languageId', languageId)
        .withAll()
        .first();

      words.forEach((word) => {
        transaction.delete(word.dataPath);
      });

      practices.forEach((practice) => {
        transaction.delete(practice.dataPath);
      });

      try {
        const languages = this.languageModel
          .all()
          .map(({ languageId }) => languageId);
        const index = languages.indexOf(languageId);
        languages.splice(index, 1);

        await transaction.commit();
        await firestore
          .reference(`users/${this.$store.state.user.localId}`)
          .update({
            languages
          });
        await this.languageModel.delete(languageId);

        this.$modal.hide('confirm');
      } catch (err) {
        /* eslint-disable-next-line */
        console.error(err);
      }
    },
    showDeletModal(languageId) {
      this.$modal.show('confirm', {
        title: 'Delete language',
        text: `Are you sure want to delete ${this.$options.filters.getLang(
          languageId
        )}`,
        btn: {
          type: 'danger',
          text: 'Delete',
          handler: () => this.deleteLanguage(languageId)
        }
      });
    }
  }
};
</script>
