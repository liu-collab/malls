export default {
  //处理已添加的商品，数量加一
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    //处理未添加的商品，加入购物车
    //默认未选中状态
    payload.checked = false
    payload.count = 1
    state.carList.push(payload)
  }

}