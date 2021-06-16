<template>
  <div v-if="Object.keys(GoodsInfo).length!==0" class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{GoodsInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{GoodsInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in GoodsInfo.detailImage[0].list" :key="index" :src="item" alt="" @load=imageload>
    </div>


  </div>
</template>
<script>
  export default {
    name: '',
    props: {
      GoodsInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        imaglength: 0,
        counter: 0
      };
    },
    methods: {
      imageload() {
        //判断所有图片是否加载完成
        //需要用watch监听图片的长度，一次完成所有图片的length
        //这里只需比较一次就行,这样做可以提高程序的效率，但是用户体验还是会不能滚动（网络不好情况下）
        if (++this.counter === this.imaglength) {
          this.$emit('imageload');
        }
        //每加载一张图片比较一次，并且发射一次事件
        //在detail里面刷新一次
        //这样做需要大量的计算，用户体验比较好
        // if (++this.counter === this.GoodsInfo.detailImage[0].list.length / 2) {
        //   this.$emit('imageload');
        // }
        // if (++this.counter === this.GoodsInfo.detailImage[0].list.length) {
        //   this.$emit('imageload');
        // }
      }
    },
    watch: {
      detailInfo() {
        //监听图片的长度是否加载完成
        this.imaglength = this.GoodsInfo.detailImage[0].list.length
      }
    },
  }
</script>
<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start,
  .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before,
  .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>