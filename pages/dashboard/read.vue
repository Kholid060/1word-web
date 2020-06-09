<template>
  <div class="read-now">
    <div class="categories mb-12 flex items-center">
      <button-ui
        :plain="activeCat !== 'all'"
        :type="activeCat === 'all' ? 'primary' : 'default'"
        @click="activeCat = 'all'"
      >
        All
      </button-ui>
      <div
        class="h-10 mx-4"
        style="width: 1px; background-color: #e2e8f0"
      ></div>
      <button-ui
        v-for="category in categories"
        :key="category"
        class="mr-2 capitalize"
        :plain="activeCat !== category"
        :type="activeCat === category ? 'primary' : 'default'"
        @click="activeCat = category"
      >
        {{ category }}
      </button-ui>
    </div>
    <div v-for="item in sources" :key="item.id" class="flex items-start mb-6">
      <flag-ui
        :code="item.id | getLang('country')"
        size="60"
        class="inline-block shadow-xl mr-5"
      ></flag-ui>
      <div>
        <a
          v-for="website in filterByCategory(item.sources)"
          :key="website.url"
          :href="website.url"
          class="inline-block pr-3 pb-2"
          target="_blank"
          rel="noreferrer"
        >
          <card-ui class="inline-block cursor-pointer" hover>
            <template slot="header">
              <div class="p-2 rounded-lg bg-light">
                <img
                  :src="
                    `https://www.google.com/s2/favicons?domain=${website.url}`
                  "
                  height="16"
                  width="16"
                />
              </div>
              <div class="flex-grow"></div>
              <p class="text-lighter">#{{ website.category }}</p>
            </template>
            <p class="text-lg font-semibold">{{ website.name }}</p>
          </card-ui>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { categories, sources } from '~/utils/readSources';

export default {
  data: () => ({
    activeCat: 'all',
    categories
  }),
  computed: {
    sources() {
      const learns = this.$store
        .$db()
        .model('learns')
        .all()
        .map((learn) => learn.learnId);

      return sources.filter((source) => {
        return (
          learns.includes(source.id) &&
          source.sources.length !== 0 &&
          this.filterByCategory(source.sources).length !== 0
        );
      });
    }
  },
  methods: {
    filterByCategory(websites) {
      return websites.filter((website) => {
        if (this.activeCat === 'all') return true;

        return website.category === this.activeCat;
      });
    }
  }
};
</script>
