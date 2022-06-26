export interface mvInit {
  cover: string,
  artists: {name: string, id: number|string}[],
  name: string,
  playCount: number
}

export class InitData {
  newMvList: mvInit[] = []
  hotMvList: mvInit[] = []
  wyMvList: mvInit[] = []
  rankMvList: mvInit[] = []
  rankCateList: string[] = [
    '全部','内地','港台','欧美','日本','韩国'
  ]
  rantCateIndex: number = 0
}