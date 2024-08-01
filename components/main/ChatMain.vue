<template>
  <div v-if="selectedConversationId" class="w-full flex flex-col">
    <LazyMainChatHeader class="sticky custom-top z-50 top-0"></LazyMainChatHeader>
    <LazyMainMessagesSection :setScrollFromInteractions="setScrollFromInteractions"></LazyMainMessagesSection>
    <LazyMainChatInteractions class="sticky custom-top z-50 bottom-0"
                              @setScroll="setScrollFromInteractions =! setScrollFromInteractions"></LazyMainChatInteractions>
  </div>

</template>

<script lang="ts" setup>
const chatStore = useChatStore()
// im using this variable to notify messages section to scroll to last element
const setScrollFromInteractions = ref(false)
const {selectedConversationId} = storeToRefs(chatStore)
</script>

<style scoped>

</style>