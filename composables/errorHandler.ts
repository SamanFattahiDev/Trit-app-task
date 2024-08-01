import {IFetchError} from "ofetch/node";

interface IError {
    fatal?: boolean,
    statusCode: number,
    statusMessage: string,
    statusText: object
}

const fatalErrors: object = {
    404: 'not found',
    500: 'server error',
    401: 'you are unauthorized to access this resource',
    403: 'forbidden, token invalid'
}

export default (errorData: IFetchError) => {
    // @ts-ignore
    if (fatalErrors[errorData.statusCode]) {
        // @ts-ignore
        useToast().toastError(fatalErrors[errorData.statusCode])
    } else {
        // @ts-ignore
        throw new Error(errorData)
    }

}