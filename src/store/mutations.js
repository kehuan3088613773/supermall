import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";

export default {
  //mutations唯一地目的： 修改state中的状态
  //mutations中的每个尽可能完成的事情比较单一一点
  //vuex可以更好的跟踪
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
