<template>
  <div id="home">

    <Navbar class="home-nav">
      <div slot="center">购物街</div>
    </Navbar>
    <!-- 用一个不显示tancontorl,等到到了相应位置在进行一个显示 -->
    <tab-contorl class="tab-contorl" ref="tabcontorl1" :titles="['流行' , '新款' , '精选']" @tabClick="tabClick"
      v-show="isshow">
    </tab-contorl>
    <!-- probeType 传出probeType的值，根据需求是否实时监听 -->
    <scroll class="content" ref="content" :probeType="3" @backtop="backtopClick" :pull-up-load="true"
      @pullingUp="pullingUp">
      <home-swiper :banners="banners" class="home-swiper" @itemimagload="itemimagload"></home-swiper>
      <Homerecommed :recommends="recommends"></Homerecommed>
      <feature></feature>
      <tab-contorl ref="tabcontorl2" :titles="['流行' , '新款' , '精选']" @tabClick="tabClick">
      </tab-contorl>
      <goodsitem :goodslist="goods[currentType].list"></goodsitem>
    </scroll>
    <!-- native监听原生点击事件vue组件没有事件 -->
    <back-top @click.native="backClick" v-show="iscurrent"></back-top>

  </div>
</template>
<script>

  import HomeSwiper from './childcomponent/HomeSwiper'
  import Homerecommed from './childcomponent/Homerecommed'
  import feature from './childcomponent/feature'

  import Navbar from 'components/common/navbar/NavBar'
  import TabContorl from 'components/content/TabContorl'
  import goodsitem from 'components/content/goods/goodsitem'
  import scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'
  import { getHomeMultidata, getHomeGoods } from 'network/home'

  import { itemimagloadMixin } from 'common/utils/mixin'

  export default {
    name: 'Home',
    props: [''],
    components: {
      HomeSwiper,
      Homerecommed,
      feature,
      Navbar,
      TabContorl,
      goodsitem,
      scroll,
      BackTop

    },
    data() {
      return {
        name: "首页",
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        },
        //设置当前默认类型
        currentType: 'pop',
        //用参数决定backtop是否显示
        iscurrent: false,
        //保存tancontorl的高度
        taboffsetTop: 0,
        //决定tabcontrol是否显示
        isshow: false,
        //保存y轴信息
        saveY: 0,

      };
    },
    //在DOM元素创建完成之后发送网络请求
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    //混入相应的事件，混入的mouted事件，
    mixins: [itemimagloadMixin],
    mounted() {

    },
    activated() {
      //在回到home页面时拿到离开时保存的y轴信息
      //利用scroll回到离开时的y轴

      this.$refs.content.scroll.scrollTo(0, this.saveY)
      //回来时刷新一次，防止bug出现
      this.$refs.content.refresh()
    },
    deactivated() {
      //在离开home页面时保存当前y轴的信息
      this.saveY = this.$refs.content.getScrollY()
      // console.log(this.saveY)
      //离开页面取消this.itemimagloadListener 事件监听
      this.$bus.$off('itemimgload', this.itemimagloadListener)
    },
    methods: {
      tabClick(index) {
        /*
        *事件监听相关事件
        * */
        // if(index = 1){
        //   this.currentType = 'pop'
        // }
        //根据tab栏点击不同的类型获取不同的数据
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabcontorl1.iscurrnet = index
        this.$refs.tabcontorl2.iscurrnet = index
      },
      backClick() {
        //监听组件点击事件，引用scroll里面的scrollTo事件回到顶部，scrollTo（x,y,time）
        this.$refs.content.scrollTo(0, 0, 500)

      },
      //监听滚动事件，滚动到响应位置，backtop图标显示
      //子组件发射position，这里直接接收
      backtopClick(position) {
        //1.判断backtop是否显示
        this.iscurrent = (-position.y > 600)

        //2.判断tabcontrol是否吸顶
        this.isshow = (-position.y > this.taboffsetTop)
      },
      pullingUp() {
        //调用getHomeGoods方法加载相应内容图片
        this.getHomeGoods(this.currentType)
        //等图片都从服务器端加载过来后刷新一次，防止出现better-scroll出现不能刷新
        this.$refs.content.scroll.refresh()
      },
      itemimagload() {
        //获取滚动的值
        this.taboffsetTop = this.$refs.tabcontorl2.$el.offsetTop
      },
      /*
       * 网络请求相关类型
      */
      //函数封装
      getHomeMultidata() {
        //getHomeMultidata promise函数
        //请求到地址后通过then接收数据
        getHomeMultidata().then(res => {
          // this.result = res
          // console.log(this.result)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        //调用一次页码加一
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          //将多个list依次入栈
          this.goods[type].list.push(...res.data.list)
          //list入栈之后页码在当前基础之上加一
          this.goods[type].page += 1
          //上拉加载更多后结束上拉事件，不结束的话上拉方法只能调用一次
          this.$refs.content.finishPullUp()
        })
      }
    },

  }
</script>
<style scoped>
  #home {

    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffff;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */

  }

  .tab-contorl {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>