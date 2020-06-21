<template>
  <card-ui no-padding-content style="overflow: visible;">
    <p slot="header">Words</p>
    <p v-if="words.length === 0" class="text-center text-lighter py-20">
      No data
    </p>
    <div v-else class="py-5 word-chart"></div>
  </card-ui>
</template>
<script>
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';
import dayjs from 'dayjs';

export default {
  data: () => ({
    chart: null
  }),
  computed: {
    words() {
      return this.$store
        .$db()
        .model('words')
        .query()
        .orderBy('timestamp', 'asc')
        .get();
    }
  },
  watch: {
    words: {
      handler() {
        this.fetchSeries().then(({ labels, data }) => {
          this.chart.update({
            labels,
            dataSets: [
              {
                name: 'Words',
                type: 'bar',
                values: data
              }
            ]
          });
        });
      }
    }
  },
  mounted() {
    this.fetchSeries().then(({ labels, data }) => {
      this.chart = new Chart(document.querySelector('.word-chart'), {
        data: {
          labels,
          datasets: [
            {
              name: 'Words',
              type: 'bar',
              values: data
            }
          ]
        },
        type: 'line',
        lineOptions: {
          regionFill: 1,
          hideDots: 1
        }
      });
    });
  },
  methods: {
    fetchSeries(formatDate = 'MMMM DD') {
      return new Promise((resolve, reject) => {
        /* eslint-disable-next-line */
        if (this.words.length === 0) reject();

        const objectData = this.words.reduce((data, word) => {
          const date = dayjs(word.timestamp).format(formatDate);

          data[date] ? (data[date] += 1) : (data[date] = 1);

          return data;
        }, {});

        resolve({
          labels: Object.keys(objectData),
          data: Object.values(objectData)
        });
      });
    }
  }
};
</script>
<style lang="scss">
.word-chart {
  .frappe-chart {
    .axis line {
      display: none;
    }
  }
}
</style>
