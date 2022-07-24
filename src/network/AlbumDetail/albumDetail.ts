import $http from "../http";

// 获取专辑内容
export function getAlbumDetail(data: {
  id: string
}) {
  return $http({
    url: '/album',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取专辑内容
export function getAlbumInfo(data: {
  id: string
}) {
  return $http({
    url: '/album/detail/dynamic',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 收藏专辑
export function followAlbum(data: {
  id: string
  t: number
}) {
  return $http({
    url: '/album/sub',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取专辑评论
export function getAlbumComment(data: {
  id: string
  limit: number
  offset: number
}) {
  return $http({
    url: '/comment/album',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}