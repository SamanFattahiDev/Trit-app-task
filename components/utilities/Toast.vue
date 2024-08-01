<template>
  <transition name="slide-left">
    <div v-if="toastMessage.showToast && toastMessage.variant==='success'"
         class="fixed top-10 xl:w-2/12 w-11/12 left-0 bg-secondary border-l-[8px] border-green-500 leading-10  shadow-lg rounded-lg   z-[99999999] p-3 ">
      <!--      <div class="flex items-center gap-2">-->
      <!--        <DynamicIcon :icon="`CheckIcon`" class="fill-green-500"></DynamicIcon>-->
      <!--        <span>Success</span>-->
      <!--      </div>-->
      <p class="text-white px-1">{{ toastMessage.content }}</p>
    </div>

  </transition>
  <transition name="slide-left">
    <div v-if="toastMessage.showToast && toastMessage.variant==='error'"
         class="fixed top-10 xl:w-2/12 w-11/12 left-0 bg-secondary border-l-[8px] border-red-500 leading-10  shadow-lg rounded-lg   z-[99999999] p-3 ">
      <!--      <div class="flex items-center gap-2">-->
      <!--        <DynamicIcon :icon="`AlertIcon`" class="fill-red-500"></DynamicIcon>-->
      <!--        <span>Error</span>-->
      <!--      </div>-->
      <p class="text-white px-1 ">{{ toastMessage.content }}</p>

    </div>
  </transition>
  <transition name="slide-left">
    <div v-if="toastMessage.showToast && toastMessage.variant==='info'"
         class="fixed top-10 xl:w-2/12 bg-secondary w-full border-l-4   leading-10  shadow rounded-lg z-[99999999] p-4">
      <!--      <div class="flex items-center gap-2">-->
      <!--        <DynamicIcon :icon="`AlertIcon`" class="fill-red-500"></DynamicIcon>-->
      <!--        <span>Error</span>-->
      <!--      </div>-->
      <p class="text-white px-1 text-center">{{ toastMessage.content }}</p>

    </div>
  </transition>
</template>

<script lang="ts" setup>
import {useToastStore} from "~/stores/toast";

let toastStore = useToastStore()

interface IToastMessage {
  showToast: false,
  variant?: '',
  content: '',
  timeout: null
}

let toastMessage = reactive<IToastMessage>({
  showToast: false,
  variant: '',
  content: '',
  timeout: null
})
onMounted(() => {
  toastStore.$onAction((mutation) => {
    setToast(mutation)
  })
})


watch(toastMessage, async (val) => {
  if (val) {
    setTimeout(() => {
      toastMessage.showToast = false
    }, 3000)
  }
})

function setToast(mutation: any) {
  toastMessage.variant = mutation.name
  toastMessage.content = mutation.args[0]
  toastMessage.showToast = true
}
</script>

<style scoped>
.slide-left-enter-active {
  animation: slideRightAnm 0.5s ease-in-out;
}

.slide-left-leave-active {
  animation: slideRightAnm reverse 0.5s ease-in-out;
}

@keyframes slideRightAnm {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

</style>