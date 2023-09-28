<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
    data-kt-menu="true"
  >
    <!--begin::Heading-->
    <div
      class="d-flex flex-column bgi-no-repeat rounded-top"
      :style="`background-image: url('${getAssetPath(
        '/media/misc/menu-header-bg.jpg'
      )}')`"
    >
      <!--begin::Title-->
      <h3 class="text-dark fw-semobold px-9 mt-10">
        {{translate('notifications')}} <span class="fs-8 opacity-75 ps-3">{{data1.length}} {{translate('reports')}}</span>
      </h3>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <!--begin::Tab content-->
    <div class="tab-content">
      <!--begin::Tab panel-->
      <div class="tab-pane fade show active" id="kt_topbar_notifications_1" role="tabpanel">
        <!--begin::Items-->
        <div class="scroll-y mh-325px my-5 px-8">
          <template v-for="(item, index) in data1" :key="index">
            <!--begin::Item-->
            <div data-bs-toggle="modal"
                 data-bs-target="#invoice_modal"
                 @click="store.setOneInvoice(item)" type="button" class="d-flex flex-stack py-4">
              <!--begin::Section-->
              <div class="d-flex align-items-center">
                <!--begin::Symbol-->
                <div class="symbol symbol-35px me-4">
                  <span :class="`bg-light-warning`" class="symbol-label">
                    <KTIcon
                      icon-name="information-5"
                      :icon-class="`text-warning fs-2x`"
                    />
                  </span>
                </div>
                <!--end::Symbol-->

                <!--begin::Title-->
                <div class="mb-0 me-2">
                  <a
                    href="#"
                    class="fs-6 text-gray-800 text-hover-primary fw-bold"
                    >{{ item.companyName }}</a
                  >
                  <div class="text-gray-400 fs-7">
                    {{ item.invoiceDate }}
                  </div>
                </div>
                <!--end::Title-->
              </div>
              <!--end::Section-->

              <!--begin::Label-->
              <span class="badge badge-light fs-4">${{ item.total }}</span>
              <!--end::Label-->
            </div>
            <!--end::Item-->
          </template>
        </div>
        <!--end::Items-->
      </div>
      <!--end::Tab panel-->

    </div>
    <!--end::Tab content-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath, getIllustrationsPath } from "@/core/helpers/assets";
import {computed, defineComponent} from "vue";
import {useI18n} from "vue-i18n";
import {useGlobalStore} from "@/stores/global";

export default defineComponent({
  name: "notifications-menu",
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

    const store = useGlobalStore()
    const data1 = computed(() => store.Invoices.filter(item => !item.status))

    return {
      data1,
      getIllustrationsPath,
      getAssetPath,
      translate,
      store
    };
  },
});
</script>