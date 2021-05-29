<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 49px - 44px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

</style>
