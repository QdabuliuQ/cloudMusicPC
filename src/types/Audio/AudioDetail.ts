interface detailInt {
  picUrl: string,
  name: string,
  desc: string,
  shareCount: number,
  subCount: string,
  subed: boolean,
  programCount: number,
  dj: {
    nickname: string,
    avatarUrl: string,
    userId: number
  }
}

export interface navListInt {
  name: string,
  path: string
}

export class InitData {
  audioDetail: detailInt = {
    picUrl: '',
    name: '',
    desc: '',
    shareCount: 0,
    subCount: '',
    subed: false,
    programCount: 0,
    dj: {
      nickname: '',
      avatarUrl: '',
      userId: 0
    }
  }
  
  navList: navListInt[] = []
}