import { singersTypeInt } from "./SingersList"
import { newSongsInt } from "./Recommend";
import { columnInt } from "../CloudDick/CloudDick";

export class InitData {
  languageList: singersTypeInt[] = [
    {name: '全部', id: 0},
    {name: '华语', id: 7},
    {name: '欧美', id: 96},
    {name: '日本', id: 8},
    {name: '韩国', id: 16},
  ]
  langIndex: number = 0
  newSongList: newSongsInt[] = []

  columns: columnInt[] = [
    {title: '索引', width: '1%', key: 'index', slot: 'index'},
    {title: '图片', width: '1.3%', key: 'blurPicUrl', slot: 'blurPicUrl'},
    {title: '名称', width: '30%', key: 'name', slot: 'name'},
    {title: '歌手', width: '8%', key: 'artists', slot: 'artists'},
    {title: '专辑', width: '8%', key: 'album', slot: 'album'},
    {title: '时长', width: '8%', key: 'duration', slot: 'duration'},
  ]
}