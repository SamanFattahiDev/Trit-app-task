<template>
  <div class="custom-height bg-white relative overflow-y-auto" style="overflow-y: scroll">
    <LazyMainChatBubble v-for="(message,idx) in getSelectedConversation.messages" :id="`chatBubble${idx}`"
                        :ref="el => chatBubble.push(el)"
                        :message="message"
                        @openMediaModal="openMediaModalSetData"></LazyMainChatBubble>
    <LazyMainChatInteractions class="sticky z-50 bottom-0"
                              @setScroll="scrollToLast"></LazyMainChatInteractions>
    <label ref="viewMedia" for="viewMedia"></label>
    <LazyUtilitiesModal
        :id="'viewMedia'"
        :closeModalTitle="'بستن'"
        :has-body="true"
    >
      <template #modalBody>
        <div class="w-full flex flex-col gap-3 p-3">
          <img v-if="previewImage" :src="previewImage" alt=""
               class=" object-cover rounded-xl shadow">
        </div>
      </template>
    </LazyUtilitiesModal>
  </div>
</template>

<script lang="ts" setup>
const chatStore = useChatStore()
const chatBubble = ref([])
const viewMedia = ref(null)
const previewImage = ref('')
onMounted(() => {
  setTimeout(() => {
    scrollToLast()
  }, 100)
})
const getSelectedConversation = computed(() => {
  return chatStore.getSelectedConversation
})
window.addEventListener('storage', async function (event) {
  await chatStore.setSelectedConversation(JSON.parse(event.newValue).selectedConversation)
  scrollToLast()
});

function openMediaModalSetData(image: string) {
  previewImage.value = image
  viewMedia.value.click()
}


function scrollToLast() {
  const element: HTMLElement | any = document.getElementById(`chatBubble${getSelectedConversation.value.messages.length - 1}`)
  if (element)
    element.scrollIntoView({
      behavior: 'smooth'
    })
}

</script>

<style scoped>
.custom-height {
//min-height: 100rem; height: calc(100vh - 9.2vh);
}


</style>