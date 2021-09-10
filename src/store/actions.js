export default {
  addCart(context, payload) {
    //返回一个promise 在点击添加购物车通过then进行回调res
    return new Promise((resolve, reject) => {
      //actions 将多个事件拆分成单一事件，让mutations进行处理
      //判断是否加了相同物品
      let oldProduct = context.state.carList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        // oldProduct.count += 1
        //发送给mutations进行处理
        context.commit('addCounter', oldProduct)
        resolve('商品数量加一')

      } else {
        // payload.count = 1
        // state.carList.push(payload)
        //发送给mutations进行处理
        context.commit('addToCart', payload)
        resolve('添加商品')


      }
    })
  }
}