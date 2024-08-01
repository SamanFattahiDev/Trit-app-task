<template>
  <Form :initialErrors="errorMessages" :validation-schema="schema" @submit="submitForm"
        @invalid-submit="onInvalidSubmit">

    <slot name="content"></slot>
  </Form>
</template>

<script lang="ts" setup>
import {Form} from 'vee-validate';
import type {PropType} from "vue";
import * as Yup from "yup";

const props = defineProps({
  schema: Yup.ObjectSchema as PropType<Yup.ObjectSchema<any>>,
  errorMessages: Object as PropType<Record<string, string>> | null
})
const emits = defineEmits<{
  (e: 'submitForm'): void
}>()

function submitForm() {
  emits('submitForm')
}

function onInvalidSubmit(event) {
  console.log(event)
}
</script>

<style scoped>

</style>
