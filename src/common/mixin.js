import { debounce } from "common/utils";

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
    console.log('混入');
  }
}
