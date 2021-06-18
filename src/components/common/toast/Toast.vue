<template>
  <div class="toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>
<script>
  export default {
    name: '',
    props: {},
    data() {
      return {
        message: '',
        isshow: false
      };
    },
    methods: {
      show(message = '默认文字', delay = 2000) {
        this.message = message
        this.isshow = true
        setTimeout(() => {
          this.isshow = false
          this.message = ''
        }, delay)
      }
    },
  }
</script>
<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 8px 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .4);
    z-index: 999;
  }
</style>