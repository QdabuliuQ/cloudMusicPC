interface mvInt {
  vid: string,
  title: string,
  playTime: number,
  durationms: number,
  coverUrl: string,
  creator: {
    id: number,
    name: string
  }
}

export class InitData {
  total: number = 999
  offset: number = 1
  mvList: mvInt[] = []
}