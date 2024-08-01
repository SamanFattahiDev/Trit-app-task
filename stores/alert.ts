import {defineStore} from "pinia";
import {IAlert} from "../models/IAlert";
import {receiptTypes} from "~/models/enums/receiptTypes";


export const useAlertStore = defineStore("alert", {
    state: () => ({
        config: {
            title: '',
            icon: '',
        } as IAlert,
        receiptData: {
            data: null as unknown | null,
            type: 'CustomerAdmin' as keyof typeof receiptTypes
        }
    }),

    actions: {
        openAlert(payload: IAlert): void {
            this.config = payload
        },
        setReceiptData(payload: unknown, type: keyof  typeof receiptTypes):void {
            this.receiptData.data = payload

            this.receiptData.type = type
        }
    },
});
