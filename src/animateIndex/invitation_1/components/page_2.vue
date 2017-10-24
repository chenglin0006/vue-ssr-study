<template>
    <div class="page page-2">
        <div class="content">
            <!-- 叶子 -->
            <i class="yezi-1 ani-yezi"></i>
            <i class="yezi-2 ani-yezi lf-1"></i>
            <i class="yezi-2 ani-yezi rt-1"></i>
            <i class="yezi-2 ani-yezi rt-2"></i>
            <i class="yezi-3 ani-yezi lf-1"></i>
            <i class="yezi-3 ani-yezi rt-1"></i>
            <i class="yezi-3 ani-yezi rt-2"></i>
            <!-- 花 -->
            <i class="hua ani-hua lf-1"></i>
            <i class="hua ani-hua rt-1"></i>
            <i class="hua ani-hua rt-2"></i>
            <!-- 背景 -->
            <img class="img bg" src="../assets/img/big_bg_t2.png" alt="">
            <div class="wrap-0 photo" style="background-image: url('//www.dpfile.com/app/app-wed-wedding-invitation/static/invi_2.jpg?3c3633a633154f05089958170b8f0a43');">
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
        this.checkImgLoaded();
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
                targets: '.page-2 .ani-yezi',
                offset: 200
            }))
            .add(getObj({
                targets: '.page-2 .ani-hua',
                offset: 700
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
