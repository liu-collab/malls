<template>
  <Swiper class="swiper-item">
    <SwiperItem v-for="(item,index) in topimages" :key="index">
      <img :src="item" alt="">
    </SwiperItem>
  </Swiper>
</template>
<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'

  export default {
    name: '',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topimages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {

      }

    },
    created() {

    },
    methods: {
    },
  }
</script>
<style scoped>
  .swiper-item {
    height: 300px;
    overflow: hidden;

  }
</style>