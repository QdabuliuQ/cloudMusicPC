export interface topicInt {
  actId: number,
  sharePicUrl: string,
  participateCount: number,
  title: string,
  text: string[],
}

export class InitData {
  userInfo: {
    avatarUrl: string,
    nickname: string,
    signature: string,
    userId: number,
    follows: number,
    eventCount: number,
    gender: number,
    followeds: number,
  } = {
    avatarUrl: '',
    nickname: '',
    signature: '',
    userId: 0,
    follows: 0,
    eventCount: 0,
    gender: 0,
    followeds: 0,
  }

  topicList: topicInt[] = []

  showTopic: boolean = false
  offset: number = 0
}