interface MvInt {
  name: string
  cover: string
  id: number
  artists: {id: number, name: string}[]
  duration: number 
  playCount: number 
}

export class InitData {
  total: number = -1
  offset: number = 1

  mvList: MvInt[] = []
}