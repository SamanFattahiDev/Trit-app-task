<template>
  <div

      v-if="props.totalPages && props.totalPages> 1"
      class="flex flex-wrap items-center justify-start"
  >
    <button
        :disabled="props.activePage === 1"
        class="p-1 rounded-full dark:bg-slate-600 bg-stone-200"
        @click="setNewPage(props.activePage - 1)"
    >
      <LazyMainDynamicIcon icon="arrow_left" class="stroke-black w-6 h-6 dark:stroke-white rotate-180"></LazyMainDynamicIcon>
    </button>
    <button
        v-if="props.totalPages > 3 && props.activePage > 3"
        :class="
        props.activePage === 1
          ? 'bg-primary text-black border-none text-black rounded-full w-8 h-8 mx-2'
          : 'bg-stone-200'
      "
        class="text-black border-none text-black rounded-full w-8 h-8 mx-2 "
        @click="setNewPage(1)"
    >
      {{ 1 }}
    </button>
    <span
        v-if="props.totalPages > 3 && props.activePage > 3"
        class="m-3  cursor-text"
    >
      ...
    </span>
    <button
        v-for="i in filteredPage"
        :key="i"
        :class="
        props.activePage === i
          ? 'bg-primary p-2 rounded-full text-white cursor-pointer'
          : 'bg-stone-200'
      "
        class="text-black border-none text-black rounded-full w-8 h-8 flex items-center justify-center mx-2"
        @click="setNewPage(i)"
    >
      {{ i }}
    </button>
    <span
        v-if="props.totalPages > 3 && props.activePage < props.totalPages - 3"
        class="m-3 w-8 h-8 cursor-text"
    >
      ...
    </span>
    <button
        v-if="props.totalPages > 3"
        :class="
        props.activePage === props.totalPages
          ? 'bg-primary rounded-full text-white cursor-pointer'
          : 'bg-stone-200'
      "
        class="text-black border-none text-black rounded-full w-8 h-8 mx-2"
        @click="setNewPage(props.totalPages)"
    >
      {{ props.totalPages }}
    </button>
    <button
        :disabled="props.activePage === props.totalPages"
        class="p-1 rounded-full dark:bg-slate-600 bg-stone-200"
        @click="setNewPage(props.activePage + 1)"
    >
      <LazyMainDynamicIcon icon="arrow_left" class="stroke-black transform rotate-[360deg] w-6 h-6 dark:stroke-white rotate-180"></LazyMainDynamicIcon>

    </button>
  </div>
</template>
<script lang="ts" setup>
import {computed} from "vue";

const emits = defineEmits<{
  (e: 'PageChanged', pageNumber: number): void
}>()
const props = defineProps(['totalPages', 'activePage'])

function setNewPage(pageNumber: number) {
  emits("PageChanged", pageNumber);
}

const filteredPage = computed(() => {
  // Okay, idk what's happening here, but im proud of it
  // Half of credit goes to @amoowily
  if (props.totalPages && props.totalPages > 3) {
    let filteredPaginationArray = [];
    if (props.activePage < 3) {
      // Rendering first 8 pages
      for (let i = 1; i <= 3; i++) {
        filteredPaginationArray.push(i);
      }
    } else if (props.activePage < props.totalPages - 2) {
      // Rendering middle pages
      filteredPaginationArray = [];
      for (let i = props.activePage - 2; i <= props.activePage + 2; i++) {
        filteredPaginationArray.push(i);
      }
    } else {
      // Rendering last pages
      filteredPaginationArray = [];
      for (let i = props.activePage - 3; i <= props.totalPages - 1; i++) {
        filteredPaginationArray.push(i);
      }
    }
    return filteredPaginationArray;
  } else {
    return props.totalPages;
  }
})
</script>
<style>
.ActiveClass {
  color: white;
  background-color: #00adef;
}


</style>
