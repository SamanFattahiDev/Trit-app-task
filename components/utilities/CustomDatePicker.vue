<script lang="ts" setup>
// import DatePicker from "vue3-persian-datetime-picker";

// Interfaces
interface IProps {
  inputId: string;
  label?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  defaultDate?: Date | string | null;
}

interface IEmit {
  (e: "getselectedDate", value: Date | null): void;
}


// Props
const props = withDefaults(defineProps<IProps>(), {
  inputId: "dateSelector",
  label: "تاریخ را انتخاب کنید",
  disabled: false,
  color: "success",
  min: "",
  max: "",
  density: "default",
});

// Emits
const emit = defineEmits<IEmit>();

// Variables
const selectedDate = ref<Date | null>(null);

// Watchers
watch(
    () => selectedDate.value,
    (newDate, oldDate) => {
      if (newDate != oldDate) {
        emit("getselectedDate", selectedDate.value);
      }
    }
);
// Watchers
watch(
    () => props.defaultDate,
    () => {
      if (props.defaultDate) {
        selectedDate.value = props.defaultDate as Date;
      }
    }
);

// Computed
const formattedDate = computed({
  get() {
    if (selectedDate.value)
      return new Date(selectedDate.value).toLocaleDateString("fa-IR");
  },

  set() {
    // Note: we don't need to set value in here.
  },
});

// Functions
function clearDateFilter() {
  selectedDate.value = null;
}

</script>

<template>
  <div>
    <Teleport to="body">
      <date-picker
          v-model="selectedDate"
          :custom-input="`#${props.inputId}`"
          :max="props.max"
          :min="props.min"
          class="custom-date-picker"
          clearable
          display-format="jYYYY/jMM/jDD"
          format="YYYY-MM-DD"
          input-format="YYYY/MM/DD"
      />
    </Teleport>
    <div class="flex flex-col gap-2">
      <span>{{ props.label }}</span>
      <div class="flex items-center rounded-lg bg-Gray">
        <div @click="clearDateFilter">
        <LazyMainDynamicIcon v-if="selectedDate" class="ml-2" icon="close"></LazyMainDynamicIcon>
        </div>

      <input :id="props.inputId"
             class="w-full rounded-lg bg-Gray placeholder:text-right  leading-10 ring-0 text-[14px] pr-2 placeholder:text-[14px] outline-0 px-2"
             placeholder="انتخاب تاریخ"
             type="text">
      </div>

    </div>
  </div>
</template>
<style scoped>
</style>
