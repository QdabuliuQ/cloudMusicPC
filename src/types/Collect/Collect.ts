import { navInt } from "../Recent/Recent";

export class InitData {
  navList: navInt[] = [
    { name: '专辑' , path: '/CollectAlbums' },
    { name: '歌手' , path: '/CollectSingers' },
    { name: '视频' , path: '/CollectMvs' },
    { name: '专栏' , path: '/CollectArticles' },
  ]
  index: number = 0
}