interface aluumInt {
  picUrl: string,
  name: string,
  id: number,
  artists: {name: string, id: number}[],
  size: number,
  alias: string[]
}

export class InitData {
  offset: number = 1
  total: number = 999
  limit: number = 15
  albumList: aluumInt[] = []
}