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
            multiCarousel(:title="equal.title" :playList="equal.playList")
    .row
        .col.q-px-xl.q-py-lg
            //- 最Hit熱門排行榜
            singleCarousel(:title="top.title" :playList="top.playList")
    .row
        .col.q-px-xl.q-py-lg
            singleCarousel(:title="pop.title" :playList="pop.playList")
    .row
        .col.q-px-xl.q-py-lg
            singleCarousel(:title="hemma.title" :playList="hemma.playList")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch} from 'vue';
import singleCarousel from 'src/components/singleCarousel.vue';
import multiCarousel from 'src/components/multiCarousel.vue';
import { useApp, useGlobal } from 'src/stores';
import { getPlayListByCategory } from 'src/api/axios/spotify/playList';

interface IPlayComponent{
    title: string,
    playList: Array<any>
}

export default defineComponent({
    components:{
        singleCarousel,
        multiCarousel,
    },
    setup () {
        const globalStore = useGlobal();
        const appStore = useApp();
        const expandPlayerView = computed(() => globalStore.getExpand);

        const isAppReady = computed(() => appStore.getAppToken && (appStore.getCategories.length > 0));

        const top = ref<IPlayComponent>({
            title: '',
            playList: []
        });

        const pop = ref<IPlayComponent>({
            title: '',
            playList: []
        });

        const hemma = ref<IPlayComponent>({
            title: '',
            playList: []
        });

        const equal = ref<IPlayComponent>({
            title: '',
            playList: []
        });


        const init = async() => {
            console.log('init', isAppReady.value);

            await getPlayListByCategory(appStore.getCategories[7].id)
            .then((res: any) => {
                console.log(res.result);
                equal.value.title = appStore.getCategories[7].name;
                equal.value.playList = res.result.playlists.items;
            });

            await getPlayListByCategory(appStore.getCategories[0].id)
            .then((res: any) => {
                console.log(res.result);
                top.value.title = appStore.getCategories[0].name;
                top.value.playList = res.result.playlists.items;
            });

            await getPlayListByCategory(appStore.getCategories[3].id)
            .then((res: any) => {
                console.log(res.result);
                pop.value.title = appStore.getCategories[3].name;
                pop.value.playList = res.result.playlists.items;
            });

            await getPlayListByCategory(appStore.getCategories[2].id)
            .then((res: any) => {
                console.log(res.result);
                hemma.value.title = appStore.getCategories[2].name;
                hemma.value.playList = res.result.playlists.items;
            });
        }

        watch(
            () => isAppReady.value,
            (val) => {
                if(val) init();
            }
        );

        return {
            expandPlayerView,
            top,
            pop,
            hemma,
            equal,
        }
    }
})
</script>

