interface NoticeInt {
  userId: number
  time: number
  id: number
  notice: string
}

export class InitData {
  lasttime: number = -1
  more: boolean | null = true

  noticeList: NoticeInt[] = []
}