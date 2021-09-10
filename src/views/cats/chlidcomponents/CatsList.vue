<template>
  <div class="car_list">
    <scroll class="content" ref="content">
      <Catslistitems v-for="(item,index) in carList " :key="index" :iteminfo="item"></Catslistitems>
    </scroll>
  </div>
</template>
<script>
  import scroll from 'components/common/scroll/Scroll'
  import Catslistitems from './Catslistitem'
  import { mapGetters } from 'vuex'
  export default {
    name: '',
    components: {
      scroll,
      Catslistitems
    },
    computed: {
      // 直接当做普通属性调用不加括号
      // 任何data中数据变化立即重新计算
      // 计算属性会缓存

      ...mapGetters(['carList'])
    },
    activated() {
      this.$refs.content.refresh()
    },
    props: {},
    data() {
      return {
      };
    },
    methods: {
    },

  }
</script>
<style scoped>
  .car_list {
    height: calc(100% - 44px - 49px - 40px);

  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>