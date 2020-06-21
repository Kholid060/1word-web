<template>
  <div class="register">
    <p class="text-2xl text-light font-semibold">Create an account</p>
    <p class="text-lighter">Fill forms below to create a new account</p>
    <form class="mt-10" @submit.prevent="createNewAccount">
      <input-ui
        v-model="name"
        label="Name"
        icon="mdi-account"
        block
        placeholder="Name"
        :error="$v.name.$invalid && $v.name.$dirty"
        error-message="This field must be at least 4 characters"
        height="2.8rem"
        @change="$v.name.$touch"
      ></input-ui>
      <input-ui
        v-model="email"
        label="Email address"
        icon="mdi-email"
        class="my-2"
        block
        placeholder="Email"
        :error="$v.email.$invalid && $v.email.$dirty"
        error-message="Invalid email format"
        native-type="email"
        height="2.8rem"
        @change="$v.email.$touch"
      ></input-ui>
      <input-ui
        v-model="password"
        label="Password"
        icon="mdi-key"
        :suffix-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :error="$v.password.$invalid && $v.password.$dirty"
        error-message="Password must be at least 8 characters"
        block
        placeholder="Password"
        height="2.8rem"
        :native-type="showPassword ? 'text' : 'password'"
        @click:suffix="showPassword = !showPassword"
        @change="$v.password.$touch"
      ></input-ui>
      <button-ui
        class="mt-10"
        type="primary"
        block
        :loading="loading"
        height="2.8rem"
        :disabled="$v.$invalid"
      >
        Register
      </button-ui>
      <div class="mt-4 text-lighter">
        Already have an account?
        <nuxt-link to="/auth" class="text-primary">
          Login
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
import firebaseAuth from '~/utils/firebaseAuth';

export default {
  mixins: [validationMixin],
  data: () => ({
    showPassword: false,
    loading: false,
    name: '',
    email: '',
    password: ''
  }),
  middleware: 'authRoute',
  methods: {
    async createNewAccount() {
      this.loading = true;

      try {
        await firebaseAuth.signUp(this.email, this.password);
        await firebaseAuth.updateProfile({
          displayName: this.name
        });
        const { email } = await this.$store.dispatch('fetchUser');
        await firebaseAuth.sendOobCode('VERIFY_EMAIL', email);

        this.$router.push('/auth/verify');
      } catch (err) {
        this.loading = false;
        this.$toast.error('This email is already used');
      }
    }
  },
  head() {
    return {
      title: 'Register'
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
};
</script>
