<!-- 
    Side Bar 
-->
<template lang="pug">
q-drawer(
    v-model="drawer"
    show-if-above 
    bordered
    :mini="isMini"
    :mini-width="85"
)
    q-scroll-area.fit
        //- Logo
        #logo
            //- q-img.logoImg(
            //-     :src="logo"
            //-     spinner-color="white"
            //-     :class="{mini: isMini}"
            //- )
            q-icon.logoImg(name="pets" size="22px")
            h3(:class="{hide: isMini}") Music Dog
            q-btn.absolute(style='top: 18px; right: 10px;' :class="{hide: !isMobile}")(
                flat
                color='grey-6' 
                icon='first_page' 
                @click="globalStore.act_toggleDrawer()"
            )

        q-separator
        //- 功能清單
        q-list.rounded-borders.text-grey.q-pa-md
            q-item-label.q-pa-md(overline) {{ $t('sideBar.discovery') }}
            q-item.active(clickable v-ripple)
                q-item-section(avatar)
                    q-icon(name='cottage')
                q-item-section {{ $t('sideBar.home') }}
            q-item(clickable v-ripple)
                q-item-section(avatar)
                    q-icon(name='headphones')
                q-item-section {{ $t('sideBar.media') }}

            q-item-label.q-pa-md(overline) {{ $t('sideBar.collection') }}
            q-item(clickable v-ripple)
                q-item-section(avatar)
                    q-icon(name='favorite')
                q-item-section {{ $t('sideBar.loveSongs') }}
            q-item(clickable v-ripple)
                q-item-section(avatar)
                    q-icon(name='art_track')
                q-item-section {{ $t('sideBar.loveSingers') }}

            q-item-label.q-pa-md(overline) {{ $t('sideBar.personalization') }}
            q-item(clickable v-ripple)
                q-item-section(avatar)
                    q-icon(name='settings')
                q-item-section {{ $t('sideBar.setting') }}
            q-item(clickable v-ripple)
                q-item-section(avatar)
                    q-icon(name='help')
                q-item-section {{ $t('sideBar.help') }}
        
        q-separator
    
    .q-mini-drawer-hide.absolute(style='bottom: 5%; right: 17px;')
        q-btn(
            dense round unelevated 
            color='grey-6' 
            icon='navigate_before' 
            @click='close'
        )
    .q-mini-drawer-only.absolute(style='bottom: 5%; left: 25px;')
        q-btn(
            dense round unelevated 
            color='grey-6' 
            icon='last_page' 
            size="12px"
            @click='isMini = false'
        )
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useGlobal } from "src/stores";
import { useQuasar } from "quasar";
import logo from "src/assets/logo.svg";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();
    const drawer = computed(() => globalStore.getDrawer);
    const isMini = ref<boolean>(false);
    const $q = useQuasar();

    console.log($q.platform.is);

    //- 當前使用平台，裝置
    const isMobile = ref($q.platform.is.mobile!);
    onMounted(() => {
      if (isMobile.value) {
        globalStore.act_setDrawer(false);
      }
    });
    //- Mobile 禁用 Mini
    const close = () => {
      isMini.value = isMobile.value ? false : true;
      console.log(isMini.value);
    };

    return {
      drawer,
      isMini,
      isMobile,
      globalStore,
      close,
      logo,
    };
  },
});
</script>

<style lang="scss" scoped>
#logo {
  padding: 10px 5px;
  display: flex;
  align-items: center;
  .logoImg {
    width: 45px;
    height: 45px;
    margin: 0px 15px;
    transition: width 0.5s, height 0.5s;

    &.mini {
      width: 30px;
      height: 30px;
      margin-left: 10px;
    }
  }
  h3 {
    margin: 0;
    font-size: 25px;
    font-weight: 800;
  }
}
.body--light {
  #logo {
    h3 {
      color: $grey-light;
    }
  }
  .q-item.active {
    background-color: $grey-4;
    color: $grey-8;
    border-radius: 5px;
  }
}
.body--dark {
  #logo {
    h3 {
      color: $grey-dark;
    }
  }
  .q-item.active {
    background-color: $grey-9;
    color: white;
    border-radius: 5px;
  }
}
.hide {
  display: none;
}
</style>
