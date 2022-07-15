import $http from "../http";

// 收藏专辑
export function getCollectAlbums(data: {
  limit: number,
  offset: number
}){
  return $http({
    url: '/album/sublist',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 收藏歌手
export function getCollectSingers(data: {
  limit: number,
  offset: number
}){
  return $http({
    url: '/artist/sublist',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 收藏mv
export function getCollectMvs(data: {
  limit: number,
  offset: number
}){
  return $http({
    url: '/mv/sublist',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 收藏文章
export function getCollectArticles(data: {
  limit: number,
  offset: number
}){
  return $http({
    url: '/topic/sublist',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}
