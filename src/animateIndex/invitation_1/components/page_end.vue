<template>
    <div class="page page-end">
        <div class="content">
            <!-- 背景 -->
            <img class="img bg" src="../assets/img/big_bg_t2.png" alt="">
        </div>
        <div class="inner">
            <div class="title">恭候您</div>
            <div class="hua-1"><img class="img" src="../assets/img/hua_1.png" alt=""></div>
            <div class="edit-box">
                <div class="date-time-wrap">
                        <div class="date" v-text="'2017-10-01'"></div>
                    </div>
                    <div class="text">
                        宴址：长宁区安化路
                        <!-- <cust-edit-btn-cpt name="wedHotel"></cust-edit-btn-cpt> -->
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

        },
        methods: {
        },
        components: {
        }
    }
</script>