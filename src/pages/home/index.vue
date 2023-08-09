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
            singleCarousel
    .row
        .col.q-px-xl.q-py-lg
            singleCarousel
    .row
        .col.q-px-xl.q-py-lg
            singleCarousel
</template>

<script lang="ts">
import { computed, defineComponent} from 'vue';
import singleCarousel from 'src/components/singleCarousel.vue';
import multiCarousel from 'src/components/multiCarousel.vue';
import { useGlobal } from 'src/stores';

export default defineComponent({
    components:{
        singleCarousel,
        multiCarousel,
    },
    setup () {
        const globalStore = useGlobal();
        const expandPlayerView = computed(() => globalStore.getExpand);

        return {
            expandPlayerView,
        }
    }
})
</script>

