<template>
  <card-ui no-padding-content style="overflow: visible;">
    <p slot="header">Words</p>
    <div class="py-5 word-chart"></div>
  </card-ui>
</template>
<script>
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';
import dayjs from 'dayjs';
import { isObject } from '~/utils/helper';

export default {
  data: () => ({
    chart: null
  }),
  computed: {
    data() {
      return this.$store.state.chart.w;
    }
  },
  watch: {
    data: {
      handler(value) {
        if (this.chart !== null) this.chart.update(this.generateData(value));
      },
      deep: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.chart = new Chart(document.querySelector('.word-chart'), {
        data: this.generateData(this.data),
        type: 'line',
        lineOptions: {
          regionFill: 1,
          hideDots: 1
        }
      });
    }, 1000);
  },
  methods: {
    generateData(data) {
      if (!isObject(data))
        return {
          labels: [],
          datasets: []
        };

      const year = new Date().getFullYear();

      return {
        labels: Object.keys(data).map((date) =>
          dayjs(`${date}-${year}`).format('MMMM DD')
        ),
        datasets: [
          {
            name: 'Words',
            type: 'bar',
            values: Object.values(data)
          }
        ]
      };
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
