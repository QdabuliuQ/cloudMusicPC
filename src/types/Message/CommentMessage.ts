interface CommentInt {
  beRepliedContent: string
  content: string
  parentCommentId: number
  resourceType: string
  time: number
  user: {
    nickname: string
    avatarUrl: string
    userId: number
  }
}
export class InitData {
  uid: string = decodeURIComponent(window.atob(localStorage.getItem('id') as string))
  before: number = -1
  total: number = -1
  commentList: CommentInt[] = []
  disableScroll: boolean = false
}