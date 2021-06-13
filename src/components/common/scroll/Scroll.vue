<template>
  <div class="warpper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: '',
    props: {
      //设置probeType 对象 ，后续根据需求传入相应的值（0,1,2）
      probeType: {
        type: Number,
        default: 0
      },
      //上拉事件
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      };
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.warpper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      }),
        //监听滚动事件，发射相应事件和position给父组件
        this.scroll.on('scroll', (position) => {
          this.$emit('backtop', position)
        })
      //监听上拉加载事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')

      })
    },
    methods: {
      //封装scrollTo方法
      scrollTo(x, y, time) {
        this.scroll.scrollTo(0, 0, 300)
      },
      // 封装finishPullUp
      finishPullUp() {
        this.scroll.finishPullUp()
      }

    },
  }
</script>
<style scoped>

</style>