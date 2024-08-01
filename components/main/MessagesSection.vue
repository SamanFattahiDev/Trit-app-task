<template>
  <div class="custom-height bg-white relative overflow-y-auto" style="overflow-y: scroll"

  >
    <LazyMainChatBubble v-for="(message,idx) in selectedConversation.messages" :id="`chatBubble${idx}`"
                        :ref="el => chatBubble.push(el)"
                        :message="message"
                        @openMediaModal="openMediaModalSetData"></LazyMainChatBubble>
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
import type {PropType} from "vue";

const props = defineProps({
  setScrollFromInteractions: {
    type: Boolean as PropType<boolean>
  }
})
watch(() => props.setScrollFromInteractions, async (val) => {
  scrollToLast()
})
const chatStore = useChatStore()
const chatBubble = ref([])
const viewMedia = ref(null)
const previewImage = ref('')
onMounted(() => {
  setTimeout(() => {
    scrollToLast()
  }, 100)
})
const {selectedConversationId, conversations} = storeToRefs(chatStore)
const selectedConversation = computed(() => {
  return conversations.value.filter(e => e.id === selectedConversationId.value)[0]
})
window.addEventListener('storage', async function (event) {
  await chatStore.updateFromTabs(JSON.parse(event.newValue).conversations)
  scrollToLast()
});


function openMediaModalSetData(image: string) {
  previewImage.value = image
  viewMedia.value.click()
}


function scrollToLast() {
  const element: HTMLElement | any = document.getElementById(`chatBubble${selectedConversation?.value?.messages?.length - 1}`)
  if (element) {

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }
}

</script>

<style scoped>
.custom-height {
  height: calc(100vh - 9.2vh);
}

.custom-top {
  top: calc(100vh - 9.2vh);
}

</style>