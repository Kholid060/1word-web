<template>
  <div class="home-page">
    <word-chart class="col-span-3"></word-chart>
    <div class="mt-6 flex items-start flex-col lg:flex-row">
      <practice-history
        :data="practices.slice(0, 5)"
        class="w-full lg:w-8/12"
      ></practice-history>
      <div class="mt-6 lg:mt-0 lg:ml-6 w-full lg:w-4/12">
        <practice-total :data="practices"></practice-total>
        <practice-score-average
          :data="practices"
          class="mt-6"
        ></practice-score-average>
      </div>
    </div>
  </div>
</template>
<script>
import PracticeHistory from '~/components/ui/PracticeHistory.vue';
import WordChart from '~/components/Pages/Dashboard/WordChart.vue';
import PracticeTotal from '~/components/Pages/Dashboard/PracticeTotal.vue';
import PracticeScoreAverage from '~/components/Pages/Dashboard/PracticeScoreAverage.vue';

export default {
  components: {
    WordChart,
    PracticeHistory,
    PracticeTotal,
    PracticeScoreAverage
  },
  computed: {
    practices() {
      return this.$store
        .$db()
        .model('practices')
        .all();
    }
  }
};
</script>
