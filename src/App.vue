<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import appController from 'src/api/index'

export default defineComponent({
  name: 'App',
  setup(){
    appController.init();
  }
})
</script>
