<template>
<section>
    <div class="page page-index">
        <div class="content">
            <!-- 果实 -->
            <i class="guoshi ani-guoshi lf-1"></i>
            <i class="guoshi ani-guoshi rf-1"></i>
            <!-- 花簇 -->
            <i class="huacu ani-huacu lf-1"></i>
            <i class="huacu ani-huacu lf-2"></i>
            <i class="huacu ani-huacu rf-1"></i>
            <i class="huacu ani-huacu rf-2"></i>
            <!-- 叶子 -->
            <i class="yezi-1 ani-yezi"></i>
            <i class="yezi-2 ani-yezi lf-1"></i>
            <i class="yezi-2 ani-yezi rf-1"></i>
            <i class="yezi-2 ani-yezi rf-2"></i>
            <i class="yezi-3 ani-yezi"></i>
            <!-- 鸟 -->
            <i class="bird ani-bird"></i>
            <!-- 主背景 -->
            <img class="img" src="//www.dpfile.com/app/app-wed-wedding-invitation/static/big_bg_index.png?6315b63accf293104888df289791fe0b" alt="">
            <!-- 中间内容 -->
            <div class="inner">
                <div class="photo ani-photo" style="background-image: url('//www.dpfile.com/app/app-wed-wedding-invitation/static/invi_4.jpg?356d7836818d5b8b477aa845f7e3c85c'); transform: scale(1);">
                    <cust-edit-btn-cpt name="0.p0" type="img"></cust-edit-btn-cpt>
                </div>
                <div class="edit-box">
                    <div class="name-wrap">
                        <span class="name">
                            小明
                        </span>
                        <span class="name">
                            小芳
                        </span>
                    </div>
                    <div class="date-time-wrap">
                        <div class="date" v-text="'2017-10-01'"></div>
                        <!-- <div class="date" v-text="data.attributes.weddingTime.split(/\s/)[0]"></div>
                        <div class="time" v-text="data.attributes.weddingTime.split(/\s/)[1]"></div> -->
                        <!-- <cust-edit-btn-cpt name="weddingTime" type="time"></cust-edit-btn-cpt> -->
                    </div>
                    <div class="text">
                        宴址：长宁区安化路
                        <!-- <cust-edit-btn-cpt name="wedHotel"></cust-edit-btn-cpt> -->
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>
</template>
<script>
import anime from 'animejs';
export default {
    data() {
        return {
            
        };
    },
    props: [],
    mounted() {
        this.animationEls();
    },
    methods: {
        animationEls() {
            let timeline = anime.timeline();
            let comAni = {
                opacity: [0, 1],
                easing: 'easeInOutQuad',
                duration: '2000',
            };
            let getObj = (config) => Object.assign(config, comAni);
            let birdTime = 150;
            timeline
            .add({
                targets: '.page-index .ani-photo',
                scale: [0, 1],
                easing: 'easeInOutQuad',
                duration: '1000'
            })
            .add(getObj({
                targets: '.page-index .ani-guoshi',
                offset: 500
            }))
            .add(getObj({
                targets: '.page-index .ani-huacu',
                offset: 500
            }))
            .add(getObj({
                targets: '.page-index .ani-yezi',
                offset: 500
            }))
            .add({
                targets: '.page-index .ani-bird',
                easing: 'easeInOutQuad',
                translateX: [
                    {value: -4, duration: birdTime},
                    {value: '-=2', duration: birdTime},
                    {value: '-=2', duration: birdTime / 2},
                    {value: '-=2', duration: birdTime / 2},
                    {value: '-=4', duration: birdTime, delay: 500},
                    {value: '-=2', duration: birdTime},
                    {value: '-=2', duration: birdTime / 2},
                    {value: '-=2', duration: birdTime / 2}
                ],
                translateY: [
                    {value: -8, duration: birdTime},
                    {value: 0, duration: birdTime},
                    {value: -4, duration: birdTime / 2},
                    {value: 0, duration: birdTime / 2},
                    {value: -8, duration: birdTime, delay: 500},
                    {value: 0, duration: birdTime},
                    {value: -4, duration: birdTime / 2},
                    {value: 0, duration: birdTime / 2},
                ]
            })
        }
    },
    components: {


    }
}
</script>