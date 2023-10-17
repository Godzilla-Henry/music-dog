<template lang="pug">
.row.justify-between.items-center
    .title-1 {{ title }}
    .row.justify-center.items-center
        q-btn.q-mr-md(rounded outline color="grey" size="12px" label="更多")
        q-btn.q-mr-xs(round outline color="grey" icon="arrow_back_ios" size="sm" @click="prev")
        q-btn(round outline color="grey" icon="arrow_forward_ios" size="sm" @click="next")
.carousel
    .inner(ref='inner' :style='innerStyles')
        q-card.card(v-for='card in playList' :key='card' flat v-if="playList.length > 0")
            .albumImg(v-show="!isDataReady")
                q-skeleton(height="200px" square)
            .albumImg(@click.prevent="toContentList(card)" :class="{active: card === curActive}" v-show="isDataReady")
                q-img.img.rounded-borders(
                    :src="card.images[0].url"
                    spinner-color="grey-5"
                    style="z-index: -1;"
                )
                .info
                    q-btn(flat round icon="more_vert")
                .player(
                    @mouseover="isPlayerHover = true"
                    @mouseout="isPlayerHover = false"
                )
                    q-btn(
                        :loading="loading"
                        round color="grey" icon="play_arrow"
                        :size="isPlayerHover? '16px': 'md'" 
                        @click.stop="play(card)"
                    )
            q-card-section.q-px-none(v-show="!isDataReady")
                q-skeleton.text-h6(type="text")
                q-skeleton.text-subtitle2(type="text")
            q-card-section.q-px-none(v-show="isDataReady")
                .text-h6.albumInfo {{ card.name }}
                .text-subtitle2.albumInfo {{ card.description }}
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from "vue";
import eventBus from "src/Utils/useEventBus";
import { useRouter } from "vue-router";

export default defineComponent({
  props: ["title", "playList"],
  setup(props) {
    //- Data
    const { title, playList } = toRefs(props);
    //- Carousel
    const innerStyles = ref({});
    const step = ref("");
    const transitioning = ref(false);
    const inner = ref<HTMLElement>();

    const setStep = () => {
      // const innerWidth = inner.value?.scrollWidth!;
      // const totalPlayList = playList.value.length;
      // step.value = `${innerWidth / totalPlayList}px`
      step.value = `225px`; //- card width and margin-right
    };

    const next = () => {
      if (transitioning.value) return;
      transitioning.value = true;
      moveLeft();
      if (playList.value.length > 0) {
        afterTransition(() => {
          const card = playList.value.shift();
          playList.value.push(card);
          transitioning.value = false;
        });
      }
    };

    const prev = () => {
      if (transitioning.value) return;
      transitioning.value = true;
      moveRight();
      if (playList.value.length > 0) {
        afterTransition(() => {
          const card = playList.value.pop();
          console.log("prev", card);
          playList.value.unshift(card);
          transitioning.value = false;
        });
      }
    };

    const moveLeft = () => {
      innerStyles.value = {
        transform: `translateX(-${step.value})`,
        transition: `transform 0.5s`,
      };
    };

    const moveRight = () => {
      innerStyles.value = {
        transform: `translateX(${step.value})`,
        transition: `transform 0.5s`,
      };
    };

    const afterTransition = (callback: any) => {
      const listener = () => {
        callback(); //- 動畫過程
        resetTranslate();
        inner.value?.removeEventListener("transitionend", listener);
      };
      inner.value?.addEventListener("transitionend", listener);
    };

    const resetTranslate = () => {
      innerStyles.value = {
        transition: "none",
        transform: `translateX(0)`,
      };
    };

    //- Flow Funciton
    const loading = ref<boolean>(false);
    const isPlayerHover = ref<boolean>(false);
    const curActive = ref<string>();
    //- 播放歌曲
    const play = (card: any) => {
      loading.value = true;
      console.log(card);
      curActive.value = card;
      setTimeout(() => {
        eventBus.emit("openPlayer", card);
        loading.value = false;
      }, 700);
    };

    //- 前往專輯頁面
    const router = useRouter();
    const toContentList = (card: any) => {
      console.log("To ContentList");
      router.push({ path: `/musicDog/contentList/${card.id}` });
    };

    //- 監聽Props
    const isDataReady = computed(
      () => title.value && playList.value.length !== 0
    );

    watch(
      () => isDataReady.value,
      (val) => {
        if (val) {
          setStep();
          resetTranslate();
        }
      }
    );

    return {
      playList,
      inner,
      innerStyles,
      loading,
      isPlayerHover,
      curActive,
      eventBus,
      title,
      isDataReady,
      next,
      prev,
      play,
      toContentList,
    };
  },
});
</script>

<style scoped>
.carousel {
  width: 100%;
  overflow: hidden;
  .inner {
    /* transition: transform 0.2s; */
    width: 100%;
    white-space: nowrap;
    display: flex;
    .card {
      width: 100%;
      max-width: 200px;
      margin-right: 25px;
      background-color: transparent;
      color: grey-9;
      .albumImg {
        position: relative;
        .img {
          width: 200px;
        }
        &:hover,
        &.active {
          box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
        }
        &:hover .info,
        &:hover .player,
        &.active .info,
        &.active .player {
          opacity: 1;
        }
        .info {
          position: absolute;
          right: 5px;
          top: 5px;
          opacity: 0;
        }
        .player {
          position: absolute;
          right: 15px;
          bottom: 15px;
          opacity: 0;
        }
      }
      .albumInfo {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
