<template>
  <!--begin::Menu 2-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold w-200px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content fs-6 text-dark fw-bold px-3 py-4">
        {{ translate("filterOptions") }}
      </div>
    </div>

    <!--begin::Menu item-->
    <div @click="filterOptions(null)" class="menu-item px-3">
      <a href="#" class="menu-link px-3">
        {{ translate("all") }}
      </a>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div @click="filterOptions(true)" class="menu-item px-3">
      <a href="#" class="menu-link px-3">
        {{ translate("paid") }}
      </a>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div @click="filterOptions(false)" class="menu-item px-3">
      <a href="#" class="menu-link px-3">
        {{ translate("overdue") }}
      </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu 2-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useGlobalStore } from "@/stores/global";

export default defineComponent({
  name: "dropdown-2",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const store = useGlobalStore();

    const filterOptions = (status: boolean | null) => {
      if (status === null) return store.Invoices = store.InvoicesStock
      store.Invoices = store.InvoicesStock.filter((item) => item.status === status);
    };

    return {
      translate,
      filterOptions
    };
  },
});
</script>