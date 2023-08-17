/**
 * 應用程式資料
 */

import { defineStore } from 'pinia'

/** Config State */
interface IConfigState {
    appToken: string | null,
    Categories: Array<any>,
}

export default defineStore(
    'application', 
    {
        state: (): IConfigState => ({
            appToken: null,
            Categories: [],
        }),
        getters: {
            getAppToken: (state): string | null => state.appToken,
            getCategories: (state): Array<any> => state.Categories,
        },
        actions: {
            act_setAppToken(val: string): void{
                this.appToken = val;
            },
            act_setCategories(val: Array<any>): void{
                this.Categories = val;
            },
        },
        // Data persistence destination
        // persist: {
        //     key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE ?? 'vuetify',
        //     storage: window.sessionStorage,
        // },
    }
)
