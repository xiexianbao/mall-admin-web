export type LoginRes = {
  token: string
  user: {
    id: number | undefined
    name: string
    account: string
  }
}
