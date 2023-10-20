<template lang="pug">
.container(:class="{hidden: expandPlayerView}")
    .row
        .col.q-px-xl.q-pt-md
            q-chip(
                v-for="catergory in categoriesResult" :key="catergory"
                square size="16px"
            ) {{ catergory.name }}

            q-chip(
                square size="16px"
            ) {{ $t('commonUse.more') }}...
    template(
        v-for="(item, index) in playlistResult"
        :key="item"
    )
        .row(v-if="index === 0")
            .col.q-px-xl.q-py-lg
                multiCarousel(:title="item.key" :playList="item.items")
        .row(v-else)
            .col.q-px-xl.q-py-lg
                singleCarousel(:title="item.key" :playList="item.items")

</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import singleCarousel from "src/components/singleCarousel.vue";
import multiCarousel from "src/components/multiCarousel.vue";
import { useGlobal } from "src/stores";
import { getPlaylists, getCategories } from "src/axios/mockData/index";

export default defineComponent({
  components: {
    singleCarousel,
    multiCarousel,
  },
  setup() {
    const globalStore = useGlobal();
    const expandPlayerView = computed(() => globalStore.getExpand);

    const categoriesResult = ref();
    const playlistResult = ref();

    getCategories()
      .then((res: any) => {
        // 在這裡處理獲得的數據
        console.log("成功獲取數據:", res.data);
        categoriesResult.value = [...res.data.categories.items];
        categoriesResult.value = categoriesResult.value.slice(0, 7);
      })
      .catch((error) => {
        // 處理錯誤
        console.error("出現錯誤:", error);
      });

    getPlaylists()
      .then((res: any) => {
        // 在這裡處理獲得的數據
        console.log("成功獲取數據:", res.data);
        playlistResult.value = [...res.data];
      })
      .catch((error) => {
        // 處理錯誤
        console.error("出現錯誤:", error);
      });

    return {
      expandPlayerView,
      categoriesResult,
      playlistResult,
    };
  },
});
</script>
