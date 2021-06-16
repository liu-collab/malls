<template>
  <div class="goods-item">
    <img :src="showimage" alt="" @load="imgload" @click="itemclick">
    <div class="goods-info">
      <p>{{ goodslistitem.title }}</p>
      <span class="price">{{goodslistitem.price }}</span>
      <span class="collect">{{goodslistitem.cfav}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    props: {
      goodslistitem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      // 直接当做普通属性调用不加括号
      // 任何data中数据变化立即重新计算
      // 计算属性会缓存
      showimage() {
        return this.goodslistitem.image || this.goodslistitem.show.img
      }

    },
    data() {
      return {
      };
    },
    methods: {
      imgload() {
        //解决better-scroll偶发滑动不了，
        //主要原因是图片因网速原因导致没有及时加载完成，但是better-scroll的高度已经计算出来了
        //利用vue的时间总线事件监听图片加载完成，每张图片加载完成，让better-scroll刷新一次
        //这里的$bus在vue的原型里面没有，需要手动添加在main.js里面
        //利用时间总线发射相应事件
        this.$bus.$emit('itemimgload')
      },
      itemclick() {
        this.$router.push('/detail' + this.goodslistitem.iid)
      }
    },
  }
</script>
<style scoped>
  .goods-item {

    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {

    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>