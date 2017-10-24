<template>
    <div class="page page-5">
        <div class="content">
            <div class="leaves"></div>
            <div class="card">
                <div class="pic">
                    <img src="//p1.meituan.net/dpnewvc/f55397471d6ac1cb9c326b3c98f59a481092645.png">
                </div>
                <div class="name">
                    <span v-for="i in groomName.length">{{groomName[i-1]}}</span>
                </div>
                <div class="grass"></div>
                <div class="pic">
                    <img src="//p1.meituan.net/dpnewvc/f55397471d6ac1cb9c326b3c98f59a481092645.png">
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
                groomName:['小','白']
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
                        targets: '.page-5 .leaves',
                        duration: 6000,
                        translateX: '-10%',
                        easing: 'linear',
                        loop: true
                    })
                    .add({
                        targets: '.page-5 .card',
                        duration: 1000,
                        opacity: [0, 1],
                        easing: 'linear',
                        offset: 500
                    })
                    .add({
                        targets: '.page-5 .pic, .page-5 .grass',
                        opacity: [0, 1],
                        duration: 2000,
                        easing: 'easeInOutQuad',
                        offset: 1000,
                        delay: function(el, i, l) {
                            return i * 500;
                        }
                    })
                    .add({
                        targets: '.page-5 .name span',
                        opacity: [0, 1],
                        duration: 1000,
                        delay: function(el, i, l) {
                            return i * 250;
                        },
                        easing: 'easeInOutQuad',
                        offset: 2500
                    })
            }

        }
    }
</script>