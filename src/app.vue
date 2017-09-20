<template>
<div class="app">
    <transition name="fade" mode="out-in">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </transition>
    <app-bottom-tab></app-bottom-tab>
</div>
</template>

<script>
import AppBottomTab from './commonApp/AppBottomTab.vue';
export default {
    name: 'app',
    components: {
        AppBottomTab
    },
    data() {
        return {

        }
    },
    props: {
        data: {}
    },
    mounted() {
        this.$store.dispatch('fetchData');
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style lang="less" rel="stylesheet/less">
.flex-parent{
	display:flex;
    display: box;
    display: -webkit-box;
    display: -ms-flexbox;
}
.flex-child{
	flex:1;
    -webkit-box-flex: 1;
    -ms-box-flex: 1; 
    -ms-flex: 1;
}
</style>
