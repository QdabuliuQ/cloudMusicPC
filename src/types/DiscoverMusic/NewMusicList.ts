import { singersTypeInt } from "./SingersList"
import { newSongsInt } from "./Recommend";

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
}