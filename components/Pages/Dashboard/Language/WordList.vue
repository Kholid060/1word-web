<template>
  <div class="word-list">
    <failed-load-data
      v-if="error"
      :loading="loading"
      @fetch="$fetch"
    ></failed-load-data>
    <card-ui v-else>
      <template slot="header">
        <div v-if="loading" class="flex-auto">
          <skeleton-box-ui type="text" />
        </div>
        <p v-else class="text-overflow flex-auto">Word List</p>
        <input-ui
          v-model="search"
          icon="mdi-magnify"
          hide-details
          width="150px"
          placeholder="Search word"
        ></input-ui>
      </template>
      <skeleton-box-ui v-if="loading" height="200px" width="100%" />
      <div v-else class="word-list">
        <word-component :words="paginateWords"></word-component>
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
import WordComponent from './Words.vue';
import Word from '~/models/Word';
import FailedLoadData from '~/components/ui/FailedLoadData.vue';
import Language from '~/models/Language';
import { request } from '~/utils/firebase';
import { normalizeData, isObject } from '~/utils/helper';

export default {
  components: { EditWordModal, FailedLoadData, WordComponent },
  fetch() {
    const { id } = this.$route.params;
    const { retrieveWords } = Language.find(id);

    if (retrieveWords || this.words.length > 0) return;

    this.loading = true;

    request(`/word?langId=${id}`)
      .then(({ words }) => {
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
