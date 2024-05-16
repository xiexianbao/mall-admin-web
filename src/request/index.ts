import axios from 'axios'
import router from '@/router'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/user'

const request = axios.create({
  baseURL: 'http://localhost:8080',
})

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.token = userStore.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (res) => {
    console.log('res: ', res)
    const userStore = useUserStore()
    const { code } = res.data
    if (code !== 0) {
      message.error(res.data.message)
      if (code === 401) {
        userStore.$reset()
        router.push('/login')
        return Promise.reject(res)
      }
      return Promise.reject(res)
    }
    return res
  },
  (error) => {
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default request
