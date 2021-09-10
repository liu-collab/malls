import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'


//安装插件
Vue.use(Vuex)

//实例化
const state = {
  carList: []
}
const store = new Vuex.Store({
  //将方法分成单一文件进行导入
  state,
  actions,
  mutations,
  getters
})

//导出
export default store