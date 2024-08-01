<template>
  <div class="dropdown dropdown-hover">
    <label class="cursor-pointer fill-gray-500 text-gray-500 hover:text-gray-900 hover:fill-gray-900 flex items-center"
           tabindex="0">
      <span>
      {{ item['name'] }}
      </span>
      <ChevronDownIcon class="w-5 mt-1  h-5"></ChevronDownIcon>
    </label>
    <ul v-if="item.hasChildren" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        tabindex="0">
      <li v-for="(el,elIdx) in item.children" :key="elIdx">
        <nuxt-link :to="item.link">{{ el['name'] }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import ChevronDownIcon from "~/components/icons/ChevronDownIcon.vue";

const props = defineProps({
  item: {
    type: Object
  }
})

</script>

<style scoped>

</style>