<template>
  <div>
    <input ref="mediaHandler" class="hidden" accept="image/*" type="file" @input="handleFile">
    <div v-if="mediaResult.pictureUrl ===''"
         class="w-24 h-24 bg-Gray rounded-lg shadow flex gap-3 items-center justify-end flex-col"
         @click="mediaHandler.click()">
      <DynamicIcon icon="gallery-add"></DynamicIcon>
      <small class="mb-2 text-secondary">
        لوگوی شرکت
      </small>
    </div>
    <div v-else class="w-24 h-24 bg-Gray rounded-lg shadow flex gap-3 items-center justify-end flex-col"
         @click="mediaHandler.click()">
      <nuxt-img :src="mediaResult.pictureUrl" class="rounded-lg"></nuxt-img>
    </div>
  </div>
</template>

<script lang="ts" setup>

import DynamicIcon from "~/components/main/DynamicIcon.vue";
import {useRuntimeConfig} from "nuxt/app";
const config = useRuntimeConfig()
let mediaHandler = ref(null)
let mediaResult = ref({
  pictureUrl: '',
  base64: '',
  file: ''
})
const props = defineProps({
  defaultMedia: {
    type: String
  }
})
watch(()=> props.defaultMedia,async (val)=>{
  if(val){
      mediaResult.value.pictureUrl = `${config.public.pictureUrl}media/gallery/companyLogo/${val}`
  }
},{immediate:true})
const emits = defineEmits<{
  (e: 'setMedia', MediaResult: object): void
}>()

async function handleFile() {
  if (mediaHandler?.value?.files && mediaHandler?.value?.files[0]) {
    mediaResult.value.file = mediaHandler.value.files[0]
    mediaResult.value.pictureUrl = URL.createObjectURL(mediaHandler.value.files[0])
    mediaResult.value.base64 = await useUtils().makeBase64(mediaHandler.value.files[0])
    emits('setMedia', mediaResult.value)
  }
}
</script>

<style scoped>

</style>