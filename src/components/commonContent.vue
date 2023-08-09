<template lang="pug">
.relative-position
    router-view
    playerView
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import playerView from './playerView.vue';

export default defineComponent({
    components:{
        playerView
    },
    setup () {
        
        return {
        }
    }
})
</script>
