<template>
    <div class="page page-index">
        <div class="content">
            <div class="leaves"></div>
            <div class="card">
                <div class="card-title">
                    <p style="transform: translate3d(0 ,100%, 0)"></p>
                    <p style="transform: translate3d(0 ,100%, 0)"></p>
                </div>
                <div class="card-name">
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
                        targets: '.page-index .leaves',
                        duration: 6000,
                        translateX: '-10%',
                        easing: 'linear',
                        loop: true
                    })
                    .add({
                        targets: '.page-index .card',
                        duration: 1000,
                        opacity: [0, 1],
                        easing: 'linear',
                        offset: 250
                    })
                    .add({
                        targets: '.page-index .card-title p',
                        translateY: ['100%', '0'],
                        opacity: [0, 1],
                        duration: 500,
                        delay: function(el, i, l) {
                            return i * 500;
                        },
                        easing: 'linear',
                        offset: 500
                    })
                    .add({
                        targets: '.page-index .card-name span',
                        scaleY: [0, 1],
                        duration: 1500,
                        delay: function(el, i, l) {
                            return i * 250;
                        },
                        offset: 1500
                    })
                    .add({
                        targets: '.card-name .dash-1, .card-name .dash-2',
                        opacity: [0, 1],
                        duration: 1000,
                        delay: function(el, i, l) {
                            return i * 250;
                        },
                        easing: 'linear',
                        offset: 1500
                    })
                    .add({
                        targets: '.page-index .card-time',
                        opacity: [0, 1],
                        duration: 250,
                        easing: 'linear',
                        offset: 3000
                    })
                    .add({
                        targets: '.page-index .card-address',
                        translateY: ['100%', '0'],
                        opacity: [0, 1],
                        duration: 500,
                        delay: function(el, i, l) {
                            return i * 500;
                        },
                        easing: 'linear',
                        offset: 3500
                    })
            }
        }
    }
</script>