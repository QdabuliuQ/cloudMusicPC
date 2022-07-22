
export class InitData {
  mvList: {
    id: number
    duration: number
    imgurl16v9: string
    name: string
    playCount: number
  }[] = []
  offset: number = 0
  total: number = -1
  id: string = ''
  disableScroll: boolean = false
}