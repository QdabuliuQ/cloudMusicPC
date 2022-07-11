interface eventInt {
  type: number,
  user: {avatarUrl: string, nickname: string, userId: number},
  id: number,
  info: {threadId: string, liked: boolean, commentCount: number, likedCount: number, shareCount: number},
  bottomActivityInfos: {id: number, name: string}[],
  json: string,
  showTime: number
}

export class InitData {
  userInfo: any = null
  lasttime: number = -1
  size: number = 999
  eventList: eventInt[] = []

  disableScroll: boolean = false
  showContainer: boolean = false
}