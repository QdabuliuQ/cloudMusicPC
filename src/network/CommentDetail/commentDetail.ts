import $http from "../http";

// 获取评论详情
export function getCommentDetail(data: {
  parentCommentId: string,
  id: string,
  type: number,
  limit: number,
  time: number
}) {
  return $http({
    url: '/comment/floor',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}