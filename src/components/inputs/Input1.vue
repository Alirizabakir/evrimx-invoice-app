<template>
  <div class="position-relative pe-8">
    <span v-if="!view" class="mb-0 fs-5">{{ data || title }}</span>
    <input
      v-else
      type="text"
      class="p-0 fs-5 border border-top-0 border-end-0 border-start-0 bg-transparent border-bottom-1 border-gray-500"
      :value="data"
      @input="PayloadEvent"
    />
    <div class="action-button cursor-pointer" v-show="!pdfStatus">
      <span v-if="!view" @click.stop="view = !view">
        <KTIcon icon-name="pencil" class="fs-4 text-danger" />
      </span>
      <span v-else @click.stop="view = !view">
        <KTIcon icon-name="like" class="fs-4 text-success" />
      </span>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";

export default defineComponent({
  name: "Input1",
  components: { KTIcon },
  props: {
    data: String || Number,
    title: String,
    pdfStatus: Boolean,
  },
  setup(props, { emit }) {
    const view = ref(false);
    const PayloadEvent = (event) => {
      if (event.target instanceof HTMLInputElement) {
        const value = event.target.value.toString();
        emit("update:data", value);
      }
    };

    return {
      PayloadEvent,
      view,
    };
  },
});
</script>

<style>
.action-button {
  position: absolute;
  top: -5px;
  right: 0;
}

input:focus {
  outline: none;
}
</style>
