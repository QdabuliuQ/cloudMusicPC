import $http from "../http";

// 获取歌曲详情
export function getSongDetail(data: {
  ids: string
}) {
  return $http({
    url: '/song/detail',
    params: {
      ...data,
    }
  })
}
// 获取相似歌曲
export function getSimilarSong(data: {
  id: string
}) {
  return $http({
    url: '/simi/song',
    params: {
      ...data,
    }
  })
}

// 获取歌词
export function getSongLyric(data: {
  id: string
}) {
  return $http({
    url: '/lyric',
    params: {
      ...data,
    }
  })
}

// 获取评论
export function getSongComment(data: {
  id: string
  limit: number
  offset: number
}) {
  return $http({
    url: '/comment/music',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取歌曲url
export function getSongUrl(data: {
  id: string
}) {
  return $http({
    url: '/song/url',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 检查是否可用
export function checkMusic(data: {
  id: string
}) {
  return $http({
    url: '/check/music',
    params: {
      ...data,
    }
  })
}
