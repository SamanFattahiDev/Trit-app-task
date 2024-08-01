<template>
  <div :class="{'flex-row':horizontal,'flex-col':!horizontal}" class="w-full flex   gap-2">
    <div :class="{'order-2':horizontal,'order-1':!horizontal}" class="flex flex-col gap-2  ">
      <span>استان</span>
      <LazyUtilitiesCustomSelect :key="cityState.stateId" v-model="cityState.stateId" :default="cityState.stateId"
                                 :options="states" extract="stateId"
                                 label="name"></LazyUtilitiesCustomSelect>

    </div>
    <div :class="{'order-1':horizontal,'order-2':!horizontal}" class="flex flex-col gap-2 ">
      <span>شهر</span>
      <LazyUtilitiesCustomSelect :key="cityState.cityId" v-model="cityState.cityId" :default="cityState.cityId"
                                 :options="cities" extract="cityId"
                                 label="name"></LazyUtilitiesCustomSelect>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import type {ICity, IState} from "../../models/IAddressPicker";

const props = defineProps({
  horizontal: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  defaultIds: {
    type: Array
  }
})

interface result {
  cityId: number,
  stateId: number
}


const emits = defineEmits<{
  (e: 'getCityState', cityState: result): void
}>()
onMounted(() => {
  getAllStates()
})
let cities = ref<ICity[]>([])
let states = ref<IState[]>([])
let cityState = ref<Record<string, number | null>>({
  stateId: null,
  cityId: null
})

watch(() => cityState.value.stateId, async (val, oldVal) => {
  getAllCities()
}, {deep: true})
watch(() => cityState.value.cityId, async (val, oldVal) => {
  emits('getCityState', cityState.value)
}, {deep: true})

watch(() => props.defaultIds, async (val) => {
  if (val) {
      cityState.value.stateId = val[0]
      cityState.value.cityId = val[1]
  }
}, {immediate: true})

async function getAllCities() {
  try {
    const res = await useApi.getAllCities.setParams({
      stateId: cityState?.value?.stateId
    }, 'GET')
    cities.value = res.data
  } catch (e) {
    console.log(e)
  }
}

async function getAllStates() {
  try {
    const res = await useApi.getAllStates.setTag('GET')
    states.value = res.data
  } catch (e) {
    console.log(e)
  }
}

</script>

<style scoped>

</style>