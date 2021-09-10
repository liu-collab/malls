import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false

//添加$bus原型，在图片加载里面使用
Vue.prototype.$bus = new Vue()

//安装toast
Vue.use(toast)
//解决移动端300ms问题
fastclick.attach(document.body)

const loadimage = require('./assets/img/common/placeholder.png')

Vue.use(VueLazyload, {
    loading: loadimage
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
