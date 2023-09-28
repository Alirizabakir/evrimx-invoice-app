<template>
  <div class="min-vh-100 d-flex justify-content-center">
    <!--  begin: Invoice  -->
    <div id="invoice" class="bg-gray-100 w-800px p-20 shadow overflow-hidden">
      <!--begin::Switch-->
      <div
        v-if="!pdfStatus"
        class="d-flex align-items-center justify-content-end mb-4"
      >
        <label
          class="form-check form-switch form-check-custom form-check-success cursor-pointer"
        >
          <span
            class="form-check-label fw-semobold text-gray-500 me-3 fs-5 fw-bold"
            >{{
              invoice.status ? translate("paid") : translate("unPaid")
            }}</span
          >
          <input
            class="form-check-input cursor-pointer"
            type="checkbox"
            value="1"
            v-model="invoice.status"
            checked
          />
        </label>
      </div>
      <!--end::Switch-->

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

        <h3 class="fs-5x font-monospace mb-0">
          {{ translate("invoice").toUpperCase() }}
        </h3>
      </div>
      <!--  end: Head  -->

      <!--  begin: Subhead  -->
      <div class="d-flex align-items-center justify-content-between mb-20">
        <div>
          <p class="fs-4 fw-bold">{{ translate("billedTO").toUpperCase() }}</p>
          <Input1
            v-model:data="invoice.companyName"
            :pdfStatus="pdfStatus"
            :title="translate('companyName')"
          />
          <Input1
            v-model:data="invoice.companyNumber"
            :pdfStatus="pdfStatus"
            :title="translate('companyNumber')"
          />
          <Input1
            v-model:data="invoice.companyAddress"
            :pdfStatus="pdfStatus"
            :title="translate('companyAddress')"
          />
        </div>

        <div>
          <p class="mb-0 fs-5 d-flex">
            <span class="me-2">{{ translate("invoiceNo") }}:</span>
            <Input1
              v-model:data="invoice.invoiceNo"
              :pdfStatus="pdfStatus"
              :title="translate('invoiceNo')"
            />
          </p>
          <!--begin::Input-->
          <div class="position-relative pe-8">
            <span v-if="!view" class="mb-0 fs-5"
              >{{ translate("dueDate") }}: {{ invoice.invoiceDate }}</span
            >
            <el-form-item v-else prop="dueDate">
              <el-date-picker
                v-model="invoice.invoiceDate"
                type="date"
                :placeholder="translate('invoiceDate')"
                :teleported="false"
                popper-class="override-styles"
                name="dueDate"
                clearable
                format="DD MMM YYYY"
                value-format="DD MMM YYYY"
              />
            </el-form-item>
            <div class="action-button cursor-pointer" v-show="!pdfStatus">
              <span v-if="!view" @click.stop="view = !view">
                <KTIcon icon-name="pencil" class="fs-4 text-danger" />
              </span>
              <span v-else @click.stop="view = !view">
                <KTIcon icon-name="like" class="fs-4 text-success" />
              </span>
            </div>
          </div>
          <!--end::Input-->
        </div>
      </div>
      <!--  end: Subhead  -->

      <!--  begin: Content  -->
      <div class="mb-20">
        <div v-if="!pdfStatus" class="text-end mb-4">
          <button
            type="button"
            class="btn btn-sm btn-primary btn-color-light border border-primary btn-active-light-primary py-1 px-2"
            data-bs-toggle="modal"
            data-bs-target="#new_order"
          >
            <span class="me-2">{{ translate("newOrder") }}</span>
            <KTIcon icon-name="plus" icon-class="fs-3 p-0 m-0" />
          </button>
        </div>
        <div class="table-responsive">
          <!--begin::Table-->
          <table
            class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
          >
            <!--begin::Table head-->
            <thead>
              <tr class="fw-bold text-muted border-gray-400">
                <th class="min-w-150px">{{ translate("orderName") }}</th>
                <th class="min-w-140px text-center">
                  {{ translate("hoursOfWork") }}
                </th>
                <th class="min-w-120px text-center">
                  {{ translate("expenses") }}
                </th>
                <th class="min-w-120px text-center">
                  {{ translate("materials") }}
                </th>
                <th class="min-w-120px text-center">
                  {{ translate("labor") }}
                </th>
                <th class="min-w-120px text-end">{{ translate("total") }}</th>
                <th v-if="!pdfStatus" class="min-w-120px text-end"></th>
              </tr>
            </thead>
            <!--end::Table head-->

            <!--begin::Table body-->
            <tbody>
              <template v-for="(item, index) in invoice.orders" :key="index">
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

                  <td v-if="!pdfStatus" class="text-end">
                    <a
                      @click="removeOrder(index)"
                      type="button"
                      class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                    >
                      <KTIcon icon-name="trash" icon-class="fs-3" />
                    </a>
                  </td>
                </tr>
              </template>
              <tr class="border-0">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <p class="fs-3 fw-bold mb-0">{{ translate("subTotal") }}</p>
                </td>
                <td class="text-end text-dark fw-bold text-hover-primary fs-3">
                  ${{ invoice.subTotal }}
                </td>
                <td v-if="!pdfStatus" class="text-end"></td>
              </tr>
              <tr class="border-0">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <p class="fs-3 fw-bold mb-0">
                    {{ translate("tax") }}(%{{ invoice.tax }})
                  </p>
                </td>
                <td class="text-end text-dark fw-bold text-hover-primary fs-3">
                  $0
                </td>
                <td v-if="!pdfStatus" class="text-end"></td>
              </tr>
              <tr class="border-0">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td
                  class="text-dark fw-bold text-hover-primary fs-1 border-top border-dark"
                >
                  {{ translate("total") }}
                </td>
                <td
                  class="text-end text-dark fw-bold text-hover-primary fs-1 border-top border-dark"
                >
                  ${{ invoice.total }}
                </td>

                <td v-if="!pdfStatus" class="text-end"></td>
              </tr>
            </tbody>
            <!--end::Table body-->
          </table>
          <!--end::Table-->
        </div>
      </div>
      <!--  end: Content  -->
      <!--  begin: Footer  -->
      <p class="fs-2x">{{ translate("thankYou") }}!</p>

      <div class="d-flex align-items-end justify-content-between mb-20">
        <div>
          <p class="fs-4 fw-bold">
            {{ translate("paymentInformation").toUpperCase() }}
          </p>
          <p class="mb-0 fs-5">
            {{ translate("accountName") }}: {{ invoice.accountName }}
          </p>
          <p class="mb-0 fs-5">
            {{ translate("accountNo") }}: {{ invoice.accountNo }}
          </p>
          <p class="mb-0 fs-5">{{ translate("payBy") }}: {{ invoice.payBy }}</p>
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

    <!--  begin: Invoice  -->
    <div class="ms-4">
      <div class="d-flex flex-column justify-content-center">
        <button
          @click="setInvoice"
          class="btn btn-md btn-icon btn-success btn-color-light border border-success btn-active-light-success mb-4 shadow"
          data-bs-toggle="tooltip"
          title="Save"
        >
          <KTIcon icon-name="like" icon-class="fs-2x p-0 m-0" />
        </button>

        <button
          @click="exportToPDF"
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
    <!--  end: Invoice  -->
  </div>

  <NewOrder @NewOrder="addOrder" />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import jsPDF from "jspdf";
import Input1 from "@/components/inputs/Input1.vue";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";
import NewOrder from "@/components/modals/forms/NewOrder.vue";
import { useRouter } from "vue-router";
import type { Invoice, Order } from "@/stores/types";
import { useGlobalStore } from "@/stores/global";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "kt-widget-12",
  components: {
    KTIcon,
    Input1,
    NewOrder,
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
    const store = useGlobalStore();
    const router = useRouter();
    const pdfStatus = ref(false);
    const view = ref(false);

    const invoice = ref<Invoice>({
      companyName: "BlueSoft Company",
      companyNumber: "+90 500 000 00 00",
      companyAddress: "Esenyurt/Istanbul",
      invoiceNo: "101010",
      invoiceDate: "16 June 2025",
      orders: [
        {
          orderName: "Front End Developer",
          hoursOfWork: 20,
          expenses: 30,
          materials: 40,
          labor: 50,
        },
      ],
      total: 0,
      subTotal: 0,
      tax: 0,
      accountName: "Gözde Tatlı",
      accountNo: "0000-0000-0000-0000",
      payBy: "1 June 2024",
      owner: "GOZDE TATLI",
      ownerAddress: "No: 0, 0000 St., Zeytinburnu / Istanbul",
      status: true,
      paymentType: "cash",
    });

    const pdfDoc = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      pdfDoc.value = document.getElementById("invoice") as HTMLDivElement;
      totalCalculate();
    });

    const addOrder = (item: Order) => {
      invoice.value.orders.push(item);
      totalCalculate();
    };

    const totalCalculate = () => {
      let total = 0;
      for (const item of invoice.value.orders) {
        total += item.labor + item.expenses + item.hoursOfWork + item.materials;
      }
      invoice.value.total = invoice.value.subTotal = total;
    };
    const exportToPDF = () => {
      pdfStatus.value = true;
      view.value = false;
      const invoice = document.getElementById("invoice");

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

    const setInvoice = () => {
      store.setInvoices(invoice.value);
      router.push("invoices");
    };

    const removeOrder = (index: number) => {
      invoice.value.orders.splice(index, 1);
    };

    return {
      getAssetPath,
      exportToPDF,
      invoice,
      pdfStatus,
      addOrder,
      view,
      setInvoice,
      translate,
      removeOrder,
    };
  },
});
</script>