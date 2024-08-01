<template>
  <div class="w-full h-16 px-4 bg-gray-100 flex gap-2 items-center justify-end">
    <div class="flex text-left flex-col gap-2">
      <strong>{{ selectedConversation.name }}</strong>
      <small class="text-gray-800">last seen at {{ new Date(Date.now()).toLocaleTimeString('fa-IR') }}</small>
    </div>
    <img :src="selectedConversation.picture" alt="" class="w-12 h-12 border shadow-2xl rounded-xl object-contain">
    <div class="cursor-pointer" @click="deselectConversation">
      <ChevronLeftIcon class="w-8 h-8"></ChevronLeftIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChevronLeftIcon from "~/components/icons/ChevronLeftIcon.vue";

const chatStore = useChatStore()
const {selectedConversationId, conversations} = storeToRefs(chatStore)
const selectedConversation = computed(() => {
  return conversations.value.filter(e => e.id === selectedConversationId.value)[0]
})
window.addEventListener('storage', async function (event) {
  await chatStore.updateSelectedChat(JSON.parse(event.newValue).selectedConversationId)
});

function deselectConversation() {
  chatStore.deselectChat()
}
</script>

<style scoped>

</style>