import Vue from 'vue'
import Router from 'vue-router'


const Calc =  () => import('../views/Calc')
const Comments = () => import('../views/comments')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
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
