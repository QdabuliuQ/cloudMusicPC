import { singerInt } from "../Collect/CollectSingers";
import { columnInt } from "../CloudDick/CloudDick";

export class InitData {
  total: number = -1
  offset: number = 1

  singerList: singerInt[] = []
  columns: columnInt[] = [
    {title: '图片', width: '1.3%', key: 'img1v1Url', slot: 'img1v1Url'},
    {title: '歌手', width: '30%', key: 'name', slot: 'name'},
    {title: 'mv', width: '8%', key: 'mvSize', slot: 'mvSize'},
    {title: '专辑', width: '8%', key: 'albumSize', slot: 'albumSize'},
  ]
}