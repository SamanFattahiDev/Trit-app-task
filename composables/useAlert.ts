import {IAlert} from "../models/IAlert";
import {useAlertStore} from "../stores/alert";
import {receiptTypes} from "~/models/enums/receiptTypes";

export function useAlert() {
    let alertStore = useAlertStore()

    function openAlert(payload: IAlert) {
        alertStore.openAlert(payload)
    }

    function openReceipt(payload: unknown, type: keyof typeof receiptTypes) {
        const router = useRouter()
        router.push('/receipt')
        setTimeout(()=>{

        alertStore.setReceiptData(payload,type)
        },200)
    }

    return {openAlert,openReceipt}

}
