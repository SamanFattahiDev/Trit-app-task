<template>
    <div class="flex w-full md:flex-row p-4 print:hidden flex-col gap-2 items-center justify-between">
      <button class="main-button btn-sm w-full md:w-2/12 flex items-center gap-2" type="button" @click="printOrder">
        <LazyMainDynamicIcon class="fill-white " icon="document-download"></LazyMainDynamicIcon>
        <span>پرینت</span>
      </button>
      <button class="main-button btn-sm w-full md:w-2/12 flex items-center  gap-2" type="button" @click="router.back()" >
        <span>بازگشت</span>
      </button>

    </div>
  <div
      class="print:!z-[9999999] hidden print:!w-full w-max  print:!block bg-white overflow-x-scroll h-full top-0 z-[9999999]">
    <template v-if="receiptType==='CustomerAdmin'">
      <LazyUtilitiesReceiptHeader
          title="فاکتور"></LazyUtilitiesReceiptHeader>
      <div class="w-full ">
        <div class="w-full bg-primary border flex items-center justify-center p-5">
          <span class="text-white">اطلاعات پرداخت</span>
        </div>
      </div>
      <div v-if="receiptData" class="w-full flex items-center gap-2">
        <table class="table border table-zebra">
          <!-- head -->
          <thead class="bg-gray-200  h-[3.5rem] text-xs md:text-base">
          <tr>
            <th>شناسه پرداخت درگاه زیبال</th>
            <th>تاریخ</th>
            <th>مبلغ</th>
          </tr>
          </thead>
          <tbody class="text-xs md:text-base">
          <tr>
            <td>{{ receiptData.trackingId }}</td>
            <td>{{
                new Date(receiptData.createDate).toLocaleTimeString('fa-IR', {
                  hour: "numeric",
                  minute: "numeric"
                })
              }} - {{ new Date(receiptData.createDate).toLocaleDateString('fa-IR') }}
            </td>
            <td><span class="">{{ Intl.NumberFormat('fa-IR').format(receiptData.amount) }} ریال</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <LazyUtilitiesReceiptFooter></LazyUtilitiesReceiptFooter>
      <div v-if="receiptData" class="w-full flex my-5 items-center justify-between " style="overflow-wrap: anywhere">
        {{ receiptData.resultMessage }}
        <div class="flex items-center gap-2">
          <small v-if="receiptData.statusId===1" class="badge !text-xs bg-primary text-secondary p-3">پرداخت شده</small>
          <small v-else-if="receiptData.statusId===2" class="badge !text-xs bg-secondary text-white p-3">کسر موجودی از
            درخواست ثبت
            شده</small>
          <!--          <small v-else class="badge !text-xs bg-red-400 text-white p-3">خطای داخلی</small>-->
        </div>
      </div>
    </template>
    <template v-if="receiptType==='CustomerAdminFactor'">
      <LazyUtilitiesReceiptHeader v-if="receiptData" :title="computedTitle(receiptData)"></LazyUtilitiesReceiptHeader>
      <hr>
      <div class="w-full bg-primary border flex items-center justify-center p-3">
        <span class="text-white">مشخصات شرکت</span>
      </div>
      <div v-if="receiptData" class="grid grid-cols-12">
        <div class="col-span-2 border p-4 bg-gray-200">نام شرکت</div>
        <div class="col-span-4 border p-4">{{ receiptData.companyInfo.name }}</div>
        <div class="col-span-2 border p-4 bg-gray-200">شماره ثابت شرکت</div>
        <div class="col-span-4 border p-4">{{ receiptData.companyInfo.phone }}</div>
        <div class="col-span-2 border p-4 bg-gray-200">شناسه ملی شرکت</div>
        <div class="col-span-10 border p-4">{{ receiptData.companyInfo.nationalCode }}</div>
      </div>
      <div class="w-full bg-primary border flex items-center justify-center p-3">
        <span class="text-white">مشخصات خدمات</span>
      </div>
      <div v-if="receiptData" class="grid grid-cols-12">
        <table class="table  border col-span-12 table-zebra">
          <!-- head -->
          <thead class="bg-gray-200  h-[3.5rem] text-xs md:text-base">
          <tr class="border">
            <th> نوع خدمت</th>
            <th> تعداد</th>
            <th>مبلغ</th>
          </tr>
          </thead>
          <tbody class="text-xs md:text-base">
          <tr class="border">
            <td>کارشناس روزانه</td>
            <td>{{ receiptData.dailyRequestsCount }}</td>
            <td><span class="">{{ Intl.NumberFormat('fa-IR').format(receiptData.dailyRequestsFee) }} ریال</span>
            </td>

          </tr>
          <tr class="border">
            <td>پشتیبانی کاربران پرینتر</td>
            <td>{{ receiptData.printerRequestsCount }}</td>
            <td><span class="">{{ Intl.NumberFormat('fa-IR').format(receiptData.printerRequestsFee) }} ریال</span>
            </td>

          </tr>
          <tr class="border">
            <td>پشتیبانی</td>
            <td>{{ receiptData.supportRequestsCount }}</td>
            <td><span class="">{{ Intl.NumberFormat('fa-IR').format(receiptData.supportRequestsFee) }} ریال</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full bg-primary border  flex items-center justify-center p-3">
        <span class="text-white">شرح هزینه (ریال)</span>
      </div>
      <div v-if="receiptData" class="grid grid-cols-12">
        <div class="col-span-6 border p-4 bg-gray-200">مجموع هزینه کارشناس روزانه</div>
        <div class="col-span-6 border p-4">
          {{ Intl.NumberFormat('fa-IR').format(receiptData.dailyRequestsFee * receiptData.dailyRequestsCount) }}
        </div>
        <div class="col-span-6 border p-4 bg-gray-200">مجموع هزینه پشتیبانی کاربران پرینتر</div>
        <div class="col-span-6 border p-4">
          {{ Intl.NumberFormat('fa-IR').format(receiptData.printerRequestsFee * receiptData.printerRequestsCount) }}
        </div>
        <div class="col-span-6 border p-4 bg-gray-200">مجموع هزینه پشتیبانی</div>
        <div class="col-span-6 border p-4">
          {{ Intl.NumberFormat('fa-IR').format(receiptData.supportRequestsFee * receiptData.supportRequestsCount) }}
        </div>
        <div class="col-span-6 border p-4 bg-gray-200">مجموع پرداختی</div>
        <div class="col-span-6 border p-4">
          {{
            Intl.NumberFormat('fa-IR').format((receiptData.dailyRequestsFee * receiptData.dailyRequestsCount) + (receiptData.printerRequestsFee * receiptData.printerRequestsCount) + (receiptData.dailyRequestsFee * receiptData.dailyRequestsCount))
          }}
        </div>

      </div>
      <LazyUtilitiesReceiptFooter></LazyUtilitiesReceiptFooter>
    </template>
    <template v-if="receiptType==='Specialist'">
      <LazyUtilitiesReceiptHeader title="فاکتور"></LazyUtilitiesReceiptHeader>
      <div class="w-full bg-primary border flex items-center justify-center p-5">
        <span class="text-white">اطلاعات پرداخت</span>
      </div>
      <div v-if="receiptData" class="w-full flex items-center gap-2">
        <table class="table border table-zebra">
          <!-- head -->
          <thead class="bg-gray-200  h-[3.5rem] text-xs md:text-base">
          <tr>
            <th>شناسه پرداخت ادمین</th>
            <th>تاریخ</th>
            <th>درآمد</th>
            <th>واریزی</th>
          </tr>
          </thead>
          <tbody class="text-xs md:text-base">
          <tr>
            <td>{{ receiptData.adminPaymentId }}</td>
            <td>{{
                new Date(receiptData.createDate).toLocaleTimeString('fa-IR', {
                  hour: "numeric",
                  minute: "numeric"
                })
              }} - {{ new Date(receiptData.createDate).toLocaleDateString('fa-IR') }}
            </td>
            <td><span class="">{{ Intl.NumberFormat('fa-IR').format(receiptData.income) }} ریال</span>
            </td>
            <td><span class="">{{ Intl.NumberFormat('fa-IR').format(receiptData.payment) }} ریال</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <LazyUtilitiesReceiptFooter :type="2"></LazyUtilitiesReceiptFooter>

      <div v-if="receiptData" class="mt-5" style="overflow-wrap: anywhere">
        {{ receiptData.description }}
      </div>

    </template>
    <template v-if="receiptType==='admin'">
      <LazyUtilitiesReceiptHeader title="فاکتور"></LazyUtilitiesReceiptHeader>

      <div class="w-full ">
        <div class="w-full bg-primary border flex items-center justify-center p-5">
          <span class="text-white">اطلاعات پرداخت</span>
        </div>
      </div>
      <div v-if="receiptData" class="w-full flex items-center gap-2">
        <table class="table border table-zebra">
          <!-- head -->
          <thead class="bg-gray-200  h-[3.5rem] text-xs md:text-base">
          <tr>
            <th>شناسه پرداخت</th>
            <th>نام کارشناس</th>
            <th>تاریخ</th>
            <th>مبلغ</th>
          </tr>
          </thead>
          <tbody class="text-xs md:text-base">
          <tr>
            <td>{{ receiptData.adminPaymentId }}</td>
            <td>{{ receiptData.userFullName }}</td>
            <td>{{
                new Date(receiptData.createDate).toLocaleTimeString('fa-IR', {
                  hour: "numeric",
                  minute: "numeric"
                })
              }} - {{ new Date(receiptData.createDate).toLocaleDateString('fa-IR') }}
            </td>
            <td><span class="">{{ Intl.NumberFormat('fa-IR').format(receiptData.amount) }} ریال</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <LazyUtilitiesReceiptFooter :type="2"></LazyUtilitiesReceiptFooter>

    </template>
  </div>

</template>

<script lang="ts" setup>
import type {Store, StoreActions} from "pinia";

const alertStore: Store = useAlertStore()
const showReceipt = ref(false)
const receiptData = ref<any>(null)
const receiptType = ref('')
const router = useRouter()
onMounted(() => {
  alertStore.$onAction((mutation: StoreActions<any>) => {
    if (mutation.name === 'setReceiptData')
      setReceiptData(mutation)

  })
})

function computedTitle(data) {
  if (data.startDate && data.endDate) {
    return `گزارش مالی تاریخ ${new Date(data.startDate).toLocaleDateString('fa-IR')} تا ${new Date(data.endDate).toLocaleDateString('fa-IR')}`
  } else {
    return 'گزارش مالی'
  }
}

function setReceiptData(mutation: StoreActions<any>): void {

  receiptData.value = mutation.args[0]
  receiptType.value = mutation.args[1]
  console.log(receiptData.value)

}

function printOrder() {
  try {
    document.execCommand('print', false, null)
  } catch (e) {
    console.log(e)
    window.print()
  }
}
</script>

<style scoped>
* {
  print-color-adjust: exact;
}
</style>
