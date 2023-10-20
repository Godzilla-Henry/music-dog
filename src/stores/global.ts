/**
 * 全域共用資料
 */

import { defineStore } from "pinia";

/** Config State */
interface IConfigState {
  //- 折疊 SideBar
  drawer: boolean;
  //- 開啟 PlayerView
  expand: boolean;
  //- 語系
  lang: string;
}

export default defineStore("global", {
  state: (): IConfigState => ({
    drawer: true,
    expand: false,
    lang: "zh-TW",
  }),
  getters: {
    getDrawer: (state): boolean => state.drawer,
    getExpand: (state): boolean => state.expand,
    getLang: (state): string => state.lang,
  },
  actions: {
    // drawer
    act_toggleDrawer(): void {
      this.drawer = !this.drawer;
    },
    act_setDrawer(data: boolean) {
      this.drawer = data;
    },
    // expand
    act_toggleExpand(): void {
      this.expand = !this.expand;
    },
    // lang
    act_setLang(lang: string): void {
      this.lang = lang;
    },
  },
  // Data persistence destination
  persist: {
    storage: window.localStorage,
  },
});
