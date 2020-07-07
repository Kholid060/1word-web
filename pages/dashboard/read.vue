<template>
  <div class="read-now">
    <div class="categories mb-12 overflow-auto pb-4 flex items-center">
      <button-ui
        :plain="activeCat !== 'all'"
        :type="activeCat === 'all' ? 'primary' : 'default'"
        class="mr-2"
        @click="activeCat = 'all'"
      >
        All
      </button-ui>
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
    <div v-for="item in sources" :key="item.id" class="mb-8">
      <div class="mb-6 flex items-center">
        <flag-ui
          :code="item.id | getLang('country')"
          size="60"
          class="inline-block shadow-xl mr-5"
        ></flag-ui>
        <div class="inline-block">
          <p class="font-semibold">
            {{ item.id | getLang('name') }}
          </p>
          <p class="text-lighter">
            {{ item.id | getLang('native') }}
          </p>
        </div>
      </div>
      <glider-carousel class="pr-6">
        <div
          v-for="website in filterByCategory(item.sources)"
          :key="website.url"
          class="pt-1 pb-4"
        >
          <a :href="website.url" target="_blank" rel="noreferrer">
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
              <p class="text-lg font-semibold text-overflow">
                {{ website.name }}
              </p>
            </card-ui>
          </a>
        </div>
      </glider-carousel>
    </div>
  </div>
</template>
<script>
import { categories, sources } from '~/utils/readSources';
import GliderCarousel from '~/components/ui/GliderCarousel.vue';

export default {
  components: { GliderCarousel },
  data: () => ({
    activeCat: 'all',
    categories
  }),
  computed: {
    sources() {
      const languages = this.$store
        .$db()
        .model('languages')
        .all()
        .map((language) => language.langId);

      return sources.filter((source) => {
        return (
          languages.includes(source.id) &&
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
  },
  head() {
    return {
      title: 'Read'
    };
  }
};
</script>
