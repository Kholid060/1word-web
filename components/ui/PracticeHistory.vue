<template>
  <card-ui class="practice-history">
    <template slot="header">
      <skeleton-box-ui v-if="loading" type="text" />
      <p v-else>Practice History</p>
    </template>
    <skeleton-box-ui v-if="loading" height="170px" width="100%" />
    <table v-else class="table-auto table-ui">
      <thead>
        <tr>
          <th v-if="showFlag"></th>
          <th v-else style="width: 150px" class="text-left">
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
          <td v-if="showFlag" style="width: 70px">
            <flag-ui :code="item.langId | getLang('country')"></flag-ui>
          </td>
          <td
            v-else
            class="text-left"
            :title="formatDate(item.timestamp, 'DD MMMM YYYY')"
          >
            <p>{{ formatDate(item.timestamp) }}</p>
          </td>
          <td class="text-danger">{{ item.wrong }}</td>
          <td style="color: var(--green)">{{ item.correct }}</td>
          <td>{{ item.correct + item.wrong }}</td>
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
    <p
      v-show="data.length === 0 && !loading"
      class="text-light text-center py-5"
    >
      No data
    </p>
    <paginate-ui
      v-if="showPagination"
      v-model="currentPage"
      class="mt-8"
      :page-count="Math.ceil(data.length / perPage)"
      :per-page.sync="perPage"
    ></paginate-ui>
  </card-ui>
</template>
<script>
import dayjs from 'dayjs';

export default {
  props: {
    showDelete: Boolean,
    showPagination: Boolean,
    showFlag: Boolean,
    loading: Boolean,
    data: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    currentPage: 0,
    perPage: 10
  }),
  computed: {
    paginateData() {
      const start = this.currentPage * this.perPage;
      const end = start + this.perPage;

      return this.data.slice(start, end);
    }
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
