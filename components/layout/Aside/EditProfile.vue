<template>
  <div class="edit-profile flex-auto mt-8 mb-6 px-8 overflow-auto">
    <list-ui @click="$emit('close')">
      <v-mdi slot="prefix" name="mdi-arrow-right" :rotate="180"></v-mdi>
      Go back
    </list-ui>
    <list-ui class="my-2" @click="updateName">
      <v-mdi slot="prefix" name="mdi-pencil"></v-mdi>
      Edit name
    </list-ui>
    <list-ui :disabled="loadingResetPassword" @click="resetPassword">
      <v-mdi slot="prefix" name="mdi-key"></v-mdi>
      Reset password
    </list-ui>
  </div>
</template>
<script>
import firebaseAuth from '~/utils/firebaseAuth';

export default {
  data: () => ({
    loadingResetPassword: false
  }),
  methods: {
    updateName() {
      this.$modal.show('prompt', {
        title: 'Update name',
        placeholder: 'Name',
        input: this.$store.state.user.displayName,
        btn: {
          text: 'Save',
          handler: (displayName) => {
            firebaseAuth
              .updateProfile({
                displayName
              })
              .then(() => {
                this.$store.commit('updateUser', {
                  displayName
                });

                this.$modal.hide('prompt');
              });
          }
        }
      });
    },
    resetPassword() {
      this.loadingResetPassword = true;

      firebaseAuth
        .sendOobCode('PASSWORD_RESET', this.$store.state.user.email)
        .then((data) => {
          this.$toast.show('Check your email inbox');
          this.loadingResetPassword = false;
        })
        .catch((err) => {
          /* eslint-disable-next-line */
          console.error(err);
        });
    }
  }
};
</script>
