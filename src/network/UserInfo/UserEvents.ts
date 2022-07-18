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
      timestamp: Date.now(),
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
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 删除动态
export function deleteEvent(data: {
  evId: number
}) {
  return $http({
    url: '/event/del',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 点赞
export function praiseResource(data: {
  id?: string,
  t: number,
  type: number,
  threadId?: string,
}) {
  return $http({
    url: '/resource/like',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 评论
export function commentResource(data: {
  t: number,
  type: number,
  id?: number | string,
  content: string,
  commentId?: number,
  threadId?: string
}) {
  return $http({
    url: '/comment',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 分享
export function shareContent(data: {
  id: string,
  type: string,
  msg: string,
}) {
  return $http({
    url: '/share/resource',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 转发用户动态
export function shareUserEvent(data: {
  uid: string,
  evId: string,
  forwards: string,
}) {
  return $http({
    url: '/event/forward',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取关注动态
export function getFollowEvent(data: {
  pagesize: number,
  lasttime: number
}) {
  return $http({
    url: '/event',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}