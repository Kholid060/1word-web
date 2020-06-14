<template>
  <div class="flex flex-col items-center">
    <circular-progress-ui
      stroke-width="12"
      :size="200"
      :value="score"
      :rotate="-90"
      class="final-score p-2"
    >
      <div class="text-center">
        <p
          class="text-4xl font-semibold leading-tight"
          :class="[scoreColor(score)]"
        >
          {{ score }}
        </p>
        <p class="text-light text-lg leading-tight">
          {{ correct }} of {{ $store.state.practice.length }}
        </p>
      </div>
    </circular-progress-ui>
    <h3 class="text-3xl font-semibold mt-8">Congratulations!</h3>
    <p class="text-lighter text-lg text-center my-3">
      You have done your practice, click button <br />
      below to go back to dashboard
    </p>
    <nuxt-link :to="`/dashboard/language/${$route.params.id}`" class="mt-20">
      <button-ui type="primary" style="width: 200px">Go back</button-ui>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    question: Number,
    correct: Number
  },
  computed: {
    score() {
      return Math.floor((this.correct / this.question) * 100);
    }
  },
  methods: {
    scoreColor(score) {
      if (score <= 40) {
        return 'text-danger';
      } else if (score >= 41 && score <= 75) {
        return 'text-warning';
      } else if (score >= 76) {
        return 'text-primary';
      }
    }
  }
};
</script>
<style lang="scss">
.final-score {
  @apply rounded-full;
  .circular-progress-ui__content {
    @apply rounded-full shadow-xl;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 78%;
    width: 78%;
  }
}
</style>
