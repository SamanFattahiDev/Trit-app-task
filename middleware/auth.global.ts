import {useAuthStore} from "../stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    if (!process.server) {
        const authStore = useAuthStore();
        if (to?.meta?.auth) {
            if (authStore.loggedIn) {
                // @ts-ignore
                if (to.meta.access.includes('all')) {
                    navigateTo(to.path)
                } else {
                    if (to.meta.access.includes(authStore.role)) {
                        navigateTo(to.path)
                    } else {
                        authStore.logout()
                        return navigateTo('/sign-in')
                    }
                }
            } else {
                authStore.logout()
                return navigateTo('/sign-in')
            }
        } else if (!to?.meta?.auth) {
            navigateTo(to.path)
        }

    }
})