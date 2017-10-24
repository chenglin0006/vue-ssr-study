<template>
<div class="animate-index">
    <div v-for="item in [1,2,3]" @click="toIndexFun(item)">动画{{item}}</div>
    <transition name="fade" mode="out-in">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
import Vue from 'vue';
import {DatetimePicker} from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component('DatetimePicker', DatetimePicker);

import anime from 'animejs';
export default {
    name: '',
    components: {
        
    },
    data() {
        return {

        }
    },
    computed: {
    },
    watch:{
    },
    mounted() {
    },
    methods: {
        toIndexFun:function(item){
            this.$router.push({path:'/animate/index1'});
        }
    }
}
</script>

<style lang="less">
    @import url("../commonLess/border.less");
    @import url("../commonLess/util.less");
</style>
