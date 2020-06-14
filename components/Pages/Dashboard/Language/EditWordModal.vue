<template>
  <modal name="edit-word" :width="380" :height="400" @before-open="initData">
    <card-ui>
      <p slot="header">Edit word</p>
      <p class="px-4 py-3 rounded-lg bg-input mb-4">
        {{ data.title }}
      </p>
      <textarea-ui
        v-model="data.meaning"
        block
        placeholder="Meaning"
      ></textarea-ui>
      <template slot="footer">
        <div class="flex-grow"></div>
        <button-ui plain class="mr-4" width="100px" @click="clearAll">
          Cancel
        </button-ui>
        <button-ui
          type="primary"
          :disabled="!data.meaning"
          width="100px"
          @click="updateWord"
        >
          Save
        </button-ui>
      </template>
    </card-ui>
  </modal>
</template>
<script>
export default {
  data: () => ({
    data: {
      word: '',
      meaning: ''
    }
  }),
  methods: {
    initData({ params }) {
      this.data = params;
    },
    updateWord() {
      this.$store
        .$db()
        .model('words')
        .update({
          where: this.data.id,
          data: {
            meaning: this.data.meaning
          }
        })
        .then(() => {
          this.clearAll();
        });
    },
    clearAll() {
      this.data = {
        word: '',
        meaing: ''
      };

      this.$modal.hide('edit-word');
    }
  }
};
</script>
