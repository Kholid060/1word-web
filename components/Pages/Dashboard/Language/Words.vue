<template>
  <div>
    <empty-state-ui
      v-if="words.length === 0"
      icon="mdi-message-processing"
      title="No Data"
      description="Add your first word."
    ></empty-state-ui>
    <list-ui v-for="word in words" :key="word.id" class="list mt-3">
      <p class="text-overflow pr-2 flex-1">{{ word.title }}</p>
      <p class="text-overflow flex-1">{{ word.meaning }}</p>
      <v-popover placement="left">
        <button-ui icon small>
          <v-mdi name="mdi-dots-horizontal"></v-mdi>
        </button-ui>
        <card-ui slot="popover" class="shadow-xl border">
          <list-ui @click="$modal.show('edit-word', word)">
            <v-mdi slot="prefix" name="mdi-pencil"></v-mdi>
            Edit word
          </list-ui>
          <list-ui @click="deleteWord(word)">
            <v-mdi slot="prefix" name="mdi-delete" class="text-danger"></v-mdi>
            Delete word
          </list-ui>
        </card-ui>
      </v-popover>
    </list-ui>
  </div>
</template>
<script>
import { request } from '~/utils/firebase';
import Word from '~/models/Word';

export default {
  props: {
    words: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    deleteWord({ id }) {
      request(`/word/${id}`, {
        method: 'DELETE'
      }).then(() => Word.delete(id));
    }
  }
};
</script>
