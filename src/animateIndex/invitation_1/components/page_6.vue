<template>
    <div class="page page-6">
        <!-- 花簇 -->
        <i class="huacu-1 ani-huacu top"></i>
        <i class="huacu-1 ani-huacu btm"></i>
        <i class="huacu-2 ani-huacu top"></i>
        <i class="huacu-2 ani-huacu btm"></i>
       
        <div class="img-wrap img-wrap-lf ani-photo-1">
            <div class="inner">
                <!-- 背景框 -->
                <img class="img" src="../assets/img/big_bg_t1.png" alt="">
                <!-- 照片 -->
                <div class="wrap-0">
                    <div class="wrap-1 photo" style="background-image: url('//www.dpfile.com/app/app-wed-wedding-invitation/static/invi_5.jpg?f86d4d9f0a4471065f7304de99b987b8');">
                    </div>
                </div>
            </div>
        </div>
        <div class="img-wrap img-wrap-rt ani-photo-2">
            <div class="inner">
                <!-- 背景框 -->
                <img class="img" src="../assets/img/big_bg_t1.png" alt="">
                <!-- 照片 -->
                <div class="wrap-0">
                    <div class="wrap-1 photo" style="background-image: url('//www.dpfile.com/app/app-wed-wedding-invitation/static/invi_6.jpg?c5622f7ec3cac2dd54bd9df2596332b3');">
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
                targets: '.page-6 .ani-photo-1',
                translateX: [-window.innerWidth, 0],
                offset: 200
            }))
            .add(getObj({
                targets: '.page-6 .ani-photo-2',
                translateX: [window.innerWidth, 0],
                offset: 200
            }))
            .add(getObj({
                targets: '.page-6 .ani-huacu'
            }))
        }
    },
    components: {
    }
}
</script>
