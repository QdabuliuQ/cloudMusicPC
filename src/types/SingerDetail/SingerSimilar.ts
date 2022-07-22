interface SingerInt {
  name: string
  alias: string[]
  img1v1Url: string
  id: string
}

export class InitData {
  total: number = -1
  offset: number = 1
  id: string = ''
  singerList: SingerInt[] = []
}