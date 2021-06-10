<template>
  <div class="recommed">
    <div v-for="(item,index) in recommends" :key="index" class="recommed-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>

    </div>


  </div>
</template>
<script>

  export default {
    name: '',
    props: {
      recommends: {
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
  .recommed {
    display: flex;
    width: 100%;
    padding: 10px 10px 20px;
    text-align: center;
    border-bottom: 10px solid #eeee;
    font-size: 16px;
  }

  .recommed-item {
    flex: 1;

  }

  .recommed-item img {
    margin-bottom: 8px;
    width: 65px;
    height: 65px;
  }
</style>