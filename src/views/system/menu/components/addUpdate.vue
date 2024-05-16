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
          label="菜单名"
          name="name"
          :rules="[{ required: true, message: '请输入菜单名' }]"
        >
          <a-input v-model:value="formState.name" placeholder="请输入菜单名" />
        </a-form-item>
        <a-form-item
          label="菜单路径"
          name="path"
          :rules="[{ required: true, message: '请输入菜单路径' }]"
        >
          <a-input
            v-model:value="formState.path"
            placeholder="请输入菜单路径"
          />
        </a-form-item>
        <a-form-item label="上级菜单" name="pid">
          <a-input v-model:value="formState.pid" placeholder="请输入上级菜单" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import * as menuApi from '@/api/menu'
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
const title = computed(() => (props.id ? '编辑菜单' : '添加菜单'))
const api = computed(() => (props.id ? menuApi.updateMenu : menuApi.addMenu))
const params = computed(() =>
  props.id ? { ...formState.value, id: props.id } : { ...formState.value }
)
const formState = ref({
  name: '',
  pid: '' as ID,
  path: '',
})
const spinning = ref(false)
const formRef = ref<FormInstance>()

watch(visible, () => {
  if (visible.value) {
    if (props.id) {
      spinning.value = true
      menuApi
        .getMenu(props.id)
        .then((res) => {
          const { data } = res.data
          formState.value = {
            name: data.name,
            pid: data.pid,
            path: data.path,
          }
          spinning.value = false
        })
        .catch(() => {
          spinning.value = false
        })
    } else {
      formState.value = {
        name: Random.name(),
        pid: '',
        path: '/' + Random.string(),
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
          message.success(props.id ? '编辑菜单成功' : '添加菜单成功')
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
