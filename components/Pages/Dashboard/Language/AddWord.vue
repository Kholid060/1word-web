<template>
  <card-ui class="add-word" tabindex="0">
    <p slot="header">Add word</p>
    <form @submit.prevent="addWord" @keyup.enter="addWord">
      <div class="flex">
        <div
          v-tooltip.bottom="'Translate word'"
          icon
          class="mr-3 rounded-lg p-2 bg-input cursor-pointer"
          :disabled="!word"
          @click="translateWord"
        >
          <v-mdi :class="{ 'text-primary': word }" name="mdi-translate"></v-mdi>
        </div>
        <input-ui
          class="flex-1"
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
        <button-ui
          block
          :disabled="!(!!word && !!meaning)"
          type="primary"
          :loading="loading"
        >
          Add word
        </button-ui>
      </div>
    </form>
  </card-ui>
</template>
<script>
import debounce from 'lodash.debounce';
import shortid from 'shortid';
import validateWord from '~/utils/validateWord';
import firestore from '~/utils/firestore';

export default {
  data: () => ({
    word: '',
    meaning: '',
    loading: false
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
            languageId: this.$route.params.id
          });
        })
        .exists();

      this.loading = true;

      if (!isWordExist) {
        const word = {
          id: shortid.generate(),
          title: this.word,
          meaning: this.meaning,
          languageId: this.$route.params.id,
          timestamp: Date.now()
        };

        firestore
          .reference(`users/${this.$store.state.user.localId}/words`)
          .set(word)
          .then(async () => {
            await WordModel.insert({
              data: word
            });

            this.loading = false;
            this.word = this.meaning = '';
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.$toast.error(`You already add ${this.word}`);
      }
    },
    translateWord() {
      const baseURL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

      fetch(
        `${baseURL}?key=${process.env.TRANSLATE_API_KEY}&text=${this.word}&lang=${this.$route.params.id}-en`
      )
        .then((response) => response.json())
        .then(({ text }) => {
          this.meaning = text[0];
        });
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
    .hidden-input {
      opacity: 1;
      height: auto;
      visibility: visible;
    }
  }
}
</style>
