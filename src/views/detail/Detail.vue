<template>
  <div id="Detail">
    <child-nav-bar class="detail-nav-bar" @itemclick="itemclick"></child-nav-bar>
    <scroll class="detail-content" ref="content">
      <DetailSwiper :topimages="topimages"></DetailSwiper>
      <BaseInfo :goods="goods"></BaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <detail-goods-info :goods-info="goodsinfo" @imageload="imageload"></detail-goods-info>
      <DetailParamInfo ref="params" :paramInfo="paramInfo"></DetailParamInfo>
      <Detailcomments ref="comments" :comments="comments">
      </Detailcomments>
      <goodsitem ref="recommends" :goodslist="recommends"></goodsitem>
    </scroll>

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
  import goodsitem from 'components/content/goods/goodsitem'
  import scroll from 'components/common/scroll/Scroll'
  import { debounce } from 'common/utils/debounce'
  import { getdetalil, goods, shop, GoodsParam, comments, getrecommend } from 'network/detail'
  import { itemimagloadMixin } from 'common/utils/mixin'
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
        getThemeTopY: null,


      };
    },
    mixins: [itemimagloadMixin],
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

      }),
        //获取推荐数据
        getrecommend().then(res => {
          console.log(res)
          this.recommends = res.data.list
        })

      this.getThemeTopY = debounce(() => {
        console.log("1111111111111")
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        console.log(this.topY)
      })
    },
    destroyed() {
      this.$bus.$off('itemimgload', this.itemimagloadListener)
    },


    mounted() {


    },
    updated() {

    },
    methods: {
      imageload() {
        //监听detailgoodsinfo 里面的图片是否加载完成，加载完成进行一次刷新
        this.$refs.content.refresh()

        this.getThemeTopY()

      },
      itemclick(index) {
        console.log(index)
        this.$refs.content.scrollTo(0, -this.themeTopYs[index], 200)
        console.log(this.themeTopYs[index])
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