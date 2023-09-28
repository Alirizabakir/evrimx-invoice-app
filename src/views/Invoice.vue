<template>
  <TablesWidget13 widget-classes="mb-5 mb-xl-8"></TablesWidget13>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import TablesWidget13 from "@/components/widgets/tables/Widget13.vue";
import { invoices } from "@/core/data/invoices";
import JwtService from "@/core/services/JwtService";
import { useGlobalStore } from "@/stores/global";
import InvoiceView from "@/components/modals/general/InvoiceViewModal.vue";

export default defineComponent({
  name: "app",
  components: {
    InvoiceView,
    TablesWidget13,
  },
  setup() {
    const store = useGlobalStore();

    onMounted(() => {
      const list = JwtService.getInvoice();
      if (!list) JwtService.saveInvoice(JSON.stringify(invoices));
      store.getInvoices();
    });

    return {
      store
    };
  },
});
</script>