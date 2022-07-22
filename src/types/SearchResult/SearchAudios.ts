import { columnInt } from "../CloudDick/CloudDick";
interface AudioInt {
  picUrl: string
  name: string
  playCount: number
  programCount: number
  dj: {
    nickname: string
    userId: number
  }
}

export class InitData {
  offset: number = 1
  total: number = -1
  audioList: AudioInt[] = []

  columns: columnInt[] = [
    {title: '图片', width: '1.3%', key: 'picUrl', slot: 'picUrl'},
    {title: '名称', width: '30%', key: 'name', slot: 'name'},
    {title: '播放量', width: '8%', key: 'playCount', slot: 'playCount'},
    {title: '节目', width: '8%', key: 'programCount', slot: 'programCount'},
    {title: '作者', width: '8%', key: 'dj', slot: 'dj'},
  ]
}