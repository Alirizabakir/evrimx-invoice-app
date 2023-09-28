<template>
  <!--begin::Authentication Layout -->
  <div class="d-flex flex-column flex-lg-row flex-column-fluid singin-bg">
    <!--begin::Body-->
    <div
      class="d-flex flex-column flex-lg-row-fluid w-lg-50 order-2 order-lg-2"
    >
      <!--begin::Form-->
      <div class="d-flex flex-center flex-column flex-lg-row-fluid">
        <!--begin::Wrapper-->
        <div class="w-lg-700px p-10">
          <router-view></router-view>
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Form-->
    </div>
    <!--end::Body-->

    <!--begin::Aside-->
    <div
      class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-1"
      :style="`background-image: url('${getAssetPath(
        '/media/misc/auth-bg.png'
      )}')`"
    >
      <!--begin::Content-->
      <div
        class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
      >
        <!--begin::Logo-->
        <router-link to="/">
          <div class="position-relative pe-8">
            <h1 class="fs-6x text-white mb-0">evrim</h1>
            <img
              alt="Logo"
              :src="getAssetPath('media/logos/exrimx.png')"
              class="h-30px position-absolute top-0 end-0 mt-5"
            />
          </div>
        </router-link>
        <!--end::Logo-->

        <!--begin::Title-->
        <h1 class="d-none d-lg-block text-white fs-2 text-center mb-7">
          {{ translate("authTitle") }}
        </h1>
        <!--end::Title-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Aside-->

    <!--  begin::Language  -->
    <div
      class="position-fixed vw-100 vh-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center px-4 transition-03s"
      :class="{ 'modal-passive': !showL }"
    >
      <div
        class="bg-body p-10 d-inline-flex align-items-center justify-content-center gap-5 rounded-4 flex-wrap transition-03s"
        :class="{ 'modal-content-passive': !showL }"
      >
        <!--begin::Menu item-->
        <div
          @mouseenter="targetLang(lang.key)"
          @mouseleave="targetLang('')"
          @click="showL = false"
          v-for="lang in countries"
          :key="lang.name"
          class="card d-block p-3 shadow transition-03s"
          :class="[lang.key === targetL && 'bg-secondary']"
        >
          <a
            @click="setLang(lang.key)"
            class="w-100px ratio-1 d-flex d-flex flex-column align-items-center justify-content-center cursor-pointer"
            :class="{ active: currentLanguage === lang.key }"
          >
            <span class="symbol symbol-50px">
              <img class="rounded-1" :src="lang.flag" alt="metronic" />
            </span>
            <span class="fw-bold fs-5 mt-2 text-dark">{{
              translate(lang.name)
            }}</span>
          </a>
        </div>
        <!--end::Menu item-->
      </div>
    </div>
    <!--  end::Language  -->
  </div>
  <!--end::Authentication Layout -->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });

    const i18n = useI18n();

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      tr: {
        key: "tr",
        flag: getAssetPath("media/flags/turkey.svg"),
        name: "Turkish",
      },
      en: {
        key: "en",
        flag: getAssetPath("media/flags/united-states.svg"),
        name: "English",
      },
      de: {
        key: "de",
        flag: getAssetPath("media/flags/germany.svg"),
        name: "German",
      },
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });

    const targetL = ref<string>("");
    const showL = ref<boolean>(true);
    const targetLang = (value: string) => {
      targetL.value = value;
    };

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
      setLang,
      currentLanguage,
      currentLangugeLocale,
      targetLang,
      targetL,
      countries,
      showL,
      translate,
    };
  },
});
</script>

<style>
.transition-03s {
  transition: all 0.3s;
}

.singin-bg {
  background-image: url("/media/auth/bg4.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ratio-1 {
  aspect-ratio: 1;
}

.modal-passive {
  opacity: 0;
  visibility: hidden;
  transition-delay: 0.2s;
}

.modal-content-passive {
  transform: translateY(10px);
  opacity: 0;
  visibility: hidden;
}
</style>