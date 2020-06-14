<template>
  <card-ui style="overflow: visible;">
    <p slot="header">
      <span class="mr-2">Practice Total</span>
      <span
        class="rounded-md bg-primary text-white inline-block text-center"
        style="padding: 2px 0; width: 30px"
      >
        {{ data.length }}
      </span>
    </p>
    <p v-if="data.length === 0" class="text-lighter text-center">
      No data
    </p>
    <div v-else id="practice-chart"></div>
  </card-ui>
</template>
<script>
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';
import { languageFilter } from '~/utils/getLang';

export default {
  props: {
    data: Array
  },
  data: () => ({
    chart: null
  }),
  watch: {
    data: {
      handler() {
        this.fetchData().then(({ labels, data }) => {
          this.chart.update({
            labels,
            datasets: [
              {
                name: 'Practice',
                type: 'bar',
                values: data
              }
            ]
          });
        });
      },
      deep: true
    }
  },
  mounted() {
    this.fetchData().then(({ labels, data }) => {
      this.chart = new Chart('#practice-chart', {
        data: {
          labels,
          datasets: [
            {
              name: 'Practice',
              type: 'bar',
              values: data
            }
          ]
        },
        barOptions: {
          spaceRatio: 0.2
        },
        tooltipOptions: {
          formatTooltipY: (d) => `${d}x`
        },
        type: 'bar',
        height: 200
      });
    });
  },
  methods: {
    fetchData() {
      return new Promise((resolve, reject) => {
        if (this.data.length === 0) reject(new Error('Empty data'));

        const objectData = this.data.reduce((data, { languageId }) => {
          const countryName = languageFilter(languageId);

          data[countryName]
            ? (data[countryName] += 1)
            : (data[countryName] = 1);

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
#practice-chart {
  .frappe-chart {
    .axis {
      &.y text,
      line {
        display: none;
      }
    }
  }
}
</style>
