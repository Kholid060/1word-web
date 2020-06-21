<template>
  <div class="flex flex-col-reverse md:flex-row">
    <div class="w-full md:w-4/12 md:mt-0 mt-6">
      <practice-card :word-length="language.words.length"></practice-card>
    </div>
    <div class="main-content w-full md:w-8/12 md:pl-6">
      <add-word></add-word>
      <word-list :words="language.words" class="mt-6"></word-list>
      <practice-history
        class="mt-6"
        :data="language.practices"
        hide-name
        show-pagination
        show-delete
        @delete="deletePractice"
      ></practice-history>
    </div>
  </div>
</template>
<script>
import WordList from '~/components/Pages/Dashboard/Language/WordList.vue';
import AddWord from '~/components/Pages/Dashboard/Language/AddWord.vue';
import PracticeCard from '~/components/Pages/Dashboard/Language/PracticeCard.vue';
import PracticeHistory from '~/components/ui/PracticeHistory.vue';
import firestore from '~/utils/firestore';

export default {
  components: { WordList, AddWord, PracticeCard, PracticeHistory },
  validate({ params, store }) {
    return store
      .$db()
      .model('languages')
      .query()
      .where('languageId', params.id)
      .exists();
  },
  computed: {
    languageModel() {
      return this.$store.$db().model('languages');
    },
    languageId() {
      return this.$route.params.id;
    },
    language() {
      return (
        this.languageModel
          .query()
          .where('languageId', this.languageId)
          .withAll()
          .first() || { empty: true, practices: [], words: [] }
      );
    }
  },
  watch: {
    language: {
      handler(value) {
        if (value?.empty) {
          this.$router.push('/');
        }
      },
      deep: true
    }
  },
  methods: {
    deletePractice(practice) {
      firestore
        .reference(practice.dataPath)
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
      title: this.$options.filters.getLang(this.languageId)
    };
  }
};
</script>
