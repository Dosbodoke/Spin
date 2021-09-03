import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store"
import Home from '@/views/Home.vue'
import Chat from '@/views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat/',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true, }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth ) {
    if (store.state.account.accessToken === null) {
      next({
        name: "Home",
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
