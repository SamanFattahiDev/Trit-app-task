<template>
  <div v-if="statistics" class="w-full p-1">
    <div class="flex flex-col gap-2 ">
      <span class="font-bold">تعداد درخواست ها </span>
      <div class="flex flex-col gap-2">
        <div v-for="statistic in statisticsItems" class="flex items-center  justify-between">
          <span class="w-2/4">{{ statistic.title }}</span>
          <div class="w-2/4 ">
            <div class="relative flex" dir="ltr">
                <span v-if="statistics[statistic.key]!==0" class="absolute text-xl  text-white bottom-1/4 left-3 z-[1]">{{
                    statistics[statistic.key]
                  }}</span>
              <small v-else class="text-gray-400 self-center min-w-max">داده ای یافت نشد</small>
              <progress
                  :max="totalCount"
                  :value="statistics[statistic.key]"
                  class="progress bg-transparent  w-full h-[48px] !rounded-r-lg !rounded-l-none"></progress>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>


</template>

<script lang="ts" setup>
const props = defineProps({
  statistics: {
    type: Object,
    required: true
  },
  statisticsItems: {
    type: Array,
    required: true
  },
  totalCount: {
    type: Number
  }

})
</script>

<style scoped>

</style>