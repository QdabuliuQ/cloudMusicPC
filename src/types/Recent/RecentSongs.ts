import { columnInt } from "../CloudDick/CloudDick";
interface songInt {
  name: string,
  ar: {id: number, name: string}[],
  playTime: number
}

export interface tableInt {
  title: string,
  width: string,
  prop: string
}

export class InitData {
  songList: songInt[] = []

  columns: columnInt[] = [
    {title: '音乐标题', width: '50%', key: 'name', slot: 'name'},
    {title: '歌手', width: '20%', key: 'ar', slot: 'ar'},
    {title: '播放时间', width: '20%', key: 'playTime', slot: 'playTime'},
  ]


  total: number = 999
}