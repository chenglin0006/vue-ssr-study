<template>
    <div class="page page-4">
        <div class="content">
            <div class="leaves"></div>
            <div class="card">
                <div class="pic">
                    <img src="//p1.meituan.net/dprainbow/3444389bb32766fbd45d5f18c3417ed0731321.png">
                </div>
                <div class="grass"></div>
                <div class="married"></div>
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
                pickerValue: ''
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
                        targets: '.page-4 .leaves',
                        duration: 6000,
                        translateX: '-10%',
                        easing: 'linear',
                        loop: true
                    })
                    .add({
                        targets: '.page-4 .card',
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'linear',
                        offset: 667
                    })
                    .add({
                        targets: '.page-4 .card div',
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