import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3PersianDatetimePicker, {
        name:'date-picker',
        inputClass: 'text-right !bg-red-500 ring-0 text-[14px] rounded-lg  placeholder:text-[14px] !leading-10',
        placeholder: 'لطفا یک تاریخ انتخاب کنید',
        altFormat: 'YYYY-MM-DD HH:mm',
        color: '#ffffff',
        autoSubmit: false,
    })
})