/**
 * 應用程式資料
 */

import { defineStore } from 'pinia'

/** Config State */
interface IConfigState {
    appToken: string,
    playList: Array<any>,
}

export default defineStore(
    'application', 
    {
        state: (): IConfigState => ({
            appToken: "undefined",
            playList: [],
        }),
        getters: {
            getAppToken: (state): string => state.appToken,
            getPlayList: (state): Array<any> => state.playList,
        },
        actions: {
            act_setAppToken(val: string): void{
                this.appToken = val;
            },
            act_setPlayList(val: Array<any>): void{
                this.playList = val;
            },
        },
        // Data persistence destination
        // persist: {
        //     key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE ?? 'vuetify',
        //     storage: window.sessionStorage,
        // },
    }
)
