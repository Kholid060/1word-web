<template>
  <card-ui class="add-word" tabindex="0">
    <p slot="header">Add word</p>
    <form @submit.prevent="addWord" @keyup.enter="addWord">
      <div class="flex">
        <div class="p-2 text-lighter rounded-lg word-dec bg-input mr-3">
          <v-mdi name="mdi-message-processing"></v-mdi>
        </div>
        <input-ui
          class="flex-grow"
          :value="word"
          hide-details
          placeholder="Word"
          @input="inputWord"
        ></input-ui>
      </div>
      <div class="hidden-input">
        <textarea-ui
          v-model="meaning"
          placeholder="Meaning"
          min-height="100px"
          block
          class="mt-4 mb-8"
        ></textarea-ui>
        <button-ui block :disabled="!(!!word && !!meaning)" type="primary">
          Add word
        </button-ui>
      </div>
    </form>
  </card-ui>
</template>
<script>
import debounce from 'lodash.debounce';
import validateWord from '~/utils/validateWord';

export default {
  data: () => ({
    word: '',
    meaning: ''
  }),
  methods: {
    inputWord: debounce(function(value) {
      this.word = value.replace(/\s/g, '');
    }, 500),
    addWord() {
      if (this.word === '' && this.meaning === '') return;

      const WordModel = this.$store.$db().model('words');

      const isWordExist = WordModel.query()
        .where((word) => {
          return validateWord(word, {
            title: this.word,
            learnId: this.$route.params.id
          });
        })
        .exists();

      if (!isWordExist) {
        WordModel.insert({
          data: {
            title: this.word,
            meaning: this.meaning,
            learnId: this.$route.params.id,
            timestamp: Date.now()
          }
        }).then(() => {
          this.word = this.meaning = '';
        });
      } else {
        this.$toast.error(`You already add ${this.word}`);
      }
    }
  }
};
</script>
<style lang="scss">
.hidden-input {
  visibility: hidden;
  transition: all 0.2s ease;
  height: 0;
  overflow: hidden;
  opacity: 0;
}
.add-word {
  &:focus-within,
  &:focus {
    @apply shadow-xl;
    outline: none;
    .word-dec {
      @apply bg-input-dark;
    }
    .hidden-input {
      opacity: 1;
      height: auto;
      visibility: visible;
    }
  }
}
</style>
