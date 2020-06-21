<template>
  <section class="container py-12 bg-white rounded-lg mt-12">
    <p class="text-center text-lighter text-xl">
      Supported Languages
    </p>
    <div class="mt-10 text-center">
      <flag-ui
        v-for="language in languages"
        :key="language"
        :code="language | getLang('country')"
        :title="language | getLang"
        size="54"
        class="shadow-xl inline-block mr-6 mb-6"
      ></flag-ui>
    </div>
  </section>
</template>
<script>
import { supportedLanguages } from '~/utils/getLang';

export default {
  data: () => ({
    languages: supportedLanguages
  })
};
</script>
