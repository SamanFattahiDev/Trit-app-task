import {useMyFetch} from "../composables/useMyFetch";

export default (url: string) => ({
    async setParams(param: object | null, method?: string, ssr?: boolean) {

        const {data, error} = await useMyFetch(url, {
            params: param ? JSON.parse(JSON.stringify(param)) : null,
            method: method ? method : "POST",
            server: ssr !== undefined ? ssr : true
        })
        if (error?.value) {
            errorHandler(error.value.data)
        } else {
            return data.value
        }
    },
    async setTag(method?: string, ssr?: boolean) {
        try {
            const {data, pending, error} = await useMyFetch(url, {
                method: method ? method : "POST",
                server: ssr !== undefined ? ssr : true
            })
            if (error?.value) {
                errorHandler(error.value.data)
            } else {
                return data.value
            }
        } catch (e) {
            console.log(e)
        }

    },
    async setBody(body: object, method?: string, ssr?: boolean) {
        const {data, error} = await useMyFetch(url, {
            method: method ? method : "POST",
            body: body ? JSON.parse(JSON.stringify(body)) : null,
            server: ssr !== undefined ? ssr : true
        })
        if (error?.value) {
            errorHandler(error.value.data)
        } else {
            return data.value
        }
    },
    async setPartial(params: object, method?: string, ssr?: boolean) {
        let partialString = '';
        Object.values(params).forEach((value) => {
            partialString += `/${value}`
        })
        const {data, error} = await useMyFetch(url + partialString, {
            method: method ? method : "POST",
            body: null,
            server: ssr !== undefined ? ssr : true
        })
        if (error?.value) {
            errorHandler(error.value.data)
        } else {
            return data.value
        }
    },
    async setFormData(body: object, progressCallback?: (ProgressEvent: ProgressEvent) => void, method?: string, ssr?: boolean) {
        const {data, error} = await useMyFetch(url, {
            method: method ? method : "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: body ? JSON.parse(JSON.stringify(body)) : null,
            server: ssr !== undefined ? ssr : true,
            onUploadProgress: function (progressEvent: ProgressEvent): void {
                // @ts-ignore
                return progressCallback(progressEvent)
            },
        })
        if (error?.value) {
            errorHandler(error.value.data)
        } else {
            return data.value
        }
    },

})
