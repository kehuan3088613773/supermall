<template>
  <tab-bar>
    <tab-bar-item link="/home">
      <img src="~assets/img/tabbar/home.png" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/home_active.png" alt="" slot="item-active-icon">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item link="/category">
      <img src="~assets/img/tabbar/category.png" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/category_active.png" alt="" slot="item-active-icon">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item link="/cart">
      <img src="~assets/img/tabbar/shopcart.png" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/shopcart_active.png" alt="" slot="item-active-icon">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link="/profile">
      <img src="~assets/img/tabbar/profile.png" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/profile_active.png" alt="" slot="item-active-icon">
      <div slot="item-text">个人中心</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
