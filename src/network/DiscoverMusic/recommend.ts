import $http from '../http'
let cookie = localStorage.getItem('cookie')

export function getBanner(data: {type: number}) {
  return $http({
    url: '/banner',
    data
  })
}

export function getRecommendSheet(data: {limit: number}) {
  return $http({
    url: cookie ? '/recommend/resource' : '/personalized',
    params: {
      ...data,
      cookie
    }
  })
}

export function getRecommendSongs() {
  return $http({
    url: '/recommend/songs',
    params: {
      cookie
    }
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

// 获取可用日期
export function getMusicDate() {
  return $http({
    url: '/history/recommend/songs',
    params: {
      cookie: localStorage.getItem('cookie')
    }
  })
}

export function getHistoryMusic(data: {
  date: string
}) {
  return $http({
    url: '/history/recommend/songs/detail',
    params: data
  })
}