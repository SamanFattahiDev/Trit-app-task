<template>
  <div>
    <div class="bg-black/20 fixed top-0 z-[2] left-0 w-full h-full" @click="close"></div>
    <div
        class="w-full xl:w-[400px] xl:!left-auto left-0   fixed top-1/3 min-h-[20rem] grid z-[3]    bg-white rounded-lg shadow p-5 flex flex-col gap-3">
      <span class="text-secondary font-bold self-center text-center">آیا میخواهید از حساب کاربری خود خارج شوید ؟</span>
      <div class="w-full flex gap-2 self-end">
        <button class="main-button w-1/2" type="button" @click="logout">بله</button>
        <button class="main-button-outline w-1/2" type="button" @click="close">خیر</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useAuthStore} from "~/stores/auth";

const emits = defineEmits<{
  (e: 'close'): void
}>()
const authStore = useAuthStore()
const router = useRouter()

function logout() {
  authStore.logout()
  router.push('/sign-in')
}

function close() {
  emits('close')
}
</script>

<style scoped>

</style>
