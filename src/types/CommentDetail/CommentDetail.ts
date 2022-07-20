import { commentInt } from "../VideoPlay/VideoPlay";

export class InitData {
  cid: string | number = ''
  id: string | number = ''
  type: number = 0

  time: number = 0
  total: number = 999
  disableScroll: boolean = false

  ownComment: commentInt = {
    content: '',
    commentId: 0,
    time: 0,
    liked: false,
    likedCount: 0,
    user: {
      avatarUrl: '',
      nickname: '',
      userId: 0
    },
  }

  commentList: commentInt[] = []
}