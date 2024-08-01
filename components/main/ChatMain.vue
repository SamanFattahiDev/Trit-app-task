<template>
  <div v-if="selectedConversationId" class="w-full flex flex-col">
  <LazyMainChatHeader ></LazyMainChatHeader>
    <LazyMainMessagesSection></LazyMainMessagesSection>

  </div>

</template>

<script setup lang="ts">
const chatStore = useChatStore()
const {selectedConversationId} = storeToRefs(chatStore)
</script>

<style scoped>

</style>