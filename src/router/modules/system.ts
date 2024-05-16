import { RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
import user from '@/views/system/user/index.vue'
import role from '@/views/system/role/index.vue'
import menu from '@/views/system/menu/index.vue'

const userRoute: RouteRecordRaw[] = [
  {
    path: '/system',
    name: '系统管理',
    component: layout,
    redirect: '/system/user',
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: user,
      },
      {
        path: 'role',
        name: '角色管理',
        component: role,
      },
      {
        path: 'menu',
        name: '菜单管理',
        component: menu,
      },
    ],
  },
]

export default userRoute
