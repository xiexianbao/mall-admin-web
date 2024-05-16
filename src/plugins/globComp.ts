import { App } from 'vue'
import appHeader from '@/components/appHeader.vue'
import appBody from '@/components/appBody.vue'
import appPagination from '@/components/appPagination.vue'

export function globComp(app: App) {
  app.component(appHeader.name || 'appHeader', appHeader)
  app.component(appBody.name || 'appBody', appBody)
  app.component(appPagination.name || 'appPagination', appPagination)
}
