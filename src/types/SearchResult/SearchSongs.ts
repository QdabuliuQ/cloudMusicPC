import { songInt } from "../SheetDetail/SheetSongs";
import { columnInt } from "../CloudDick/CloudDick";

export class InitData {
  total: number = -1
  songList: songInt[] = []
  offset: number = 1
  columns: columnInt[] = [
    {title: '标题', width: '40%', key: 'name', slot: 'name'},
    {title: '歌手', width: '15%', key: 'ar', slot: 'ar'},
    {title: '专辑', width: '20%', key: 'al', slot: 'al'},
    {title: '时间', width: '15%', key: 'dt', slot: 'dt'},
  ]
}