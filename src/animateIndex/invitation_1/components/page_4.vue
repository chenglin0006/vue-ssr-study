<template>
    <div class="page page-4">
        <!-- 叶子 -->
        <i class="yezi-1 ani-yezi-2 lf-1"></i>
        <i class="yezi-1 ani-yezi-3 lf-2"></i>
        <i class="yezi-2 ani-yezi-4"></i>
        <i class="yezi-4 ani-yezi-1"></i>
        <i class="yezis-bg ani-yezi-5"></i>
        <!-- 花簇 -->
        <i class="huacu ani-huacu rt"></i>
        <!-- 花 -->
        <i class="hua ani-hua top-lf"></i>
        <i class="hua ani-hua top-mid"></i>
        <i class="hua ani-hua top-rt"></i>
        <i class="hua ani-hua btm-lf"></i>
        <i class="hua ani-hua btm-mid"></i>
        <i class="hua ani-hua btm-rt"></i>

        <div class="img-wrap">
            <div class="inner">
                <!-- 背景框 -->
                <img class="img bg" src="../assets/img/big_bg_t1.png" alt="">
                <!-- 照片 -->
                <div class="wrap-0">
                    <div class="wrap-1 photo" style="background-image: url('//www.dpfile.com/app/app-wed-wedding-invitation/static/invi_2.jpg?3c3633a633154f05089958170b8f0a43');">
                    </div>
                </div>
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
                targets: '.page-4 .ani-yezi-1',
                offset: 200
            }))
            .add(getObj({
                targets: '.page-4 .ani-yezi-2',
                offset: 400
            }))
            .add(getObj({
                targets: '.page-4 .ani-yezi-3',
                offset: 600
            }))
            .add(getObj({
                targets: '.page-4 .ani-yezi-4',
                offset: 800
            }))
            .add(getObj({
                targets: '.page-4 .ani-yezi-5',
                offset: 1000
            }))
            .add(getObj({
                targets: '.page-4 .ani-hua',
                scale: [0, 1],
                offset: 1400
            }))
            .add(getObj({
                targets: '.page-4 .ani-huacu',
                offset: 2500
            }));
        }
    },
    components: {
    }
}
</script>
