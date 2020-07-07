<template>
  <div class="verify">
    <p class="text-2xl text-light font-semibold">Verify your email</p>
    <p class="text-lighter">
      A verification email has been sent to
      <span class="font-semibold">{{ $store.state.user.email }}</span>
    </p>
    <img src="~/assets/svg/mail-sent.svg" class="w-56 mt-12 mx-auto" />
    <div class="mt-16 flex flex-col md:flex-row">
      <button-ui class="w-full md:w-6/12" @click="useAnotherAccount">
        Use another account
      </button-ui>
      <button-ui
        class="w-full md:w-6/12 mt-4 md:mt-0 md:ml-4"
        type="primary"
        :loading="loading"
        @click="resendVerifyEmail"
      >
        Resend verify email
      </button-ui>
    </div>
  </div>
</template>
<script>
import { auth } from '~/utils/firebase';

export default {
  data: () => ({
    loading: false
  }),
  middleware({ store, redirect }) {
    const { user } = store.state;
    if (!user) {
      redirect('/auth');
    } else if (user && user.emailVerified) {
      redirect('/dashboard');
    }
  },
  mounted() {
    const { extension } = this.$route.query;

    if (extension) {
      this.$toasted.error(
        'You need to verify your email address to start using this extension',
        {
          position: 'top-center',
          duration: null,
          action: {
            text: 'Cancel',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        }
      );
    }
  },
  methods: {
    async useAnotherAccount() {
      await auth.signOut();
      this.$router.replace('/auth');
    },
    async resendVerifyEmail() {
      this.loading = true;
      const { email } = this.$store.state.user;
      await auth.sendOobCode('VERIFY_EMAIL', email);
      this.$toast.show('Check your email inbox');
    }
  },
  head() {
    return {
      title: 'Verify'
    };
  }
};
</script>
