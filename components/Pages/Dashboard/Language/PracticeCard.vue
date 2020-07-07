<template>
  <card-ui class="sticky" style="top: 30px">
    <p slot="header">Practice</p>
    <p v-if="wordLength < 10" class="text-center">
      You need at least 10 words to start practice
    </p>
    <template v-else>
      <div class="w-full flex mt-3">
        <input
          v-model="questionLength"
          min="10"
          type="number"
          class="rounded-lg px-5 font-semibold w-10/12 mr-4 bg-input appearance-none text-2xl"
        />
        <div class="w-2/12">
          <button-ui
            icon
            :disabled="questionLength >= wordLength"
            @click="incNumber"
          >
            <v-mdi name="mdi-plus"></v-mdi>
          </button-ui>
          <button-ui
            icon
            class="mt-2"
            :disabled="questionLength <= 10"
            @click="decNumber"
          >
            <v-mdi name="mdi-minus"></v-mdi>
          </button-ui>
        </div>
      </div>
      <p class="text-center mb-8 mt-5 font-semibold">Questions</p>
      <p v-show="isNotValid" class="text-center">
        Must be ≥ 10 and ≤ {{ wordLength }}
      </p>
      <button-ui
        type="primary"
        block
        class="mt-6"
        :disabled="isNotValid"
        @click="startPractice"
      >
        Start practice
      </button-ui>
    </template>
  </card-ui>
</template>
<script>
import Word from '~/models/Word';

export default {
  data: () => ({
    questionLength: 10
  }),
  computed: {
    wordLength() {
      return Word.query()
        .where('langId', this.$route.params.id)
        .count();
    },
    isNotValid() {
      return this.questionLength < 10 || this.questionLength > this.wordLength;
    }
  },
  methods: {
    incNumber() {
      if (this.questionLength >= this.wordLength) return;

      this.questionLength += 1;
    },
    decNumber() {
      if (this.questionLength <= 10) return;

      this.questionLength -= 1;
    },
    startPractice() {
      if (this.wordLength < 10) return;

      this.$store.commit('updateState', {
        key: 'practice',
        data: {
          valid: true,
          length: this.questionLength
        }
      });

      this.$router.push(`/practice/${this.$route.params.id}`);
    }
  }
};
</script>
<style scoped lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  text-align: center;
  &:focus {
    @apply bg-input-dark;
    outline: none;
  }
}
</style>
