import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.new一个组件对象
  const toast = new toastContrustor()

  //3.将组件对象进行挂载

  toast.$mount(document.createElement('div'))

  //4.添加元素
  document.body.appendChild(toast.$el)

  //将toast添加到Vue原型里面

  Vue.prototype.$toast = toast
}

export default obj