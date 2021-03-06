export interface MenuListInt {
  title: string,
  path: string,
}

export class InitData {
  activeIndex: number = 0
  menuList: MenuListInt[] = [
    {title: '个性推荐', path: '/Recommend'},
    {title: '歌单', path: '/SongSheet'},
    {title: '排行榜', path: '/RankingList'},
    {title: '歌手', path: '/SingersList'},
    {title: '最新音乐', path: '/NewSongs'},
  ]
}