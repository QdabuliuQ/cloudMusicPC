import $http from "../http";

// 获取歌单详情
export function getSheetDetail(data: {
  id: string,
}) {
  return $http({
    url: '/playlist/detail',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取歌单歌曲
export function getSheetSongs(data: {
  id: string,
  limit: number,
  offset: number
}) {
  return $http({
    url: '/playlist/track/all',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取歌单评论
export function getSheetComment(data: {
  id: string,
  limit: number,
  offset: number,
  before?: number,
}) {
  return $http({
    url: '/comment/playlist',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 歌单收藏者
export function getSheetCollect(data: {
  id: string,
  limit: number,
  offset: number,
}) {
  return $http({
    url: '/playlist/subscribers',
    params: {
      ...data,
      timestamp: Date.now(),
    }
  })
}

// 相似歌单
export function getSimilarSheet(data: {
  id: string
}) {
  return $http({
    url: '/playlist/detail/dynamic',
    params: data
  })
}

// 添加/删除歌曲
export function setSheetSong(data: {
  op: string,
  pid: string,
  tracks: string,
}) {
  return $http({
    url: '/playlist/tracks',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}