<template>
  <div
      :class="{
      '!chat-start':( props.message['creatorUserId'] === 7 && role.toLowerCase()==='customersupport')||(props.message['creatorUserId'] === authStore.getUser.userId &&  role.toLowerCase()!=='customersupport'),
    }"
      class="chat chat-end"
      dir="rtl"
  >
    <div class="chat-header"></div>
    <div
        :class="{
        '!bg-secondary !rounded-xl':
       ( props.message['creatorUserId'] === 7 && role.toLowerCase()==='customersupport')||(props.message['creatorUserId'] === authStore.getUser.userId &&  role.toLowerCase()!=='customersupport'),
      }"
        class="chat-bubble bg-primary before:hidden text-white"
    >
      <img
          v-if="
          props.message['chatMedia'] &&
          (props.message['chatMedia'].includes('.jpg') ||
            props.message['chatMedia'].includes('.png'))
        "
          :src="
          config.public.pictureUrl +
          'media/gallery/ChatMedia/' +
          props.message['chatMedia']
        "
          alt=""
          class="w-full h-40"
          @click="emitSelectedMedia(props.message['chatMedia'])"
      />
      <audio
          v-else-if="
          props.message['chatMedia'] &&
          props.message['chatMedia'].includes('.mp3')
        "
          :src="
          config.public.pictureUrl +
          'media/gallery/ChatMedia/' +
          props.message['chatMedia']
        "
          controls
      ></audio>
      <template v-else-if="props.message['chatMedia']">
        <a
            :href="
            config.public.pictureUrl +
            'media/gallery/ChatMedia/' +
            props.message['chatMedia']
          "
            class="flex items-center gap-x-1 underline"
            download
            target="_blank"
        >
          <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>

          {{ message["messageBody"] }}
        </a>
      </template>
      <template v-else>
        {{ message["messageBody"] }}
      </template>
    </div>
    <div class="chat-footer flex items-center justify-between mt-1">
      <time class="text-xs">
        {{ new Date(props.message["createDate"]).toLocaleTimeString('fa-IR', {hour: 'numeric', minute: 'numeric'}) }}
      </time>
      <template
          v-if="(props.message['creatorUserId'] ===  7 && role.toLowerCase()==='customersupport')||(props.message['creatorUserId'] === authStore.getUser.userId &&  role.toLowerCase()!=='customersupport')"
      >
        <div class="flex items-center ">
          <DynamicIcon v-if="props.message.isDelivered" class="relative !w-3 !h-3" icon="tick"></DynamicIcon>
          <DynamicIcon v-if="props.message.isRead" class="relative  left-2 !w-3 !h-3" icon="tick"></DynamicIcon>
        </div>

      </template>
    </div>
  </div>
</template>
<script setup>
import {useAuthStore} from "@/stores/auth";
import DynamicIcon from "~/components/main/DynamicIcon.vue";

const emits = defineEmits(["emitSelectedMedia"]);
const authStore = useAuthStore();
const config = useRuntimeConfig()
let {role} = storeToRefs(authStore)
function emitSelectedMedia(media) {
  window.open(
      config.public.pictureUrl + "media/gallery/ChatMedia/" + props.message["chatMedia"],
      "_blank"
  );
  // emits("emitSelectedMedia", media);
}

const props = defineProps({
  chatDirection: {
    type: String,
    required: true,
    validator(value) {
      return ["start", "end"].includes(value);
    },
    default: "start",
  },
  message: {
    type: Object,
  },
  chatMessage: {
    type: String,
  },
  isDelivered: {
    type: Boolean,
  },
  isRead: {
    type: Boolean,
  },
  createDate: {
    required: false,
  },
});
</script>
