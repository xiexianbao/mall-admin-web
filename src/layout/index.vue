<template>
  <a-layout class="container">
    <a-layout-sider
      class="sider"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <h1 class="logo">后台管理系统</h1>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
      >
        <a-sub-menu :key="menu.path" v-for="menu in userStore.menus">
          <template #title>
            <GlobalOutlined />
            <span>
              <template v-if="menu.children.length">
                <router-link :to="menu.path">{{ menu.label }}</router-link>
              </template>
              <template v-else>{{ menu.label }}</template>
            </span>
          </template>
          <template v-if="menu.children.length">
            <a-menu-item
              :key="nestedMenu.path"
              v-for="nestedMenu in menu.children"
            >
              <router-link :to="nestedMenu.path">{{
                nestedMenu.label
              }}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="main">
      <a-layout-header class="main-header">
        <div>
          <a-breadcrumb>
            <a-breadcrumb-item
              v-for="route in router.currentRoute.value.matched"
            >
              {{ route.name }}
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div>
          <a-dropdown>
            <span class="avatar">
              <a-avatar :size="30">
                <template #icon><UserOutlined /></template>
              </a-avatar>
              <span class="name">{{ userStore.user.name }}</span>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="logout"> 退出登录 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="main-body">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { GlobalOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const openKeys = ref<string[]>([router.currentRoute.value.matched[0].path])
const selectedKeys = ref<string[]>([router.currentRoute.value.path])
const collapsed = ref<boolean>(false)
const logout = () => {
  userStore
    .logout()
    .then(() => {
      router.push('/login')
    })
    .catch(() => {})
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  .sider {
    background-color: #fff;
    .logo {
      margin-left: 30px;
      margin-top: 24px;
      margin-bottom: 32px;
    }
  }
  .main {
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      background-color: #fff;
      .avatar {
        cursor: pointer;
        .name {
          margin-left: 10px;
        }
      }
    }
    &-body {
      margin: 24px 16px;
    }
  }
}
</style>
