interface eventInt {
  type: number,
  user: {avatarUrl: string, nickname: string, userId: number},
  id: number,
  info: {liked: boolean, commentCount: number, likedCount: number, shareCount: number},
  bottomActivityInfos: {id: number, name: string}[],
  json: string,
  showTime: number
}

export class InitData {
  userInfo: any = null
  lasttime: number = -1
  size: number = 0
  eventList: eventInt[] = []
}