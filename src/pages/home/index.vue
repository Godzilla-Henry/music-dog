<template lang="pug">
.container(:class="{hidden: expandPlayerView}" v-if="isAppReady")
    .row
        .col.q-px-xl.q-pt-md
            q-chip(
                v-for="catergory in categories.slice(0,7)" :key="catergory"
                square size="16px" color='grey-6' text-color='white'
            ) {{ catergory.name }}

            q-chip(
                square size="16px" color='grey-6' text-color='white'
            ) 更多...
            
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

        const categories = ref();

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
            categories.value = [...appStore.getCategories];
            await getPlayListByCategory(categories.value[7].id)
            .then((res: any) => {
                equal.value.title = categories.value[7].name;
                equal.value.playList = res.result.playlists.items;
            });

            await getPlayListByCategory(categories.value[0].id)
            .then((res: any) => {
                top.value.title = categories.value[0].name;
                top.value.playList = res.result.playlists.items;
            });

            await getPlayListByCategory(categories.value[3].id)
            .then((res: any) => {
                pop.value.title = categories.value[3].name;
                pop.value.playList = res.result.playlists.items;
            });

            await getPlayListByCategory(categories.value[2].id)
            .then((res: any) => {
                hemma.value.title = categories.value[2].name;
                hemma.value.playList = res.result.playlists.items;
            });
        }

        watch(
            () => isAppReady.value,
            (val) => {
                if(val) init();
            }
        );

        onMounted(() => {
            if(isAppReady.value) init();
        })

        return {
            expandPlayerView,
            isAppReady,
            top,
            pop,
            hemma,
            equal,
            categories,
        }
    }
})
</script>

