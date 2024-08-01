<template>
  <div class="w-full flex items-center justify-between p-3 print:!bg-gray-200">
    <img alt="" src="/logo.png" style="width: 80px;height: 80px;object-fit: contain">
    <strong class="text-lg ">{{ props.title }} </strong>
    <div class="flex flex-col">
      <span>تاریخ صدور: </span>
      <span
          class="text-secondary">{{
          new Date(new Date(Date.now())).toLocaleDateString('fa-IR')
        }}-{{ new Date(new Date(Date.now())).toLocaleTimeString('fa-IR') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type {PropType} from "vue";

const props = defineProps({
  title: {
    type: String as PropType<string>,
    required: true
  },

})
</script>

<style scoped>

</style>