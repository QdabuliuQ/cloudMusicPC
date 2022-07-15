interface artInt {
  title: string,
  rectanglePicUrl: string,
  id: number,
  author: string,
  readCount: number
}

export class InitData {
  articleList: artInt[] = []
  total: number = 999
  offset: number = 0
}