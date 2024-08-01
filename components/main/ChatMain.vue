<template>
  <div v-if="getSelectedConversation" class="w-full flex flex-col">
  <LazyMainChatHeader ></LazyMainChatHeader>
    <LazyMainMessagesSection></LazyMainMessagesSection>

  </div>
<!--  <div v-else class="w-full min-h-screen flex items-center justify-center">-->
<!--    <span>یک مکالمه را انتخاب کنید</span>-->
<!--  </div>-->
</template>

<script setup lang="ts">
const chatStore = useChatStore()
const getSelectedConversation = computed(()=>{
  return chatStore.getSelectedConversation
})
</script>

<style scoped>

</style>