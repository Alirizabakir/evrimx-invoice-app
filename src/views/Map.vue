<template>
  <div class="d-flex gap-5">
    <div class="card col-3">
      <h3 class="border-bottom border-gray-300 p-6">Users</h3>
      <div
          class="menu menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold"
      >
        <!--begin::Menu item-->
        <div v-for="user in store.Users" class="menu-item px-3">
          <a class="menu-link px-3">
            {{ `${user.name} ${user.surname}`}}
          </a>
        </div>
        <!--end::Menu item-->

      </div>
    </div>
    <div class="card col-9 h-700px p-10">
      <Map/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Map from "@/components/map/Map.vue";
import {useGlobalStore} from "@/stores/global";

export default defineComponent({
  name: "app",
  components: {
    Map,
  },
  setup() {
    const store = useGlobalStore()

    return {
      store
    };
  },
});
</script>