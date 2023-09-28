<template>
  <InvoiceView />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InvoiceView from "@/components/modals/general/InvoiceViewModal.vue";

export default defineComponent({
  name: "global-modals",
  components: {
    InvoiceView,
  },
});
</script>