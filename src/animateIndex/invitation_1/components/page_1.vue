<template>
    <div class="page page-1">
        <i class="huacu top-lt ani-huacu"></i>
        <i class="huacu btm-rt ani-huacu"></i>

        <div class="img-wrap ani-photo">
            <div class="inner">
                <!-- 背景框 -->
                <img class="img bg" src="../assets/img/big_bg_t1.png" alt="">
                <!-- 照片 -->
                <div class="wrap-0">
                    <div class="wrap-1 photo" style="background-image: url('//www.dpfile.com/app/app-wed-wedding-invitation/static/invi_1.jpg?7e88082d24e5854467f0b4e8a15eadfc');">
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
                duration: '2000',
            };
            let getObj = (config) => Object.assign(config, comAni);

            timeline
            .add(getObj({
                targets: '.page-1 .ani-huacu',
                offset: 0
            }))
            .add(getObj({
                targets: '.page-1 .ani-photo',
                translateX: [-window.innerWidth, 0],
                translateY: ['-50%', '-50%'],
                offset: 0
            }));
        }
    },
    components: {
    }
}
</script>
