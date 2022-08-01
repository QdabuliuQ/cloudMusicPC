import { navListInt } from "@/types/Audio/AudioDetail";
export class InitData {
  navList: navListInt[] = [
    {
      name: '私信',
      path: '/PrivateMessage'
    },
    {
      name: '评论',
      path: '/CommentMessage'
    },
    {
      name: '@我',
      path: '/AiteMessage'
    },
    {
      name: '通知',
      path: '/NoticeMessage'
    },
  ]
}