<template>
  <div v-if="Object.keys(comments).length!==0" class="con-info">
    <div class="header">
      <span class="left">用户评价</span>
      <span class="right">更多</span>
    </div>
    <div class="content">
      <img :src="comments.avatar" alt="">
      <span>{{comments.uname}}</span>
      <p>{{comments.content}}</p>
      <p>{{comments.created | showdate }} {{comments.style}} </p>
      <!-- <div v-for="(item,index) in comments.images" :key="index" class="comments-img">
        <img :src="item" alt="">
      </div> -->
    </div>
  </div>
</template>
<script>
  //引用时间格式化函数
  import { formatDate } from 'common/utils/utils.js';
  export default {
    name: '',
    props: {
      comments: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
      };
    },
    methods: {

    },
    filters: {
      // 利用过滤器将时间戳转换为日期格式
      //传入相应的时间戳
      showdate(value) {
        //实例化一个日期函数
        const date = new Date(value * 1000)
        //返回相应的时间格式yyyy-MM-dd hh:mm:ss
        return formatDate(date, 'yyyy-MM-dd ')
      }
    }
  }
</script>
<style scoped>
  .header {
    padding: 15px 15px 5px 5px;
    height: 45px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .content {
    position: relative;
    padding: 15px 15px;
    background-color: #fff;
    z-index: 9;
    border-bottom: 1px solid #ccc;
  }

  .content :nth-child(1) {
    width: 45px;
    height: 45px;
    border-radius: 25px;
    vertical-align: middle;
  }

  .content span {
    margin-left: 15px;
  }

  .content p {
    font-size: 14px;
    color: gray;
  }

  .content :nth-child(4) {
    font-size: 12px;
  }

  .content :nth-child(5) {
    font-size: 12px;
  }
</style>