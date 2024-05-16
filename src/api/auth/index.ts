import request from '@/request'
import { LoginRes } from './types'

export function login(data: Recordable) {
  return request.post<R<LoginRes>>('/auth/login', data)
}

export function logout() {
  return request.post<R>('/auth/logout')
}
