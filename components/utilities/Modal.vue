<template>
  <!--  Modal region  -->
  <teleport to="body">
    <input :id="props.id" ref="close" class="modal-toggle" type="checkbox"/>

    <div class="modal z-[9999] " role="dialog">
      <label
          :class="{'min-h-screen relative':fullHeight}"
          class="modal-box w-full  left-0 relative  p-0 bg-white dark:bg-dark-muted"
          for=""
          style="direction: ltr !important"
      >
        <div

            class="flex items-center  justify-between pb-2 px-4 my-3 border-b dark:border-gray-400 border-gray-200"
        >
          <label :for="props.id" class="cursor-pointer">
        <CloseIcon class="fill-red-500 w-5 h-5"></CloseIcon>
          </label>
          <strong  v-if="props.title" class="dark:text-white text-gray-700 text-sm md:text-lg">{{
              props.title
            }}</strong>
        </div>

        <slot v-if="hasBody" name="modalBody"></slot>
        <div
            v-if="!hideActions"
            :class="{ 'right-[39%] absolute bottom-0': fullHeight }"
            class="  !z-50  mt-3    space-x-3 !justify-start px-3 pb-3"
        >
          <label
              v-if="props.okModalTitle"
              class="btn main-button w-full mb-2 border-none text-white"
              for="optionsModal"
              @click="ok"
          >
            <span class="mt-1">
              {{ props.okModalTitle }}
            </span>
          </label>

        </div>
      </label>
      <label :for="props.id"  class="modal-backdrop"></label>
    </div>
  </teleport>
  <!--  Modal region End -->
</template>

<script lang="ts" setup>
import {ref} from "vue";
import CloseIcon from "~/components/icons/CloseIcon.vue";

const props = defineProps({
  id: {
    type: String,
  },
  fullHeight: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null,
  },
  closeModalTitle: {
    type: String,
    required: false,
    default: "close",
  },
  okModalTitle: {
    type: String,
  },
  hasBody: {
    type: Boolean,
    default: true,
  },
  hideActions: {
    type: Boolean,
    default: false
  }
});


const emits = defineEmits(["closeModal", "ok"]);

const close = ref<any>(null);

function ok(): void {
  emits("ok");
  close.value.click();
  // closeModal();
}

function closeModal(): void {
  // emits("closeModal");
  close.value.click();
}
</script>

<style scoped></style>
