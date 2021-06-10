<template>
  <div class="tabitem" @click="itemclick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style='autoStyle'>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Tabitem',
    props:
    {
      path: String,
      autoColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: false
      };
    },
    computed: {
      // 直接当做普通属性调用不加括号
      // 任何data中数据变化立即重新计算
      // 计算属性会缓存
      isActive() {
        //用匹配路径的方式来获取当前活跃的（点击），返回值为true
        return this.$route.path.indexOf(this.path) !== -1
      },
      autoStyle() {
        return this.isActive ? { color: this.autoColor } : {}
      }

    },
    methods: {
      itemclick() {
        // console.log('itemclick')
        this.$router.replace(this.path)


      }
    },
  }
</script>
<style scoped>
  .tabitem {
    flex: 1;
    text-align: center;
  }

  .tabitem img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
</style>