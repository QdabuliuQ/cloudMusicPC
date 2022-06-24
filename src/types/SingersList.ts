export interface singersTypeInt {
  name: string,
  id: number | string
}

interface singerInt {
  name: string,
  img1v1Url: string,
  id: number
}

export class InitData {
  languageList: singersTypeInt[] = [
    {name: '全部', id: -1},
    {name: '华语', id: 7},
    {name: '欧美', id: 96},
    {name: '日本', id: 8},
    {name: '韩国', id: 16},
    {name: '其他', id: 0},
  ]

  typeList: singersTypeInt[] = [
    {id: -1, name:'全部'},
    {id: 1, name:'男歌手'},
    {id: 2, name:'女歌手'},
    {id: 3, name:'乐队'},
  ]

  charList: singersTypeInt[] = [
    {id: '-1', name:'热门'},
    {id: 'a', name:'A'},
    {id: 'b', name:'B'},
    {id: 'c', name:'C'},
    {id: 'd', name:'D'},
    {id: 'e', name:'E'},
    {id: 'f', name:'F'},
    {id: 'g', name:'G'},
    {id: 'h', name:'H'},
    {id: 'i', name:'I'},
    {id: 'j', name:'J'},
    {id: 'k', name:'K'},
    {id: 'l', name:'L'},
    {id: 'm', name:'M'},
    {id: 'n', name:'N'},
    {id: 'o', name:'O'},
    {id: 'p', name:'P'},
    {id: 'q', name:'Q'},
    {id: 'r', name:'R'},
    {id: 's', name:'S'},
    {id: 't', name:'T'},
    {id: 'u', name:'U'},
    {id: 'v', name:'V'},
    {id: 'w', name:'W'},
    {id: 'x', name:'X'},
    {id: 'y', name:'Y'},
    {id: 'z', name:'Z'},
    {id: '0', name:'#'},
  ]

  langIndex: number = 0
  cateIndex: number = 0
  charIndex: number = 0

  offset: number = 0

  singerList: singerInt[] = []

  isDisableScroll: boolean = false
}