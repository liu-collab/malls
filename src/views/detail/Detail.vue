<template>
  <div id="Detail">
    <child-nav-bar class="detail-nav-bar" @itemclick="itemclick"></child-nav-bar>
    <scroll class="detail-content" ref="content" :probe-type="3" @backtop="backtop">
      <DetailSwiper :topimages="topimages"></DetailSwiper>
      <BaseInfo :goods="goods"></BaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <detail-goods-info :goods-info="goodsinfo" @imageload="imageload"></detail-goods-info>
      <DetailParamInfo ref="params" :paramInfo="paramInfo"></DetailParamInfo>
      <Detailcomments ref="comments" :comments="comments">
      </Detailcomments>
      <goodsitem ref="recommends" :goodslist="recommends"></goodsitem>
    </scroll>
    <back-top @click.native="backClick" v-show="iscurrent"></back-top>
    <detail-bottom @addcart="addtocart"></detail-bottom>
  </div>
</template>
<script>
  import ChildNavBar from './childcomponents/ChildNavBar'
  import DetailSwiper from './childcomponents/DetailSwiper'
  import BaseInfo from './childcomponents/BaseInfo'
  import DetailShopInfo from './childcomponents/DetailShopInfo'
  import DetailGoodsInfo from './childcomponents/DetailGoodsInfo'
  import DetailParamInfo from './childcomponents/DetailParamInfo'
  import Detailcomments from './childcomponents/Detailcomments'
  import DetailBottom from './childcomponents/DetailBottom'
  import goodsitem from 'components/content/goods/goodsitem'

  import scroll from 'components/common/scroll/Scroll'
  import { debounce } from 'common/utils/debounce.js'
  import { throttling } from 'common/utils/throttling'
  import { getdetalil, goods, shop, GoodsParam, comments, getrecommend } from 'network/detail'
  import { itemimagloadMixin, backTopMixin } from 'common/utils/mixin'
  //导入一个mapActions 这样可以直接使用actions里面的方法
  import { mapActions } from 'vuex'
  export default {
    name: 'Detail',
    props: {

    },
    components: {
      ChildNavBar,
      DetailSwiper,
      BaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Detailcomments,
      DetailBottom,
      goodsitem,
      scroll
    },
    data() {
      return {
        iid: null,
        topimages: [],
        goods: {},
        shop: {},
        goodsinfo: {},
        paramInfo: {},
        comments: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: () => { },
        iscurrent: false


      };
    },
    mixins: [itemimagloadMixin, backTopMixin],
    created() {
      //获取相应的iid
      this.iid = this.$route.params.iid
      //获取商品详情数据
      getdetalil(this.iid).then(res => {
        console.log(res)
        //将获取到的数据进行保存
        const data = res.result
        //获取顶部图片
        this.topimages = data.itemInfo.topImages
        //获取商品详细数据
        this.goods = new goods(data.itemInfo, data.columns, data.shopInfo.services)
        //获取店铺信息
        this.shop = new shop(data.shopInfo)
        //获取商品信息
        this.goodsinfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //获取评论信息
        data.rate.list = data.rate.list[0] ? data.rate.list[0] : ''
        this.comments = new comments(data.rate.list)

        // this.$nextTick(() => {
        //   console.log('1111111')
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })



        //this.getThemeTopY = throttling( 100)
        //存在的问题 
        //1.在图片没有挂载完成之前detailgoodsinfo 就已经将对应的事件发射出来了，
        //导致这里提前进行防抖操作 ，获取的高度会存在不确定性
        //2. debounce 由于前面minxs混入一个依赖debounce的操作，导致这里的debounce不能正常使用
        //需要在debounce后面加一个括号，形成闭包，debounce最好不要在一个地方多次导入，混入也算是导入了
        //目前可行的办法，将debounce和其他公用方法集成在utils里面

        this.getThemeTopY = debounce(() => {

          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          console.log(this.themeTopYs)
        }, 500)()

      });
      //获取推荐数据
      getrecommend().then(res => {
        console.log(res)
        this.recommends = res.data.list
      });

    },
    destroyed() {
      this.$bus.$off('itemimgload', this.itemimagloadListener)
    },
    mounted() {
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      // console.log(this.themeTopYs)
      // console.log(this.$refs.params.$el)



    },
    updated() {

    },
    methods: {
      //将actions里面的方法用数组进行映射
      ...mapActions(['addCart']),
      imageload() {
        //监听detailgoodsinfo 里面的图片是否加载完成，加载完成进行一次刷新
        this.$refs.content.refresh()

        this.getThemeTopY()


      },
      itemclick(index) {
        // console.log(index)
        this.$refs.content.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        // console.log(this.themeTopYs[index])
      },
      //监听滚动事件， 发送position 到minx相应的方法中
      backtop(position) {

        this.backtopClick(position)
      },
      //添加到购物车
      addtocart() {
        const product = {}
        product.images = this.topimages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.lowNowPrice
        product.iid = this.$route.params.iid
        console.log(product)
        //提交到mutation
        // this.$store.commit('addCart', product)
        //提交到action
        // this.$store.dispatch('addCart', product).then((res) => {
        //   console.log(res)
        // })
        //调用mapActoins里面的方法
        this.addCart(product).then(res => {
          console.log(res)
          this.$toast.show(res, 1500)
        })
      }


    },
  }
</script>
<style scoped>
  #Detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>