<template>
  <div class="w-full p-3 mt-10 bg-slate-700 md:px-28 grid grid-cols-12 text-white">
    <div class="md:col-span-3 col-span-12 flex flex-col items-center">
      <h1 class=" text-white text-3xl font-bold">easybank</h1>
      <div class="socialMedia cursor-pointer  mt-20 flex items-center gap-3">
        <PinterestIcon class="hover:!fill-green-500 fill-white transition-all"></PinterestIcon>
        <InstagramIcon class="hover:!fill-green-500 fill-white transition-all"></InstagramIcon>
        <FacebookIcon class="hover:!fill-green-500 fill-white transition-all"></FacebookIcon>
        <YoutubeIcon class="hover:!fill-green-500 fill-white transition-all"></YoutubeIcon>
        <TwitterIcon class="hover:!fill-green-500 fill-white transition-all"></TwitterIcon>
      </div>
    </div>
    <div class="md:col-span-3 col-span-6 md:mt-10 mt-10 flex flex-col items-start justify-center gap-3">
      <nuxt-link class=" transition-all hover:text-green-500" to="about-us">
        <span>
          About Us
        </span>
      </nuxt-link>
      <nuxt-link class=" transition-all hover:text-green-500" to="about-us">
        <span>
          Contact Us
        </span>
      </nuxt-link>
      <nuxt-link class=" transition-all hover:text-green-500" to="about-us">
        <span>
          FAQ
        </span>
      </nuxt-link>
    </div>
    <div class="md:col-span-3 col-span-6 md:mt-10 mt-10 flex flex-col items-start justify-center gap-3">
      <nuxt-link class=" transition-all hover:text-green-500" to="about-us">
        <span>
          About Us
        </span>
      </nuxt-link>
      <nuxt-link class=" transition-all hover:text-green-500" to="about-us">
        <span>
          Contact Us
        </span>
      </nuxt-link>
      <nuxt-link class=" transition-all hover:text-green-500" to="about-us">
        <span>
          FAQ
        </span>
      </nuxt-link>
    </div>

  </div>
</template>

<script setup>

import PinterestIcon from "~/components/icons/PinterestIcon.vue";
import InstagramIcon from "~/components/icons/InstagramIcon.vue";
import FacebookIcon from "~/components/icons/FacebookIcon.vue";
import YoutubeIcon from "~/components/icons/YoutubeIcon.vue";
import TwitterIcon from "~/components/icons/TwitterIcon.vue";</script>

<style scoped>

</style>