<template>
  <div class="mb-3 language-list">
    <div v-if="loading" class="mb-6 mt-3 flex">
      <flag-card
        v-for="i in 2"
        :key="i"
        :loading="true"
        class="mr-6"
      ></flag-card>
    </div>
    <template v-else>
      <card-ui v-if="error" class="inline-block text-center">
        <p>Failed to load languages</p>
        <button-ui class="mt-3" block>Retry</button-ui>
      </card-ui>
      <glider-carousel v-else ref="glider">
        <div class="pr-6 mb-6 mt-3">
          <div
            class="add-language py-6 px-5 rounded-lg bg-default"
            :class="{ pulse: languages.length === 0 }"
            @click="$modal.show('add-language')"
          >
            <button-ui icon class="shadow-xl">
              <v-mdi name="mdi-plus" class="text-primary"></v-mdi>
            </button-ui>
            <span class="ml-4">
              Add language
            </span>
          </div>
        </div>
        <template v-if="languages.length !== 0">
          <div
            v-for="language in languages"
            :key="language.langId"
            :title="language.langId | getLang"
            class="pr-6 mb-6 mt-3"
          >
            <router-link :to="`/dashboard/language/${language.langId}`">
              <flag-card
                :id="language.langId"
                :active="$route.params.id === language.langId"
              ></flag-card>
            </router-link>
          </div>
        </template>
      </glider-carousel>
    </template>
    <add-language-modal></add-language-modal>
  </div>
</template>
<script>
import FlagCard from '~/components/ui/FlagCard.vue';
import AddLanguageModal from '~/components/ui/addLanguageModal.vue';
import GliderCarousel from '~/components/ui/GliderCarousel.vue';
import Language from '~/models/Language';
import { request } from '~/utils/firebase';

export default {
  components: { FlagCard, AddLanguageModal, GliderCarousel },
  fetch() {
    if (this.$store.state.retrieveLanguage) return;
    this.loading = true;

    request('/language')
      .then(({ languages }) => {
        this.$store.dispatch('entities/create', {
          entity: 'languages',
          data: languages.map((langId) => ({ langId }))
        });
        this.error = false;
        this.loading = false;
        this.$store.commit('updateState', {
          key: 'retrieveLanguage',
          data: true
        });
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
      });
  },
  data: () => ({
    loading: false,
    error: false
  }),
  computed: {
    languages() {
      return Language.all();
    }
  },
  mounted() {
    this.$watch(
      () => this.languages,
      () => this.$refs.glider.carousel.refresh(true),
      { deep: true }
    );
  }
};
</script>
<style lang="scss" scoped>
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 82, 204, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(0, 82, 204, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 82, 204, 0);
  }
}

.pulse {
  animation: pulse 1.5s infinite;
}

.language-list {
  .slick-list {
    padding: 10px !important;
  }
  .add-language {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid transparent;
    cursor: pointer;
    transition: border 200ms ease;
    &:hover {
      @apply border-primary #{!important};
    }
  }
}
</style>
