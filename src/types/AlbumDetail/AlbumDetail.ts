export class InitData {
  id: string = ''

  dataInfo: any = null
  otherInfo: {
    isSub: boolean
    shareCount: number
    subCount: number
  } | null = {
    isSub: false,
    shareCount: 0,
    subCount: 0
  }
  navList: {name: string, path: string}[] = []
}