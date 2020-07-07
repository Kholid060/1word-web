<template>
  <card-ui style="overflow: visible;">
    <p slot="header">
      <span class="mr-2">Practice Total</span>
      <span
        class="rounded-md bg-primary text-white inline-block text-center"
        style="padding: 2px 0; width: 30px"
      >
        {{ sumLength }}
      </span>
    </p>
    <p v-if="Object.values(data).length === 0" class="text-lighter text-center">
      No data
    </p>
    <div v-else id="practice-chart"></div>
  </card-ui>
</template>
<script>
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';
import { languageFilter } from '~/utils/getLang';

export default {
  computed: {
    sumLength() {
      return Object.values(this.data).reduce((sum, item) => sum + item, 0) || 0;
    },
    data() {
      return this.$store.state.chart.pt;
    }
  },
  mounted() {
    if (Object.keys(this.data).length === 0) return;

    const generateData = (data) => {
      return {
        labels: Object.keys(data).map((id) => languageFilter(id)),
        datasets: [
          {
            name: 'Practice',
            type: 'bar',
            values: Object.values(data)
          }
        ]
      };
    };

    const chart = new Chart('#practice-chart', {
      data: generateData(this.data),
      barOptions: {
        spaceRatio: 0.2
      },
      tooltipOptions: {
        formatTooltipY: (d) => `${d}x`
      },
      type: 'bar',
      height: 200
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
