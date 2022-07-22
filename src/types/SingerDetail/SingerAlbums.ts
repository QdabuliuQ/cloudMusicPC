interface AlbumInt {
  blurPicUrl: string
  name: string
  artists: {name: string}[]
  id: number
}

export class InitData {
  id: string = ''
  offset: number = 0
  total: number = -1
  albumList: AlbumInt[] = []
  disableScroll: boolean = false
}