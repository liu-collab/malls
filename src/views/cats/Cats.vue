<template>
  <div class="cats">
    <!-- 导航栏 -->
    <Navbar class="home-nav">
      <div slot="center">购物街({{carLength}})</div>
    </Navbar>
    <!-- 商品列表 -->
    <CatsList></CatsList>
    <!-- 底部 -->
    <CatsBottom></CatsBottom>


  </div>
</template>
<script>
  import CatsList from './chlidcomponents/CatsList'
  import Navbar from 'components/common/navbar/NavBar'
  import CatsBottom from './chlidcomponents/CatsBottom'

  import { mapGetters } from 'vuex'
  export default {
    name: '',
    components: {
      Navbar,
      CatsList,
      CatsBottom,

    },
    props: [''],
    data() {
      return {

      };
    },
    methods: {
    },
    computed: {
      //利用mapGetters可以将多个计算属性直接导出，还可以转成对象key对应一个value
      // ...mapGetters({
      //   length: 'carLength'
      // })
      ...mapGetters(['carLength'])
    }
  }
</script>
<style scoped>
  .cats {
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>