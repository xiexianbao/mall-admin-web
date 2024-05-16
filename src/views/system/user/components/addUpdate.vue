<template>
  <a-modal v-model:open="visible" :title="title" @ok="submit">
    <a-spin :spinning="spinning">
      <a-form
        ref="formRef"
        :model="formState"
        :label-col="{ span: 4 }"
        label-align="left"
        style="margin-top: 16px"
      >
        <a-form-item
          label="用户名"
          name="name"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.name" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item
          label="用户账号"
          name="account"
          :rules="[{ required: true, message: '请输入用户账号' }]"
        >
          <a-input
            v-model:value="formState.account"
            placeholder="请输入用户账号"
          />
        </a-form-item>
        <a-form-item
          label="账号密码"
          name="password"
          :rules="[{ required: true, message: '请输入账号密码' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入账号密码"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="用户角色" name="roleIdList">
          <a-select
            v-model:value="formState.roleIdList"
            :options="roleOptions"
            placeholder="请选择用户角色"
          ></a-select>
        </a-form-item>
        <a-form-item label="用户状态" name="status">
          <a-switch
            v-model:checked="formState.status"
            :checked-value="1"
            :un-checked-value="0"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import * as userApi from '@/api/user'
import { FormInstance, message } from 'ant-design-vue'
import Mock from 'mockjs'

const Random = Mock.Random
const props = withDefaults(
  defineProps<{
    id: number
  }>(),
  {
    id: undefined,
  }
)
const emits = defineEmits(['success'])
const visible = defineModel('visible', { type: Boolean })
const title = computed(() => (props.id ? '编辑用户' : '添加用户'))
const api = computed(() => (props.id ? userApi.updateUser : userApi.addUser))
const params = computed(() =>
  props.id ? { ...formState.value, id: props.id } : { ...formState.value }
)
const formState = ref({
  name: '',
  account: '',
  password: '',
  status: 1,
  roleIdList: [] as number[],
})
const spinning = ref(false)
const formRef = ref<FormInstance>()
const roleOptions = ref([])

watch(visible, () => {
  if (visible.value) {
    if (props.id) {
      spinning.value = true
      userApi
        .getUser(props.id)
        .then((res) => {
          const { data } = res.data
          formState.value = {
            name: data.name,
            account: data.account,
            password: data.password,
            status: data.status,
            roleIdList: data.roleIdList,
          }
          spinning.value = false
        })
        .catch(() => {
          spinning.value = false
        })
    } else {
      formState.value = {
        name: Random.name(),
        account: Random.natural().toString(),
        password: Random.string(),
        status: Random.integer(0, 1),
        roleIdList: [],
      }
    }
  }
})

const submit = () => {
  formRef.value
    ?.validateFields()
    .then(() => {
      api
        .value(params.value)
        .then(() => {
          message.success(props.id ? '编辑用户成功' : '添加用户成功')
          emits('success')
          visible.value = false
        })
        .catch((error) => {
          console.log('error: ', error)
        })
    })
    .catch(() => {})
}
</script>

<style lang="less" scoped></style>
