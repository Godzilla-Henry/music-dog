<template lang="pug">
.flex.justify-between.items-center
    div
        .text-subtitle1 推薦播放清單
        .title-1 {{ title }}
    .flex.flex-center
        q-btn.q-mr-md(rounded outline color="grey" size="12px" label="更多")
        q-btn.q-mr-xs(round outline color="grey" icon="arrow_back_ios" size="sm" @click="prev")
        q-btn(round outline color="grey" icon="arrow_forward_ios" size="sm" @click="next")
.carousel
    .inner(ref='inner' :style='innerStyles')
        q-card.card(v-for='(list) in chunkedArray' :key='list' flat v-if="chunkedArray.length > 0")
            q-list
                q-item.q-my-sm.playerListItem(
                    v-for='item in list' :key='item' 
                    clickable v-ripple
                )
                    q-item-section(avatar)
                        .albumImg
                            q-img.img.rounded-borders(
                                :src="item.images[0].url"
                                spinner-color="grey-5"
                            )
                            .player
                                q-btn(round outline color="white" icon="play_arrow" size='15px' @click="eventBus.emit('openPlayer')")
                    q-item-section.info
                        q-item-label {{ item.name }}
                        q-item-label(caption lines='1') {{ item.description }}
                        .action.flex
                            q-btn(flat round color="grey-6" size="md" icon="thumb_up")
                            q-btn(flat round color="grey-6" size="md" icon="thumb_down")

                    q-item-section(side)
                        span 4:16
            
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue';
import eventBus from 'src/Utils/useEventBus';

export default defineComponent({
    props: ['title', 'playList'],
    setup (props) {
        //- Data
        const { title, playList } = toRefs(props);
        //- Carousel
        const innerStyles = ref({});
        const step = ref('');
        const transitioning = ref(false);
        const inner = ref<HTMLElement>();

        const setStep = () => {
            step.value = `475px`;
        }

        const next = () => {
            if (transitioning.value) return;
            transitioning.value = true;
            moveLeft();
            if(chunkedArray.value.length > 0){
                afterTransition(() => {
                    const card = chunkedArray.value.shift();
                    chunkedArray.value.push(card);
                    transitioning.value = false;
                })
            }
        }

        const prev = () => {
            if (transitioning.value) return;
            transitioning.value = true;
            moveRight();
            if(chunkedArray.value.length > 0){
                afterTransition(() => {
                    const card = chunkedArray.value.pop();
                    chunkedArray.value.unshift(card);
                    transitioning.value = false;
                })
            }
        }

        const moveLeft = () => {
            innerStyles.value = {
                transform: `translateX(-${step.value})`,
                transition: `transform 0.5s`
            }
        }

        const moveRight = () => {
            innerStyles.value = {
                transform: `translateX(${step.value})`,
                transition: `transform 0.5s`
            }
        }

        const afterTransition = (callback:any) => {
            const listener = () => {
                callback();
                resetTranslate();
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

        const isPlayerHover = ref<boolean>(false);

        //- 組合List
        function chunkArray(arr: any, size: number) {
            const chunkCount = Math.ceil(arr.length / size);
            return Array.from({ length: chunkCount }, (_, index) =>
                arr.slice(index * size, index * size + size)
            );
        }

        const chunkedArray = ref([]) as any;
        //- 監聽Props
        const isDataReady = computed(() => title.value && (playList.value.length !== 0));
        watch(
            () => isDataReady.value,
            (val) => {
                if(val){
                    chunkedArray.value = chunkArray(playList.value, 4);
                    setStep();
                    resetTranslate();
                }
            }
        );
        
        return {
            title,
            chunkedArray,
            inner,
            innerStyles,
            isPlayerHover,
            eventBus,
            next,
            prev,
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
            max-width: 450px;
            margin-right: 25px;
            background-color: transparent;
            color: grey-9;
            .playerListItem{
                &:hover .albumImg .player,
                &:hover .info .action{
                    display: block !important;
                }
                .albumImg{
                    position: relative;
                    .img{
                        width: 45px;
                    }
                    .player{
                        /* background-color: grey; */
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0px;
                        bottom: 0px;
                        display: none;
                    }
                }

                .info{
                    position: relative;
                    .action{
                        position: absolute;
                        right: 0;
                        display: none;
                    }
                }
            }
        }
    }
}
</style>