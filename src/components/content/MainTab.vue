<template>
    <div>
        <tabbar>
            <tabitem path='/home'>
                <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
                <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
                <div slot="item-text">首页</div>
            </tabitem>
            <tabitem path='/category'>
                <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
                <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
                <div slot="item-text">分类</div>
            </tabitem>
            <tabitem path='/cats' autoColor='deeppink'>
                <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
                <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
                <div slot="item-text">购物车</div>
            </tabitem>
            <tabitem path='/profile'>
                <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
                <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
                <div slot="item-text">我的</div>
            </tabitem>
        </tabbar>
    </div>
</template>
<script>
    //webpack 路径修改 import可以省略./../直接引用既可 src 需要在前面加上~
    import tabbar from 'components/common/tabbar/Tabbar.vue'
    import tabitem from 'components/common/tabbar/Tabitem.vue'

    export default {
        name: 'MainTab',
        props: [''],
        data() {
            return {};
        },
        methods: {},
        components: {
            tabbar,
            tabitem

        },

    }
</script>
<style scoped>

</style>