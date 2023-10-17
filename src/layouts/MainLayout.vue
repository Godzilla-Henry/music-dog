<template lang="pug">
q-layout(view='lHh Lpr fFf')
  //- Header
  HeaderBar.fixed

  //- SideBar
  SideBar
  
  //- Page Wrapper
  q-page-container
    router-view
    
  //- Footer
  Footer.fixed(v-show="showFooter" :playerInfo="playerInfo")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import eventBus from "src/Utils/useEventBus";
//- Components
import HeaderBar from "./header-bar/index.vue";
import SideBar from "./side-bar/index.vue";
import Footer from "./footer-player/index.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    HeaderBar,
    SideBar,
    Footer,
  },

  setup() {
    const showFooter = ref(false);
    const playerInfo = ref(null);

    onMounted(() => {
      eventBus.on("openPlayer", (data: any) => {
        showFooter.value = true;
        console.log(data);
        playerInfo.value = data;
      });
    });

    return {
      showFooter,
      playerInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
}
</style>
