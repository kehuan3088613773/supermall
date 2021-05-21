<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1。创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动位置
      if( this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position => {
          this.$emit('scroll',position)
      }))
      }

      if (this.pullUpLoad) {
        //3.监听上拉加载更多
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
      })
      }


    },
    methods: {
      //滚动位置
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      //上拉加载更多
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      //刷新
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style>

</style>
