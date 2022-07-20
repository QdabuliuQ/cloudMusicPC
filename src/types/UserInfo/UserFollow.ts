export interface userInt {
  avatarUrl: string,
  nickname: string,
  playlistCount: number,
  followeds: number,
  userId: number,
  signature: string
}

export class InitData {
  offset: number = 1
  userList: userInt[] = []
  userInfo: any = null;
  total: number = 999
  follows: number = 0
}