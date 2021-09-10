import { debounce } from 'common/utils/debounce'
import BackTop from 'components/content/backtop/BackTop'

//用minxin混入抽取一个公共事件，让这个事件在需要的地方导入就可以直接复用
//混入位置可以在vue的生命周期函数里面随便选，混入的函数编译的时候会编译到相应生命周期函数里
export const itemimagloadMixin = {
  data() {
    return {
      //保存newrefresh 刷新函数
      itemimagloadListener: null
    }
  },
  mounted() {
    //获取是防抖函数
    //直接调用函数，不需要在加括号调用方法
    let newrefresh = debounce(this.$refs.content.refresh, 250)
    //保存刷新函数
    this.itemimagloadListener = () => {
      newrefresh()
    }
    this.$bus.$on('itemimgload', this.itemimagloadListener)

  }

}

export const backTopMixin = {

  components: {
    BackTop
  },
  data() {
    return {
      //用参数决定backtop是否显示
      iscurrent: false,


    }
  },
  methods: {
    backClick() {
      //监听组件点击事件，引用scroll里面的scrollTo事件回到顶部，scrollTo（x,y,time）
      this.$refs.content.scrollTo(0, 0, 500)
    },
    //监听滚动事件，滚动到响应位置，backtop图标显示
    //子组件发射position，这里直接接收
    backtopClick(position) {
      //1.判断backtop是否显示

      this.iscurrent = -position.y > 600
    },
  },

}