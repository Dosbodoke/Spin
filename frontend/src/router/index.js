import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store"
import Login from '@/views/Login.vue'
import Chat from '@/views/Chat.vue'
import Register from '@/views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
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
        name: "Login",
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
