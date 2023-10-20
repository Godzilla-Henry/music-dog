<!-- 
    Header Bar 
-->
<template lang="pug">
q-header.header
    q-toolbar.toolBar
        q-btn(
            flat dense round 
            :icon='drawer? "first_page" : "last_page"' 
            aria-label='Menu'
            @click="globalStore.act_toggleDrawer()"
        )
        q-space
        searchBar
        q-separator.q-mx-md(color="grey" inset vertical)
        q-btn.q-mr-md(
          flat round dense size="12px"
          :icon="theme"
          @click="toggleTheme"
        )
        q-btn-dropdown(flat round dense icon='g_translate' size="12px")
          q-list
            q-item(clickable v-close-popup @click="switchLanguage('zh-TW')")
              q-item-section
                q-item-label 中文(繁體)
            q-item(clickable v-close-popup @click="switchLanguage('en-US')")
              q-item-section
                q-item-label English
        q-btn.q-mr-md(flat round dense icon='notifications' size="12px")
        q-avatar(size="30px")
            img(src='https://www.poaipets.com.tw/wp-content/uploads/2021/03/%E5%89%96%E6%9E%90%E7%8B%97%E7%8B%97%E5%B8%B8%E8%A6%8B%E7%96%BE%E7%97%85.jpg')
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useGlobal } from "src/stores";
import { useQuasar } from "quasar";

//- Components
import searchBar from "./components/searchBar.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    searchBar,
  },
  setup() {
    const globalStore = useGlobal();
    const drawer = computed(() => globalStore.getDrawer);
    const $q = useQuasar();
    const theme = ref();
    const router = useRouter();

    watch(
      () => $q.dark.isActive,
      (val) => {
        theme.value = val ? "dark_mode" : "light_mode";
      },
      { immediate: true }
    );

    const toggleTheme = () => {
      // toggle
      $q.dark.toggle();
    };

    const switchLanguage = (lang: string) => {
      globalStore.act_setLang(lang);
      router.go(0);
    };

    return {
      globalStore,
      drawer,
      theme,
      toggleTheme,
      switchLanguage,
    };
  },
});
</script>

<style lang="scss" scoped>
.body--light {
  .header {
    border-bottom: 1px solid #dcdcdc;
    .toolBar {
      background: white;
      color: rgb(100, 100, 100);
    }
  }
}

.body--dark {
  .header {
    border-bottom: 1px solid #525252;
    .toolBar {
      background: #121212;
      color: rgb(194, 194, 194);
    }
  }
}
</style>
