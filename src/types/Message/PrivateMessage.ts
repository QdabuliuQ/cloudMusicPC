interface ObjectInt {
  fromUser: {
    avatarUrl: string
    nickname: string
    userId: number
  }
  lastMsgTime: number
  newMsgCount: number
  lastMsg: string
}

interface MsgInt {
  fromUser: {
    avatarUrl: string
    nickname: string
    userId: number
  }
  toUser: {
    avatarUrl: string
    nickname: string
    userId: number
  }
  time: number
  msg: {
    msg: string
    type: number
    title: string
  }
}

export class InitData {
  offset: number = 0
  objectList: ObjectInt[] = []
  activeIndex: number = 0
  before: number = -1

  messageList: MsgInt[] = []
  voiceUrl: string = ''
  activeVoiceIndex: number = -1
}