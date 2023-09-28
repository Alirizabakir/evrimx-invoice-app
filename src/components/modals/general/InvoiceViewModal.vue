<template>
  <div
    id="invoice_modal"
    tabindex="-1"
    aria-hidden="true"
    class="modal fade p-0"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-850px">
      <!--begin::Modal content-->
      <div
        class="modal-content w-100 d-flex flex-row bg-transparent shadow-none"
      >
        <!--  begin: Invoice  -->
        <div id="invoice_pdf" class="w-800px bg-gray-100 p-20 shadow rounded">
          <!--  begin: Head  -->
          <div class="d-flex align-items-center justify-content-between mb-20">
            <div class="d-inline-flex position-relative pe-9">
              <h1 class="fs-5x mb-0">evrim</h1>
              <img
                alt="Logo"
                :src="getAssetPath('media/logos/exrimx.png')"
                class="h-30px position-absolute top-0 end-0 mt-3"
              />
            </div>

            <h3 class="fs-5x font-monospace mb-0">{{ translate('invoice').toUpperCase()}}</h3>
          </div>
          <!--  end: Head  -->

          <!--  begin: Subhead  -->
          <div class="d-flex align-items-center justify-content-between mb-20">
            <div>
              <p class="fs-4 fw-bold">{{ translate('billedTO')}}</p>
              <p class="mb-0 fs-5">{{ invoice.companyName }}</p>
              <p class="mb-0 fs-5">{{ invoice.companyNumber }}</p>
              <p class="mb-0 fs-5">{{ invoice.companyAddress }}</p>
            </div>

            <div>
              <p class="mb-0 fs-5 d-flex">
                <span class="me-2">{{ translate('invoiceNo')}}:</span>{{ invoice.invoiceNo }}
              </p>
              <span class="mb-0 fs-5">{{ translate('dueDate')}}: {{ invoice.invoiceDate }}</span>
            </div>
          </div>
          <!--  end: Subhead  -->

          <!--  begin: Content  -->
          <div class="mb-20">
            <div class="table-responsive">
              <!--begin::Table-->
              <table
                class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
              >
                <!--begin::Table head-->
                <thead>
                  <tr class="fw-bold text-muted border-gray-400">
                    <th class="min-w-150px">{{translate('orderName')}}</th>
                    <th class="min-w-140px text-center">{{translate('hoursOfWork')}}</th>
                    <th class="min-w-120px text-center">{{translate('expenses')}}</th>
                    <th class="min-w-120px text-center">{{translate('materials')}}</th>
                    <th class="min-w-120px text-center">{{translate('labor')}}</th>
                    <th class="min-w-120px text-end">{{translate('total')}}</th>
                  </tr>
                </thead>
                <!--end::Table head-->

                <!--begin::Table body-->
                <tbody>
                  <template
                    v-for="(item, index) in invoice.orders"
                    :key="index"
                  >
                    <tr class="border-gray-400">
                      <td>
                        <a
                          href="#"
                          class="text-dark fw-bold text-hover-primary fs-6"
                          >{{ item.orderName }}</a
                        >
                      </td>

                      <td>
                        <a
                          href="#"
                          class="text-dark text-center fw-bold text-hover-primary d-block mb-1 fs-6"
                          >${{ item.hoursOfWork }}</a
                        >
                      </td>

                      <td>
                        <a
                          href="#"
                          class="text-dark text-center fw-bold text-hover-primary d-block mb-1 fs-6"
                          >${{ item.expenses }}</a
                        >
                      </td>

                      <td>
                        <a
                          href="#"
                          class="text-dark text-center fw-bold text-hover-primary d-block mb-1 fs-6"
                          >${{ item.materials }}</a
                        >
                      </td>

                      <td>
                        <a
                          href="#"
                          class="text-dark text-center fw-bold text-hover-primary d-block mb-1 fs-6"
                          >${{ item.labor }}</a
                        >
                      </td>

                      <td
                        class="text-end text-dark fw-bold text-hover-primary fs-6"
                      >
                        ${{
                          item.hoursOfWork +
                          item.expenses +
                          item.materials +
                          item.labor
                        }}
                      </td>
                    </tr>
                  </template>
                  <tr class="border-0">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <p class="fs-3 fw-bold mb-0">{{translate('subTotal')}}</p>
                    </td>
                    <td
                      class="text-end text-dark fw-bold text-hover-primary fs-3"
                    >
                      ${{ invoice.subTotal }}
                    </td>
                  </tr>
                  <tr class="border-0">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <p class="fs-3 fw-bold mb-0">{{translate('tax')}}(%{{ invoice.tax }})</p>
                    </td>
                    <td
                      class="text-end text-dark fw-bold text-hover-primary fs-3"
                    >
                      $0
                    </td>
                  </tr>
                  <tr class="border-0">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td
                      class="text-dark fw-bold text-hover-primary fs-1 border-top border-dark"
                    >
                      Total
                    </td>
                    <td
                      class="text-end text-dark fw-bold text-hover-primary fs-1 border-top border-dark"
                    >
                      ${{ invoice.total }}
                    </td>
                  </tr>
                </tbody>
                <!--end::Table body-->
              </table>
              <!--end::Table-->
            </div>
          </div>
          <!--  end: Content  -->
          <!--  begin: Footer  -->
          <p class="fs-2x">{{translate('thankYou')}}!</p>

          <div class="d-flex align-items-end justify-content-between mb-20">
            <div>
              <p class="fs-4 fw-bold">{{translate('paymentInformation').toUpperCase()}}</p>
              <p class="mb-0 fs-5">{{translate('accountName')}}: {{ invoice.accountName }}</p>
              <p class="mb-0 fs-5">{{translate('accountNo')}}: {{ invoice.accountNo }}</p>
              <p class="mb-0 fs-5">{{translate('payBy')}}: {{ invoice.payBy }}</p>
            </div>

            <div>
              <p class="mb-0 fs-5 text-end font-monospace fs-3x fw-bold">
                {{ invoice.owner }}
              </p>
              <p class="mb-0 fs-5">{{ invoice.ownerAddress }}</p>
            </div>
          </div>
          <!--  end: Footer  -->
        </div>
        <!--  end: Invoice  -->

        <!--  begin: Actions  -->
        <div class="ms-4">
          <div class="d-flex flex-column justify-content-center">
            <button
              @click.stop="exportToPDF"
              class="btn btn-md btn-icon btn-success btn-color-light border border-success btn-active-light-success mb-4 shadow"
              data-bs-toggle="tooltip"
              title="Export PDF"
            >
              <KTIcon icon-name="cloud-download" icon-class="fs-2x p-0 m-0" />
            </button>

            <button
              type="button"
              class="btn btn-md btn-icon btn-success btn-color-light border border-success btn-active-light-success shadow"
              data-bs-toggle="tooltip"
              title="Send Mail"
            >
              <KTIcon icon-name="send" icon-class="fs-2x p-0 m-0" />
            </button>
          </div>
        </div>
        <!--  end: Actions  -->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
// import type { Invoice } from "@/stores/types";
// import type { PropType } from "vue";
import { getAssetPath } from "@/core/helpers/assets";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";
import jsPDF from "jspdf";
import { useGlobalStore } from "@/stores/global";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "Invoice-View",
  components: { KTIcon },
  methods: { getAssetPath },
  // props: {
  //   invoice: {
  //     type: Object as PropType<Invoice>,
  //     required: true,
  //   },
  // },
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
    const pdfStatus = ref(false);
    const view = ref(false);
    const invoice = computed(() => store.Invoice);
    const pdfDoc = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      pdfDoc.value = document.getElementById("invoice_pdf") as HTMLDivElement;
    });

    const exportToPDF = () => {
      pdfStatus.value = true;
      view.value = false;
      const invoice = document.getElementById("invoice_pdf");

      if (!invoice) {
        return;
      }

      const pdf = new jsPDF({
        orientation: "p",
        unit: "px",
        format: [invoice.clientHeight, 800],
        compress: true,
      });

      if (pdfDoc.value) {
        pdf.html(pdfDoc.value, {
          callback: (pdf) => {
            pdf.save("invoice.pdf");
            pdfStatus.value = false;
          },
        });
      }
    };

    return {
      exportToPDF,
      invoice,
      translate
    };
  },
});
</script>