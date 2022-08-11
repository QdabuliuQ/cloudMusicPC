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

// 发送私信
export function sendMessage(data: {
  user_ids: string
  msg: string
}) {
  return $http({
    url: '/send/text',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取最近联系人
export function getRecentContractor() {
  return $http({
    url: '/msg/recentcontact',
    params: {
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 发送歌曲
export function sendSongToContactor(data: {
  user_ids: string
  id: string,
  msg: string
}) {
  return $http({
    url: '/send/song',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 发送歌单
export function sendSheetToContactor(data: {
  user_ids: string
  playlist: string,
  msg: string
}) {
  return $http({
    url: '/send/playlist',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 发送专辑
export function sendAlbumToContactor(data: {
  user_ids: string
  id: string,
  msg: string
}) {
  return $http({
    url: '/send/album',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}