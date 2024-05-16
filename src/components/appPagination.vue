<template>
  <div class="container">
    <a-pagination
      v-model:current="pageNum"
      v-model:page-size="pageSize"
      :total="total"
      :show-total="(total: number) => `总共 ${total} 条`"
      show-size-changer
      @change="emits('change')"
    />
  </div>
</template>

<script setup lang="ts">
const pageNum = defineModel('pageNum', { type: Number })
const pageSize = defineModel('pageSize', { type: Number })
const total = defineModel('total', { type: Number })
const emits = defineEmits(['change'])
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: flex-end;
  padding: 16px 0;
}
</style>
