import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cats = () => import('../views/cats/Cats')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail.vue')
Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cats',
    component: Cats
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail:iid',
    component: Detail
  }
]

export default new Router({
  routes,
  mode: 'history'
})