import { useUserStore } from '@/store/user'
import { Router } from 'vue-router'

export function installGuard(router: Router) {
  router.beforeEach((to) => {
    const userStore = useUserStore()
    const token = userStore.token

    // 已登录
    if (token) return true

    // 未登录
    if (to.path === '/login') return true

    return '/login'
  })
}
