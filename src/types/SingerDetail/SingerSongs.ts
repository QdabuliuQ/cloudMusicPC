import { columnInt } from "../CloudDick/CloudDick";
import { songInt } from "../SheetDetail/SheetSongs";

export class InitData {
  id: string = ''
  navList: {title: string, type: string}[] = [
    {title: '热门', type: 'hot'},
    {title: '时间', type: 'time'},
  ]
  offset: number = 1
  total: number = -1
  navIndex: number = 0
  songList: songInt[] = []
  columns: columnInt[] = [
    {title: '标题', width: '40%', key: 'name', slot: 'name'},
    {title: '歌手', width: '15%', key: 'ar', slot: 'ar'},
    {title: '专辑', width: '20%', key: 'al', slot: 'al'},
    {title: '时间', width: '15%', key: 'dt', slot: 'dt'},
  ]
}