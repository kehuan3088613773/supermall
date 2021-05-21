<template>
  <div class="goods">
    <goods-list-item  v-for="(item,index) in goods"
                      :key="index"
                      :goodsItem="item">
    </goods-list-item>

  </div>
</template>

<script>

  import GoodsListItem from './GoodsListItem'
  export default {
  components: { GoodsListItem },
    props: {
      goods: {
        type: Array,
        dafault() {
          return []
        }
      },
      components: {
        GoodsListItem
      }
    }
  }
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }


</style>
