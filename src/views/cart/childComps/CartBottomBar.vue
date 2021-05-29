<template>
  <div class="bottom-cart">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      <span>合计:{{totalPrice}}</span>
    </div>

    <div class="calculate" @click="calcClick">
      <span>结算({{checkLength}})</span>
    </div>
  </div>

</template>

<script>
import checkButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  components: {
    checkButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return '¥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      //1.使用every
      return this.cartList.every(item => item.checked)

      // if(this.cartList.length == 0) return false
      //2.使用filter
      // return !(this.cartList.filter(item => !item.checked).length)

      //3.使用find
      // return !this.cartList.find(item => !item.checked)

    }
  },
  methods: {
    checkClick () {
      if(this.isSelectAll)
        this.cartList.forEach(item => item.checked = false)
      else
        this.cartList.forEach(item => item.checked = true)
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-cart {
    display: flex;
    justify-content: space-between;
    position: relative;

    height: 40px;
    background-color: #eee;

    font-size: 16px;
    text-align: center;
  }

  .check-content {
    display: flex;
    width: 25%;
  }

  .check-button {
    margin: 9px 5px 9px 14px;

  }

  span {
    line-height: 40px;
  }

  .check-content .check-button {
    width: 20px;
    height: 20px;
  }

  .price {
    width: 35%;
  }

  .calculate {
    width:40%;
    background-color: rgb(244, 66, 66);
    color: #fff;
  }
</style>
