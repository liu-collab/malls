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
        pullUpLoad: this.pullUpLoad,
        //better-scroll 在div点击事件上需要把click设置为true，不然不能点击
        click: true
      }),
        //监听滚动事件，发射相应事件和position给父组件
        this.scroll.on('scroll', (position) => {
          this.$emit('backtop', position)
        })
      //监听上拉加载事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')

        console.log(this.scroll)
      })
    },
    methods: {
      //封装scrollTo方法
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(0, 0, 300)
      },
      // 封装finishPullUp
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      //封装refresh
      refresh() {
        //这里进行相与确保scroll创建出来了
        this.scroll && this.scroll.refresh()
        console.log('----------')
      }

    },
  }
</script>
<style scoped>

</style>