<template>
  <card-ui style="overflow: visible;" class="word-chart">
    <template slot="header">
      <skeleton-box-ui v-if="loading" type="text" />
      <p v-else>Words</p>
    </template>
    <skeleton-box-ui v-if="loading" height="250px" width="100%" />
    <chartist v-else ratio="" type="Line" v-bind="{ options, data }"></chartist>
  </card-ui>
</template>
<script>
import dayjs from 'dayjs';
import { isEmptyObject } from '~/utils/helper';

export default {
  props: {
    loading: Boolean
  },
  data: () => ({
    options: {
      height: 300,
      showArea: true,
      width: 872
    }
  }),
  computed: {
    data() {
      const words = this.$store.state.chart.w;

      if (isEmptyObject(words)) return { labels: [], series: [] };

      const year = new Date().getFullYear();
      return {
        labels: Object.keys(words).map((date) =>
          dayjs(`${date}-${year}`).format('MMMM DD')
        ),
        series: [Object.values(words)]
      };
    }
  }
};
</script>
<style lang="scss">
.word-chart {
  .card-ui__content {
    overflow: auto;
  }
}
</style>
