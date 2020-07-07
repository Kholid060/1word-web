<template>
  <div class="home-page">
    <div v-if="$fetchState.pending" class="text-center my-12">
      <circular-progress-ui spinner></circular-progress-ui>
    </div>
    <template v-else>
      <failed-load-data
        v-if="error"
        :loading="$fetchState.pending"
        @fetch="$fetch"
      ></failed-load-data>
      <template v-else>
        <language-list></language-list>
        <word-chart class="col-span-3"></word-chart>
        <div class="mt-6 flex items-start flex-col lg:flex-row">
          <reading-list class="w-full lg:w-8/12"></reading-list>
          <div class="mt-6 lg:mt-0 lg:ml-6 w-full lg:w-4/12">
            <practice-total></practice-total>
            <practice-score-average class="mt-6"></practice-score-average>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import WordChart from '~/components/Pages/Dashboard/WordChart.vue';
import ReadingList from '~/components/Pages/Dashboard/ReadingList.vue';
import PracticeTotal from '~/components/Pages/Dashboard/PracticeTotal.vue';
import PracticeScoreAverage from '~/components/Pages/Dashboard/PracticeScoreAverage.vue';
import LanguageList from '~/components/Pages/Dashboard/LanguageList.vue';
import FailedLoadData from '~/components/ui/FailedLoadData.vue';
import { database } from '~/utils/firebase';
import { isObject } from '~/utils/helper';

export default {
  components: {
    WordChart,
    ReadingList,
    LanguageList,
    PracticeTotal,
    FailedLoadData,
    PracticeScoreAverage
  },
  fetch() {
    const { user, chart: defaultChart } = this.$store.state;

    if (!defaultChart.isRetrieved) {
      database
        .ref(`users/${user.localId}/charts`)
        .get()
        .then((chart) => {
          if (!isObject(chart)) return;

          this.error = false;
          this.$store.commit('updateState', {
            key: 'chart',
            data: {
              ...defaultChart,
              ...chart,
              isRetrieved: true
            }
          });
        })
        .catch(() => {
          this.error = true;
        });
    }
  },
  data: () => ({
    error: false
  }),
  head() {
    return {
      title: 'Dashboard'
    };
  }
};
</script>
