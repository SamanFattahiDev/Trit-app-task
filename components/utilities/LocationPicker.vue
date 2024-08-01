<template>
  <div class="w-full flex items-center gap-3">
    <v-input
              class="w-1/2" placeHolder=""
              label="استان"
              vname="companyNameEn"></v-input>

    <v-input
              class="w-1/2 " placeHolder=""
              label="شهر"
              vname="companyNameEn"></v-input>
  </div>
</template>

<script>
import VInput from "../components/utilities/VInput.vue";

export default {
  name: "LocationPicker",
  components: {VInput}
}
</script>

<style scoped>

</style>