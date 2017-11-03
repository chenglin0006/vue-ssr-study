<template>
<div class="corepage">
    <div>
        测试首屏数据：
        <p>title:{{initData.title}}</p>
        <p>name:{{initData.name}}</p>
        <p v-if="initData.listLength">数组长度：{{initData.listLength}}</p>
    </div>
</div>
</template>

<script>
import PageTitle from '../components/page-title.vue'
import test from './test.js'
export default {
    asyncData ({ store, route}) {
        return store.dispatch('setInitData', { title:'1233',name:'456',listLength:'12' });
    },
    name: 'corepage',
    components: {
        PageTitle
    },
    data() {
        return {
        }
    },
    props: {
        data: {}
    },
    mounted() {
        test();
    },
    methods: {
    },
    computed: {
        initData () {
            return this.$store.state.initData
        }
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.corepage{

}
</style>
