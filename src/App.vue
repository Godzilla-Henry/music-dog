<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//- Api
import { getAppToken } from 'src/api/axios/appAuth';
import { getSeveralCategories } from 'src/api/axios/spotify/categories';
import { useApp } from './stores';

export default defineComponent({
    name: 'App',
    setup(){
        const appStore = useApp();
        //- Init
        const init = async() => {
        await getAppToken()
        .then((res) => {
            const appToken = res.data.access_token;
            appStore.act_setAppToken(appToken);
            return getSeveralCategories()
        })
            .then((res: any) => {
                console.log(res.result.categories.items);
                appStore.act_setCategories(res.result.categories.items);
            });
        }
        init();
    }
})
</script>
