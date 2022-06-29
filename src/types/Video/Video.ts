import { MenuListInt } from "../DiscoverMusic/DiscoverMusic";

export class InitData {
  menuList: MenuListInt[] = [
    {title: '视频', path: '/VideoList'},
    {title: 'MV', path: '/MvList'},
  ]
  activeIndex: number = 0
}