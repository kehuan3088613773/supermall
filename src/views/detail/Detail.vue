<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addTocart="addTocart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import { debounce } from "common/utils";
import {itemListenerMixin, backTopMixin} from "common/mixin"
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  created() {
    //1.保存转入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result

      //2.取出轮播图的数据
      this.topImages = res.result.itemInfo.topImages

      //3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //console.log(this.goods);

      //4.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      //console.log(this.shop);

      //5.保存商品的详情数据
      this.detailInfo = data.detailInfo

      //6.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //7.取出评论的信息
      this.commentInfo = data.rate.list ? data.rate.list[0] : {}
      // console.log(this.commentInfo);
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
      // console.log(this.recommends);
    })

    //4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {

      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    }, 100)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    //点击详情页导航，跳到对应的地方
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },

    //1.获取Y值 下滑滚动时，滚动到的模块对应的详情页导航
    //2.是否显示回到顶部按钮
    contentScroll(position) {
      //1.获取Y值 下滑滚动时，滚动到的模块对应的详情页导航
      const positionY = -position.y

      //2.positionY和主题中值进行对比
      //[0, 5430, 6107, 6458, Number.MAX_VALUE]
      //[0, 5430)  currentIndex = 0
      //[5430, 6107)  currentIndex = 1
      //[6107, 6458)  currentIndex = 2
      //[6458, Number.MAX_VALUE) currentIndex = 3

      let length = this.themeTopYs.length
      for(let i = 0; i < length-1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i]) && (positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.detailnav.currentIndex = this.currentIndex
        }
      }

      //使用if-else缺点 如果有很多个的话 代码很长
      // if ( this.currentIndex != 0 && positionY >= this.themeTopYs[0] && positionY < this.themeTopYs[1]) {
      //   this.currentIndex = 0
      //   this.$refs.detailnav.currentIndex = this.currentIndex
      // }
      // else if ( this.currentIndex != 1 && positionY >= this.themeTopYs[1] && positionY < this.themeTopYs[2]) {
      //   this.currentIndex = 1
      //   this.$refs.detailnav.currentIndex = this.currentIndex
      // }
      // else if (this.currentIndex != 2 && positionY >= this.themeTopYs [2] && positionY < this.themeTopYs[3]) {
      //   this.currentIndex = 2
      //   this.$refs.detailnav.currentIndex = this.currentIndex
      // }
      // else if ( this.currentIndex != 3 && positionY > this.themeTopYs[3] ){
      //   this.currentIndex = 3
      //   this.$refs.detailnav.currentIndex = this.currentIndex
      // }


      //2回到顶部
      //detail 这里采用混入的办法
      //与home不同  home是正常使用
      this.listenShowBackTop(position)
      //等价于下面这个
      //this.isShowBackTop = (-position.y) > 1000
    },

    //加入购物车
    addTocart() {
      //1.获取商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      console.log(product);
    }
  },
  mounted() {
    //放到混入去监听
    // //1.监听item中图片加载完成
    // let refresh = debounce(this.$refs.scroll.refresh,200)

    // this.itemImgListerner = () => {
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImgListerner )

    // console.log('不是混入');
  },
  destroyed() {
    //2.取消全局事件的监听
    this.$bus.$off('itemImgLoad' ,this.ItemImgListerner)
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    background-color: #fff;
    position: relative;
    z-index: 1;
  }

  .content {
    height: calc(100% - 44px - 49px);
    position: relative;
    overflow: hidden;
    /* position: absolute;
    top: 44px;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    background-color: #fff; */
  }
</style>
