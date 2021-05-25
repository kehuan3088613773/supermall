import { debounce } from "common/utils";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListerner: null
    }
  },
  mounted() {
    //1.监听item中图片加载完成
    let newrefresh = debounce(this.$refs.scroll.refresh,200)

    this.itemImgListerner = () => {
      newrefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListerner)

  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }

}
