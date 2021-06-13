<template>
  <div class="goods">
    <goodslistitem v-for="(item,index) in goodslist" :key="index" :goodslistitem="item"></goodslistitem>
  </div>
</template>
<script>
  import goodslistitem from './goodslistitem'
  export default {
    name: '',
    props: {
      goodslist: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      goodslistitem
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
  .goods {
    display: flex;
    /* 根据宽度显示一行多少个 */
    flex-wrap: wrap;
    /* 对齐方式 ，两边对齐，中间分配剩余 */
    justify-content: space-around;
    padding: 2px;
  }
</style>