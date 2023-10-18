<template lang="pug">
.absolute.full-width.playerView(:class="{expand: expandPlayerView}")
    .row.fit
        .col.col-md-6
            .flex.flex-center.fit
                q-img.img.rounded-borders(
                    :src="playingTrack?.track.album.images[0].url"
                    spinner-color="grey-5"
                    style="height: 400px; max-width: 400px"
                )

        .col.col-md-6
            .flex.flex-center.fit
                div.playerViewContent.q-py-md
                    q-tabs.text-grey(v-model='tab' dense active-color='primary' indicator-color='primary' align='justify' narrow-indicator)
                        q-tab(name='Next' label='即將播放')
                        q-tab(name='Lyrics' label='專輯')
                        q-tab(name='Others' label='Others')
                    q-separator
                    q-tab-panels.playerViewPanel(v-model='tab' animated)
                        q-tab-panel(name='Next')
                            .flex.justify-between.items-center
                                div
                                    span 正在播放清單
                                    .text-h6 {{ playerInfo?.name }}
                                q-btn(outline rounded color="grey-9" icon="library_add" label="儲存到媒體庫")
                            q-list
                                q-item.q-my-sm(
                                    v-for='track in tracks' :key='track.track.id' 
                                    clickable v-ripple 
                                    :active="track === playingTrack" 
                                    active-class="trackActive"
                                    @click.stop="playTrack(track)"
                                )
                                    q-item-section(avatar)
                                        q-img(
                                            :src="track.track.album.images[0].url"
                                            spinner-color='grey-5' 
                                            style='height: 50px; max-width: 50px'
                                        )
                                    q-item-section
                                        q-item-label.longString {{ track.track.name }}
                                        q-item-label(caption lines='1') {{ track.track.artists.map((item) => item.name).toString() }}

                                    q-item-section(side)
                                        span {{ formatMsTime(track.track.duration_ms) }}
                                
                        q-tab-panel(name='Lyrics')
                                
                            
                            
                        q-tab-panel(name='Others')
                            

</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import singleCarousel from "src/components/singleCarousel.vue";
import multiCarousel from "src/components/multiCarousel.vue";
import eventBus from "src/Utils/useEventBus";
import { useGlobal } from "src/stores";
import { formatMsTime } from "src/Utils/useDayjs";

export default defineComponent({
  components: {
    singleCarousel,
    multiCarousel,
  },
  setup() {
    const globalStore = useGlobal();
    const expandPlayerView = computed(() => globalStore.getExpand);

    const tab = ref("Next");

    //- 歌單資料
    const playerInfo = ref(null);
    //- 歌單
    const tracks = ref([]) as any;

    //- 當前播放歌曲
    const playingTrack = ref(null);

    const playTrack = (track: any) => {
      playingTrack.value = track;
      eventBus.emit("changeTrack", track);
    };

    onMounted(() => {
      eventBus.on("openPlayerView", (data: any) => {
        console.log("openPlayerView", data);
        globalStore.act_toggleExpand();
        playerInfo.value = data.playerInfo;
        tracks.value = [...data.tracks];
        playingTrack.value = data.playingTrack;
      });

      eventBus.on("changePlayingTrack", (data: any) => {
        playingTrack.value = data.playingTrack;
        console.log(playingTrack.value);
      });
    });

    return {
      expandPlayerView,
      tab,
      playerInfo,
      tracks,
      playingTrack,
      formatMsTime,
      playTrack,
    };
  },
});
</script>

<style lang="scss" scoped>
.playerView {
  height: calc(100vh - 108px - 50px);
  top: 0px;
  left: 0px;
  display: none;
  transform: translateY(100%);

  &.expand {
    display: block;
    /* 動畫 */
    animation-name: slideInAnimation;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards; /* 保持動畫結束狀態 */
  }

  .playerViewContent {
    width: 70%;
    .playerViewPanel {
      max-height: 500px;
      overflow-y: scroll;

      .longString {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

.body--light {
  .playerViewPanel {
    background: #ffffff;
    .trackActive {
      background: rgb(227, 227, 227);
      color: #121212;
    }
  }
}
.body--dark {
  .playerViewPanel {
    background: #121212;
    .trackActive {
      background: rgb(49, 49, 49);
      color: #ffffff;
    }
  }
}

/* 定义动画关键帧 */
@keyframes slideInAnimation {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
