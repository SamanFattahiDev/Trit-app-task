import {defineStore} from "pinia";
import {IUserAuthenticate} from "../models/IStore";

export const useAuthStore = defineStore("auth", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        loggedIn: true as boolean,
        token: "" as string,
        user: null as null | IUserAuthenticate,
        role: '' as string,
        registerationErrors:null
    }),
    getters: {
        isLogged(): Boolean {
            return this.loggedIn;
        },
        getToken(): string {
            return this.token;
        },
        getUser(): Object | null {
            return this.user;
        },
        getUserRole():string{
            return this.role
        },
        getRegisterationErrors():any{
            return this.registerationErrors
        }
    },
    actions: {
        logout(): void {
            this.loggedIn = false;
            this.token = "";
            this.user = null;
            this.role = ''
            this.registerationErrors = null

        },
        setToken(token: any): void {
            this.token = token
        },
        setUser(authenticationData: any | IUserAuthenticate) {
            this.loggedIn = true;
            this.token = authenticationData.token;
            this.user = authenticationData.user;
        },
        setRegisterationErrors(errors:any){
          this.registerationErrors = errors
        },
        setUserFromCookie(user: any):void {
            this.loggedIn = true;
            this.user = user;
        },
        async fetchUser() {
            try {
                const res = await useApi.getUserByToken.setTag()
                console.log(res)
            } catch (e) {
                console.log(e)
            }
        }
    },
});
