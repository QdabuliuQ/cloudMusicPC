export interface userInt {
  nickname: string,
  signature: string,
  userId: number,
  avatarUrl: string
}

export class InitData {
  time: number = -1
  userList: userInt[] = []
  disableScroll: boolean = false
}