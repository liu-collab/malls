<template>
  <div>
    <child-nav-bar></child-nav-bar>
    <DetailSwiper :topimages="topimages"></DetailSwiper>
  </div>
</template>
<script>
  import ChildNavBar from './childcomponents/ChildNavBar'
  import DetailSwiper from './childcomponents/DetailSwiper'
  import { getdetalil } from 'network/detail'
  export default {
    name: '',
    props: {

    },
    components: {
      ChildNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: null,
        topimages: [],
      };
    },
    created() {
      //获取相应的iid
      this.iid = this.$route.params.iid

      getdetalil(this.iid).then(res => {
        console.log(res)
        //将获取到的数据进行保存
        const data = res.result
        //获取顶部图片
        this.topimages = data.itemInfo.topImages

      })
    },
    methods: {

    },
  }
</script>
<style scoped>

</style>