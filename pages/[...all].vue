<template>
  <main class=" min-h-screen grid bg-gray-50 relative w-full p-8">
    <div class="h-full flex flex-col items-center justify-center">
      <nuxt-img src="/404.png" alt="" class="w-full h-[30rem] object-contain"></nuxt-img>
    </div>
  </main>
</template>

<script setup lang="ts">

useHead({
  title:'404'
})
definePageMeta({
  layout:'error'
})
</script>

<style scoped>

</style>