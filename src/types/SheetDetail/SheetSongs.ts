import { columnInt } from "../CloudDick/CloudDick";
interface songInt {
  name: string,
  ar: {id: number, name: string}[],
  al: {id: number, name: string, picUrl: string},
  dt: number,
}

export class InitData {
  offset: number = 0
  total: number = 999
  songList: songInt[] = []
  disableScroll: boolean = false

  columns: columnInt[] = [
    {title: '标题', width: '40%', key: 'name', slot: 'name'},
    {title: '歌手', width: '15%', key: 'ar', slot: 'ar'},
    {title: '专辑', width: '20%', key: 'al', slot: 'al'},
    {title: '时间', width: '15%', key: 'dt', slot: 'dt'},
  ]
}