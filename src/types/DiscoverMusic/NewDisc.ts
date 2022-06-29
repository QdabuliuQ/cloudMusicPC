interface discTypeInt {
  name: string,
  id: string
}

interface discListInt {
  name: string,
  blurPicUrl: string,
  artist: {name: string},
  [propName: string]: any
}

export class InitData {
  areaList: discTypeInt[] = [
    {id:'ALL',name:'全部'},
    {id:'ZH',name:'华语'},
    {id:'EA',name:'欧美'},
    {id:'KR',name:'韩国'},
    {id:'JP',name:'日本'},
  ]
  areaIndex: number = 0

  discList: discListInt[] = []
  currentPage: number = 0
  disableScroll: boolean = false
}