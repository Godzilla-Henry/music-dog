<template lang="pug">
.row.justify-between.items-center
    .title-1 List Title
    .row.justify-center.items-center
        q-btn.q-mr-md(rounded outline color="grey" size="12px" label="More")
        q-btn.q-mr-xs(round outline color="grey" icon="arrow_back_ios" size="sm" @click="prev")
        q-btn(round outline color="grey" icon="arrow_forward_ios" size="sm" @click="next")
.carousel
    .inner(ref='inner' :style='innerStyles')
        q-card.card(v-for='card in cards' :key='card' flat v-if="cards.length > 0")
            .albumImg(@click.prevent="toContentList" :class="{active: card === curActive}")
                q-img.img.rounded-borders(
                    :src="card.images[0].url"
                    spinner-color="white"
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
            q-card-section.q-px-none
                .text-h6.albumInfo {{ card.name }}
                .text-subtitle2.albumInfo {{ card.description }}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from 'vue';
import eventBus from 'src/Utils/useEventBus';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: ['playList'],
    setup (props) {
        //- Carousel
        const cards = ref([]) as any;
        const innerStyles = ref({});
        const step = ref('');
        const transitioning = ref(false);
        const inner = ref<HTMLElement>();

        const setStep = () => {
            const innerWidth = inner.value?.scrollWidth!;
            const totalCards = cards.value.length;
            step.value = `${innerWidth / totalCards}px`
        }

        const next = () => {
            if (transitioning.value) return;
            transitioning.value = true;
            moveLeft();
            if(cards.value.length > 0){
                afterTransition(() => {
                    const card = cards.value.shift();
                    cards.value.push(card);
                    resetTranslate();
                    transitioning.value = false;
                })
            }
        }

        const prev = () => {
            if (transitioning.value) return;
            transitioning.value = true;
            moveRight();
            if(cards.value.length > 0){
                afterTransition(() => {
                    const card = cards.value.pop();
                    console.log("prev", card);
                    cards.value.unshift(card);
                    resetTranslate();
                    transitioning.value = false;
                })
            }
        }

        const moveLeft = () => {
            innerStyles.value = {
                transform: `translateX(-${step.value})
                            translateX(-${step.value})`
            }
        }

        const moveRight = () => {
            innerStyles.value = {
                transform: `translateX(${step.value})
                            translateX(-${step.value})`
            }
        }

        const afterTransition = (callback: any) => {
            const listener = () => {
                callback(); //- 動畫過程
                inner.value?.removeEventListener('transitionend', listener);
            }
            inner.value?.addEventListener('transitionend', listener);
        }

        const resetTranslate = () => {
            innerStyles.value = {
                transition: 'none',
                transform: `translateX(0)`
            }
        }

        //- Data
        const { playList } = toRefs(props);

        //- Flow Funciton
        const loading = ref<boolean>(false);
        const isPlayerHover = ref<boolean>(false);
        const curActive = ref<string>();
        const play = (card: any) => {
            loading.value = true;
            curActive.value = card;
            setTimeout(() => {
                eventBus.emit('openPlayer')
                loading.value = false;
            }, 700);
        }
        const router = useRouter();
        const toContentList = () => {
            console.log("To ContentList");
            router.push({ path: '/musicDog/contentList' })
        };

        onMounted(() => {
            setTimeout(() => {
                console.log(playList.value);
                if(playList.value){
                    cards.value = playList.value;
                    console.log("cards", cards.value);
                    setStep();
                    resetTranslate();
                }
            }, 1500);
        })
        
        return {
            cards,
            inner,
            innerStyles,
            loading,
            isPlayerHover,
            curActive,
            eventBus,
            next,
            prev,
            play,
            toContentList,
        }
    }
})
</script>

<style scoped>
.carousel {
    width: 100%;
    overflow: hidden;
    .inner {
        transition: transform 0.2s;
        white-space: nowrap;
        display: flex;
        .card{
            width: 100%;
            max-width: 200px;
            margin-right: 25px;
            background-color: transparent;
            color: grey-9;
            .albumImg{
                position: relative;
                .img{
                    max-width: 250px;
                }
                &:hover, &.active{ box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3); }
                &:hover .info, &:hover .player, &.active .info, &.active .player{ opacity: 1; }
                .info{
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    opacity: 0;
                }
                .player{
                    position: absolute;
                    right: 15px;
                    bottom: 15px;
                    opacity: 0;
                }
            }
            .albumInfo{
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>