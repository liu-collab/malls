<template>
  <div>
    <Swiper>
      <SwiperItem v-for="(item,index) in banners" :key="index">
        <a :href="item.link"></a>
        <img :src="item.image" alt="" @load="imageload">
      </SwiperItem>
    </Swiper>
  </div>
</template>
<script>
  import { Swiper, SwiperItem } from 'components/common/swiper/index.js'

  export default {
    name: 'HomeSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isload: false
      };
    },
    methods: {
      imageload() {
        //只接受第一次图片加载完成，后面变量改为true不能进入if的里面
        if (!this.isload) {
          this.$emit('itemimagload')
          this.isload = true
        }

      }
    },

  }
</script>
<style scoped>

</style>