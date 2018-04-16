import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'


const Calc =  () => import('../views/Calc')
const Comments = () => import('../views/comments')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/calc',
      component: Calc
    },
    {
      path: '/comments',
      component: Comments
    }
  ]
})
