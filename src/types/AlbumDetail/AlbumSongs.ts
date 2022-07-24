import { songInt } from "../SheetDetail/SheetSongs";
import { columnInt } from "../CloudDick/CloudDick";

export class InitData {
  total: number = -1
  id: string = ''
  songList: songInt[] = []

  columns: columnInt[] = [
    {title: '音乐标题', width: '40%', key: 'name', slot: 'name'},
    {title: '歌手', width: '300px', key: 'ar', slot: 'ar'},
    {title: '专辑', width: '20%', key: 'al', slot: 'al'},
    {title: '时长', width: '15%', key: 'dt', slot: 'dt'},
  ]
}