<template>
    <div class="page page-end">
        <div class="content">
            <div class="leaves"></div>
            <div class="card">
                <div class="pic">
                    <img src="//p1.meituan.net/dprainbow/3444389bb32766fbd45d5f18c3417ed0731321.png">
                </div>
                <div class="name">
                    <div class="dash-1">—</div>
                    <span v-for="i in groomName.length">{{groomName[i-1]}}</span>
                    <span class="and">&</span>
                    <span v-for="i in brideName.length">{{brideName[i-1]}}</span>
                    <div class="dash-2">—</div>
                </div>
                <div class="card-time">
                    2017-10-01
                </div>
                <div class="card-address">
                    上海大酒店
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
                tID: '',
                pickerValue: '',
                groomName:['小','白'],
                brideName:['小','芳']
            };
        },
        props: ['data'],
        mounted() {
            this.animationEls();
        },
        methods: {
            animationEls() {
                let timeline = anime.timeline();

                timeline
                    .add({
                        targets: '.page-end .leaves',
                        duration: 6000,
                        translateX: '-10%',
                        easing: 'linear',
                        loop: true
                    })
                    .add({
                        targets: '.page-end .card',
                        duration: 1000,
                        opacity: [0, 1],
                        easing: 'linear',
                        offset: 500
                    })
                    .add({
                        targets: '.page-end .pic, .page-end .name, .page-end .time, .page-end .address',
                        opacity: [0, 1],
                        duration: 2000,
                        easing: 'easeInOutQuad',
                        offset: 1000,
                        delay: function(el, i, l) {
                            return i * 500;
                        }
                    })
            }

        }
    }
</script>