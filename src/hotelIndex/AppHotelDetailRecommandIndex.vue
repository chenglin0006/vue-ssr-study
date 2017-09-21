<template>
    <section class="hotel-detail-recommand-section">
        <div class="recommand-content">
            <div class="recommand-info" v-html="hotelBasicBriefInfoData.description">
            </div>
        </div>
    </section>
</template>

<script>
import $ from 'jquery';
import qs from 'qs';
import mockData from './js/mock.js';
import fetchJsonp from 'fetch-jsonp';
import CommonFun from '../commonJs/CommonFun.js';
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:'',
            hotelBasicBriefInfoData:{}
        }
    },
    props:[],
    components: {
    },
    watch:{
    },
    computed:{
    },
    mounted(){
        this.shopId = this.$route.query.shopId;
        this.getBasicBriefInfo();
    },
    methods:{
        //获取酒店基本信息
        getBasicBriefInfo:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/hotelInfo/hotelBriefInfo?'+qs.stringify(params);
            // return;
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code==600){
                        location.href= eDomain;
                    } else {
                        alert(json.msg);
                        console.log('获取酒店基本信息失败')
                        return;
                    }
                }
                if(json.content.hotelInfo.description){
                    json.content.hotelInfo.description = json.content.hotelInfo.description.split('\n').join('<br>');
                }
                this.hotelBasicBriefInfoData = json.content.hotelInfo;
            }).catch(function(ex) {
                alert('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        },
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import url('../commonLess/util');
    @import url('../commonLess/star');
    .hotel-detail-recommand-section{
        padding: 1.5rem;
        font-family: PingFangSC-Regular;
        font-size: 1.5rem;
        color: #333333;
        background:#fff;
    }
</style>
