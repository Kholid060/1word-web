<template>
  <div class="flex flex-col-reverse md:flex-row">
    <div class="w-full md:w-4/12 md:mt-0 mt-6">
      <practice-card></practice-card>
    </div>
    <div class="main-content w-full md:w-8/12 md:pl-6">
      <language-card v-model="activeTab" :lang-id="langId"></language-card>
      <slide-transition direction="left" mode="out-in">
        <div v-if="activeTab === 'words'">
          <add-word v-if="!error"></add-word>
          <word-list class="mt-6" :error.sync="error"></word-list>
        </div>
        <practice-history
          v-else
          class="mt-6"
          hide-name
          :data="practices"
          show-pagination
          show-delete
        ></practice-history>
      </slide-transition>
    </div>
  </div>
</template>
<script>
import WordList from '~/components/Pages/Dashboard/Language/WordList.vue';
import AddWord from '~/components/Pages/Dashboard/Language/AddWord.vue';
import PracticeCard from '~/components/Pages/Dashboard/Language/PracticeCard.vue';
import LanguageCard from '~/components/Pages/Dashboard/Language/LanguageCard.vue';
import PracticeHistory from '~/components/ui/PracticeHistory.vue';
import SlideTransition from '~/components/Transitions/SlideTransition.vue';
import Language from '~/models/Language';
import Practice from '~/models/Practice';
import { request } from '~/utils/firebase';
import { normalizeData } from '~/utils/helper';

export default {
  components: {
    WordList,
    AddWord,
    PracticeCard,
    PracticeHistory,
    SlideTransition,
    LanguageCard
  },
  data: () => ({
    error: false,
    activeTab: 'words'
  }),
  computed: {
    langId() {
      return this.$route.params.id;
    },
    practices() {
      return Practice.query()
        .where('langId', this.langId)
        .get();
    }
  },
  watch: {
    activeTab(newVal) {
      if (newVal === 'practices') this.fetchPractices();
    }
  },
  methods: {
    fetchPractices() {
      const { retrievePractices } = Language.find(this.langId);

      if (retrievePractices || this.practices.length > 0) return;

      this.loading = true;

      request(`/practice/${this.langId}`)
        .then(({ practices }) => {
          this.loading = false;

          Practice.insert({
            data: normalizeData(practices, this.langId)
          });

          Language.insertOrUpdate({
            data: {
              langId: this.langId,
              retrievePractices: true
            }
          });
        })
        .catch(() => (this.loading = false));
    }
  },
  validate({ params }) {
    return Language.find(params.id);
  },
  head() {
    return {
      title: this.$options.filters.getLang(this.langId)
    };
  }
};
</script>
