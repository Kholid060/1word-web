<template>
  <div class="mb-3 language-list">
    <swiper :options="swiperOptions">
      <swiper-slide
        class="add-language py-6 px-5"
        @click.native="$modal.show('add-language')"
      >
        <button-ui icon class="shadow-xl">
          <v-mdi name="mdi-plus" class="text-primary"></v-mdi>
        </button-ui>
        <span class="ml-4">
          Add language
        </span>
      </swiper-slide>
      <template v-if="languages.length !== 0">
        <swiper-slide
          v-for="language in languages"
          :key="language.languageId"
          :title="language.languageId | getLang"
        >
          <router-link :to="`/dashboard/language/${language.languageId}`">
            <flag-card
              :id="language.languageId"
              :word-length="language.words.length"
              :active="$route.params.id === language.languageId"
            ></flag-card>
          </router-link>
        </swiper-slide>
      </template>
    </swiper>
    <add-language-modal></add-language-modal>
  </div>
</template>
<script>
import FlagCard from '~/components/ui/FlagCard.vue';
import AddLanguageModal from '~/components/ui/addLanguageModal.vue';

export default {
  components: { FlagCard, AddLanguageModal },
  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      grabCursor: true,
      spaceBetween: 30,
      freeMode: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        640: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4.2
        }
      }
    }
  }),
  computed: {
    languages() {
      return this.$store
        .$db()
        .model('languages')
        .query()
        .with('words')
        .get();
    }
  }
};
</script>
<style lang="scss" scoped>
.language-list {
  .swiper-container {
    @apply pb-6 pt-3 pr-6;
  }
  .add-language {
    @apply leading-tight rounded-lg bg-default;
    display: inline-flex;
    width: 170px;
    vertical-align: top;
    margin-right: 30px !important;
    border: 1px solid transparent;
    align-items: top;
    cursor: pointer;
    transition: border 200ms ease;
    &:hover {
      @apply border-primary #{!important};
    }
  }
}
</style>
