import { defineStore } from 'pinia'
import * as authApi from '@/api/auth'
import { LoginRes } from '@/api/auth/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: {} as LoginRes['user'],
    menus: [
      {
        label: '系统管理',
        path: '/system',
        children: [
          {
            label: '用户管理',
            path: '/system/user',
          },
          {
            label: '角色管理',
            path: '/system/role',
          },
          {
            label: '菜单管理',
            path: '/system/menu',
          },
        ],
      },
    ],
  }),
  actions: {
    login(params: Recordable) {
      return authApi
        .login(params)
        .then((res) => {
          const { token, user } = res.data.data
          this.token = token
          this.user = user
          return res
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },
    logout() {
      return authApi
        .logout()
        .then(() => {
          this.$reset()
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },
  },
  persist: true,
})
