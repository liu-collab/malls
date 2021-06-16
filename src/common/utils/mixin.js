import { debounce } from 'common/utils/debounce'

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