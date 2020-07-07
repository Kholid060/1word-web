<template>
  <card-ui>
    <template slot="header">
      <p class="flex-grow">Reading List</p>
      <nuxt-link to="/dashboard/read">View all</nuxt-link>
    </template>
    <p v-if="languages.length === 0" class="text-lighter text-center">
      No data
    </p>
    <template v-else>
      <list-ui
        v-for="source in sources.sources"
        :key="source.url"
        tag="a"
        :href="source.url"
        target="_blank"
        rel="noreferrer"
      >
        <flag-ui slot="prefix" :code="sources.id" size="36"></flag-ui>
        <div class="content flex-grow">
          <p class="leading-tight text-default">{{ source.name }}</p>
          <p class="leading-tight text-lighter">#{{ source.category }}</p>
        </div>
        <button-ui icon>
          <v-mdi name="mdi-arrow-right" :rotate="-45"></v-mdi>
        </button-ui>
      </list-ui>
    </template>
  </card-ui>
</template>
<script>
import readSources from '~/utils/readSources';

export default {
  computed: {
    languages() {
      return this.$store
        .$db()
        .model('languages')
        .all();
    },
    sources() {
      if (this.languages.length === 0) return;

      const { langId } = this.languages[0];
      const { id, sources } = readSources.find(({ id }) => id === langId);

      return {
        id,
        sources: sources.slice(0, 5)
      };
    }
  }
};
</script>
