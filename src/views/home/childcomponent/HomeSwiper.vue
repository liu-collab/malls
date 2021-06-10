<template>
  <div>
    <Swiper>
      <SwiperItem v-for="(item,index) in banners" :key="index">
        <a :href="item.link"></a>
        <img :src="item.image" alt="">
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
      };
    },
    methods: {
    },

  }
</script>
<style scoped>

</style>