import $http from "../http";

// 获取歌单详情
export function getSheetDetail(data: {
  id: string,
}) {
  return $http({
    url: '/playlist/detail',
    params: data
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
    params: data
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
    params: data
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
    params: data
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