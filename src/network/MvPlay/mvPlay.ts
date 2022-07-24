import $http from "../http";

// 获取MV详情
export function getMVDetail(data: {
  mvid: string
}) {
  return $http({
    url: '/mv/detail',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取MV地址
export function getMVUrl(data: {
  id: string
}) {
  return $http({
    url: '/mv/url',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取相似MV
export function getMVSimilar(data: {
  mvid: string
}) {
  return $http({
    url: '/simi/mv',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取MV信息
export function getMVData(data: {
  mvid: string
}) {
  return $http({
    url: '/mv/detail/info',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取MV评论
export function getMVComment(data: {
  id: string,
  limit: number,
  offset: number,
}) {
  return $http({
    url: '/comment/mv',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 收藏mv
export function collectMv(data: {
  mvid: string,
  t: number,
}) {
  return $http({
    url: '/mv/sub',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}