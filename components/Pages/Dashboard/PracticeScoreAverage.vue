<template>
  <card-ui>
    <p slot="header">Score Average</p>
    <div class="text-center">
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
  computed: {
    scoreAverage() {
      const practiceScores = this.$store.state.chart.sa;
      const sumScores = practiceScores.reduce((sum, score) => sum + score, 0);

      return Math.floor(sumScores / practiceScores.length);
    }
  }
};
</script>
