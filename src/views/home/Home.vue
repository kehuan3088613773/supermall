<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  :titles="['流行','新款','精选']"
              class="tab-control"
              @tabclick="tabclick"
              ref="tabControl1"
              v-show="isTabFixed"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="['流行','新款','精选']"
                    @tabclick="tabclick"
                    ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import { getHomeMultidate, getHomeGoods} from "network/home"
  import {debounce} from "common/utils"
  import {itemListenerMixin} from "common/mixin"

  export default {
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    mixins: [itemListenerMixin],
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {},
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)

      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad' ,this.ItemImgListerner)
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    //实例创建之后
    created() {
      //1.请求多个数据  轮播图
      this.getHomeMultidate()

      //2.请求商品数据 导航
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //使用混入代提
      // //1.监听item中图片加载完成

      // let refresh = debounce(this.$refs.scroll.refresh,200)

      // this.itemImgListerner = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListerner )


    },
    methods: {
      /*
        事件监听相关方法
      */
      //上拉加载更多
      loadMore () {
        this.getHomeGoods(this.currentType)
      },
      //导航栏切换
      tabclick(index) {
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick () {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //this.listenShowBackTop()

        //2.决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      //2. 获取tabControl的offsetTop
      //所有的组件都有一个属性$el: 用于获取数组中的元素
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },


      /*
        网络请求相关
      */
      //轮播图
      getHomeMultidate() {
        getHomeMultidate().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      //导航控制s
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          //console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上啦加载更多
          this.$refs.scroll.finishPullUp()

        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* padding: 44px 0; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /* 在使用浏览器 原生滚动时 为了让导航不跟随一起滚动*/
    /* position: fixed;
    left: 0;
    right: 0;
    z-index: 9;
    top: 0; */

  }


  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


  /* .content{

    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
