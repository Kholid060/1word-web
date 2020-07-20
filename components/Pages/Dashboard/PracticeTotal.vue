<template>
  <card-ui style="overflow: visible;">
    <template slot="header">
      <skeleton-box-ui v-if="loading" type="text"></skeleton-box-ui>
      <p v-else>
        <span class="mr-2">Practice Total</span>
        <span
          class="rounded-md bg-primary text-white inline-block text-center"
          style="padding: 2px 0; width: 30px"
        >
          {{ sumLength }}
        </span>
      </p>
    </template>
    <skeleton-box-ui v-if="loading" width="100%" height="150px" />
    <chartist v-else ratio="" type="Pie" v-bind="{ data }"></chartist>
  </card-ui>
</template>
<script>
import { isEmptyObject } from '~/utils/helper';

export default {
  props: {
    loading: Boolean
  },
  computed: {
    sumLength() {
      return (
        Object.values(this.$store.state.chart.pt).reduce(
          (sum, item) => sum + item,
          0
        ) || 0
      );
    },
    data() {
      const practiceTotal = this.$store.state.chart.pt;

      if (isEmptyObject(practiceTotal)) return { labels: [], series: [] };

      return {
        labels: Object.keys(practiceTotal).map(
          (id) => `${id.toUpperCase()}: ${practiceTotal[id]}`
        ),
        series: Object.values(practiceTotal)
      };
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
