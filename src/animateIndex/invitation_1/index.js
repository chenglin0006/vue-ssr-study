import Vue from 'vue';
import {DatetimePicker} from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component('DatetimePicker', DatetimePicker);

import anime from 'animejs';
window.$anime = anime;

// less
import './index.less';

import App from './app';

new Vue({
    el: '#app',
    render: h => h(App)
})