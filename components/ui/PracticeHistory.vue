<template>
  <card-ui>
    <p slot="header">Practice History</p>
    <table class="table-auto table-ui">
      <thead>
        <tr>
          <th v-show="!hideName"></th>
          <th style="width: 150px" class="text-left">
            {{ !hideName ? 'Name' : 'Date' }}
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
          <template v-if="!hideName">
            <td style="width: 100px">
              <flag-ui
                size="40"
                :code="item.learnId | getLang('country')"
              ></flag-ui>
            </td>
            <td
              class="text-left"
              :title="formatDate(item.timestamp, 'DD MMMM YYYY')"
            >
              <p>{{ item.learnId | getLang }}</p>
              <p class="text-sm text-light">{{ formatDate(item.timestamp) }}</p>
            </td>
          </template>
          <template v-else>
            <td
              class="text-left"
              :title="formatDate(item.timestamp, 'DD MMMM YYYY')"
            >
              <p>{{ formatDate(item.timestamp) }}</p>
            </td>
          </template>
          <td class="text-danger">{{ item.wrong }}</td>
          <td style="color: var(--green)">{{ item.correct }}</td>
          <td>{{ item.question_length }}</td>
          <td>
            <p
              class="inline-block text-white rounded-lg"
              style="padding: 5px 7px; width: 34px"
              :class="[scoreBackground(item.score)]"
            >
              {{ item.score }}
            </p>
          </td>
          <td v-if="showDelete">
            <v-mdi
              name="mdi-delete"
              class="text-danger cursor-pointer"
              @click="$emit('delete', item)"
            ></v-mdi>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="data.length === 0" class="py-5 text-center text-light">No data</p>
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
    hideName: Boolean,
    showDelete: Boolean,
    showPagination: Boolean,
    data: Array
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
