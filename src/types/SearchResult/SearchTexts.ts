import { columnInt } from "../CloudDick/CloudDick";

interface TextInt {
  name: string
  ar: {name: string, id: number}[]
  al: {name: string, id: number}
  dt: number
  lyrics: string[]
  shortLtyrice: string[]
  open: boolean
}

export class InitData {
  total: number = -1
  offset: number = 1

  textList: TextInt[] = []

  columns: columnInt[] = [
    {title: '音乐标题', width: '35%', key: 'name', slot: 'name'},
    {title: '歌手', width: '15%', key: 'ar', slot: 'ar'},
    {title: '专辑', width: '8%', key: 'al', slot: 'al'},
    {title: '时长', width: '8%', key: 'dt', slot: 'dt'},
    {title: '操作', width: '15%', key: 'ope', slot: 'ope'},
  ]
}