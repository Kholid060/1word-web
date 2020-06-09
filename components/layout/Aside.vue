<template>
  <aside class="bg-default fixed h-full top-0 right-0" style="width: 300px">
    <div class="flex flex-col content h-full">
      <div class="flex justify-between items-center pt-10 px-6 w-full">
        <p class="text-light text-lg">Learns</p>
        <v-popover placement="left">
          <button-ui v-tooltip.left="'Add language'" icon class="shadow-xl">
            <v-mdi name="mdi-plus" class="text-primary"></v-mdi>
          </button-ui>
          <card-ui
            slot="popover"
            class="shadow-xl border max-w-sm"
            no-padding-content
            width="260px"
          >
            <p slot="header">Add learn</p>
            <div class="overflow-auto px-5 my-5" style="max-height: 300px">
              <list-ui
                v-for="learn in filteredLearns"
                :key="learn"
                v-close-popover
                class="cursor-pointer"
                dense
                @click="addLearn(learn)"
              >
                <div slot="prefix" class="p-1 rounded-lg bg-light">
                  <flag-ui
                    :code="learn | getLang('country')"
                    size="40"
                  ></flag-ui>
                </div>
                <div>
                  <p class="leading-tight">{{ learn | getLang }}</p>
                  <p class="text-sm leading-tight text-light">
                    {{ learn | getLang('native') }}
                  </p>
                </div>
              </list-ui>
            </div>
          </card-ui>
        </v-popover>
      </div>
      <div class="mt-4 pb-6 flex-auto px-6 overflow-auto">
        <router-link
          v-for="learn in learns"
          :key="learn.learnId"
          :to="`/dashboard/learn/${learn.learnId}`"
        >
          <flag-card
            :id="learn.learnId"
            :word-length="learn.words.length"
            :active="$route.params.id === learn.learnId"
          ></flag-card>
        </router-link>
      </div>
    </div>
  </aside>
</template>
<script>
import FlagCard from '../ui/FlagCard.vue';
import { supportedLanguages } from '~/utils/getLang';

export default {
  components: { FlagCard },
  computed: {
    LearnModel() {
      return this.$store.$db().model('learns');
    },
    learns() {
      return this.LearnModel.query()
        .with('words')
        .get();
    },
    filteredLearns() {
      return supportedLanguages.filter((item) => {
        return !this.learns.some((learn) => item === learn.learnId);
      });
    }
  },
  methods: {
    addLearn(learnId) {
      this.LearnModel.insert({
        data: {
          learnId
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
aside {
  .content {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
}
</style>
