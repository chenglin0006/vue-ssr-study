<template>
    <section class="hotel-detail-schedule-section">
        <app-calendar @hidechoosepop="hideCalendarFun"></app-calendar>
    </section>
</template>

<script>
import AppCalendar from './components/AppCalendar.vue';
import $ from 'jquery';
import qs from 'qs';
import mockData from './js/mock.js';
import fetchJsonp from 'fetch-jsonp';
import CommonFun from '../commonJs/CommonFun.js'
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:''
        }
    },
    props:[],
    components: {
        AppCalendar
    },
    watch:{
    },
    computed:{
    },
    mounted(){
        this.shopId = this.$route.query.shopId;
    },
    methods:{
        hideCalendarFun:function(from,to){
            if(from||to){
                location.href = "./hotel-detail.html?scheduleFrom="+from+"&scheduleTo="+to;
            } else {
                location.href = "./hotel-detail.html";
            }
        }
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import url('../commonLess/util');
    @import url('../commonLess/star');
    .hotel-detail-schedule-section{
        font-size: 1.2rem;
        color: #666;
        background: #f2f2f2;
    }
</style>
