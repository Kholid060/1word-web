<template>
  <card-ui no-padding-content style="overflow: visible;">
    <p slot="header">Words</p>
    <p
      v-if="Object.keys(data).length === 0"
      class="text-center text-lighter py-20"
    >
      No data
    </p>
    <div v-else class="py-5 word-chart"></div>
  </card-ui>
</template>
<script>
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';
import dayjs from 'dayjs';

export default {
  computed: {
    data() {
      return this.$store.state.chart.w;
    }
  },
  mounted() {
    if (Object.keys(this.data).length === 0) return;

    const generateData = (data) => {
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
    };

    const chart = new Chart(document.querySelector('.word-chart'), {
      data: generateData(this.data),
      type: 'line',
      lineOptions: {
        regionFill: 1,
        hideDots: 1
      }
    });

    this.$watch(
      () => this.data,
      (value) => {
        chart.update({
          data: generateData(value)
        });
      },
      { deep: true }
    );
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
