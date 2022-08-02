import $http from "../http";

// 获取私信列表
export function getPrivateMessageList(data: {
  limit: number,
  offset: number
}) {
  return $http({
    url: '/msg/private',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取私信内容
export function getChatList(data: {
  uid: string
  limit: number,
  before: number
}) {
  return $http({
    url: '/msg/private/history',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}