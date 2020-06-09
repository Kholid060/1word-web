<template>
  <card-ui>
    <template slot="header">
      <p>Word List</p>
      <div class="flex-grow"></div>
      <input-ui
        v-model="search"
        icon="mdi-magnify"
        width="150px"
        placeholder="Search word"
      ></input-ui>
    </template>
    <empty-state-ui
      v-if="words.length === 0"
      icon="mdi-message-processing"
      title="No Data"
      description="Add your first word."
    >
    </empty-state-ui>
    <div v-else class="word-list">
      <template v-for="word in paginateWords">
        <list-ui
          :key="word.id"
          class="list mt-3"
          :active="activeEdit === word.id"
        >
          <template v-if="activeEdit === word.id">
            <form
              class="flex-grow"
              @keyup.esc="clearAll"
              @keyup.enter="updateWord(word)"
            >
              <input-ui
                class="w-5/12 mr-3"
                :value="tempWord"
                placeholder="Word"
                type="background"
                @input="inputTempWord"
              ></input-ui>
              <input-ui
                v-model="tempMeaning"
                class="w-6/12"
                placeholder="Meaning"
                type="background"
              ></input-ui>
            </form>
            <div class="self-center" style="width: 80px;">
              <v-mdi
                name="mdi-close"
                title="edit"
                class="text-light"
                size="24"
                @click="clearAll"
              ></v-mdi>
              <v-mdi
                name="mdi-check"
                title="edit"
                class="text-primary ml-2"
                size="24"
                @click="updateWord(word)"
              ></v-mdi>
            </div>
          </template>
          <template v-else>
            <p class="text-overflow pr-2 w-5/12">{{ word.title }}</p>
            <p class="text-overflow w-5/12">{{ word.meaning }}</p>
            <div class="w-2/12 text-right self-center">
              <v-mdi
                name="mdi-pencil"
                title="edit"
                class="text-light edit-btn"
                size="24"
                @click="setEditWord(word)"
              ></v-mdi>
              <v-mdi
                name="mdi-delete"
                title="delete"
                class="text-danger ml-2"
                size="24"
                @click="deleteWord(word.id)"
              ></v-mdi>
            </div>
          </template>
        </list-ui>
      </template>
      <p
        v-show="filteredWords.length === 0"
        class="text-center text-light mt-8 mb-12"
      >
        Can't find <b>{{ search }}</b>
      </p>
      <paginate-ui
        v-model="currentPage"
        class="mt-8"
        :page-count="Math.ceil(words.length / perPage)"
        :per-page.sync="perPage"
      ></paginate-ui>
    </div>
  </card-ui>
</template>
<script>
import debounce from 'lodash.debounce';
import validateWord from '~/utils/validateWord';

export default {
  props: {
    words: Array
  },
  data: () => ({
    activeEdit: '',
    tempWord: '',
    search: '',
    tempMeaning: '',
    currentPage: 0,
    perPage: 10
  }),
  computed: {
    filteredWords() {
      return this.words.filter(({ title }) => {
        return title.toLowerCase().match(this.search.toLowerCase());
      });
    },
    paginateWords() {
      const start = this.currentPage * this.perPage;
      const end = start + this.perPage;

      return this.filteredWords.slice(start, end);
    }
  },
  methods: {
    inputTempWord: debounce(function(input) {
      this.tempWord = input.replace(/\s/g, '');
    }, 400),
    setEditWord({ title, meaning, id }) {
      this.tempWord = title;
      this.tempMeaning = meaning;
      this.activeEdit = id;
    },
    deleteWord(wordId) {
      this.$store
        .$db()
        .model('words')
        .delete(wordId);
    },
    updateWord(word) {
      if (this.tempWord.trim() === '') return;

      const WordModel = this.$store.$db().model('words');

      const isWordExist = WordModel.query()
        .where((wordQuery) => {
          return validateWord(wordQuery, word) && wordQuery.id !== word.id;
        })
        .exists();

      if (!isWordExist) {
        WordModel.update({
          where: word.id,
          data: {
            title: this.tempWord,
            meaning: this.tempMeaning
          }
        }).then(() => {
          this.clearAll();
        });
      } else {
        this.$toast.error(`You already add ${this.tempWord}`);
      }
    },
    clearAll() {
      this.activeEdit = this.tempWord = this.tempMeaning = '';
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  cursor: pointer;
  .edit-btn {
    visibility: hidden;
    opacity: 1;
  }
  p,
  div {
    display: inline-block;
  }
  svg {
    display: inline-block;
  }
  &:hover {
    .edit-btn {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
