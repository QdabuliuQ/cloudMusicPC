import $http from "../http";

export function getSingerDetail(data: {
  id: string
}) {
  return $http({
    url: '/artist/detail',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取单曲
export function getSingerSongs(data: {
  id: string,
  limit: number,
  offset: number,
  order: string
}) {
  return $http({
    url: '/artist/songs',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取描述
export function getSingerDesc(data: {
  id: string,
}) {
  return $http({
    url: '/artist/desc',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取描述
export function getSingerMv(data: {
  id: string,
  limit: number,
  offset: number
}) {
  return $http({
    url: '/artist/mv',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取专辑
export function getSingerAlbums(data: {
  id: string,
  limit: number,
  offset: number
}) {
  return $http({
    url: '/artist/album',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取相似
export function getSingerSimilar(data: {
  id: string,
}) {
  return $http({
    url: '/simi/artist',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}