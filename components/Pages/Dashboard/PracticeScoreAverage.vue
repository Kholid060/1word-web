<template>
  <card-ui>
    <template slot="header">
      <skeleton-box-ui v-if="loading" type="text" />
      <p v-else>Score Average</p>
    </template>
    <skeleton-box-ui v-if="loading" height="160px" width="100%" />
    <div v-else class="text-center">
      <circular-progress-ui
        stroke-width="12"
        :size="160"
        :value="scoreAverage"
        :rotate="-90"
        class="average-chart p-2"
      >
        <p class="text-3xl font-semibold leading-tight">{{ scoreAverage }}</p>
        <p class="text-lighter">Score</p>
      </circular-progress-ui>
    </div>
  </card-ui>
</template>
<script>
export default {
  props: {
    loading: Boolean
  },
  computed: {
    scoreAverage() {
      const practiceScores = Object.values(this.$store.state.chart.sa);

      if (practiceScores.length === 0) return 0;

      const sumScores = practiceScores.reduce((sum, score) => sum + score, 0);

      return Math.floor(sumScores / practiceScores.length);
    }
  }
};
</script>
