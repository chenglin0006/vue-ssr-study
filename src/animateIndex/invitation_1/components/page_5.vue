<template>
    <div class="page page-5">
        <div class="content">
            <!-- 叶子 -->
            <i class="yezi-1 ani-yezi top-lf"></i>
            <i class="yezi-1 ani-yezi btm-rt"></i>
            <i class="yezi-4 ani-yezi top-lf"></i>
            <i class="yezi-4 ani-yezi btm-rt"></i>
            <!-- 花 -->
            <i class="hua ani-hua top-lf"></i>
            <i class="hua ani-hua top-rt"></i>
            <i class="hua ani-hua btm-lf"></i>
            <i class="hua ani-hua btm-rt"></i>
            <!-- 花簇 -->
            <i class="huacu ani-huacu"></i>
            <!-- 背景 -->
            <img class="img bg" src="../assets/img/big_bg_t2.png" alt="">
            <div class="wrap-0 photo" style="background-image: url('//www.dpfile.com/app/app-wed-wedding-invitation/static/invi_1.jpg?7e88082d24e5854467f0b4e8a15eadfc');">
            </div>
        </div>
    </div>
</template>

<script>
import anime from 'animejs';
export default {
    data () {
        return {
            photoWidth: 0
        };
    },
    props: ['data', 'pageIndex'],
    mounted () {
        this.animationEls();
    },
    methods: {
        animationEls() {
            let timeline = anime.timeline();
            let comAni = {
                opacity: [0, 1],
                easing: 'easeInOutQuad',
                duration: '1500',
            };
            let getObj = (config) => Object.assign(config, comAni);

            timeline
            .add(getObj({
                targets: '.page-5 .ani-yezi',
                offset: 200
            }))
            .add(getObj({
                targets: '.page-5 .ani-hua',
                scale: [0, 1],
                offset: 600
            }))
            .add(getObj({
                targets: '.page-5 .ani-huacu',
                // scale: [0, 1],
                offset: 2000
            }))
        }
    },
    components: {
    }
}
</script>
