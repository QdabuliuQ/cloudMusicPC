interface programInt {
  coverUrl: string,
  name: string,
  listenerCount: number,
  likedCount: number,
  createTime: number,
  duration: number,
}

export class InitData {
  offset: number = 1
  programList: programInt[] = []
  count: number = 0
}