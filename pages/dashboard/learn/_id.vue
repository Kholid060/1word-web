<template>
  <div class="flex">
    <div class="sidebar mr-6">
      <div style="width: 270px">
        <learn-card
          :practice-length="learn.practices.length"
          :word-length="learn.words.length"
          :learn-id="learnId"
          @delete="deleteLearn"
        ></learn-card>
        <practice-card :word-length="learn.words.length"></practice-card>
      </div>
    </div>
    <div class="main-content flex-1">
      <add-word></add-word>
      <word-list :words="learn.words" class="mt-6"></word-list>
      <practice-history
        class="mt-6"
        :data="learn.practices"
        hide-name
        show-pagination
        show-delete
        @delete="deletePractice"
      ></practice-history>
    </div>
  </div>
</template>
<script>
import LearnCard from '~/components/Pages/Dashboard/Learn/LearnCard.vue';
import WordList from '~/components/Pages/Dashboard/Learn/WordList.vue';
import AddWord from '~/components/Pages/Dashboard/Learn/AddWord.vue';
import PracticeCard from '~/components/Pages/Dashboard/Learn/PracticeCard.vue';
import PracticeHistory from '~/components/ui/PracticeHistory.vue';

export default {
  components: { LearnCard, WordList, AddWord, PracticeCard, PracticeHistory },
  computed: {
    LearnModel() {
      return this.$store.$db().model('learns');
    },
    learnId() {
      return this.$route.params.id;
    },
    learn() {
      return (
        this.LearnModel.query()
          .where('learnId', this.learnId)
          .withAll()
          .first() || { empty: true, practices: [], words: [] }
      );
    }
  },
  watch: {
    learn: {
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
      this.$store
        .$db()
        .models('practices')
        .delete(practice.$id);
    },
    deleteLearn() {
      this.$store
        .$db()
        .model('learns')
        .delete(this.learn.$id)
        .then(() => {
          if (this.LearnModel.all().length === 0)
            this.$router.push({ path: '/welcome', query: { id: 'add-learn' } });
          else this.$router.push('/');
        });
    }
  }
};
</script>
