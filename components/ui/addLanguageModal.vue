<template>
  <modal name="add-language" :height="500" :width="340" @before-open="initData">
    <card-ui no-padding-content>
      <template slot="header">
        <p>Select language</p>
        <div class="flex-grow"></div>
        <button-ui icon plain @click="$modal.hide('add-language')">
          <v-mdi name="mdi-close"></v-mdi>
        </button-ui>
      </template>
      <div class="px-5 mt-5">
        <input-ui
          v-model="search"
          block
          icon="mdi-magnify"
          placeholder="Search language"
        ></input-ui>
      </div>
      <div class="overflow-auto mb-5 px-5" style="height: 300px">
        <list-ui
          v-for="languageId in filteredLanguages"
          :key="languageId"
          @click="addLanguage(languageId)"
        >
          <flag-ui size="40" :code="languageId | getLang('country')"></flag-ui>
          <div class="ml-4">
            <p class="leading-snug">
              {{ languageId | getLang }}
            </p>
            <p class="leading-snug text-lighter">
              {{ languageId | getLang('native') }}
            </p>
          </div>
        </list-ui>
      </div>
    </card-ui>
  </modal>
</template>
<script>
import { supportedLanguages, languageFilter } from '~/utils/getLang';
import firestore from '~/utils/firestore';

export default {
  data: () => ({
    search: '',
    languages: []
  }),
  computed: {
    filteredLanguages() {
      return this.languages.filter((languageId) => {
        return languageFilter(languageId)
          .toLowerCase()
          .match(this.search.toLowerCase());
      });
    }
  },
  methods: {
    initData() {
      const languages = this.$store
        .$db()
        .model('languages')
        .all();

      this.languages = supportedLanguages.filter((item) => {
        return !languages.some((language) => item === language.languageId);
      });
    },
    addLanguage(languageId) {
      const languageModel = this.$store.$db().model('languages');
      const languages = languageModel.all().map(({ languageId }) => languageId);

      firestore
        .reference(`users/${this.$store.state.user.localId}`)
        .set({
          languages: [...languages, languageId]
        })
        .then(() => {
          languageModel.insert({
            data: {
              languageId
            }
          });
          this.$modal.hide('add-language');
        })
        .catch(() => {
          this.$toast.error('Oppss... Something went wrong');
        });
    }
  }
};
</script>
