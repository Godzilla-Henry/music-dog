<template lang="pug">
.container.q-pa-xl
    .flex.items-center
        q-img.img.rounded-borders(
            src="https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-simple-gray-solid-color-background-image_557027.jpg"
            spinner-color="grey-5"
            style="height: 200px; max-width: 200px"
        )
        div.q-pa-xl
            .title-1 專輯名稱
            .text-subtitle1 專輯描述
            .text-subtitle1 
                | 50首歌曲 / 
                q-icon(name="thumb_up")
                | 10032人追蹤
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
import { defineComponent, ref } from "vue";
import { getTracks } from "src/axios/mockData/index";
import { formatMsTime } from "src/Utils/useDayjs";

export default defineComponent({
  setup() {
    const playList = ref();
    const tracks = ref([]) as any;

    const init = async () => {
      await getTracks().then((res: any) => {
        tracks.value = [...res.data];
      });
    };
    init();

    return {
      playList,
      tracks,
      formatMsTime,
    };
  },
});
</script>

<style lang="scss" scoped></style>
