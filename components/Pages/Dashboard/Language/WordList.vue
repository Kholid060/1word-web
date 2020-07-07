<template>
  <div class="word-list">
    <failed-load-data
      v-if="error"
      :loading="loading"
      @fetch="$fetch"
    ></failed-load-data>
    <card-ui v-else>
      <template slot="header">
        <p class="text-overflow flex-auto">Word List</p>
        <input-ui
          v-model="search"
          icon="mdi-magnify"
          hide-details
          width="150px"
          placeholder="Search word"
        ></input-ui>
      </template>
      <div v-if="loading" class="text-center my-6">
        <circular-progress-ui spinner></circular-progress-ui>
      </div>
      <empty-state-ui
        v-else-if="words.length === 0"
        icon="mdi-message-processing"
        title="No Data"
        description="Add your first word."
      >
      </empty-state-ui>
      <div v-else class="word-list">
        <template v-for="word in paginateWords">
          <list-ui :key="word.id" class="list mt-3">
            <p class="text-overflow pr-2 flex-1">{{ word.title }}</p>
            <p class="text-overflow flex-1">{{ word.meaning }}</p>
            <v-popover placement="left">
              <button-ui icon small>
                <v-mdi name="mdi-dots-horizontal"></v-mdi>
              </button-ui>
              <card-ui slot="popover" class="shadow-xl border">
                <list-ui @click="$modal.show('edit-word', word)">
                  <v-mdi slot="prefix" name="mdi-pencil"></v-mdi>
                  Edit word
                </list-ui>
                <list-ui @click="deleteWord(word)">
                  <v-mdi
                    slot="prefix"
                    name="mdi-delete"
                    class="text-danger"
                  ></v-mdi>
                  Delete word
                </list-ui>
              </card-ui>
            </v-popover>
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
    <edit-word-modal></edit-word-modal>
  </div>
</template>
<script>
import EditWordModal from './EditWordModal.vue';
import FailedLoadData from '~/components/ui/FailedLoadData.vue';
import Word from '~/models/Word';
import Language from '~/models/Language';
import { database } from '~/utils/firebase';
import { normalizeData, isObject } from '~/utils/helper';

export default {
  components: { EditWordModal, FailedLoadData },
  fetch() {
    const { localId } = this.$store.state.user;
    const { id } = this.$route.params;
    const { retrieveWords } = Language.find(id);

    if (retrieveWords || this.words.length > 0) return;

    this.loading = true;

    database
      .ref(`users/${localId}/words/${id}`)
      .get()
      .then((words) => {
        this.loading = this.error = false;
        this.$emit('update:error', false);

        if (!isObject(words)) return;

        Word.insert({
          data: normalizeData(words, id)
        });

        Language.insertOrUpdate({
          data: {
            langId: id,
            retrieveWords: true
          }
        });
      })
      .catch(() => {
        this.loading = false;
        this.$emit('update:error', true);
        this.error = true;
      });
  },
  data: () => ({
    search: '',
    currentPage: 0,
    perPage: 10,
    error: false,
    loading: false
  }),
  computed: {
    words() {
      return Word.query()
        .where('langId', this.$route.params.id)
        .all();
    },
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
  activated() {
    alert('test');
    this.$emit('update:error', false);
    this.$fetch();
  },
  methods: {
    deleteWord({ id, langId }) {
      const { localId } = this.$store.state.user;

      database
        .ref(`users/${localId}/words/${langId}/${id}`)
        .remove()
        .then(() => {
          this.$store
            .$db()
            .model('words')
            .delete(id);
        });
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
