<template>
  <card-ui class="add-word" tabindex="0">
    <p slot="header">Add word</p>
    <form @submit.prevent="addWord">
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
          :error="$v.word.$invalid && $v.word.$dirty"
          placeholder="Word"
          @input="inputWord"
        ></input-ui>
      </div>
      <div class="hidden-input">
        <div class="mt-4 mb-8">
          <textarea-ui
            v-model="meaning"
            placeholder="Meaning"
            min-height="100px"
            :error="$v.meaning.$invalid && $v.meaning.$dirty"
            hide-details
            :disabled="isTranslating"
            block
          ></textarea-ui>
          <p class="text-right text-lighter">{{ meaning.length }}/50</p>
        </div>
        <button-ui
          block
          :disabled="$v.$invalid"
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
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import debounce from 'lodash.debounce';
import Word from '~/models/Word';
import { validateWord } from '~/utils/helper';
import { request } from '~/utils/firebase';

export default {
  mixins: [validationMixin],
  data: () => ({
    word: '',
    meaning: '',
    loading: false,
    isTranslating: false
  }),
  methods: {
    inputWord: debounce(function(value) {
      /* eslint-disable-next-line */
      const specialCharsRegex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s]/gi;

      this.word = value.replace(specialCharsRegex, '');
    }, 500),
    addWord() {
      if (this.$v.$invalid) return;

      const isWordExist = Word.query()
        .where((word) => {
          return validateWord(word, {
            title: this.word,
            langId: this.$route.params.id
          });
        })
        .exists();

      this.loading = true;

      if (!isWordExist) {
        const word = {
          title: this.word,
          meaning: this.meaning,
          langId: this.$route.params.id
        };

        request('/word', {
          method: 'POST',
          body: JSON.stringify({ word })
        })
          .then(({ word }) => {
            Word.insert({
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
      if (this.word === '') return;

      this.isTranslating = true;

      request(`/translate?text=${this.word}&lang=${this.$route.params.id}-en`)
        .then(({ text }) => {
          this.isTranslating = false;
          this.meaning = text[0];
        })
        .catch(() => {
          this.isTranslating = false;
        });
    }
  },
  validations: {
    word: {
      required
    },
    meaning: {
      required,
      maxLength: maxLength(50)
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
