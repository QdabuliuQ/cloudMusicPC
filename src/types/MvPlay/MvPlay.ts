import { videoListInt } from "../Video/VideoList";

interface videoInfoInt {
  artists: {
    followed: boolean,
    id: number,
    img1v1Url: string
    name: string
  }[]
  name: string
  publishTime: string,
  playCount: number,
  subCount: number,
  shareCount: number,
  desc: string,
  cover: string,
  id: number
  commentCount: number
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
  beReplied?: commentInt[]
}

export class InitData {
  videoInfo: videoInfoInt = {
    artists: [],
    name: '',
    publishTime: '',
    playCount: 0,
    subCount: 0,
    shareCount: 0,
    cover: '',
    desc: '',
    id: 0,
    commentCount: 0,
    videoGroup: [],
  }

  total: number = 0
  hotComment: commentInt[] = []
  allComment: commentInt[] = []

  offset: number = 1

  relateVideoList: videoListInt[] = []

  url: string = ''

  miniModel: boolean = false

  liked: boolean = false
  likedCount: number = 0
  subed: boolean = false
}