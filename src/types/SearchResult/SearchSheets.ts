import { columnInt } from "../CloudDick/CloudDick";

interface SheetInt {
  coverImgUrl: string
  name: string
  id: number
  playCount: number
  trackCount: number
  creator: {
    nickname: string
    userId: number
  }
}

export class InitData {
  total: number = -1
  offset: number = 1

  sheetList: SheetInt[] = []

  columns: columnInt[] = [
    {title: '图片', width: '1.3%', key: 'coverImgUrl', slot: 'coverImgUrl'},
    {title: '歌手', width: '30%', key: 'name', slot: 'name'},
    {title: '数量', width: '8%', key: 'trackCount', slot: 'trackCount'},
    {title: '作者', width: '8%', key: 'creator', slot: 'creator'},
    {title: '播放量', width: '8%', key: 'playCount', slot: 'playCount'},
  ]
}