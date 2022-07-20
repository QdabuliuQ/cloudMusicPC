interface VideoInt {
  coverUrl: string,
  creator: {userId: number, name: string}[]
  durationms: number
  playTime: number
  title: string
  vid: number
}

export class InitData {
  total: number = -1
  offset: number = 1

  width: number = 0

  videoList: VideoInt[] = []
}