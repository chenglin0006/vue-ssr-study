<template>
    <div class="main" >
        <!-- <template> -->
            <!-- 请柬页面 -->
            <div
            @touchstart="pageTouchStart"
            @touchmove="pageTouchMove"
            @touchend="pageTouchEnd"
            class="page-box" 
            >
                <transition-group 
                name="fade"
                tag="div">
                    <page-index-cpt :key="0" :page-index="0" v-if="curIndex === 0" :data="pageData"></page-index-cpt>
                    <page-cpt1      :key="1" :page-index="1" v-if="curIndex === 1" :data="pageData"></page-cpt1>
                    <page-cpt2      :key="2" :page-index="2" v-if="curIndex === 2" :data="pageData"></page-cpt2>
                    <page-cpt3      :key="3" :page-index="3" v-if="curIndex === 3" :data="pageData"></page-cpt3>
                    <page-cpt4      :key="4" :page-index="4" v-if="curIndex === 4" :data="pageData"></page-cpt4>
                    <page-cpt5      :key="5" :page-index="5" v-if="curIndex === 5" :data="pageData"></page-cpt5>
                    <page-cpt6      :key="6" :page-index="6" v-if="curIndex === 6" :data="pageData"></page-cpt6>
                    <page-end-cpt   :key="7" :page-index="7" v-if="curIndex === 7" :data="pageData"></page-end-cpt>
                </transition-group>
            </div>
        <!-- </template> -->

    </div>
</template>

<script>
import './index.less';
import anime from 'animejs';
import mySliderMethods from '../js/slider.js';
// 页面组件
import PageIndexCpt from './components/page_index.vue';
import PageCpt1 from './components/page_1.vue';
import PageCpt2 from './components/page_2.vue';
import PageCpt3 from './components/page_3.vue';
import PageCpt4 from './components/page_4.vue';
import PageCpt5 from './components/page_5.vue';
import PageCpt6 from './components/page_6.vue';
import PageEndCpt from './components/page_end.vue';

import defaultImg_1 from './assets/img/test/invi_1.jpg';
import defaultImg_2 from './assets/img/test/invi_2.jpg';
import defaultImg_3 from './assets/img/test/invi_3.jpg';
import defaultImg_4 from './assets/img/test/invi_4.jpg';
import defaultImg_5 from './assets/img/test/invi_5.jpg';
import defaultImg_6 from './assets/img/test/invi_6.jpg';

export default {
    data () {
        return {
            curIndex: 0,
            startY: 0,
            leng: 8,
            loadingPageStatus: true,
            pageData:[]
        };
    },
    mounted () {
        document.onreadystatechange = () => {
            if (document.readyState === "complete") {
                this.loadingPageStatus = false;
            }
        }
    },
    methods: {
        ...mySliderMethods
    },
    computed: {
       
    },
    components: {
        PageIndexCpt,
        PageCpt1,
        PageCpt2,
        PageCpt3,
        PageCpt4,
        PageCpt5,
        PageCpt6,
        PageEndCpt
    }
}
</script>
