export const useMyFetch = (request: string, opts: object) => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore()
    // you need to set token in cookie. this will fix every thing. remember to do it
    let {token} = storeToRefs(authStore)
    const authHeader = ref({})
    const cookieToken = useCookie('token')
    if (token.value) {
        Object.assign(authHeader.value, {'Authorization': token.value})
    } else if (cookieToken.value) {
        Object.assign(authHeader.value, {'Authorization': cookieToken.value})

    }
    return useFetch(request, {
        baseURL: 'https://api.itcare.ir/api' ,
        headers: {
            ...authHeader.value,
        },
        ...opts
    })
}
