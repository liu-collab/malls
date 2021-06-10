<template>
  <div id="home">
    <Navbar class="home-nav">
      <div slot="center">购物街</div>
    </Navbar>
    <home-swiper :banners="banners" class="home-swiper"></home-swiper>
    <Homerecommed :recommends="recommends"></Homerecommed>
  </div>
</template>
<script>
  import Navbar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childcomponent/HomeSwiper'
  import Homerecommed from './childcomponent/Homerecommed'
  import { getHomeMultidata } from 'network/home'
  export default {
    name: 'Home',
    props: [''],
    data() {
      return {
        name: "首页",
        // result: null
        banners: [],
        recommends: []
      };
    },
    //在DOM元素创建完成之后发送网络请求
    created() {
      //getHomeMultidata promise函数
      //请求到地址后通过then接收数据
      getHomeMultidata().then(res => {
        // this.result = res
        // console.log(this.result)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    methods: {
    },
    components: {
      Navbar,
      HomeSwiper,
      Homerecommed
    }
  }
</script>
<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #ffff;
  }
</style>