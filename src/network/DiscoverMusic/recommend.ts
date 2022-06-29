import $http from '../http'

export function getBanner(data: {type: number}) {
  return $http({
    url: '/banner',
    data
  })
}

export function getRecommendSheet(data: {limit: number}) {
  return $http({
    url: '/personalized',
    params: data
  })
}

// 独家放送
export function getPrivateContent() {
  return $http({
    url: '/personalized/privatecontent'
  })
}

// 最新音乐
export function getNewSongs(data: {limit: number}) {
  return $http({
    url: '/personalized/newsong',
    params: data
  })
}

// 推荐mv
export function getRecommendMv() {
  return $http({
    url: '/personalized/mv'
  })
}

// 推荐电台
export function getRecommendProgram() {
  return $http({
    url: '/program/recommend'
  })
}

