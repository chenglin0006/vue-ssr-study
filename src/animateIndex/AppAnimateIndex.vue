<template>
<div class="animate-index">
    <div class="route-child-div" v-for="item in dataList" @click="toIndexFun(item.value)">{{item.text}}</div>
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
            dataList :[{text:'动画1',value:'index1'},{text:'动画2',value:'index2'},{text:'弹幕模拟',value:'barrage'}]
        }
    },
    computed: {
    },
    watch:{
    },
    mounted() {
    },
    methods: {
        toIndexFun:function(value){
            this.$router.push({path:'/animate/'+value});
        }
    }
}
</script>

<style lang="less">
    @import url("../commonLess/border.less");
    @import url("../commonLess/util.less");
    .route-child-div{
        margin-bottom: 1rem;
        font-size: 1.5rem;
        padding-left: 1rem;
        padding-top: 1rem;
        color: #666666;
        cursor: pointer;
    }
</style>
