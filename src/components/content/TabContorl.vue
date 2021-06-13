<template>
  <div class="tab-contorl">
    <div v-for="(item,index) in titles" :key="index" class="tab-contorl-item" :class="{active: index === iscurrnet}"
      @click="tabclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        iscurrnet: 0
      };
    },
    methods: {
      tabclick(index) {
        this.iscurrnet = index
        this.$emit('tabClick', index)
        console.log(index)
      }
    },
  }
</script>
<style scoped>
  .tab-contorl {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    background-color: #fff;
  }

  .tab-contorl-item {
    flex: 1;

  }

  .tab-contorl-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>