import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";


export default {
  addCart(context, payload) {
    return new Promise ((resolve, reject) => {
      //payload 新添加的商品

      //1.查找之前数组中是否有该商品
      //find函数
      //如果cartList里面的 item.iid = payload.iid  返回符合条件的元素item
      //如果没有符合条件的元素返回 undefined
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid )

      //2.判断oldProduct
      if(oldProduct) { //数量+1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      }
      else {  //添加商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新的商品')
      }

    })
  }
}
