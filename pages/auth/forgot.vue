<template>
  <div class="login">
    <nuxt-link to="/auth" class="text-primary mb-4">
      Go back
    </nuxt-link>
    <p class="text-2xl text-light font-semibold">Forgot password</p>
    <p class="text-lighter">Type your password below to reset your password</p>
    <form class="mt-10" @submit.prevent="resetPassword">
      <input-ui
        v-model="email"
        label="Email address"
        icon="mdi-email"
        block
        placeholder="Email"
        :error="$v.email.$invalid && $v.email.$dirty"
        error-message="Invalid email format"
        height="2.8rem"
        @change="$v.email.$touch"
      ></input-ui>
      <button-ui
        type="primary"
        block
        height="2.8rem"
        :disabled="$v.$invalid"
        class="mt-6"
        :loading="loading"
      >
        Reset password
      </button-ui>
    </form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { email, required } from 'vuelidate/lib/validators';
import firebaseAuth from '~/utils/firebaseAuth';

export default {
  mixins: [validationMixin],
  data: () => ({
    email: '',
    loading: false
  }),
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    resetPassword() {
      this.loading = true;

      firebaseAuth
        .sendOobCode('PASSWORD_RESET', this.email)
        .then(() => {
          this.$toast('Check your email inbox');
          this.loading = false;
        })
        .catch(() => {
          this.$toast.error('User not found');
          this.loading = false;
        });
    }
  },
  head() {
    return {
      title: 'Forgot Password'
    };
  }
};
</script>
