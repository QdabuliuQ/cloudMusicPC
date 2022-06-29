interface cateTypeInt {
  name: string,
  id: number | string
}

export interface videoListInt {
  data: {
    title: string,
    id: string | number,
    coverUrl: string,
    durationms: number,
    playTime: number,
    vid: string,
    creator: { nickname: string, userId: number | string, userName?: string }
  }
}

export class InitData {
  cateList: cateTypeInt[] = []
  activeCate: number = 0
  offset: number = 0
  videoList: videoListInt[] = []
  disableScroll: boolean = false
}