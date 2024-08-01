import {defineStore} from "pinia";

export const useToastStore = defineStore("toast", {
    state: () => ({
        toastData: '' as string
    }),

    actions: {
        success(content: string):void {
            this.toastData = content;
        },
        error(content: string) :void{
            this.toastData = content;
        },
        info(content: string):void {
            this.toastData = content;
        },
        clearToastData():void {
            this.toastData = ''
        },
    },
});
