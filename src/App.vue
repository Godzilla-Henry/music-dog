<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getUser } from './axios/user'

export default defineComponent({
  name: 'App',
  setup(){
    // 使用Fetch API來發送GET請求
    getUser()
      .then(res => {
        // 在這裡處理獲得的數據
        console.log('成功獲取數據:', res);
      })
      .catch(error => {
        // 處理錯誤
        console.error('出現錯誤:', error);
      });

    return{

    }
  }
})
</script>
