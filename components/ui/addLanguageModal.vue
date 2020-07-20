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
          v-for="langId in filteredLanguages"
          :key="langId"
          @click="addLanguage(langId)"
        >
          <flag-ui size="40" :code="langId | getLang('country')"></flag-ui>
          <div class="ml-4">
            <p class="leading-snug">
              {{ langId | getLang }}
            </p>
            <p class="leading-snug text-lighter">
              {{ langId | getLang('native') }}
            </p>
          </div>
        </list-ui>
      </div>
    </card-ui>
  </modal>
</template>
<script>
import { supportedLanguages, languageFilter } from '~/utils/getLang';
import { request } from '~/utils/firebase';
import Language from '~/models/Language';

export default {
  data: () => ({
    search: '',
    languages: []
  }),
  computed: {
    filteredLanguages() {
      return this.languages.filter((langId) => {
        return languageFilter(langId)
          .toLowerCase()
          .match(this.search.toLowerCase());
      });
    }
  },
  methods: {
    initData() {
      const languages = Language.all();

      this.languages = supportedLanguages.filter((item) => {
        return !languages.some((language) => item === language.langId);
      });
    },
    addLanguage(langId) {
      request('/language', {
        method: 'POST',
        body: JSON.stringify({
          language: langId
        })
      })
        .then(() => {
          Language.insert({
            data: {
              langId
            }
          });

          this.$modal.hide('add-language');
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error('Oppss... Something went wrong');
        });
    }
  }
};
</script>
