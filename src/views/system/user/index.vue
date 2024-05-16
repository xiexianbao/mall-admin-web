<template>
  <app-header>
    <a-form layout="inline" :model="table.query">
      <a-form-item label="用户名">
        <a-input
          v-model:value="table.query.name"
          placeholder="请输入用户名"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="用户账号">
        <a-input
          v-model:value="table.query.account"
          placeholder="请输入用户账号"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="search">查询</a-button>
      </a-form-item>
      <a-form-item>
        <a-button @click="reset">重置</a-button>
      </a-form-item>
    </a-form>
  </app-header>

  <app-body>
    <a-card title="用户列表" :bordered="false">
      <template #extra>
        <a-button
          type="link"
          size="large"
          @click="addUpdateProps = { visible: true, id: undefined }"
          >添加用户</a-button
        >
      </template>

      <a-table
        :dataSource="table.list"
        :columns="columns"
        :loading="table.loading"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-switch
              v-model:checked="record.status"
              :checked-value="1"
              :un-checked-value="0"
              @change="changeStatus(record)"
            />
          </template>
          <template v-if="column.key === 'action'">
            <a-button
              type="link"
              @click="addUpdateProps = { visible: true, id: record.id }"
              >编辑</a-button
            >
            <a-popconfirm
              title="确认删除该用户？"
              @confirm="delUser(record.id)"
            >
              <a-button danger type="link">删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>

      <app-pagination
        v-model:page-num="table.query.pageNum"
        v-model:page-size="table.query.pageSize"
        :total="table.total"
        @change="getUserPage"
      />
    </a-card>
  </app-body>

  <add-update
    v-model:visible="addUpdateProps.visible"
    :id="addUpdateProps.id"
    @success="getUserPage"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import * as userApi from '@/api/user'
import { User } from '@/api/user/types'
import addUpdate from './components/addUpdate.vue'
import { columns } from './const'
import { message } from 'ant-design-vue'

const table = reactive({
  query: {
    name: '',
    account: '',
    pageNum: 1,
    pageSize: 10,
  },
  list: [] as User[],
  total: 0,
  loading: false,
})

const addUpdateProps = ref({
  visible: false,
  id: undefined,
})

const getUserPage = () => {
  table.loading = true
  userApi
    .getUserPage(table.query)
    .then((res) => {
      const { list, total } = res.data.data
      table.list = list
      table.total = total
      table.loading = false
    })
    .catch(() => {
      table.loading = false
    })
}

const changeStatus = (record: User) => {
  userApi
    .changeStatus({
      id: record.id,
      status: record.status,
    })
    .then(() => {
      message.success('状态改变成功')
      getUserPage()
    })
    .catch(() => {})
}

const delUser = (id: number) => {
  userApi
    .delUser(id)
    .then(() => {
      message.success('删除用户成功')
      getUserPage()
    })
    .catch(() => {})
}

const search = () => {
  table.query.pageNum = 1
  getUserPage()
}

const reset = () => {
  table.query = {
    name: '',
    account: '',
    pageNum: 1,
    pageSize: 10,
  }
  getUserPage()
}

const init = () => {
  getUserPage()
}

init()
</script>
