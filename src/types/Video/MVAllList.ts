import { mvInit } from "./MvList";

export class InitData {
  areaCate: string[] = [
    '全部','内地','港台','欧美','日本','韩国'
  ]
  areaIndex: number = 0
  typeCate: string[] = [
    '全部','官方版','原声','现场版','网易出品'
  ]
  typeIndex: number = 0
  orderCate: string[] = [
    '上升最快','最热','最新'
  ]
  orderIndex: number = 0
  offset: number = 0

  mvList: mvInit[] = []
  disableScroll: boolean = false
}