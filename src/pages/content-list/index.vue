<template lang="pug">
.container.q-pa-xl
    .flex.items-center
        q-img.img.rounded-borders(
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8PDw0PDw8PDw8PDQ8PDQ8PFRUWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQYC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDTgqkoAAAAAAACiACoAoIAKACAAKCAAAAAAC4AgAAAAAAEAAAVFBAAVBQQUBBQEAAAAAAABRAAAAAAAAAFQAVFQBUUASKAIoAAIKgAAAAAAGgAAAAAAAAAAAKgCiAKAAAAgAAAAAAAAAAAAAAAAAAAAoICgiooAigAAgAAKCAoIAAAAAAAACggqAAACoCiKCKAAAAAIKgAAAAAqAAoIAAogCgCAAAAAAKgAKAigAACKgAAAAAACgAYACKAAgAKAIqAqKAGCAqKgAAAAAACgAACKACKgAAKACCoAoAAAAAAAgKCAAAAAoAigAAAAgoCaKAgKAioAoAAAAACAKgAAAAAAAKIAoAiooIogAuAIAAACgAiooAFAEAAAAAAAAACCgIKCAAAoAYAioAoAAAAAAigiooAIAqAAKCAAAoCCgioAoAIKAgACoAqCggqAoAIKAIqAAAAAqAABAVAAABRAFABAAAABUoCoACgIKAIoCAAAAAAAAAAAAAACgIoAgAAAKgAqgDlQAqAAAAUAVAAUAQoAqUAAAUAH//Z"
            spinner-color="white"
            style="height: 200px; max-width: 200px"
        )
        div.q-pa-xl
            .title-1 Song Title
            .text-subtitle1 Album / singer or group
            .text-subtitle1 10 songs / 40 minutes
            .flex.q-my-md
                q-btn.q-mr-sm(unelevated rounded color='grey' label='play' icon="play_arrow")
                q-btn.q-mr-sm(outline rounded color='grey' label='save storage' icon="library_add")
                q-btn(flat round color="grey-6" size="md" icon="more_vert")

    .flex.full-width
        q-list.full-width(separator)
            q-item.q-py-lg(clickable v-ripple v-for="(item, index) in songList" :key="index")
                q-item-section
                    q-item-label {{ index+1 }}
                q-item-section 
                    q-item-label {{ item.name }}
                q-item-section 
                    q-item-label {{ item.singer }}
                q-item-section 
                    q-item-label {{ item.time }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup () {
        const songList = ref([
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
            {
                name: 'songTitle',
                singer: 'singer or group',
                time: '4:16'
            },
        ]);

        return {
            songList
        }
    }
})
</script>

<style lang="scss" scoped>
</style>