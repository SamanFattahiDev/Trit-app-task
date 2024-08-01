export function useUtils() {
    function copyClipboard(text: string) {
        navigator.clipboard.writeText(text)
    }

    function isArray(data: unknown) {
        return Array.isArray(data)

    }

    function convertNumbers2English(number: string) {
        return number.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (c) {
            return c.charCodeAt(0) & 0xf;
        });
    }

    function makeBase64(data: object | any) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onerror = reject;
            fr.onload = () => {
                // @ts-ignore
                resolve(fr?.result?.split(",")[1]);
            }
            fr.readAsDataURL(data);
        });
    }

    function logFormData(myFormData: FormData) {
        for (let pair of myFormData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }

    function time_ago(time: string | number) {
        switch (typeof time) {
            case 'number':
                break;
            case 'string':
                time = +new Date(time);
                break;
            case 'object':
                // @ts-ignore
                if (time.constructor === Date) time = time.getTime();
                break;
            default:
                time = +new Date();
        }
        let time_formats = [
            [60, 'ثانیه ', 1], // 60
            [120, '1 دقیقه پیش', 'یک دقیقه پیش'], // 60*2
            [3600, 'دقیقه ', 60], // 60*60, 60
            [7200, '1 ساعت پیش', '1 ساعت پیش'], // 60*60*2
            [86400, 'ساعت ', 3600], // 60*60*24, 60*60
            [172800, 'دیروز', 'فردا'], // 60*60*24*2
            [604800, 'روز ', 86400], // 60*60*24*7, 60*60*24
            [1209600, 'هفته پیش', 'هفته بعد'], // 60*60*24*7*4*2
            [2419200, 'هفته', 604800], // 60*60*24*7*4, 60*60*24*7
            [4838400, 'ماه پیش', 'ماه بعد'], // 60*60*24*7*4*2
            [29030400, 'ماه', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
            [58060800, 'سال پیش', 'سال بعد'], // 60*60*24*7*4*12*2
            [2903040000, 'سال', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12

        ];
        // @ts-ignore
        let seconds = (+new Date() - time) / 1000,
            token = 'پیش',
            list_choice = 1;

        if (seconds == 0) {
            return 'پیش'
        }
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'پیش';
            list_choice = 2;
        }
        let i = 0,
            format;
        while (format = time_formats[i++])
            if (seconds < format[0]) {
                if (typeof format[2] == 'string')
                    return format[list_choice];
                else
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        return time;
    }

    function newCallBack(successCallback: any) {
        return successCallback()
    }

    function makeFormData(data: object) {
        let myForm = new FormData()
        for (let key in data) {
            if (!Array.isArray(data[key])) {
                myForm.append(key, data[key])
            } else {
                data[key].forEach((item) => {
                    myForm.append(key, item)
                })
            }
        }
        return myForm
    }

    function getTotalPages(totalCount: number, perPage: number): number {
        let totalPages = [];
        const result = Math.ceil(totalCount / perPage)
        for (let i = 1; i <= result; i++) {
            totalPages.push(i);
        }
        return totalPages.length
    }

    function dateToISOLikeButLocal(date: Date) {
        const offsetMs = date.getTimezoneOffset() * 60 * 1000;
        const msLocal = date.getTime() - offsetMs;
        const dateLocal = new Date(msLocal);
        const iso = dateLocal.toISOString();
        const isoLocal = iso.slice(0, 19);
        return isoLocal;
    }

    function addMinutes(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes * 60000)
    }

    return {
        copyClipboard,
        isArray,
        makeBase64,
        time_ago,
        newCallBack,
        makeFormData,
        getTotalPages,
        convertNumbers2English,
        dateToISOLikeButLocal,
        addMinutes
    }
}
