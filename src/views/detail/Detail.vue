<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
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

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import { debounce } from "common/utils";
import {itemListenerMixin} from "common/mixin"
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
      recommends: []
    }
  },
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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
      console.log(this.commentInfo);
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
      console.log(this.recommends);
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
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

    console.log('不是混入');
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
    z-index: 9;
  }

  .content {
    /* height: calc(100% - 44px);
    position: relative; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
</style>
