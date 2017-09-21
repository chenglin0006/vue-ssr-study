<template>
<div class="corepage">
    
    <page-title title="主页面"></page-title>
    <div>
        测试数据：
        <p>title:{{initData.title}}</p>
        <p>name:{{initData.name}}</p>
        <p v-if="initData.listLength">数组长度：{{initData.listLength}}</p>
        <p>visitShopNum:{{initData.visitShopNum}}</p>
        <p>allOrderTransAmount:{{initData.allOrderTransAmount}}</p>
        <p>allOrderNum:{{initData.allOrderNum}}</p>
        <p>inviteNum:{{initData.inviteNum}}</p>
    </div>
</div>
</template>

<script>
import PageTitle from '../components/page-title.vue'
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
