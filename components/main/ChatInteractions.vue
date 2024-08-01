<template>
  <div class="w-full p-3 flex items-center gap-2 bg-gray-300">
    <button class="btn bg-white" @click="fileInput.click()">
      <input ref="fileInput" accept="image/*" class="hidden" type="file" @input="processFile">
      <AttachmentIcon class="w-6 h-6"></AttachmentIcon>
    </button>
    <input v-model.trim="message" class="input w-full bg-white border rounded-xl" dir="auto"
           placeholder="type your message here..." type="text"
           @keydown.enter="sendMessage">
    <button class="btn bg-white">
      <VoiceIcon class="w-6 h-6"></VoiceIcon>
    </button>

    <teleport to="body">
      <label ref="openFileMessageModal" for="sendFileMessage"></label>
      <LazyUtilitiesModal
          :id="'sendFileMessage'"
          :closeModalTitle="'بستن'"
          :has-body="true"
          :title="`افزودن عکس`"
      >
        <template #modalBody>
          <div class="w-full flex flex-col gap-3 p-3">
            <img :src="imagePreview" alt="" class="max-h-40 object-cover rounded-xl shadow">
            <textarea v-model="messageFile" class="input bg-gray-100 border rounded-xl" rows="10"></textarea>
            <div>
              <button class="btn bg-blue-500 text-white border-none" @click="sendMessageWithFile">ارسال</button>
            </div>
          </div>
        </template>
      </LazyUtilitiesModal>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import AttachmentIcon from "~/components/icons/AttachmentIcon.vue";
import VoiceIcon from "~/components/icons/VoiceIcon.vue";

const message = ref('')
const messageFile = ref('')
const imagePreview = ref('')
const chatStore = useChatStore()
const fileInput = ref(null)
const openFileMessageModal = ref(null)
const emits = defineEmits<{
  (e: 'setScroll'): void
}>()

function processFile() {
  imagePreview.value = URL.createObjectURL(fileInput.value.files[0])
  openFileMessageModal.value.click()
}

async function sendMessageWithFile() {
  await chatStore.sendMockMessage(messageFile.value, imagePreview.value)
  messageFile.value = ''
  emits('setScroll')
  openFileMessageModal.value.click()


}

async function sendMessage() {
  if (message.value) {
    await chatStore.sendMockMessage(message.value)
    message.value = ''
    emits('setScroll')
  }
}
</script>

<style scoped>

</style>