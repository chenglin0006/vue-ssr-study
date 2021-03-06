"use strict";

// Vue和Vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHotelDetailIndex from '../hotelIndex/AppHotelDetailIndex.vue';
import AppHotelDetailDiscountIndex from '../hotelIndex/AppHotelDetailDiscountIndex.vue'
import AppHotelDetailRecommandIndex from '../hotelIndex/AppHotelDetailRecommandIndex.vue'
import AppHotelDetailServiceFeeIndex from '../hotelIndex/AppHotelDetailServiceFeeIndex.vue'
import AppHotelDetailMenuDetailIndex from '../hotelIndex/AppHotelDetailMenuDetailIndex.vue'
import AppHotelDetailCooperateIndex from '../hotelIndex/AppHotelDetailCooperateIndex.vue'
import AppHotelDetailOperateIndex from '../hotelIndex/AppHotelDetailOperateIndex.vue'
import AppHotelDetailHallIndex from '../hotelIndex/AppHotelDetailHallIndex.vue'
import AppHotelDetailPicIndex from '../hotelIndex/AppHotelDetailPicIndex.vue'
import AppAnimateIndex1 from '../animateIndex/invitation_1/app.vue'
import AppAnimateIndex2 from '../animateIndex/invitation_2/app.vue'
import AppAnimateBarrage from '../animateIndex/barrage/app.vue'
// 使用vue-router
Vue.use(VueRouter);

const Invite = () => import('../inviteIndex/AppInvite.vue')
const Hotel = () => import('../hotelIndex/AppHotel.vue')
const HotelDetail = () => import('../hotelIndex/AppHotelDetail.vue')
const Animate =() => import('../animateIndex/AppAnimateIndex.vue')

// 路由映射
const routers = [{
    path: '/',
    name: 'corepage',
    meta: {title: "首页",showBottom:true,tab:'own'},
    component: require('../container/corepage.vue')
}, {
    path: '/animate',
    name: 'animate',
    component: Animate,
    meta:{title:"动画",showBottom:true,tab:'animate'},
    children:[
        {path:'index1',name:'index1',component:AppAnimateIndex1,meta:{title:'动画1',showBottom:false}},
        {path:'index2',name:'index2',component:AppAnimateIndex2,meta:{title:'动画2',showBottom:false}},
        {path:'barrage',name:'barrage',component:AppAnimateBarrage,meta:{title:'弹幕效果',showBottom:false}}
    ]
}, {
    path: '/invite',
    name: 'invite',
    component: Invite,
    meta:{title:"邀约详情",showBottom:true,tab:'invite'}
}, {
    path: '/hotel',
    name: 'hotel',
    component: Hotel,
    meta:{title:"酒店列表",showBottom:true,tab:'hotel'}
}, {
    path: '/hotelDetail',
    component: HotelDetail,
    meta:{title:"酒店详情",showBottom:false},
    children:[
        {path:'/',name:'hotelDetail',component:AppHotelDetailIndex,meta:{title:'酒店详情',showBottom:false}},
        {path:'hall',name:'hall',component:AppHotelDetailHallIndex,meta:{title:'宴会厅详情',showBottom:false}},
        {path:'discount',name:'discount',component:AppHotelDetailDiscountIndex,meta:{title:'优惠详情',showBottom:false}},
        {path:'recommand',name:'recommand',component:AppHotelDetailRecommandIndex,meta:{title:'推荐信息',showBottom:false}},
        {path:'fee',name:'fee',component:AppHotelDetailServiceFeeIndex,meta:{title:'收费及服务',showBottom:false}},
        {path:'menu',name:'menu',component:AppHotelDetailMenuDetailIndex,meta:{title:'菜单详情',showBottom:false}},
        {path:'cooperate',name:'cooperate',component:AppHotelDetailCooperateIndex,meta:{title:'合作详情',showBottom:false}},
        {path:'operate',name:'operate',component:AppHotelDetailOperateIndex,meta:{title:'运营状况',showBottom:false}},
        {path:'pic',name:'pic',component:AppHotelDetailPicIndex,meta:{title:'图片详情',showBottom:false}}
    ]
}, {
    path: '/routerpage3',
    component: require('../container/routerpage3entry.vue'),
    children: [{
        path: '/',
        name: 'routerpage3',
        meta: {title: "路由页面3"},
        component: require('../container/routerpage3.vue')
    }, {
        path: 'nestedrouter1',
        name: 'nestedrouter1',
        meta: {title: "嵌套路由1"},
        component: require('../container/nestedrouter1.vue') 
    }, {
        path: 'nestedrouter2',
        name: 'nestedrouter2',
        meta: {title: "嵌套路由2"},
        component: require('../container/nestedrouter2.vue') 
    }]
}];

/**
 * router工厂函数
 * 
 * @export
 * @returns router实例
 */
export function createRouter(){
    // VueRouter实例
    const router = new VueRouter({
        mode: 'history',
        routes: routers
    });
    // // 路由全局钩子
    // router.afterEach(route => {
    //     // 设置每个路由页面的title
    //     if(route.meta.title){
    //         document.title = route.meta.title;
	//     }
    // });
    return router;
}
