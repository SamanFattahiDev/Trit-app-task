<template>
  <div>
    <span class="font-semibold ">{{ label }} </span>
    <div :class="{'mt-2':label}" class="">
      <input
          v-model="modelValue"
          :class="[customCss]"
          :maxlength="maxLength"
          :name="vname"
          :placeholder="placeHolder"
          :type="dataType"
          class="form-control placeholder:text-right w-full mt-2 border-b font-light placeholder:text-[14px] pb-1 bg-transparent"
          dir="auto"
          v-on="handlers"
      />
    </div>
    <ErrorMessage v-slot="{ message }" :name="vname" as="span" class="text-sm !text-red-500">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>


<script lang="ts" setup>
import {ErrorMessage, useField} from "vee-validate";
import {toRef} from 'vue';
import {modes} from "../../models/interactionModes";

const modelValue = defineModel()
let props = defineProps({
  dataType: {
    type: String,
    default: 'text'
  },
  maxLength: {
    type: String
  },
  error: {
    type: Boolean,
    default: false
  },
  vname: {
    type: String,
    required: true
  },
  errorMessage: {
    type: String,

  },
  placeHolder: {
    type: String,
  },
  iconName: {
    type: String,
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
