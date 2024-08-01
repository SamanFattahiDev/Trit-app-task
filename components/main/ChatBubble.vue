<template>
  <div :class="{'chat-start':props.message.isMe,'chat-end':!props.message.isMe}" class="chat ">
    <div :class="{'!bg-blue-400 text-white':props.message.isMe}" class="chat-bubble rounded-xl">
      <img v-if="props.message.image" :src="props.message.image" alt="" class="max-w-40 cursor-pointer" @click="openViewMediaModal">
      {{ props.message.message }}
    </div>

  </div>

</template>

<script lang="ts" setup>
const props = defineProps({
  message: {
    type: Object
  }
})
const emits = defineEmits<{
  (e:'openMediaModal',image:string)
}>()
function openViewMediaModal(){
  emits('openMediaModal',props.message.image)
}
</script>

<style scoped>
.chat-end .chat-bubble:before {
  right: 10% !important;
}

.chat-start .chat-bubble:before {
  right: 0% !important;
}

.chat-start .chat-bubble {
  border-bottom-left-radius: 10px !important;
}
</style>