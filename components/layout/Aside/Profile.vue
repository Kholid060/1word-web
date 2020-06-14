<template>
  <div class="flex-auto mt-8 mb-6 overflow-auto px-8">
    <div v-for="language in languages" :key="language.id" class="mb-5">
      <p
        style="padding: 13px 15px"
        class="bg-input align-middle uppercase font-semibold rounded-lg inline-block"
      >
        {{ language.languageId }}
      </p>
      <div class="inline-block align-middle ml-2">
        <p class="font-semibold leading-tight">
          {{ language.languageId | getLang }}
        </p>
        <p class="text-lighter leading-tight">
          {{ language.words.length }} words
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import firebaseAuth from '~/utils/firebaseAuth';

export default {
  computed: {
    languages() {
      return this.$store
        .$db()
        .model('languages')
        .query()
        .with('words')
        .get();
    }
  },
  methods: {
    logout() {
      this.$modal.show('confirm', {
        title: 'Logout',
        text: 'Are you sure you want to logout?',
        btn: {
          type: 'danger',
          text: 'Logout',
          handler: () => {
            firebaseAuth.signOut().then(() => {
              this.$router.replace('/auth');
              this.$modal.hide('confirm');
            });
          }
        }
      });
    }
  }
};
</script>
