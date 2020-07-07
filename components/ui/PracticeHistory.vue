<template>
  <card-ui class="practice-history">
    <p slot="header">Practice History</p>
    <table class="table-auto table-ui">
      <thead>
        <tr>
          <th style="width: 150px" class="text-left">
            Date
          </th>
          <th>Wrong</th>
          <th>Correct</th>
          <th>Questions</th>
          <th>Score</th>
          <th v-show="showDelete"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginateData" :key="item.id" class="text-center">
          <td
            class="text-left"
            :title="formatDate(item.timestamp, 'DD MMMM YYYY')"
          >
            <p>{{ formatDate(item.timestamp) }}</p>
          </td>
          <td class="text-danger">{{ item.wrong }}</td>
          <td style="color: var(--green)">{{ item.correct }}</td>
          <td>{{ item.qLength }}</td>
          <td>
            <p
              class="inline-block text-white rounded-lg"
              style="padding: 5px 7px; width: 34px"
              :class="[scoreBackground(item.score)]"
            >
              {{ item.score }}
            </p>
          </td>
          <!-- <td v-if="showDelete">
            <v-mdi
              name="mdi-delete"
              class="text-danger cursor-pointer"
              @click="$emit('delete', item)"
            ></v-mdi>
          </td> -->
        </tr>
      </tbody>
    </table>
    <div class="text-center py-5">
      <circular-progress-ui v-if="loading" spinner></circular-progress-ui>
      <p v-else-if="practices.length === 0" class="text-light">
        No data
      </p>
    </div>
    <paginate-ui
      v-if="showPagination"
      v-model="currentPage"
      class="mt-8"
      :page-count="Math.ceil(practices.length / perPage)"
      :per-page.sync="perPage"
    ></paginate-ui>
  </card-ui>
</template>
<script>
import dayjs from 'dayjs';
import Language from '~/models/Language';
import Practice from '~/models/Practice';
import { normalizeData } from '~/utils/helper';
import { database } from '~/utils/firebase';

export default {
  props: {
    showDelete: Boolean,
    showPagination: Boolean
  },
  fetch() {
    const { id } = this.$route.params;
    const { localId } = this.$store.state.user;
    const { retrievePractices } = Language.find(id);

    if (retrievePractices || this.practices.length > 0) return;

    this.loading = true;

    database
      .ref(`users/${localId}/practices/${id}`)
      .get()
      .then((practices) => {
        this.loading = false;

        Practice.insert({
          data: normalizeData(practices, id)
        });

        Language.insertOrUpdate({
          data: {
            langId: id,
            retrievePractices: true
          }
        });
      })
      .catch(() => (this.loading = false));
  },
  data: () => ({
    currentPage: 0,
    perPage: 10,
    loading: false
  }),
  computed: {
    paginateData() {
      const start = this.currentPage * this.perPage;
      const end = start + this.perPage;

      return this.practices.slice(start, end);
    },
    practices() {
      return Practice.query()
        .where('langId', this.$route.params.id)
        .get();
    }
  },
  activated() {
    this.$fetch();
  },
  methods: {
    scoreBackground(score) {
      if (score <= 40) {
        return 'bg-danger';
      } else if (score >= 41 && score <= 75) {
        return 'bg-warning';
      } else if (score >= 76) {
        return 'bg-primary';
      }
    },
    formatDate(date, format = 'DD MMMM') {
      return dayjs(date).format(format);
    }
  }
};
</script>
<style>
.practice-history .card-ui__content {
  overflow: auto;
}
</style>
