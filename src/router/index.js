import { createRouter, createWebHashHistory } from 'vue-router'
import welcomeView from '../views/WelcomeView.vue'
import { projectAuth } from '@/firebase'



const routes = [
  {
    path: '/',
    name: 'welcomeView',
    component: welcomeView, // Değişiklik yapıldı
    beforeEnter: (to, from, next) => {
      const user =projectAuth.currentUser
      if(user){
        next({name:'ChatRoom'})
      }
      else{
        next()
      }
    }
    
  },
  {
    path: '/chat',
    name: 'ChatRoom',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ChatRoom.vue'),
    beforeEnter: (to, from, next) => {
      const user =projectAuth.currentUser
      if(!user){
        next({name:'welcomeView'})
      }
      else{
        next()
      }
    }
    
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
