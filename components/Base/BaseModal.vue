<template>
  <div class="modal-ui">
    <modal name="prompt" :width="400" height="auto" @before-open="modalHandler">
      <card-ui class="border">
        <template slot="header">
          <p class="font-semibold">
            {{ params.title }}
          </p>
          <div class="flex-grow"></div>
          <button-ui icon plain small @click="hideModal">
            <v-mdi name="mdi-close"></v-mdi>
          </button-ui>
        </template>
        <p class="mb-5 text-lighter">{{ params.text }}</p>
        <input-ui
          v-model="params.input"
          block
          :placeholder="params.placeholder"
          :native-type="params.inputType"
          @keyup.enter.native="params.btn.handler(params.input)"
        ></input-ui>
        <template slot="footer">
          <div class="flex-grow"></div>
          <button-ui width="100px" class="mr-4" plain @click="hideModal"
            >Cancel</button-ui
          >
          <button-ui
            style="min-width: 100px"
            :type="params.btn.type"
            :disabled="!params.input"
            @click="params.btn.handler(params.input)"
            >{{ params.btn.text }}</button-ui
          >
        </template>
      </card-ui>
    </modal>
    <modal
      name="confirm"
      :width="400"
      :max-height="230"
      @before-open="modalHandler"
    >
      <card-ui class="border">
        <template slot="header">
          <p class="font-semibold">
            {{ params.title }}
          </p>
          <div class="flex-grow"></div>
          <button-ui icon plain small @click="hideModal(params.name)">
            <v-mdi name="mdi-close"></v-mdi>
          </button-ui>
        </template>
        <p>{{ params.text }}</p>
        <template slot="footer">
          <div class="flex-grow"></div>
          <button-ui width="100px" class="mr-4" plain @click="hideModal"
            >Cancel</button-ui
          >
          <button-ui
            style="min-width: 100px"
            :type="params.btn.type"
            @click="params.btn.handler(params.input)"
            >{{ params.btn.text }}</button-ui
          >
        </template>
      </card-ui>
    </modal>
  </div>
</template>
<script>
const defaultParams = {
  name: '',
  title: '',
  text: '',
  inputType: 'text',
  input: '',
  placeholder: '',
  btn: {
    type: 'primary',
    text: 'add',
    handler: null
  }
};

export default {
  name: 'ModalUi',
  data: () => ({
    params: defaultParams
  }),
  methods: {
    modalHandler({ name, params }) {
      this.params = defaultParams;
      const { btn } = params;

      this.params = {
        ...this.params,
        ...params,
        name,
        btn: {
          ...this.params.btn,
          ...btn
        }
      };
    },
    hideModal() {
      this.$modal.hide(this.params.name);
    }
  }
};
</script>
<style lang="scss">
.v--modal-box.v--modal,
.vm--modal {
  box-shadow: none !important;
  background-color: transparent !important;
}
</style>
