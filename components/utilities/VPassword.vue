<template>
  <div>
    <span class="font-semibold ">{{ label }} </span>
    <div :class="{'mt-2':label}" class="relative rounded-lg px-3  bg-Gray ">

      <div :class="{'!border-red-500':error}" class="rounded-lg flex items-center border border-transparent  ">
        <DynamicIcon v-if="!showPassword" class="mr-2" icon="eye" @click="showPassword = true"></DynamicIcon>
        <DynamicIcon v-else class="mr-2" icon="eye-line" @click="showPassword = false"></DynamicIcon>
        <input
            v-model="modelValue"
            :class="[customCss]"
            :type="showPassword? 'text':'password'"
            :vname="vname"
            class="w-full rounded-lg bg-Gray placeholder:text-right  leading-10 ring-0 text-[14px] pr-2 placeholder:text-[14px] outline-0 px-2"
            dir="auto"
            v-on="handlers"
        />
        <DynamicIcon class="ml-2" icon="lock"></DynamicIcon>
      </div>
    </div>
    <ErrorMessage v-slot="{ message }" :name="vname" as="span" class="text-sm !text-red-500">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>


<script lang="ts" setup>


import DynamicIcon from "../components/main/DynamicIcon.vue";
import {useField,ErrorMessage} from "vee-validate";
import {toRef} from "vue";
import {modes} from "../../models/interactionModes";

let showPassword = ref(false)
const modelValue = defineModel()
let props = defineProps({
  error: {
    type: Boolean,
    default: false
  },
  vname: {
    type: String,
    required: true
  },

  label: {
    type: String
  },
  customCss: {
    type: String
  },
  validationMessage: {
    type: String
  },
  errorMessage: {
    type: String,
  },
  mode: {
    type: String,
    default: 'passive',
  },
})
const {meta, value, handleChange, handleBlur} = useField(
    toRef(props, 'vname'),
    null,
    {
      validateOnValueUpdate: false,
    }
);
// generates the listeners
const handlers = computed(() => {
  const on = {
    blur: handleBlur,
    // default input event to sync the value
    // the `false` here prevents validation
    input: [(e) => handleChange(e, false)],
  };
  // Get list of validation events based on the current mode
  const triggers = modes[props.mode]({

    meta,
  });
  // add them to the "on" handlers object
  triggers.forEach((t) => {
    if (Array.isArray(on[t])) {
      on[t].push(handleChange);
    } else {
      on[t] = handleChange;
    }
  });

  return on;
});

</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
