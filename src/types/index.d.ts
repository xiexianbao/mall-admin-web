declare type Recordable = Record<string, any>

declare type R<D = any> = {
  code: number
  message: string
  data: D
}

declare type PageData<I> = {
  pageNum: number
  pageSize: number
  list: I[]
  total: number
}

declare type ID = number | string
