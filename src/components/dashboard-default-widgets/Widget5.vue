<template>
  <div class="card card-flush" :class="className">
    <!--begin::Body-->
    <div
      class="card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0"
    >
      <!--begin::Wrapper-->
      <div class="mb-10">
        <!--begin::Title-->
        <div class="fs-2hx fw-bold text-gray-800 text-center mb-13">
           {{translate('manageYourInvoicesEasily')}} <br />
          {{translate('createAnInvoiceNow')}}
        </div>
        <!--end::Title-->

        <!--begin::Action-->
        <div class="text-center">
          <router-link to="/invoice-create" class="btn btn-sm btn-dark fw-bold">{{translate('crateInvoice')}}</router-link>
        </div>
        <!--begin::Action-->
      </div>
      <!--begin::Wrapper-->

      <!--begin::Illustration-->
      <img
        class="mx-auto h-150px h-lg-200px theme-light-show"
        :src="getAssetPath('media/illustrations/misc/upgrade.svg')"
        alt=""
      />
      <img
        class="mx-auto h-150px h-lg-200px theme-dark-show"
        :src="getAssetPath('media/illustrations/misc/upgrade-dark.svg')"
        alt=""
      />
      <!--end::Illustration-->
    </div>
    <!--end::Body-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "default-dashboard-widget-5",
  components: {},
  props: {
    className: { type: String, required: false },
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
    return {
      getAssetPath,
      translate
    };
  },
});
</script>