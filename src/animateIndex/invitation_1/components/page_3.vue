<template>
    <div class="page page-3">
        <!-- 叶子 -->
        <i class="yezi-1 lf-1 ani-yezi-2"></i>
        <i class="yezi-1 lf-2 ani-yezi-3"></i>
        <i class="yezi-2 ani-yezi-4"></i>
        <i class="yezi-4 ani-yezi-1"></i>
        <!-- 花簇 -->
        <i class="huacu lf ani-huacu"></i>
        <i class="huacu rt ani-huacu"></i>
        <!-- 花 -->
        <i class="hua lf  ani-hua"></i>
        <i class="hua mid ani-hua"></i>
        <i class="hua rt  ani-hua"></i>

        <div class="img-wrap">
            <div class="inner">
                <!-- 背景框 -->
                <img class="img bg" src="../assets/img/big_bg_t1.png" alt="">
                <!-- 照片 -->
                <div class="wrap-0">
                    <div class="wrap-1 photo" style="background-image: url('//www.dpfile.com/app/app-wed-wedding-invitation/static/invi_3.jpg?cdfb524e070637db43c8b869130e33c0');">
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
                targets: '.page-3 .ani-yezi-1',
                offset: 200
            }))
            .add(getObj({
                targets: '.page-3 .ani-yezi-2',
                offset: 400
            }))
            .add(getObj({
                targets: '.page-3 .ani-yezi-3',
                offset: 600
            }))
            .add(getObj({
                targets: '.page-3 .ani-yezi-4',
                offset: 800
            }))
            .add(getObj({
                targets: '.page-3 .ani-hua',
                scale: [0, 1],
                offset: 1200
            }))
            .add(getObj({
                targets: '.page-3 .ani-huacu',
                opacity: [0, 1],
                offset: 1200
            }));
        },
        checkImgLoaded() {
            let tID = setInterval(() => {
                let _photo = this.$refs.p1_photo;

                if (_photo && _photo.complete) {
                    this.photoWidth = _photo.clientWidth;
                    clearInterval(tID);
                }
            }, 500);
        },
        setImgCenter(e) {
            let el = e.path[0];

            this.photoWidth = el.clientWidth;

            clearInterval(this.tID);
        }
    },
    components: {
    }
}
</script>
