<template>
  <div class=" grid grid-cols-12 relative">
    <div class="md:col-span-9 col-span-12 z-50 ">
      <LazyMainChatMain></LazyMainChatMain>
    </div>
    <div class="md:col-span-3 md:relative absolute w-full col-span-12 z-20 border-r min-h-screen">
      <LazyMainChatSidebar></LazyMainChatSidebar>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>