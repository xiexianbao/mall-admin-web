import request from '@/request'
import { Role } from './types'

export function getRolePage(data: Recordable) {
  return request.post<R<PageData<Role>>>('/role/pageList', data)
}

export function addRole(data: Recordable) {
  return request.post<R>('/role/add', data)
}

export function updateRole(data: Recordable) {
  return request.post<R>('/role/update', data)
}

export function delRole(id: number) {
  return request.post<R>('/role/del/' + id)
}

export function getRole(id: number) {
  return request.post<R<Role>>('/role/' + id)
}
