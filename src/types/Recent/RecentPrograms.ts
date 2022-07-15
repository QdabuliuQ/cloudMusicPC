interface programInt {
  playTime: number
  resourceId: string
  data: {
    commentCount: number,
    pubDJProgramData: {
      name: string,
      id: number,
      coverUrl: string,
      duration: number,
      listenerCount: number
    }
  }
}

export class InitData {
  programList: programInt[] = []
  total: number = 999
}