import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
  state: {

  },
  mutations: {

  }
})

//3.挂载Vue实例上
export default store

//4.到main.js导入，并挂载
