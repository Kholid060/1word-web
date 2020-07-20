<template>
  <div class="home-page">
    <language-list></language-list>
    <failed-load-data
      v-if="error"
      :loading="loading"
      @fetch="$fetch"
    ></failed-load-data>
    <template v-else>
      <word-chart :loading="loading" class="col-span-3"></word-chart>
      <div class="mt-6 flex items-start flex-col lg:flex-row">
        <practice-history
          :loading="loading"
          :data="$store.state.chart.practices"
          class="w-full lg:w-8/12"
          show-flag
        ></practice-history>
        <div class="mt-6 lg:mt-0 lg:ml-6 w-full lg:w-4/12">
          <practice-total :loading="loading"></practice-total>
          <practice-score-average
            class="mt-6"
            :loading="loading"
          ></practice-score-average>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import WordChart from '~/components/Pages/Dashboard/WordChart.vue';
import PracticeHistory from '~/components/ui/PracticeHistory.vue';
import PracticeTotal from '~/components/Pages/Dashboard/PracticeTotal.vue';
import PracticeScoreAverage from '~/components/Pages/Dashboard/PracticeScoreAverage.vue';
import LanguageList from '~/components/Pages/Dashboard/LanguageList.vue';
import FailedLoadData from '~/components/ui/FailedLoadData.vue';
import { request } from '~/utils/firebase';

export default {
  components: {
    WordChart,
    LanguageList,
    PracticeTotal,
    FailedLoadData,
    PracticeHistory,
    PracticeScoreAverage
  },
  async fetch() {
    try {
      const { chart } = this.$store.state;

      if (!chart.isRetrieved) {
        const data = await Promise.all([
          request('/chart'),
          request('/practice/recent')
        ]);
        const { charts } = data[0];
        const practices = Object.keys(data[1].practices).map((id) => ({
          id,
          ...practices[id]
        }));

        this.error = false;
        this.$store.commit('updateState', {
          key: 'chart',
          data: {
            ...chart,
            ...charts,
            practices,
            isRetrieved: true
          }
        });
      }

      this.error = false;
    } catch (err) {
      console.log(err);
      this.error = true;
    }
  },
  data: () => ({
    error: false
  }),
  computed: {
    loading() {
      return this.$fetchState.pending;
    }
  },
  head() {
    return {
      title: 'Dashboard',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css'
        }
      ]
    };
  }
};
</script>
