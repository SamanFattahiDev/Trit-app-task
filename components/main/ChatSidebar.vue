<template>
  <div class="w-full">
    <div class="py-6 px-2 border-b">
      <input v-model="debouncedSearchCommand" class="input input-bordered w-full" dir="auto" placeholder="search..."
             type="text">
    </div>
    <div class="flex flex-col ">
      <LazyMainConversationCard v-for="conversation in filteredConversations"
                                :conversation="conversation"></LazyMainConversationCard>
    </div>
  </div>
</template>

<script>
import {mapStores} from 'pinia'


export default {
  data() {
    return {
      searchCommand: '',
      timeout: null
    }
  },
  computed: {
    ...mapStores(useChatStore),
    debouncedSearchCommand: {
      get() {
        return this.searchCommand
      },
      set(val) {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          this.searchCommand = val
        }, 300)
      }
    },
    filteredConversations (){
      return this.chatStore.$state.conversations.filter(e => e.name.includes(this.searchCommand))
    }
  }
}
// const searchCommand = ref('')
// const timeout = ref(null)
// const chatStore = useChatStore()
// const getConversations = computed(() => {
//   return chatStore.getConversations
// })
// const debouncedSearchCommand = computed({
//   get() {
//     return searchCommand.value
//   },
//   set(val) {
//     if (timeout.value) {
//       clearTimeout(timeout.value)
//     }
//     timeout.value = setTimeout(() => {
//       searchCommand.value = val
//     },300)
//   }
// })
// const filteredConversations = computed(() => {
//   return getConversations.value.filter(e => e.name.includes(searchCommand.value))
// })

</script>

<style scoped>

</style>