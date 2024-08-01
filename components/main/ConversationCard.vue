<template>
  <div :class="{'bg-gray-100':selectedConversation?.id===props.conversation.id}"
       class="w-full flex  hover:bg-gray-100 transition-all cursor-pointer px-4 py-2 gap-2"
       @click="setSelectedConversation">
    <div class="flex w-4/5 flex-col gap-1">
      <div class="w-full flex items-center justify-between">
        <small>{{ new Date(Date.now()).toLocaleDateString('en-US') }}</small>
        <strong>{{ conversation.name }}</strong>
      </div>
      <span class="text-left">{{ conversation.lastMessage }}</span>
    </div>
    <img :src="conversation.picture" alt="" class="w-1/5 h-16 border shadow-2xl rounded-xl object-contain">
  </div>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import type {IConversation} from "~/stores/chat";

const chatStore = useChatStore()
const props = defineProps({
  conversation: {
    type: Object as PropType<IConversation>
  }
})
const {selectedConversation} = storeToRefs(chatStore)
function setSelectedConversation() {
  chatStore.setSelectedConversation(props.conversation)
}
</script>

<style scoped>

</style>