<template>
  <div v-if="type===1" class="w-full  border  flex items-center justify-around justify-center p-10">
    <span class="">مهر و امضای فروشنده</span>
    <span class="">مهر و امضای شرکت</span>
  </div>
  <div v-if="type===2" class="w-full  border  flex items-center justify-around justify-center p-10">
    <span class="">مهر و امضای فروشنده</span>
    <span class="">مهر و امضای کاربر</span>
  </div>
</template>

<script lang="ts" setup>
enum footerTypes {
  'factor' = 1,
  'receipt' = 2
}

import type {PropType} from "vue";

const props = defineProps({
  type: {
    type: Number as PropType<footerTypes>,
    required: false,
    default:1
  },

})
</script>

<style scoped>

</style>