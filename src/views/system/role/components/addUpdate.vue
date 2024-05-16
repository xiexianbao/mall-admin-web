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
          label="角色名"
          name="name"
          :rules="[{ required: true, message: '请输入角色名' }]"
        >
          <a-input v-model:value="formState.name" placeholder="请输入角色名" />
        </a-form-item>
        <a-form-item label="角色菜单" name="menuIdList">
          <a-select
            v-model:value="formState.menuIdList"
            :options="roleOptions"
            placeholder="请选择角色菜单"
          ></a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import * as roleApi from '@/api/role'
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
const title = computed(() => (props.id ? '编辑角色' : '添加角色'))
const api = computed(() => (props.id ? roleApi.updateRole : roleApi.addRole))
const params = computed(() =>
  props.id ? { ...formState.value, id: props.id } : { ...formState.value }
)
const formState = ref({
  name: '',
  menuIdList: [] as number[],
})
const spinning = ref(false)
const formRef = ref<FormInstance>()
const roleOptions = ref([])

watch(visible, () => {
  if (visible.value) {
    if (props.id) {
      spinning.value = true
      roleApi
        .getRole(props.id)
        .then((res) => {
          const { data } = res.data
          formState.value = {
            name: data.name,
            menuIdList: data.menuIdList,
          }
          spinning.value = false
        })
        .catch(() => {
          spinning.value = false
        })
    } else {
      formState.value = {
        name: Random.name(),
        menuIdList: [],
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
          message.success(props.id ? '编辑角色成功' : '添加角色成功')
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
