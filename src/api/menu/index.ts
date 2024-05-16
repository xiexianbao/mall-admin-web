import request from '@/request'
import { Menu } from './types'

export function getMenuPage(data: Recordable) {
  return request.post<R<PageData<Menu>>>('/menu/pageList', data)
}

export function addMenu(data: Recordable) {
  return request.post<R>('/menu/add', data)
}

export function updateMenu(data: Recordable) {
  return request.post<R>('/menu/update', data)
}

export function delMenu(id: number) {
  return request.post<R>('/menu/del/' + id)
}

export function getMenu(id: number) {
  return request.post<R<Menu>>('/menu/' + id)
}
