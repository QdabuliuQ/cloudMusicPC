import $http from "../http";

// 获取用户动态
export function getUserEvents(data: {
  uid: string,
  limit: number,
  lasttime: number,
}) {
  return $http({
    url: '/user/event',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取动态评论
export function getEventComment(data: {
  threadId: string
}) {
  return $http({
    url: '/comment/event',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}