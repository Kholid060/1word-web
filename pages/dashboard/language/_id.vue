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
          show-pagination
          show-delete
          @delete="deletePractice"
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
import { database } from '~/utils/firebase';
import Language from '~/models/Language';

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
    }
  },
  validate({ params }) {
    return Language.find(params.id);
  },
  activated() {
    if (typeof this.langId === 'undefined')
      return this.$router.replace('/dashboard');

    this.activeTab = 'words';
  },
  methods: {
    deletePractice(practice) {
      database
        .ref(`users/${this.localId}/practices/${practice.id}`)
        .delete()
        .then(() => {
          this.$store
            .$db()
            .model('practices')
            .delete(practice.$id);
        });
    }
  },
  head() {
    return {
      title: this.$options.filters.getLang(this.langId)
    };
  }
};
</script>
