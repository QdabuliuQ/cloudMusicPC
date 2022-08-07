import $http from "../http";

// 获取评论信息
export function getCommentMessage(data: {
  uid: string,
  limit: number,
  before: number
}) {
  return $http({
    url: '/msg/comments',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}