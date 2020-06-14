<template>
  <div class="login">
    <p class="text-2xl text-light font-semibold">Welcome back</p>
    <p class="text-lighter">Login to your account to continue</p>
    <form class="mt-10" @submit.prevent="login">
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
      <input-ui
        v-model="password"
        class="mt-3"
        label="Password"
        icon="mdi-key"
        :suffix-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :error="$v.password.$invalid && $v.password.$dirty"
        error-message="This field is required"
        block
        placeholder="Password"
        height="2.8rem"
        :native-type="showPassword ? 'text' : 'password'"
        @click:suffix="showPassword = !showPassword"
        @change="$v.password.$touch"
      ></input-ui>
      <nuxt-link
        to="/auth/forgot"
        class="text-primary float-right cursor-pointer mt-3 mb-8"
      >
        Forgot password?
      </nuxt-link>
      <button-ui
        type="primary"
        block
        height="2.8rem"
        :disabled="$v.$invalid"
        :loading="loading"
      >
        Login
      </button-ui>
      <div class="mt-4 text-lighter">
        Don't have an account?
        <nuxt-link to="/auth/register" class="text-primary">
          Register
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import firebaseAuth from '~/utils/firebaseAuth';

export default {
  mixins: [validationMixin],
  data: () => ({
    showPassword: false,
    loading: false,
    email: '',
    password: ''
  }),
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  middleware: 'authRoute',
  methods: {
    login() {
      this.loading = true;

      firebaseAuth
        .signIn(this.email, this.password)
        .then(() => {
          const { emailVerified } = this.$store.state.user;
          this.$router.push(emailVerified ? '/dashboard' : '/auth/verify');
        })
        .catch(() => {
          this.$toast.error('Invalid email/password');
          this.loading = false;
        });
    }
  }
};
</script>
