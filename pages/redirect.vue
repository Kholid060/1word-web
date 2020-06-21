<template>
  <p class="text-center mt-6">
    redirect...
  </p>
</template>
<script>
import firebaseAuth from '~/utils/firebaseAuth';

export default {
  mounted() {
    const { user } = this.$store.state;

    if (user) {
      this.fetchUser();
    } else {
      this.$router.replace('/auth');
    }
  },
  methods: {
    async fetchUser() {
      try {
        await firebaseAuth.fetchProfile();

        const user = await this.$store.dispatch('fetchUser');

        if (user && user.emailVerified) {
          this.$router.replace('/dashboard');
        } else if (user && !user.emailVerified) {
          this.$router.replace('/auth/verify');
        } else {
          this.$router.replace('/auth');
        }
      } catch (err) {
        this.$router.replace('/auth');
      }
    }
  },
  head() {
    return {
      title: 'Redirect...'
    };
  }
};
</script>
