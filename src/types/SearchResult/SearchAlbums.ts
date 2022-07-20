import { columnInt } from "../CloudDick/CloudDick";
interface albumInt {
  name: string
  picUrl: string
  artists: {name: string, id: number}[]
}

export class InitData {
  albumList: albumInt[] = []
  total: number = -1
  offset: number = 1

  columns: columnInt[] = [
    {title: '图片', width: '1.3%', key: 'picUrl', slot: 'picUrl'},
    {title: '名称', width: '45%', key: 'name', slot: 'name'},
    {title: '作者', width: '45%', key: 'artists', slot: 'artists'},
  ]
}