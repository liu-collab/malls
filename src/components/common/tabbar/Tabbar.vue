<template>
  <div class="tabbar ignore">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'Tabbar',
    props: [''],
    data() {
      return {
      };
    },
    methods: {
    },
  }
</script>
<style scoped>
  .tabbar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    height: 49px;
    box-shadow: 0px -3px 1px rgba(0, 0, 0, .05);

  }
</style>