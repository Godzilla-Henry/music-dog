<!-- 音樂播放器 -->
<template lang="pug">
q-footer(elevated)
    q-card(v-if="tracks.length > 0")
        audio(preload='true')
            source(:src='playingTrack.track.preview_url')
        q-linear-progress(:value="progress" size="7px" instant-feedback color="grey-6")
        q-card-section.row.items-center.no-wrap

            q-btn(flat round color="grey-10" size="lg" icon="fast_rewind" @click="prevTrack")
            q-btn(flat round color="grey-10" size="xl" :icon="playing? 'pause': 'play_arrow'" @click.prevent="actionTrack")
            q-btn(flat round color="grey-10" size="lg" icon="fast_forward" @click="nextTrack")
            .text-grey  {{formatSTime(curTime)}}/ {{formatSTime(duration)}}
            q-space

            q-img(
                :src="playingTrack.track.album.images[0].url"
                spinner-color='grey-5' 
                style='height: 50px; max-width: 50px'
            )
            div.q-mx-md
                .text-h6.text-weight-bold.text-grey.playerInfo {{ playingTrack.track.name }}
                .text-grey.playerInfo {{ playingTrack.track.artists.map((item) => item.name).toString() }}
            q-btn(flat round color="grey-6" size="md" icon="thumb_up")
            q-btn(flat round color="grey-6" size="md" icon="thumb_down")

            q-space

            q-btn(flat round color="grey-6" size="md" icon="volume_up")
            q-btn(flat round color="grey-6" size="md" icon="replay")
            q-btn(flat round color="grey-6" size="md" icon="shuffle")
            q-btn(
                flat round color="grey-10" size="lg" 
                :icon="expandPlayerView? 'expand_more': 'keyboard_arrow_up'" 
                @click.prevent="eventBus.emit('openPlayerView', {tracks: tracks, playingTrack: playingTrack, playerInfo: playerInfo})"
            )
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from "vue";
import eventBus from "src/Utils/useEventBus";
import { useGlobal } from "src/stores";
import { formatSTime } from "src/Utils/useDayjs";

//- API
import { getTracks } from "src/axios/mockData/index";

export default defineComponent({
  props: ["playerInfo"],
  setup(props) {
    const globalStore = useGlobal();
    const expandPlayerView = computed(() => globalStore.getExpand);

    //- Data
    const { playerInfo } = toRefs(props);

    //- 當前播放歌曲
    const playingTrack = ref(null) as any;
    const tracks = ref([]) as any;

    //- 是否正在播放
    const playing = ref<boolean>(false);
    //- 音樂實例
    const audio = new Audio();
    audio.ontimeupdate = function () {
      updateTime();
    };
    audio.onloadedmetadata = function () {
      updateTime();
    };
    //- 播放進度
    const curTime = ref();
    const duration = ref<number>(30);
    const progress = ref(0);

    const updateTime = () => {
      curTime.value = audio.currentTime;
      progress.value = (1 / duration.value) * audio.currentTime;
      autoPlay();
    };

    //- 播放
    const playTrack = () => {
      playing.value = true;
      audio.play();
    };

    //- 暫停
    const pauseTrack = () => {
      playing.value = false;
      audio.pause();
    };

    //- 更改歌曲
    const changeTrack = (url: string) => {
      audio.setAttribute("src", url);
      audio.load(); //- 重新加載
      resetPlayer();
      setTimeout(() => {
        playTrack();
      }, 300);
    };

    //- 下一首
    const nextTrack = () => {
      const index = tracks.value.indexOf(playingTrack.value);
      console.log(index);
      if (index == tracks.value.length - 1) return;
      playingTrack.value = tracks.value[index + 1];
      eventBus.emit("changePlayingTrack", { playingTrack: playingTrack.value });
      //- 播放
      changeTrack(playingTrack.value.track.preview_url);
    };

    //- 上一首
    const prevTrack = () => {
      const index = tracks.value.indexOf(playingTrack.value);
      console.log(index);
      if (index == 0) return;
      playingTrack.value = tracks.value[index - 1];
      eventBus.emit("changePlayingTrack", { playingTrack: playingTrack.value });
      //- 播放
      changeTrack(playingTrack.value.track.preview_url);
    };

    //- Reset Player
    const resetPlayer = () => {
      curTime.value = 0;
      progress.value = 0;
    };

    //- 操作
    const actionTrack = () => {
      playing.value ? pauseTrack() : playTrack();
    };

    //- 自動播放
    const autoPlay = () => {
      if (curTime.value >= duration.value - 1) nextTrack();
    };

    //- get playList tracks
    const initTracks = async (playlist_id: string) => {
      await getTracks().then((res: any) => {
        tracks.value = [...res.data];

        if (tracks.value.length > 0) {
          playingTrack.value = tracks.value[0];
          //- 播放
          changeTrack(playingTrack.value.track.preview_url);
        }
      });
    };

    //- 監聽歌曲清單
    watch(
      () => playerInfo.value,
      (val) => {
        if (val) initTracks(playerInfo.value.id);
      }
    );

    onMounted(() => {
      eventBus.on("changeTrack", (track: any) => {
        playingTrack.value = track;
        changeTrack(playingTrack.value.track.preview_url);
      });
    });

    return {
      eventBus,
      expandPlayerView,
      playerInfo,
      playingTrack,
      tracks,
      playing,
      curTime,
      duration,
      progress,
      formatSTime,
      actionTrack,
      nextTrack,
      prevTrack,
    };
  },
});
</script>

<style lang="scss" scoped>
.playerInfo {
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
