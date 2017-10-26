<template>
    <section class="invite-section" :class="{'is-android':isAndroid}">
        <div class="tips-info-div" v-show="showTipsStatus">
            <span class="tips-span">您有{{notDealNum}}个邀约日程待完成，请及时处理！</span>
            <div class="close-tips" @click="hideTipsFun"></div>
        </div>
        <div class="type-summary-div" :class="{'more-line-div':lineTypeList.length>=4,'three-line-div flex-parent':lineTypeList.length>1&&lineTypeList.length<4}" v-if="lineTypeList.length>1">
            <div class="summary-tag" :class="{'flex-child':lineTypeList.length>1&&lineTypeList.length<4}" v-for="(item,index) in lineTypeList" @click="chooseTypeDetailFun(item.type)">
                <div class="tag-title" :class="{'banquet':item.type==1,'wed':item.type==3,'pay':item.type==2,'shop':item.type==4,'dress':item.type==5}">
                    <span v-if="item.type==1">婚宴日程</span>
                    <span v-if="item.type==2">收款日程</span>
                    <span v-if="item.type==3">婚庆日程</span>
                    <span v-if="item.type==4">门店婚宴</span>
                    <span v-if="item.type==5">礼服日程</span>
                </div>
                <div class="tag-content">
                    <div class="number-item flex-parent" v-if="item.type!=2">
                        <div class="label-div flex-child">邀约</div>
                        <div class="value-div flex-child">{{item.count.appointmentManCount}}/{{item.count.appointment}}</div>
                    </div>
                    <div class="number-item flex-parent" v-if="item.type!=2">
                        <div class="label-div flex-child">到店</div>
                        <div class="value-div flex-child">{{item.count.appointmentDoneManCount}}/{{item.count.appointmentDone}}</div>
                    </div>
                    <div class="number-item flex-parent" v-if="item.type!=2">
                        <div class="label-div flex-child">取消</div>
                        <div class="value-div flex-child">{{item.count.appointmentCancelManCount}}/{{item.count.appointmentCancel}}</div>
                    </div>
                    <div class="number-item flex-parent" v-if="item.type==2">
                        <div class="label-div flex-child">待收款</div>
                        <div class="value-div flex-child">{{item.count.checkout}}</div>
                    </div>
                    <div class="number-item flex-parent" v-if="item.type==2">
                        <div class="label-div flex-child">已收款</div>
                        <div class="value-div flex-child">{{item.count.checkoutDone}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="one-line-div flex-parent" v-if="lineTypeList.length==1">
            <div class="one-line-tag-div flex-child">
                <div class="one-line-title">已邀约</div>
                <div class="one-line-value">{{lineTypeList[0].count.appointmentManCount}}/{{lineTypeList[0].count.appointment}}</div>
            </div>
            <div class="one-line-tag-div flex-child">
                <div class="one-line-title">已到店</div>
                <div class="one-line-value">{{lineTypeList[0].count.appointmentDoneManCount}}/{{lineTypeList[0].count.appointmentDone}}</div>
            </div>
            <div class="one-line-tag-div flex-child">
                <div class="one-line-title">已取消</div>
                <div class="one-line-value">{{lineTypeList[0].count.appointmentCancelManCount}}/{{lineTypeList[0].count.appointmentCancel}}</div>
            </div>
        </div>
        <div class="report-table-div" @click="showInviteSummaryFun">
            邀约报表
            <img class="right-arrow" src="./img/right-arrow.png">
        </div>
        <div class="invite-filter-div flex-parent" :class="{'is-fixed':showFilterSelectHotelStatus||showFilterSelectSaleStatus||showChooseWeekStatus||showChooseTypeStatus,'top-locate':filterTopStatus}">
            <div class="invite-filter flex-child" @click="showChooseWeekFun">
                <div class="value-div" :class="{'show-status':showChooseWeekStatus}">{{filterCheckInText}}-{{filterCheckOutText}}</div>
                <div v-if="showChooseWeekStatus" class="up-tri"></div>
                <div v-else class="down-tri"></div>
            </div>
            <div class="invite-filter flex-child" @click="showFilterSelectHotelFun">
                <div class="value-div" :class="{'text-clip':selectHotelList.length>1,'show-status':showFilterSelectHotelStatus}">
                    <span v-if="selectHotelStr">
                        {{selectHotelStr}}
                        <span v-show="selectHotelList.length>1">等{{selectHotelList.length}}家</span>
                    </span>
                    <span v-else>全部酒店</span>
                </div>
                <span class="mul-span-info" :class="{'show-status':showFilterSelectHotelStatus}" v-show="selectHotelList.length>1">等{{selectHotelList.length}}家</span>
                <div v-if="showFilterSelectHotelStatus" class="up-tri"></div>
                <div v-else class="down-tri"></div>
            </div>
            <div class="invite-filter flex-child" @click="showFilterSelectSaleFun">
                <div class="value-div" :class="{'text-clip':selectSaleList.length>1,'show-status':showFilterSelectSaleStatus,'only-one':selectSaleList.length==1}">
                    <span v-if="selectSaleStr">
                        {{selectSaleStr}}
                    </span>
                    <span v-else>全部顾问</span>
                    <div v-if="showFilterSelectSaleStatus" class="up-tri"></div>
                    <div v-else class="down-tri"></div>
                </div>
                <span class="mul-span-info" :class="{'show-status':showFilterSelectSaleStatus}" v-show="selectSaleList.length>1">等{{selectSaleList.length}}位</span>
            </div>
            <div class="invite-filter flex-child" @click="showChooseTypeFun">
                <div class="value-div" :class="{'show-status':showChooseTypeStatus,'only-one':selectTypeList.length==1}" v-if="selectTypeList.length">{{selectTypeList.join(',')}}</div>
                <div class="value-div" :class="{'show-status':showChooseTypeStatus}" v-else>全部类型</div>
                <div v-if="showChooseTypeStatus" class="up-tri"></div>
                <div v-else class="down-tri"></div>
            </div>
        </div>
        <div class="invite-result-div" :class="{'three-line':selectSaleList.length==1}">
            <div class="invite-detail-table" :class="{'padding-fix':filterTopStatus}">
                <div class="left-time-range-div">
                    <div class="left-time-range-item first-range">
                        <span><p>8:00</p><p style="line-height: 2rem">至</p><p>12:00</p></span>
                    </div>
                    <div class="left-time-range-item second-range">
                        <span><p>12:00</p><p style="line-height: 2rem">至</p><p>18:00</p></span>
                    </div>
                    <div class="left-time-range-item third-range">
                        <span><p>18:00</p><p style="line-height: 2rem">至</p><p>22:00</p></span>
                    </div>
                </div>
                <div class="invite-detail-table-range-list">
                    <!-- <div class="title-date-div" :class="{'scroll-y':scrollTopYStatus}"> -->
                    <div class="title-date-div">
                        <div class="null-div"></div>
                        <div class="date-item" :class="item.weekText" v-for="(item,index) in filterWeekArry">
                            <p class="date-item-date-text">{{item.dateText}}</p>
                            <p class="date-item-week-text">{{item.weekText}}</p>
                        </div>
                    </div>

                    <div class="invite-detail-table-range-item" :id="index" v-for="(item,index) in inviteData">
                        <div class="list-data-div" v-for="(listData,index) in item">
                            <div class="invite-item" :class="{
                                'invite-type':invite.type==1,
                                'pay-type':invite.type==2,
                                'wed-type':invite.type==3,
                                'shop-type':invite.type==4,
                                'dress-type':invite.type==5
                                }" @click="showInviteDetailPopFun(invite)" v-for="(invite,index) in listData">
                                <div class="border-left-div-3"></div>
                                <div class="item-date-div">
                                    <p class="event-title-p">{{invite.eventTitleShow}}</p>
                                    <!-- <p style="font-weight: bold;">{{invite.eventStatusTitle}}</p> -->
                                    <p class="text-ellipse" style="width:9rem;">{{invite.shopName}}</p>
                                    <div style="line-height: 1.1rem;margin-bottom: .5rem;height: 1.1rem;">
                                        <div class="text-ellipse invite-user-name">{{invite.eventInfo.yzsUserName}}</div> 
                                        {{invite.phoneShow}}</div>
                                    <p v-show="selectSaleList.length>1||selectSaleList.length==0">{{invite.salesName}}</p>
                                    <p>{{invite.gradeTitle}} {{invite.hourTime}}</p>
                                    <div v-if="invite.eventType==1" v-show="invite.eventStatus" class="status-div" :class="{'visit-shop':invite.eventStatus==101,'visit-canceled':invite.eventStatus==102}">{{invitePayStatusMap[invite.eventStatus]}}</div>
                                    <div v-if="invite.type==2" v-show="invite.eventStatus" class="status-div" :class="{'has-pay':invite.eventStatus==201}">{{invitePayStatusMap[invite.eventStatus]}}</div>
                                    <div v-if="invite.type==3" v-show="invite.eventStatus" class="status-div" :class="{'wed-visit-shop':invite.eventStatus==101,'visit-canceled':invite.eventStatus==102}">{{invitePayStatusMap[invite.eventStatus]}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <app-bottom-tab :not-deal-num="notDealNum" :active-text="{text:'calendar'}"></app-bottom-tab> -->
        <app-invite-detail-pop @refreshSummaryNum="filterSearchFun" @refreshInviteNum="getInviteNotDealNumFun" @showchangetimepop="showInviteCalendarFun" :item="activeInviteItem" @hidepop="hideInviteDetailPopFun" v-show="showInviteDetailPopStatus" @cancelvisitshop="showSureCancelFun"></app-invite-detail-pop>
        <app-history-invite-calendar :initcheckintext="activeInviteItem.inviteDate" :yzsuserid="activeInviteItem.yzsUserId" :invitetime="activeInviteItem.inviteTime" v-if="showInviteCalendarStatus" :maxscheduledatenumber="inviteTimeMaxscheduledatenumber" :startdate="inviteTimeStartDate" @hidechoosepop="hideInviteCalendarFun" :type="changeTimeType"></app-history-invite-calendar>
        <!-- 头部酒店和顾问的搜索弹窗 写两个组件是为了每次直接定位至选中项-->
        <app-select-search :multiple="multiple" :option-list="hotelList" :placeholder-obj="placeholderHotelObj" :select-model="selectHotelList" @setselectdata="selectHotelFun" @hidepop="hideFilterSelectHotelFun" v-show="showFilterSelectHotelStatus"></app-select-search>
        <app-select-search :multiple="multiple" :option-list="saleList" :placeholder-obj="placeholderSaleObj" :select-model="selectSaleList" @setselectdata="selectSaleFun" @hidepop="hideFilterSelectSaleFun" v-show="showFilterSelectSaleStatus"></app-select-search>
        <app-invite-summary-pop :summary-list="summaryList" :hq-summary-list="hqSummaryList" :hy-summary-list="hySummaryList" :shop-summary-list="shopSummaryList" :dress-sumarry-list="dressSummaryList" v-show="showInviteSummaryStatus" @hidepop="hideInviteSummaryFun"></app-invite-summary-pop>
        <app-choose-week-calendar :initcheckintext="filterCheckIn" @hidechoosepop="hideChooseWeekFun" @changetime="changeFilterDate" v-show="showChooseWeekStatus" :maxscheduledatenumber="chooseWeekMaxscheduledatenumber" :startdate="chooseWeekStartDate"></app-choose-week-calendar>
        <section class="choose-type-section" v-show="showChooseTypeStatus">
            <div class="mask-div" @click="hideChooseTypeFun" @touchmove="touchMoveFun($event)"></div>
            <div class="select-div">
                <div class="type-item" @click="chooseFilterTypeFun(item)" :class="{'active':item.active}" :key="index" v-for="(item,index) in inviteTypeList">{{item.text}}</div>
            </div>
        </section>
        <app-sure-pop v-show="showSureStatus" :text="'确认取消看店么'" @hidepop="hideSureCancelFun"></app-sure-pop>
    </section>
</template>

<script>
    import formatter from 'date-formatter';
    import commonData from './js/commonData.js';
    import calendarObj from './js/inviteCalendar.js';
    import $ from 'jquery';
    import qs from 'qs';
    import fetchJsonp from 'fetch-jsonp';
    import AppInviteDetailPop from './components/AppInviteDetailPop.vue';
    import AppInviteSummaryPop from './components/AppInviteSummaryPop.vue';
    import AppHistoryInviteCalendar from './components/AppHistoryInviteCalendar.vue';
    import AppSurePop from './components/AppSurePop.vue';
    import AppChooseWeekCalendar from './components/AppChooseWeekCalendar.vue';
    import AppSelectSearch from './components/AppSelectSearch.vue';
    import { mapGetters } from 'vuex';
    import CommonFun from '../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    var eDomain = CommonFun.getEDomain();

    export default {

        data: function() {
            return {
                type:0,//从主页跳转过来的链接上带的参数，直接过滤
                inviteDataMock:[],
                showInviteDetailPopStatus:false,      //邀约／收款详情弹窗
                showInviteSummaryStatus:false,  //周汇总弹窗
                inviteData:[],
                activeInviteItem:{},
                showInviteCalendarStatus:false,    //更改时间弹窗
                showFilterSelectHotelStatus:false,
                showFilterSelectSaleStatus:false,
                multiple:true,
                selectHotelList:[],
                selectSaleList:[],
                placeholderHotelObj:{text:'请输入酒店名称'},
                placeholderSaleObj:{text:'请输入顾问名称'},
                scrollTopYStatus:false,
                showChooseWeekStatus:false, //选择周日历弹窗
                showChooseTypeStatus:false,
                payStatusMap:commonData.payStatusMap,
                inviteStatusMap:commonData.inviteStatusMap,
                invitePayStatusMap:commonData.invitePayStatusMap,
                itemTypeMap:commonData.itemTypeMap,
                filterCheckIn:formatter(new Date(),'YYYY-MM-DD'),
                weekTextMap:{0:'周日',1:'周一',2:'周二',3:'周三',4:'周四',5:'周五',6:'周六'},
                showSureStatus:false, //确认取消看点弹窗
                hqSummaryList:commonData.inviteSummaryData,
                hySummaryList:null,
                shopSummaryList:[],
                dressSummaryList:[],
                inviteDataTotal:[],
                changeTimeType:'invite',
                customerLevelMap:commonData.customerLevelMap,
                isBoss:'',
                currentMis:'',
                saleList:[],
                hotelList:[],
                //
                inviteTypeList:[{text:'婚宴',value:'1_0',active:false,type:1},{text:'门店婚宴',value:'shop_-1',active:false,type:4},{text:'婚庆',value:'1_1',active:false,type:3},{text:'礼服',value:'1_2',active:false,type:5},{text:'收款',value:'2_-1',active:false,type:2}],
                inviteTimeStartDate:'', //邀约日历和时间 对应的开始时间从本月初开始，后面三个月
                chooseWeekStartDate:'', //顶部日历筛选的开始时间是2017-07-01，直到本月后面的三个月
                inviteTimeMaxscheduledatenumber:100,
                chooseWeekMaxscheduledatenumber:100,
                filterTopStatus:false,
                filterTopNumber:0,
                notDealNum:0,
                lineTypeList:[],
                startSearchParams:{
                    filterCheckIn:null,
                    selectHotelList:null,
                    selectSaleList:null,
                    inviteTypeList:null
                },
                summaryList:[],
                isIOS:false,
                isAndroid:false,
                showTipsStatus:true
            };
        },
        components:{
            AppInviteDetailPop,
            AppHistoryInviteCalendar,
            AppInviteSummaryPop,
            AppChooseWeekCalendar,
            AppSurePop,
            AppSelectSearch
        },
        props:[],

        computed: {
            selectHotelStr:function(){
                let arry = [];
                this.selectHotelList.forEach((ele,index)=>{
                    arry.push(ele.label);
                })
                return arry.join(',');
            },
            selectSaleStr:function(){
                let arry = [];
                this.selectSaleList.forEach((ele,index)=>{
                    arry.push(ele.label);
                })
                return arry.join(',');
            },
            selectTypeList:function(){
                let arry = [];
                this.inviteTypeList.forEach((ele,index)=>{
                    if(ele.active){
                        arry.push(ele.text);
                    }
                })
                return arry;
            },
            filterCheckOut:function(){
                return this.filterCheckIn?formatter(new Date(new Date(this.filterCheckIn).getTime()+ 6 * 86400000),'YYYY-MM-DD'):""
            },
            filterCheckInText:function(){
                return this.filterCheckIn?formatter(new Date(this.filterCheckIn),'YYYYMMDD'):''
            },
            filterCheckOutText:function(){
                return this.filterCheckOut?formatter(new Date(this.filterCheckOut),'YYYYMMDD'):''
            },
            filterWeekArry:function(){
                let arry = [];
                [1,2,3,4,5,6,7].forEach((ele,index)=>{
                    let obj = {
                        dateText:'',
                        weekText:''
                    }
                    let currentDate = new Date(new Date(this.filterCheckIn).getTime()+ (index) * 86400000);
                    obj.dateText = formatter(currentDate,'YYYYMMDD');
                    obj.weekText = this.weekTextMap[currentDate.getDay()];
                    arry.push(obj);
                })
                return arry;
            }
        },

        watch:{
            filterCheckIn:function(){
                this.startSearchParams.filterCheckIn = this.filterCheckIn;
            },
            selectHotelList:function(){
                this.startSearchParams.selectHotelList = this.selectHotelList;
            },
            selectSaleList:function(){
                this.startSearchParams.selectSaleList = this.selectSaleList;
            }
        },

        mounted:function(){

            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = false;
            if (/iphone|ipad|ipod/.test(ua)) {
                this.isIOS = true;
            } else if (/android/.test(ua)) {
                this.isAndroid = true;
            }
            this.fetchStatus();
            this.$watch('inviteTypeList',()=>{
                this.startSearchParams.inviteTypeList = this.inviteTypeList;
            },{deep:true});
            this.$watch('startSearchParams',()=>{
                this.filterSearchFun();
                this.getInviteNotDealNumFun();
            },{deep:true});
        },

        methods: {
            fetchStatus:function(){
                var ajaxGetStatus = mDomain+"/lovelab/yzsinfo/shopsandsales";
                fetchJsonp(ajaxGetStatus, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=> {
                    if(json.code!=200){
                        console.error(json.msg);
                        alert('请求失败：'+json.msg);
                        return
                    }
                    this.isBoss = json.content.special;
                    this.currentMis = {
                        salesId:json.content.selfMisId
                        // label:'程林',
                        // value:'chenglin02',
                        // salesId:'chenglin02',
                        // salesName:'程林'
                    }
                    json.content.salesList.forEach((ele,index)=>{
                        ele.label = ele.salesName;
                        ele.value = ele.salesId;
                        if(!ele.label&&ele.value){
                            ele.label = ele.value;
                        }
                        if(ele.label&&!ele.value){
                            ele.value = ele.label;
                        }
                        if(!ele.label&&!ele.value){
                            json.content.salesList.splice(index,1);
                        }
                    });
                    json.content.salesList.forEach((ele,index)=>{
                        if(ele.salesId == json.content.selfMisId){
                            this.currentMis = ele;
                        }
                    });
                    json.content.shopList.forEach((ele,index)=>{
                        ele.label = ele.shopName;
                        ele.value = ele.shopId;
                    });
                    this.saleList = json.content.salesList;
                    this.hotelList = json.content.shopList;
                    let today = new Date();
                    let todayWeek = today.getDay();
                    let firstDay = null;
                    if(todayWeek!=0){
                        firstDay = calendarObj.addDay(today,-todayWeek+1);
                    } else{
                        firstDay = calendarObj.addDay(today,-7+1);
                    }
                    this.filterCheckIn = formatter(firstDay,'YYYY-MM-DD');
                    if(this.currentMis){
                        if(this.isBoss){
                            this.selectSaleList = [];
                        } else {
                            if(this.currentMis.salesId&&this.currentMis.salesName&&this.currentMis.label&&this.currentMis.value){
                                this.selectSaleList = [this.currentMis];
                            } else {
                                this.selectSaleList = [];
                            }
                        }
                    }
                    this.initChangeDateCalendarFun();
                    this.initTabScroll();
                    this.$store.dispatch('setIsBoss',this.isBoss);
                    this.$store.dispatch('setCurrentMis',this.currentMis);
                    this.$store.dispatch('setSaleList',this.adviserList);
                    this.$store.dispatch('setHotelList',this.hotelList);
                }).catch(function(ex) {
                    alert('网络异常，请重试');
                    console.log('ajaxGetStatus failed', ex);
                });
            },
            //邀约日历开始时间：本月第一天，跨度：三个月
            initChangeDateCalendarFun:function(){
                let firstDate = new Date('2017-07-01');
                let startDate = formatter(new Date(new Date().setDate(1)),'YYYY-MM-DD');
                let endDate = new Date(new Date(startDate).setMonth(new Date(startDate).getMonth()+3));
                this.inviteTimeStartDate = startDate;
                this.chooseWeekStartDate = firstDate;
                this.chooseWeekMaxscheduledatenumber = parseInt((endDate.getTime()-firstDate.getTime())/calendarObj.ONE_DAY_TS)-1;
                this.inviteTimeMaxscheduledatenumber = parseInt((endDate.getTime()-new Date(startDate).getTime())/calendarObj.ONE_DAY_TS)-1;
            },
            filterSearchFun:function(){
                let hotelArry = [];
                this.selectHotelList.forEach((ele,index)=>{
                    hotelArry.push(ele.shopId);
                });
                let saleArry = [];
                this.selectSaleList.forEach((ele,index)=>{
                    saleArry.push(ele.salesId);
                });
                let typeArry = [];
                this.inviteTypeList.forEach((ele,index)=>{
                    if(ele.active){
                        typeArry.push(ele.value);
                    }
                });
                let params = {
                    fromSchedule:this.filterCheckIn,
                    toSchedule:this.filterCheckOut,
                    shopIds:hotelArry.join(','),
                    salesIds:saleArry.join(','),
                    eventTypes:typeArry.join(',')
                }
                let ajaxUrl = mDomain+'/lovelab/salescalendar/eventlist?'+qs.stringify(params);
                console.log('filter params:',params);
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code != 200){
                        console.error(json.msg);
                        alert('请求失败：'+json.msg);
                        return
                    }
                    this.filterTopNumber = 0;
                    this.lineTypeList = [];
                    if(!json.content){
                        json.content = {
                            events:[],
                            personalCount:[]
                        }
                    }
                    this.inviteDataTotal = json.content&&json.content.events?json.content.events:[];
                    json.content.personalCount.forEach((ele,index)=>{
                        ele.type=0;
                        if(ele.eventType==1){
                            if(ele.businessLineType == 0){
                                if(ele.shopAppointment==1){
                                    ele.type = 4;   //门店
                                } else {
                                    ele.type = 1;   //婚宴
                                }
                            } else if(ele.businessLineType == 1){
                                ele.type = 3;   //婚庆
                            } else if(ele.businessLineType == 2){
                                ele.type = 5;   //礼服
                            }
                        } else if(ele.eventType==2){
                            if(ele.businessLineType == 0){
                                ele.type = 2;  //收款
                            }
                        }
                    });
                    let tempObj = null;
                    json.content.personalCount.forEach((ele,index)=>{
                        if(ele.type==2){
                            tempObj = CommonFun.deepClone(ele);
                            json.content.personalCount.splice(index,1);
                        }
                    });
                    if(tempObj){
                        json.content.personalCount.push(tempObj);
                    }
                    this.lineTypeList = json.content.personalCount;
                    this.inviteDataDealFun();
                    this.inviteSummaryDealFun(json.content);
                    this.$nextTick(()=>{
                        this.initInviteStyleFun();
                    });
                }).catch(function(ex) {
                    alert('网络错误，请重试');
                    console.error('ajaxGetIndexResultData failed', ex);
                });
            },
            //将返回的数据处理成能渲染的模式
            inviteDataDealFun:function(){
                let arryRange1 = [[],[],[],[],[],[],[]];
                let arryRange2 = [[],[],[],[],[],[],[]];
                let arryRange3 = [[],[],[],[],[],[],[]];
                // data = MockData.inviteDataMock;
                // data = [];
                //对数组进行排序

                this.inviteDataTotal.sort(function(a,b){
                    return new Date(a.eventTime.replace(/-/g,"/")).getTime()-new Date(b.eventTime.replace(/-/g,"/")).getTime();
                })
                this.inviteDataTotal.forEach((ele,index)=>{
                    let reg = /^(\d{3})\d{4}(\d{4})$/;
                    let phone = ele.eventInfo.yzsUserPhone;
                    phone = phone?phone.replace(reg, "$1****$2"):"";
                    ele.phoneShow = phone.substring(phone.length-6,phone.length);
                    //对于更改时间后不在日历查询范围的条目不做处理
                    if(new Date(ele.eventTime).getTime()<new Date(this.filterCheckIn).getTime() || new Date(ele.eventTime).getTime()>new Date(this.filterCheckOutText+' 23:59:59').getTime()){
                        return;
                    }
                    ele.eventTitleShow ='';
                    ele.type = 0;
                    if(ele.eventType==1){
                        if(ele.businessLineType == 0){
                            if(ele.shopAppointment==1){
                                ele.type = 4;   //门店
                            } else {
                                ele.type = 1;   //婚宴
                            }
                        } else if(ele.businessLineType == 1){
                            ele.type = 3;   //婚庆
                        } else if(ele.businessLineType == 2){
                            ele.type = 5;   //礼服
                        }
                    } else if(ele.eventType==2){
                        if(ele.businessLineType == 0){
                            ele.type = 2;  //收款
                        }
                    }
                    //ele.eventStatus：0=无状态 101＝已到店 102＝已取消 201＝已收款
                    if(ele.type==1 || ele.type==3 ||ele.type==4 ||ele.type==5){
                        ele.eventTitleShow = ele.eventInfo.appointmentCount?ele.eventInfo.appointmentCount+'次邀约':'邀约';
                    } else if(ele.type==2) {
                        ele.eventTitleShow = ele.eventStatus?this.invitePayStatusMap[ele.eventStatus]:'待收款';
                    }
                    ele.hourTime = formatter(new Date(ele.eventTime.replace(/-/g,"/")),'hh:mm');
                    ele.inviteDate = formatter(new Date(ele.eventTime.replace(/-/g,"/")),'YYYY-MM-DD');
                    ele.inviteTime = ele.hourTime;
                    //iphone new Date 支持／ 不支持－ 连接符
                    let timeStr = ele.eventTime.replace(/-/g,"/");
                    let date = new Date(timeStr);
                    let week = date.getDay()==0?7:date.getDay();
                    let hour = date.getHours();
                    arryRange1.forEach((a,aIndex)=>{
                        if(hour>=8&&hour<12&&week==aIndex+1){
                            a.push(ele);
                        }
                    });
                    arryRange2.forEach((a,aIndex)=>{
                        if(hour>=12&&hour<18&&week==aIndex+1){
                            a.push(ele);
                        }
                    });
                    arryRange3.forEach((a,aIndex)=>{
                        if(hour>=18&&hour<=22&&week==aIndex+1){
                            a.push(ele);
                        }
                    });
                });
                let allArry = [arryRange1,arryRange2,arryRange3];
                this.inviteData = allArry;
            },
            //处理邀约汇总数据
            inviteSummaryDealFun:function(data){
                if(data.totalCount){
                    data.totalCount.forEach((item,index)=>{
                        item.counts.forEach((ele,index)=>{
                            if(!ele.salesName){
                                ele.salesName = '汇总';
                            }
                        });
                    });
                }
                this.summaryList = data.totalCount?data.totalCount:[];
            },
            showInviteDetailPopFun:function(invite){
                this.activeInviteItem = invite;
                this.showInviteDetailPopStatus = true;
            },
            hideInviteDetailPopFun:function(changeTime){
                this.showInviteDetailPopStatus = false;
                if(changeTime){
                    this.showInviteCalendarFun();
                }
            },
            showFilterSelectHotelFun:function(){
                this.showChooseWeekStatus = false;
                this.showChooseTypeStatus = false;
                this.showFilterSelectSaleStatus = false;
                this.showFilterSelectHotelStatus = !this.showFilterSelectHotelStatus;
            },
            showFilterSelectSaleFun:function(){
                this.showChooseWeekStatus = false;
                this.showChooseTypeStatus = false;
                this.showFilterSelectHotelStatus = false;
                this.showFilterSelectSaleStatus = !this.showFilterSelectSaleStatus;
            },
            //选中酒店
            selectHotelFun:function(selectList){
                if(selectList){
                    this.selectHotelList = selectList;
                }
            },
            //选中顾问
            selectSaleFun:function(selectList){
                if(selectList){
                    this.selectSaleList = selectList;
                }
            },
            //隐藏酒店搜索弹窗
            hideFilterSelectHotelFun:function(){
                this.showFilterSelectHotelStatus = false;
                this.$nextTick(()=>{
                    this.resetFilterTopFun();
                });
            },
            //隐藏顾问的搜索弹窗
            hideFilterSelectSaleFun:function(){
                this.showFilterSelectSaleStatus = false;
                this.$nextTick(()=>{
                    this.resetFilterTopFun();
                });
            },
            //重新计算筛选条件距离顶部的距离
            resetFilterTopFun:function(){
                setTimeout(()=>{
                    if(document.querySelector(".invite-filter-div").offsetTop!=0){
                        this.filterTopNumber = document.querySelector(".invite-filter-div").offsetTop;
                    }
                },300);
            },
            showInviteCalendarFun:function(type){
                if(type){
                    this.changeTimeType = type;
                }
                this.showInviteCalendarStatus = true;
            },
            hideInviteCalendarFun:function(checkInDate,activeTime){
                this.showInviteCalendarStatus = false;
                if(!(checkInDate&&activeTime)){
                    return
                }
                let params = {
                    eventId:this.activeInviteItem.eventId,
                    eventTime:formatter(checkInDate, 'YYYY-MM-DD')+' '+activeTime,
                    remark:this.activeInviteItem.remark,
                    status:this.activeInviteItem.eventStatus,
                    operationType:1, //1:修改时间 2:更新状态（取消／到店／变更备注）
                }
                let ajaxUrl = mDomain+'/lovelab/salescalendar/updateevent?'+qs.stringify(params);
                console.log('更改邀约时间:',params);
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code != 200){
                        console.error(json.msg);
                            alert('请求失败：'+json.msg);
                            return
                    }
                    if(checkInDate){
                        this.activeInviteItem.inviteDate = formatter(checkInDate, 'YYYY-MM-DD');
                        this.activeInviteItem.inviteTime = activeTime;
                        this.activeInviteItem.eventTime=formatter(checkInDate, 'YYYY-MM-DD')+' '+activeTime;
                        this.filterSearchFun();
                    }
                    this.getInviteNotDealNumFun();
                }).catch(function(ex) {
                    alert('网络错误，请重试');
                    console.error('ajaxGetIndexResultData failed', ex);
                });
            },
            showInviteSummaryFun:function(){
                this.showInviteSummaryStatus = true;
                $('body').addClass('no-scroll');
            },
            hideInviteSummaryFun:function(){
                this.showInviteSummaryStatus = false;
                $('body').removeClass('no-scroll');
            },
            showChooseWeekFun:function(){
                this.showFilterSelectHotelStatus=false;
                this.showFilterSelectSaleStatus=false;
                this.showChooseTypeStatus = false;
                this.showChooseWeekStatus = !this.showChooseWeekStatus;
                this.$nextTick(function(){
                    calendarObj.toActiveDayIndex(140);
                });
            },
            hideChooseWeekFun:function(){
                this.showChooseWeekStatus = false;
                this.$nextTick(()=>{
                    this.resetFilterTopFun();
                });
            },
            showChooseTypeFun:function(){
                this.showFilterSelectHotelStatus=false;
                this.showFilterSelectSaleStatus=false;
                this.showChooseWeekStatus = false;
                this.showChooseTypeStatus = !this.showChooseTypeStatus;
            },
            hideChooseTypeFun:function(){
                this.showChooseTypeStatus = false;
                this.$nextTick(()=>{
                    this.resetFilterTopFun();
                });
            },
            chooseFilterTypeFun:function(item){
                item.active = !item.active;
            },
            changeFilterDate:function(checkInDate){
                if(checkInDate){
                    this.filterCheckIn = checkInDate;
                }
            },
            showSureCancelFun:function(){
                this.showSureStatus = true;
            },
            hideSureCancelFun:function(){
                this.showSureStatus = false;
            },
            sureCancelVisitShopFun:function(){
                this.showSureStatus = false;
            },
            //获取待处理日历数目
            getInviteNotDealNumFun:function(){
                let ajaxUrl = mDomain+'/lovelab/salescalendar/reddot';
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json) =>{
                    if(json.code!=200){
                        console.error(json.msg);
                            alert('请求失败：'+json.msg);
                            return
                    }
                    this.notDealNum = json.content.count;
                    if(this.notDealNum){
                        this.showTipsStatus = true;
                    } else {
                        this.showTipsStatus = false;
                    }
                }).catch(function(ex) {
                    alert('网络错误，请重试');
                    console.error('ajaxGetIndexResultData failed', ex);
                });
            },
            touchMoveFun:function(event){
                event.preventDefault();
                event.stopPropagation();
            },
            initTabScroll:function(){
                let self = this;
                window.onscroll=function(){
                    var winScrollTop = window.scrollY;
                    if(winScrollTop > self.filterTopNumber){
                        self.filterTopStatus = true;
                    }else{
                        self.filterTopStatus = false;
                    }
                  };
            },
            initInviteStyleFun:function(){
                let firstHeight = $('#0').height()-1;
                let secondHeight = $('#1').height()-1;
                let thirdHeight = $('#2').height()-1;
                $('.first-range').css('height',firstHeight+'px');
                $('.second-range').css('height',secondHeight+'px');
                $('.third-range').css('height',thirdHeight+'px');
                let firstHeightTop = firstHeight/2-35>0?firstHeight/2-35:0;
                let secondHeightTop = secondHeight/2-35>0?secondHeight/2-35:0;
                let thirdHeightTop = thirdHeight/2-35>0?thirdHeight/2-35:0;
                $('.first-range span').css('top',firstHeightTop+'px');
                $('.second-range span').css('top',secondHeightTop+'px');
                $('.third-range span').css('top',thirdHeightTop+'px');
                //打开页面时滚动至今天所在的星期数，如果是周末的话滚动至周五
                let weekDay=new Date().getDay()==0 || new Date().getDay()== 6 ?5:new Date().getDay();
                let todayClassStr = '.date-item.'+this.weekTextMap[weekDay];
                let leftValue = $(todayClassStr).offset().left-50;
                if(leftValue>10){
                    $('.invite-detail-table-range-list').scrollLeft(leftValue);
                }
                this.$nextTick(()=>{
                    let winHeight = window.screen.height;
                    let thirdRangeTop = document.querySelector(".third-range").offsetTop;
                    if(thirdRangeTop+thirdHeight+53<winHeight){
                        $('.third-range').css('height','250px !important');
                        $('#2').find('.list-data-div').css('height','250px !important');
                    }
                    this.resetFilterTopFun();
                });
            },
            hideTipsFun:function(){
                this.showTipsStatus = false;
                this.$nextTick(()=>{
                    this.resetFilterTopFun();
                });
            },
            chooseTypeDetailFun:function(type){
                this.inviteTypeList.forEach((ele,index)=>{
                    ele.active = false;
                    if(ele.type == type){
                        ele.active = true;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import url("../commonLess/border.less");
    @import url("../commonLess/util.less");
    @bordercolor:#ebebeb;
    .invite-section{
        font-size: 1.2rem;
        background: #f0f0f0f;
        padding-bottom: 6.6rem;
    }
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
    .type-summary-div{
        text-align: center;
        padding:1.5rem;
        background: #fff;

        .summary-tag{
            vertical-align: top;
            background: #FFFFFF;
            .borderline(#e1e1e1);
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
            margin-right: 1.5rem;
            &:last-child{
                margin-right: 0;
            }
            .tag-title{
                line-height: 3rem;
                font-family: PingFangSC-Regular;
                font-size: 1.4rem;
                color: #333333;
                &.banquet{
                    background: #FFF3F7;
                }
                &.shop{
                    background: #FFF3E6;
                }
                &.wed{
                    background: #E9F7FF;
                }
                &.dress{
                    background: #F6F6FF;
                }
                &.pay{
                    background: #EBFFF6;
                }
            }
            .tag-content{
                padding: 1rem;
                height: 7.1rem;
                .number-item{
                    margin-bottom: 1rem;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    div{
                        vertical-align: top;
                        &.label-div{
                            text-align: left;
                            font-size: 1.2rem;
                            color: #999999;
                        }
                        &.value-div{
                            text-align: right;
                            font-size: 1.2rem;
                            color: #333;
                        }
                    }
                }
            }
        }
    }
    .one-line-div{
        font-size: 0;
        padding: 1.5rem;
        text-align: center;
        background: #fff;
        .one-line-tag-div{
            .borderline(#e1e1e1,right);
            &:last-child:after{
                border:none;
            }
            &:after{
                height: 168%;
                top: .2rem;
            }
            .one-line-title{
                font-size: 1.2rem;
                color: #999999;
                margin-bottom: 1.5rem;
                line-height: 1.2rem;
                height: 1.2rem;
            }
            .one-line-value{
                font-size: 1.8rem;
                color: #333333;
                line-height: 1.8rem;
                height: 1.8rem;
            }
        }
    }
    .more-line-div{
        overflow-y: hidden;
        border-spacing: 1.5rem;
        padding: 0;
        -webkit-overflow-scrolling: touch;
        .summary-tag{
            display: table-cell;
            position: relative;
            .tag-title{
                width: 10rem;
            }
        }
    }
    .report-table-div{
        line-height: 4.5rem;
        padding-left: 1.5rem;
        background: #fff;
        margin-bottom: 1.5rem;
        position: relative;
        .borderline(#e1e1e1,top);
        font-size: 1.5rem;
        color: #111111;
        .right-arrow{
            position: absolute;
            top: 1.5rem;
            right: 1rem;
            width: .8rem;
            height: 1.3rem;
        }
    }
    .invite-result-div{
        position: relative;
        background: #fff;
        .title-date-div{
            position: relative;
            z-index: 11;
            &.scroll-y{
                position: fixed;
            }
        }
        .date-item{
            display: table-cell;
            min-width: 11.7rem;
            text-align: center;
            height: 5rem;
            position: relative;
            border-bottom: 1px solid #E1E1E1;
            .border-left-div{
                height: 3rem;
                background-color: #ccc;
                width: .1rem;
                position: absolute;
                left: .5rem;
                top: 1rem;
            }
            p{
                top: 1rem;
                position: relative;
            }
            .date-item-date-text{
                font-size: 1.2rem;
                color: #999;
            }
            .date-item-week-text{
                font-size: 1.4rem;
                color: #333;
            }
        }
        .null-div{
            width: 5rem;
        }
    }

    .left-time-range-div{
        text-align: center;
        width: 5rem;
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: #f8f8f8;
        z-index: 12;
        padding-top: 5rem;
        // .borderline(#e1e1e1,right);
        border-right: solid 1px #e1e1e1;
        font-size: 1.2rem;
        color: #333333;
        letter-spacing: 0;
        .left-time-range-item{
            position: relative;
            // .borderline(#e1e1e1,top);
            border-top: solid .1rem #e1e1e1;
            line-height: 2.3rem;
            min-height: 10rem;
            span{
                position: relative;
                top: 50%;
            }
        }
    }

    .invite-detail-table-range-item{
        // .borderline(#e1e1e1,bottom);
        border-bottom: solid .1rem #e1e1e1;
        min-height: 10rem;
        width: 82rem;
        .list-data-div{
            display: table-cell;
            font-size: 1.2rem;
            height: 10rem;
            vertical-align: top;
        }
        .list-data-div{
            // .borderline(#e1e1e1,right);
            border-right: solid .1rem #e1e1e1;
            min-width: 11.6rem;
            &:last-child{
                border-right:none;
            }
            .invite-item{
                background-color: #fff;
                color: #828183;
                position: relative;
                font-size: 0;
                color: #777777;
                height: 10rem;
                &:last-child{
                    .item-date-div{
                        border-bottom: none;
                    }
                }
                .border-left-div-3{
                    width: .3rem;
                    position: absolute;
                    top: 0;
                    bottom: 0rem;
                    background:@mainColor;
                    display: inline-block;
                    vertical-align: top;
                }
                .item-date-div{
                    vertical-align: top;
                    display: inline-block;
                    padding: 1rem;
                    padding-left: 0;
                    padding-right: 0;
                    border-bottom: solid .1rem #e1e1e1;
                    font-size: 1.1rem;
                    p{
                        margin-left: 1rem;
                    }
                    position: absolute;
                    left:.3rem;
                    right:0;
                    top: 0;
                    bottom:0rem;
                }
                p{
                    line-height: 1.1rem;
                    margin-bottom: .5rem;
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
                .event-title-p{
                    font-family: PingFangSC-Medium;
                    font-size: 1.2rem;
                    color: #333333;
                    line-height: 1.2rem;
                    margin-bottom: 1rem;
                }
                &:last-child{
                    border-right:none;
                }
                &.invite-type{
                    .border-left-div-3{
                        background-color: @mainColor;
                        border-bottom: solid .1rem @mainColor;
                    }
                    .item-date-div{
                        background-color: #FFF3F7;
                    }
                }
                &.pay-type{
                    .border-left-div-3{
                        background: #11D1B1;
                        border-bottom: solid .1rem #11D1B1;
                    }
                    .item-date-div{
                        background-color: #EBFFF6;
                    }
                }
                &.wed-type{
                    .border-left-div-3{
                        background: #3DBBFF;
                        border-bottom: solid .1rem #3DBBFF;
                    }
                    .item-date-div{
                        background-color: #E9F7FF;
                    }
                }
                &.shop-type{
                    .border-left-div-3{
                        background: #FFB866;
                        border-bottom: solid .1rem #FFB866;
                    }
                    .item-date-div{
                        background-color: #FFF3E6;
                    }
                    .status-div.visit-shop{
                        background: #FFB866;
                    }
                }
                &.dress-type{
                    .border-left-div-3{
                        background: #827FFF;
                        border-bottom: solid .1rem #827FFF;
                    }
                    .item-date-div{
                        background-color: #F6F6FF;
                    }
                    .status-div.visit-shop{
                        background: #827FFF;
                    }
                }
                .status-div{
                    position: absolute;
                    right: .5rem;
                    top: 1rem;
                    color: #fff;
                    width:3.4rem;
                    line-height: 1.2rem;
                    text-align: center;
                    border-radius: .2rem;
                    font-size: 1rem;
                    &.visit-shop{
                        background-color: #FF66A1;
                    }
                    &.visit-canceled{
                        background: #FE3824;
                    }
                    &.has-pay{
                        background-color: #11D1B1;
                    }
                    &.wed-visit-shop{
                        background-color: #3DBBFF;
                    }
                }
            }
        }
    }

    .invite-filter-div{
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        padding-top: 1.2rem;
        padding-bottom: 1.4rem;
        background: #fff;
        z-index: 13;
        .borderline(#d7d7d7,bottom);
        // border-bottom: solid .1rem #ececec;
        position: relative;
        &.is-fixed,&.top-locate{
            position: fixed;
        }
        .invite-filter{
            width: 0;
            border-right: solid .1rem #e1e1e1;
            position: relative;
            height: 1.4rem;
            line-height: 1.4rem;
            text-align: left;
            &:last-child{
                border-right: none;
            }
            .value-div{
                display: inline-block;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: 65%;
                color: #333;
                font-size: 1.4rem;
                max-width: 5.6rem;
                margin-left: 1.2rem;
                &.text-clip{
                    width: 30%;
                    padding-right: 0;
                    margin-left: .4rem;
                    text-overflow: clip;
                }
                &.show-status{
                    color: @mainColor;
                }
                &.only-one{
                    text-align: center;
                }
            }
            .mul-span-info{
                position: absolute;
                right: 2.4rem;
                font-size: 1.4rem;
                color: #333;
                &.show-status{
                    color: @mainColor;
                }
            }
            .down-tri{
                background:url('./img/filter-default-arrow.png');
                position: absolute;
                right: 1.2rem;
                top: .4rem;
                width: 1rem;
                height: .6rem;
                background-size: cover;
            }
            .up-tri{
                background:url('./img/filter-active-arrow.png');
                position: absolute;
                right: 1.2rem;
                top: .4rem;
                width: 1rem;
                height: .6rem;
                background-size: cover;
            }
        }
    }

    .invite-detail-table-range-list{
        padding-left: 5.1rem;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
    }
    .week-summary{
        position: fixed;
        top: 5rem;
        width: 5.2rem;
        background-color: #ececec;
        z-index: 12;
        height: 3.5rem;
        padding-top: 1rem;
        padding-bottom: .5rem;
        left: -0.2rem;
        span{
            position: relative;
            top: .6rem;
            left: .5rem;
            border: @mainColor;
            color: @mainColor;
            border:solid .1rem @mainColor;
            border-radius:.5rem;
            background-color: #fff;
            padding:.5rem .3rem;
        }
    }

    .select-search-section{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 12;
    }
    .invite-section .select-search-section .select-search-div {
        top: 4rem !important;
        z-index: 13;
    }

    //邀约日历筛选页面
    .invite-section{
        .normal-recommand-section{
            border-top:solid .1rem #e1e1e1;
            top: 5rem !important;
            .mask-div{
                top: 5.2rem !important;
            }
            .bottom-div{
                padding-top: 3rem;
            }
        }
        .select-search-section .select-search-div{
            top: 5rem;
            z-index: 13;
        }
        .select-search-section .mask-div{
            z-index: 13;
        }
    }

    .invite-detail-section{
        .invite-filter-div{
            .mask-div{
                top: 0 !important;
            }
            .filter-div .filter-content .main{
                top: 4.5rem;
            }
            .filter-div .filter .filter-text{
                max-width: initial;
            }
            .filter-div{
                position: fixed !important;
                top: 0;
            }
        }
    }
    .select-search-section .v-select input[type=search], .select-search-section .v-select input[type=search]:focus{
        // margin-bottom: 1rem;
    }
    .over-lay{
        position: fixed;
        top: 0;
        left:0;
        right: 0;
        bottom: 0;
        background-color: #000;
        opacity: 0.6;
        z-index: 12;
    }
    .v-calendar{
        position:fixed;
        bottom: 0;
        left:0;
        width:100%;
        background:#fff;
        .v-calendar--title{
            height:3.2rem;
            padding-top: .7rem;
            padding-bottom: .6rem;
            border-bottom:.1rem solid #d7d7d7;
            font-size:1.6rem;
            box-shadow: 0 .2rem .1rem rgba(204, 202, 200, 0.2);
            position:relative;
            background:#fff;
            z-index:1;
        }
        .v-calendar--title-back{
            display:block;
            width:3.5rem;
            position:relative;
            position:absolute;
            left:1.5rem;
            height:100%;
            top:0;
            z-index:10;
            &:after{
                content:"";
                display:block;
                position:absolute;
                left:0;
                top:50%;
                background-size:.8rem 1.4rem;
                -webkit-transform:translateY(-50%) rotate(135deg);
                transform:translateY(-50%) rotate(135deg);
                width:.8rem;
                height:.8rem;
                border:none;
                border-bottom:.2rem solid #f63;
                border-right:.2rem solid #f63;
            }
        }
        .v-calendar--title-btn{
            position:absolute;
            right:1.5rem;
            color:#f63;
            display:block;
            text-align:right;
            height:100%;
            top:0;
        }
        .v-calendar--title-content{
            display:block;
            text-align:center;
            font-weight:400;
            line-height:2rem;
            width:100%;
            position:absolute;
            left:0;
            top:1.5rem;
            font-size: 1.4rem;
        }
        .v-calendar--header{
            height:2.5rem;
            line-height:2.5rem;
            background:#ffffff;
            color:#333;position:
            relative;
            z-index:10003;
            .borderline(#e1e1e1,bottom);
        }
        .v-calendar--header-wrapper{
            display:-webkit-box;
            display:flex;
        }
        .v-calendar--header-item{
            display:block;
            -webkit-box-flex:1;
            flex:1;
            text-align:center;
            font-size: 1.2rem;
            color: #777777;
        }
        .v-calendar--date{
            position:relative;
            width:100%;
            left:0;
            top:0;
            height: 40rem;
            overflow-y:scroll;
            -webkit-overflow-scrolling:touch;
            &.no-scroll{
                overflow: hidden;
                position: fixed;
                height: 100%;
                width: 100%;
            }
        }
        .v-calendar--date-month{
            height:4.4rem;
            line-height:4.4rem;
            text-align:center;
            font-size: 1.5rem;
            color: #333;
            position: relative;
            .pre-month-span{
                position: absolute;
                left: 1rem;
                top: 1rem;
                -webkit-transform: rotate(180deg);
                width: 2rem;
            }
            .next-month-span{
                position: absolute;
                right: 1rem;
                top: 1rem;
                width: 2rem;
            }
        }
        .v-calendar--date-day-group{
            overflow:hidden;
            padding-left: 0;
            border-bottom: solid 1px #ebebeb;
            &:last-child{
                padding-bottom: 0;
            }
        }
        .v-calendar--date-day-wrapper{
            width:14.285%;
            float:left;
            text-align:center;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            border-top: 0.1rem solid #ebebeb;
            border-right: 0.1rem solid #ebebeb;
            &.is-active{
                background:@mainColor;
                color:#fff;
                &.start .back-color{
                    position: absolute;
                    left: 50%;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-color: #a3569e;
                    z-index: 10000;
                }
                &.start{
                    &:nth-child(7n) .back-color{
                        display: none;
                    }
                }
                .v-calendar--date-item{
                    z-index: 10001;
                    background-color: @mainColor;
                }
                &.end .back-color{
                    position: absolute;
                    left: 0%;
                    right: 50%;
                    top: 0;
                    bottom: 0;
                    background-color: #a3569e;
                    z-index: 10000;
                }
                &.end{
                    &:nth-child(7n+1) .back-color{
                        display: none;
                    }
                }
            }
            &.is-select{
                background: #FFEFF5;
                font-size: 1.5rem;
                color: #FF66A1;
            }
        }
        .v-calendar--date-item{
            position: relative;
            font-size: 1.5rem;
            &.tag{
                line-height: 2.5rem;
                font-size: 1rem;
            }
        }

        .v-calendar {
            &.transition {
                transition: all .2s ease-in-out;
                transform: translate3d(0, 0, 0);
            }

            &.enter, &.leave {
                transform: translate3d(100%, 0, 0);
            }
        }
        .choos-date-way{
            display: box;
            display: -webkit-box;
            display: -ms-flexbox;
            text-align: center;
            background: white;
            z-index: 10;
            position: relative;
            padding-top: 1.2rem;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-bottom: .8rem;
            background-color: white;
            z-index: 10003;
            .choose-way{
                display: block;
                -webkit-box-flex: 1;
                box-flex: 1;
                -ms-box-flex: 1;
                -ms-flex: 1;
                width: 50%;
                height: 4.2rem;
                border:solid .1rem @mainColor;
                border-radius: .5rem;
                color:#111111;
                position: relative;
                &:last-child{
                    margin-left: 1rem;
                }
                &.active{
                    border:none;
                    background-color: @mainColor;
                    color:#fff;
                    height: 4.4rem;
                    .way-title{
                        color: #fff;
                    }
                    .way-date{
                            display: none;
                    }
                    i{
                        width: 2.1rem;
                        height: 2.1rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                        // background: url('./img/choose-way-active.png') no-repeat top left;
                        background-size: contain;
                    }
                    &.active-text{
                        .way-title{
                            font-size: 1.4rem;
                            margin-top: .5rem;
                            color:#fff;
                        }
                        .way-date{
                            display: inherit;
                            font-size: 1rem;
                        }
                    }
                }
                .way-title{
                    font-size: 1.6rem;
                    margin-top: 1.1rem;
                    line-height: 2.2rem;
                    color: @mainColor;
                }
            }
        }

        .v-calendar--title-content{
            display:inline-block;
            text-align:center;
            font-weight:400;
            line-height:2rem;
            position:relative;
            top:-.7rem;
            font-size: 1.6rem;
            width: inherit;
            background-color: #f0f0f0;
            padding-left: 1.1rem;
            padding-right: .8rem;
            border-radius: .4rem;
            padding-bottom: .5rem;
            padding-top: .5rem;
            color: #777;
            i{
                width: 2rem;
                height: 2.1rem;
                // background: url('./img/calendar-title-icon.png') no-repeat top left;
                background-size: contain;
                display: inline-block;
                vertical-align: bottom;
            }
            span{
                padding-left: .6rem;
                margin-left: .8rem;
                .borderline(#d7d7d7,left);
            }
        }

        .over-lay{
            position: fixed;
            top: 0;
            left:0;
            right: 0;
            bottom: 0;
            background-color: #000;
            opacity: 0.6;
            z-index: 13;
        }

        header{
            position: relative;
            height: 4.4rem;
            line-height: 4.4rem;
            text-align: center;
            background-color: #FCFCFC;
            z-index: 100;
            color: #686868;
            font-size: 1.5rem;
            border-bottom: solid .1rem #e1e1e1;
            &.normal{
                background-color: #fcfcfc;
                z-index: 100002;
            }
            .btn-save{
                position: absolute;
                right: 0;
                top: 0;
                width: 4.4rem;
                height: 4.4rem;
                color: @mainColor;
            }
            .btn-back {
                position: absolute;
                left: 0;
                top: 0;
                color: @mainColor;
                width: 4.4rem;
                height: 4.4rem;
                &:after {
                  content: '';
                  position: absolute;
                  left: 1.6rem;
                  top: 1.2rem;
                  width: 1.1rem;
                  height: 2rem;
                  background-size: 4.1rem auto;
                }
              }
              h1{
                padding: 0 8.8rem;
                font-size: 1.8rem;
                font-weight: normal;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
        }
    }
    .choose-type-section{
        position: fixed;
        top: 4rem;
        left: 0;
        right: 0;
        z-index: 12;
        .mask-div{
            z-index: 13;
        }
        .select-div{
            position: relative;
            z-index: 13;
            background: #fff;
            .type-item{
                text-align: left;
                line-height: 4.5rem;
                margin-left: 1.5rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: 1.5rem;
                color: #333333;
                .borderline(#e1e1e1,bottom);
                &.active{
                    background-image: url('./img/active-pink.png') !important;
                    background-position: 97% 50%;
                    background-repeat: no-repeat;
                    background-size: 1.1rem 1.1rem;
                }
            }
        }
    }
    .invite-result-div.three-line{
        .invite-detail-table-range-item{
            min-height: 9rem;
        }
        .list-data-div{
            height: 9rem;
        }
        .left-time-range-item{
            min-height: 9rem;
        }
        .invite-item{
            height: 9rem;
        }

    }

    .invite-section.is-android{
        .status-div{
            padding-top: .2rem;
        }
    }
    .invite-detail-table.padding-fix{
        padding-top: 4rem;
        .left-time-range-div{
            padding-top: 9rem;
        }
    }
    .invite-user-name{
        display: inline-block;
        vertical-align: middle;
        margin-left: 1rem;
        margin-bottom: 0 !important;
        max-width: 5.5rem !important;
    }
    .tips-info-div{
        position: relative;
        line-height: 3.8rem;
        background: #FFF3DB;
        font-size: 1.4rem;
        font-family: PingFangSC-Regular;
        color: #E58F1F;
        .borderline(#F3D08C,bottom);
        .tips-span{
            margin-left: 1.5rem;
        }
        .close-tips{
            position: absolute;
            width: 1.3rem;
            height: 1.3rem;
            background-repeat: no-repeat;
            background-size: cover;
            right: 1.5rem;
            top: 1.2rem;
        }
    }
</style>