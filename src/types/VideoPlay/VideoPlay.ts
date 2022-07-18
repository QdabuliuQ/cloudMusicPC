import { videoListInt } from "../Video/VideoList";

interface videoInfoInt {
  creator: {
    avatarUrl: string,
    nickname: string,
    userId: number
    followed: boolean
  }
  coverUrl: string
  description: string,
  playTime: number,
  title: string,
  praisedCount: number
  shareCount: number
  subscribeCount: number
  publishTime: number
  videoGroup: {
    id: number
    name: string
  }[]
}

export interface commentInt {
  content: string,
  commentId: number,
  time: number,
  liked: boolean,
  likedCount: number,
  user: {
    avatarUrl: string,
    nickname: string,
    userId: number
  },
  beReplied: commentInt[]
}

export class InitData {
  videoInfo: videoInfoInt = {
    creator: {
      avatarUrl: '',
      nickname: '',
      userId: 0,
      followed: false
    },
    coverUrl: '',
    description: '',
    playTime: 0,
    title: '',
    praisedCount: 0,
    shareCount: 0,
    subscribeCount: 0,
    publishTime: 0,
    videoGroup: []
  }

  total: number = 0
  hotComment: commentInt[] = []
  allComment: commentInt[] = []

  offset: number = 1

  relateVideoList: videoListInt[] = []

  url: string = ''

  miniModel: boolean = false

  liked: boolean = false
}