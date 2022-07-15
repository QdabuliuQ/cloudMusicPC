import { navListInt } from "../Audio/AudioDetail";

interface detailInt {
  coverImgUrl: string,
  description: string,
  tags: string[],
  subscribedCount: number,
  shareCount: number,
  trackCount: number,
  name: string,
  createTime: number,
  commentCount: number,
  creator: {
    avatarUrl: string,
    nickname: string,
    userId: number
  }
}

export class InitData {
  sheetInfo:detailInt = {
    coverImgUrl: '',
    description: '',
    tags: [],
    subscribedCount: 0,
    shareCount: 0,
    trackCount: 0,
    name: '',
    createTime: 0,
    commentCount: 0,
    creator: {
      avatarUrl: '',
      nickname: '',
      userId: 0
    }
  }

  navList: navListInt[] = []
  routerId: string = '0'
}