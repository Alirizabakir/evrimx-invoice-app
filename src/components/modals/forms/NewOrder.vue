<template>
  <!--begin::Modal - New order-->
  <div
    class="modal fade"
    ref="newOrderModalRef"
    id="new_order"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          class="form"
          id="kt_modal_new_order_form"
          @submit="submit"
          :validation-schema="validationSchema"
          v-slot="{ errors }"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_order_header">
            <!--begin::Modal title-->
            <h2>Add New Order</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_new_order_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_order_header"
              data-kt-scroll-wrappers="#kt_modal_new_order_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2">Order Name</label>
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  class="form-control"
                  :class="errors.orderName ? 'is-invalid' : ''"
                  placeholder=""
                  name="orderName"
                  v-model="newOrderData.orderName"
                />
                <ErrorMessage class="invalid-feedback" name="orderName" />
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-5 fw-semobold mb-2">Expenses</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="number"
                    class="form-control"
                    :class="errors.expenses ? 'is-invalid' : ''"
                    placeholder=""
                    name="expenses"
                    v-model="newOrderData.expenses"
                  />
                  <ErrorMessage class="invalid-feedback" name="expenses" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--end::Label-->
                  <label class="required fs-5 fw-semobold mb-2"
                    >Hours Of Work</label
                  >
                  <!--end::Label-->

                  <!--end::Input-->
                  <Field
                    type="number"
                    class="form-control"
                    :class="errors.hoursOfWork ? 'is-invalid' : ''"
                    placeholder=""
                    name="hoursOfWork"
                    v-model="newOrderData.hoursOfWork"
                  />
                  <ErrorMessage class="invalid-feedback" name="hoursOfWork" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-5 fw-semobold mb-2"
                    >Materials</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="number"
                    class="form-control"
                    :class="errors.materials ? 'is-invalid' : ''"
                    placeholder=""
                    name="materials"
                    v-model="newOrderData.materials"
                  />
                  <ErrorMessage class="invalid-feedback" name="materials" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--end::Label-->
                  <label class="required fs-5 fw-semobold mb-2">Labor</label>
                  <!--end::Label-->

                  <!--end::Input-->
                  <Field
                    type="number"
                    class="form-control"
                    :class="errors.labor ? 'is-invalid' : ''"
                    placeholder=""
                    name="labor"
                    v-model="newOrderData.labor"
                  />
                  <ErrorMessage class="invalid-feedback" name="labor" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_new_order_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_new_order_submit"
              class="btn btn-primary"
            >
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--end::Modal - New order-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

interface newOrderData {
  orderName: string;
  hoursOfWork: number;
  expenses: number;
  materials: number;
  labor: number;
}

export default defineComponent({
  name: "new-order-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newOrderModalRef = ref<null | HTMLElement>(null);

    const newOrderData = ref<newOrderData>({
      orderName: "",
      hoursOfWork: 0,
      expenses: 0,
      materials: 0,
      labor: 0,
    });

    const validationSchema = Yup.object().shape({
      orderName: Yup.string().required().label("Order Name"),
      hoursOfWork: Yup.string().label("Hours Of Work"),
      expenses: Yup.string().label("Expenses"),
      materials: Yup.string().label("Materials"),
      labor: Yup.string().label("Labor"),
    });

    const submit = () => {
      if (!submitButtonRef.value) {
        return;
      }

      //Disable button
      submitButtonRef.value.disabled = true;
      // Activate indicator
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      emit("NewOrder", newOrderData.value);

      hideModal(newOrderModalRef.value);
    };

    return {
      newOrderData,
      validationSchema,
      submit,
      submitButtonRef,
      newOrderModalRef,
      getAssetPath,
    };
  },
});
</script>