<template>
  <div class="w-full relative">
    <div class="py-6 px-2 border-b">
      <input v-model="debouncedSearchCommand" class="input input-bordered w-full" dir="auto" placeholder="search..."
             type="text">
    </div>
    <div class="flex flex-col ">
      <template v-if="filteredConversations.length>0">
        <LazyMainConversationCard v-for="conversation in filteredConversations"
                                  :conversation="conversation"></LazyMainConversationCard>
      </template>
      <div v-else>
        <LazyUtilitiesEmptyView>
          <template #content>
            <div class="w-full flex items-center justify-center mt-10">
              <span>مکالمه ای یافت نشد</span>
            </div>
          </template>
        </LazyUtilitiesEmptyView>
      </div>
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
    filteredConversations() {
      return this.chatStore.$state.conversations.filter(e => e.name.includes(this.searchCommand))
    }
  }
}

</script>

<style scoped>

</style>