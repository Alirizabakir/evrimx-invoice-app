<template>
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{translate('invoices')}}</span>

        <span class="text-muted mt-1 fw-semobold fs-7">{{translate('over')}} 500 {{translate('orders')}}</span>
      </h3>
      <div class="card-toolbar">
        <router-link to="/invoice-create" class="card-toolbar me-4">
          <!--begin::Menu-->
          <button
            type="button"
            class="btn btn-sm border border-primary btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <span class="me-3 fs-6">{{translate('createInvoice')}}</span>
            <KTIcon icon-name="plus" icon-class="fs-3 p-0 m-0" />
          </button>
          <!--end::Menu-->
        </router-link>
        <div>
          <!--begin::Menu-->
          <button
            type="button"
            class="btn btn-sm border border-primary btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <KTIcon icon-name="filter" icon-class="fs-2" />
          </button>
          <Dropdown2></Dropdown2>
          <!--end::Menu-->
        </div>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
          class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted">
              <th class="w-25px">
                <div
                  class="form-check form-check-sm form-check-custom form-check-solid"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    @change="
                      checkedRows.length === 6
                        ? (checkedRows.length = 0)
                        : (checkedRows = [0, 1, 2, 3, 4, 5])
                    "
                  />
                </div>
              </th>
              <th class="min-w-150px">{{translate('companyName')}}</th>
              <th class="min-w-140px">{{translate('companyNumber')}}</th>
              <th class="min-w-120px">{{translate('invoiceDate')}}</th>
              <th class="min-w-120px">{{translate('invoiceNo')}}</th>
              <th class="min-w-120px">{{translate('total')}}</th>
              <th class="min-w-120px">{{translate('status')}}</th>
              <th class="min-w-100px text-end">{{translate('actions')}}</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in list" :key="index">
              <tr>
                <td>
                  <div
                    class="form-check form-check-sm form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input widget-13-check"
                      type="checkbox"
                      :value="index"
                      v-model="checkedRows"
                    />
                  </div>
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary fs-6"
                    >{{ item.companyName }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.companyNumber }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.invoiceDate }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.invoiceNo }}</a
                  >
                </td>

                <td class="text-dark fw-bold text-hover-primary fs-6">
                  ${{ totalCalculate(item) }}
                </td>

                <td>
                  <span
                    :class="`badge-light-${
                      item.status ? 'success' : 'warning'
                    }`"
                    class="badge fs-6"
                    >{{ item.status ? translate('paid') : translate('overdue') }}</span
                  >
                </td>

                <td class="text-end">
                  <a
                    type="button"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#invoice_modal"
                    @click="store.setOneInvoice(item)"
                  >
                    <KTIcon icon-name="eye" icon-class="fs-3" />
                  </a>

                  <a
                    type="button"
                    @click="removeInvoice(item.invoiceNo)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon icon-name="trash" icon-class="fs-3" />
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 13-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, ref } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import { useGlobalStore } from "@/stores/global";
import InvoiceView from "@/components/modals/general/InvoiceViewModal.vue";
import type { Invoice } from "@/stores/types";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "kt-widget-12",
  components: {
    InvoiceView,
    Dropdown2,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const { t, te } = useI18n();
    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const checkedRows = ref<Array<number>>([]);

    const store = useGlobalStore();
    const list = computed(() => store.Invoices);

    const totalCalculate = (item: { orders: any[] }) => {
      let total = 0;
      item.orders.map(
        (item) =>
          (total +=
            item.labor + item.expenses + item.hoursOfWork + item.materials)
      );

      return total;
    };

    const viewInvoice = ref<Invoice>({} as Invoice);

    const removeInvoice = (invoiceNo: string) => {
      Swal.fire({
        text: "Are you sure you want to remove this invoice?",
        buttonsStyling: false,
        confirmButtonText: "Yes, sure!",
        denyButtonText: "Cancel",
        showDenyButton: true,
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
          denyButton: "btn btn-secondary",
        },
      }).then((value: { value: any }) => {
        if (value.value) {
          store.removeInvoice(invoiceNo);
        }
      });
    };

    return {
      list,
      checkedRows,
      getAssetPath,
      totalCalculate,
      viewInvoice,
      removeInvoice,
      store,
      translate
    };
  },
});
</script>