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
  props: {
    data: Array
  },
  computed: {
    scoreAverage() {
      if (this.data.length === 0) return 0;

      const sum = this.data.reduce((curr, acc) => (curr += acc.score), 0);

      return Math.floor(sum / this.data.length);
    }
  }
};
</script>
