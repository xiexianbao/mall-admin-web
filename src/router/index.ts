import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/constant/Login.vue'
import NotFound from '@/views/constant/NotFound.vue'
import system from './modules/system'
import { installGuard } from './guard'

const routes = [
  ...system,
  { path: '/login', name: '登录', component: Login },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

installGuard(router)

export default router
