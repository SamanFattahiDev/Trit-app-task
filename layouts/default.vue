<template>

  <div class="main overflow-x-hidden h-screen ">
    <slot/>
    <!--    <Footer></Footer>-->
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
}
</style>
