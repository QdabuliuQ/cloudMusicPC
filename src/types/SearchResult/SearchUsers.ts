import { columnInt } from "../CloudDick/CloudDick"

interface UserInt {
  avatarUrl: string
  nickname: string
  signature: string
  vipType: number
  description: string
  userId: number
  gender: number
}

export class InitData {
  id: string = ''
  total: number = -1
  offset: number = 1
  userList: UserInt[] = []

  columns: columnInt[] = [
    {title: '图片', width: '1.3%', key: 'avatarUrl', slot: 'avatarUrl'},
    {title: '名称', width: '60%', key: 'nickname', slot: 'nickname'},
    {title: 'mv', width: '8%', key: 'description', slot: 'description'},
  ]
}