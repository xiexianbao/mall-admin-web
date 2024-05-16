import { App } from 'vue'
import { pinia } from './pinia'
import { globComp } from './globComp'

export default function plugins(app: App) {
  pinia(app)
  globComp(app)
  return app
}
