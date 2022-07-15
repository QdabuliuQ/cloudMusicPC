
export class InitData {
  total: number = 999

  audioList: {
    resourceId: number, 
    data: {
      name: string
      id: number
      picUrl: string
      dj: {
        nickname: string,
        userId: number
      }
    }
  }[] = []
}