<template lang="pug">
.container.q-pa-xl(v-if="playList")
    .flex.items-center
        q-img.img.rounded-borders(
            :src="playList?.images[0].url"
            spinner-color="grey-5"
            style="height: 200px; max-width: 200px"
        )
        div.q-pa-xl
            .title-1 {{ playList.name }}
            .text-subtitle1 {{ playList.description }}
            .text-subtitle1 
                |{{ tracks.length }}首歌曲 / 
                q-icon(name="thumb_up")
                |{{ playList.followers.total }}人追蹤
            .flex.q-my-md
                q-btn.q-mr-sm(unelevated rounded color='grey' label='play' icon="play_arrow")
                q-btn.q-mr-sm(outline rounded color='grey' label='save storage' icon="library_add")
                q-btn(flat round color="grey-6" size="md" icon="more_vert")

    .flex.full-width
        q-list.full-width(separator)
            q-item.q-py-lg(clickable v-ripple v-for="(item, index) in tracks" :key="index")
                q-item-section
                    q-img(
                        :src="item.track.album.images[0].url"
                        spinner-color='grey-5' 
                        style='height: 35px; max-width: 35px'
                    )
                q-item-section 
                    q-item-label {{ item.track.name }}
                q-item-section 
                    q-item-label {{ item.track.artists.map((item) => item.name).toString() }}
                q-item-section 
                    q-item-label {{ formatMsTime(item.track.duration_ms) }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getPlayList } from 'src/api/axios/spotify/playList';
import { useRoute } from 'vue-router';
import { formatMsTime } from 'src/Utils/useDayjs';

export default defineComponent({
    setup () {
        const playList = ref();
        const tracks = ref([]) as any;

        const route = useRoute();
        const init = async() => {
            const playList_id = route.params.id as string;
            await getPlayList(playList_id)
            .then((res: any) => {
                console.log(res.result);
                playList.value = res.result;
                tracks.value = [...res.result.tracks.items];
            })
        }
        init();

        return {
            playList,
            tracks,
            formatMsTime,
        }
    }
})
</script>

<style lang="scss" scoped>
</style>