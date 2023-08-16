<template lang="pug">
.container(:class="{hidden: expandPlayerView}")
    .row
        .col.q-px-xl.q-pt-md
            q-chip(square size="16px" color='grey-6' text-color='white') catergory
            q-chip(square size="16px" color='grey-6' text-color='white') catergory
            q-chip(square size="16px" color='grey-6' text-color='white') catergory
            q-chip(square size="16px" color='grey-6' text-color='white') catergory
            q-chip(square size="16px" color='grey-6' text-color='white') catergory
    .row 
        .col.q-px-xl.q-py-lg
            multiCarousel
    .row
        .col.q-px-xl.q-py-lg
            //- 最Hit熱門排行榜
            singleCarousel(:playList="playList")
    //- .row
    //-     .col.q-px-xl.q-py-lg
    //-         singleCarousel
    //- .row
    //-     .col.q-px-xl.q-py-lg
    //-         singleCarousel
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref} from 'vue';
import singleCarousel from 'src/components/singleCarousel.vue';
import multiCarousel from 'src/components/multiCarousel.vue';
import { useApp, useGlobal } from 'src/stores';

export default defineComponent({
    components:{
        singleCarousel,
        multiCarousel,
    },
    setup () {
        const globalStore = useGlobal();
        const appStore = useApp();
        const expandPlayerView = computed(() => globalStore.getExpand);

        const playList = ref([]) as any;

        onMounted(() => {
            setTimeout(() => {
                playList.value = appStore.getPlayList;
            }, 1000);
        });


        return {
            expandPlayerView,
            playList,
        }
    }
})
</script>

