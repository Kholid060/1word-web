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
import firebase from '~/utils/firebase';

export default {
  data: () => ({
    loading: false
  }),
  middleware: 'authRoute',
  methods: {
    async useAnotherAccount() {
      await firebase.auth().signOut();

      this.$router.replace('/auth');
    },
    resendVerifyEmail() {
      this.loading = true;

      firebase.auth().onAuthStateChanged(async (user) => {
        await user.sendEmailVerification();

        this.$toast('Check your email inbox');
        this.loading = false;
      });
    }
  }
};
</script>
