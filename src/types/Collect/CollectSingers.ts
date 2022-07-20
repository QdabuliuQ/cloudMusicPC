export interface singerInt {
  alias: string[],
  img1v1Url: string,
  name: string,
  mvSize: number,
  albumSize: number,
  id: number
}

export class InitData {
  offset: number = 1
  total: number = 999
  limit: number = 15
  singerList: singerInt[] = []
}