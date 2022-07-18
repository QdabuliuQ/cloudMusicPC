interface sheetInt {
  userId: number,
  trackCount: number,
  name: string,
  coverImgUrl: string,
  playCount: number,
  privacy: number,
  id: number
}

export class InitData {
  sheetList: sheetInt[] = []
  id: string = ''
  type: string = ''
  count: number = 999
}