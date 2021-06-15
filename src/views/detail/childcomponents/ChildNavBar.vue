<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active:iscurrent===index}"
          @click="itemclick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: '',
    props: [''],
    data() {
      return {
        titles: ['商品', '参数', '评论', '详情'],
        iscurrent: 0
      };
    },
    components: {
      NavBar
    },
    methods: {
      itemclick(index) {
        this.iscurrent = index;
      },
      back() {
        this.$router.back();
      }
    },
  }
</script>
<style scoped>
  .title {
    display: flex;
    font-size: 15px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-tint);
  }

  .back {
    margin-top: 6px;
    margin-left: 9px;
  }
</style>