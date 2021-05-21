<template>
  <div class="tabBarItem" @click="tabBarItemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-active-icon"></slot>
    </div>
    <div :style="isActiveColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data() {
      return {
        // isActive:true
      }
    },
    props:{
      link:String,
      textColor:{
        type:String,
        default:'#ff8198'
      }
    },
    computed:{
      isActive() {
        return this.$route.path.indexOf(this.link) !== -1;
      },
      isActiveColor() {
        return this.isActive ? {color:this.textColor} : {}
      }
    },
    methods:{
      tabBarItemClick() {
        this.$router.replace(this.link)
      }
    }
  }
</script>

<style scoped>
  .active {
    color:red;
  }
  .tabBarItem {
    flex: 1;
    font-size: 14px;
    margin-top: 2px;
  }

  .tabBarItem img {
    height: 26px;
    width: 26px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
