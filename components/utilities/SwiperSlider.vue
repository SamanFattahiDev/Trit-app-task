<template>
  <Swiper
      v-bind="sliderOptions"
  >
    <SwiperSlide v-for=" (item,idx) in props.items" :key="idx">
      <slot :slideContent="item" name="slide"></slot>
    </SwiperSlide>

  </Swiper>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<any>
  },
  sliderOptions: {
    type: Object as PropType<object>,
    required: true
  }
})


</script>

<style scoped>

</style>