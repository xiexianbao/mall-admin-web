import request from '@/request'
import { User } from './types'

export function getUserPage(data: Recordable) {
  return request.post<R<PageData<User>>>('/user/pageList', data)
}

export function addUser(data: Recordable) {
  return request.post<R>('/user/add', data)
}

export function updateUser(data: Recordable) {
  return request.post<R>('/user/update', data)
}

export function delUser(id: number) {
  return request.post<R>('/user/del/' + id)
}

export function changeStatus(data: Recordable) {
  return request.post<R>('/user/status', data)
}

export function getUser(id: number) {
  return request.post<R<User>>('/user/' + id)
}
