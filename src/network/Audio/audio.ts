import $http from "../http";

// 电台banner
export function getDjBanner() {
  return $http({
    url: '/dj/banner',
  })
}

// 电台分类
export function getDjCategory() {
  return $http({
    url: '/dj/catelist'
  })
}

// 电台推荐
export function getDjRecommend() {
  return $http({
    url: '/dj/recommend'
  })
}

// 电台节目榜
export function getDjRank(data: {
  limit: number,
  offset: number
}) {
  return $http({
    url: '/dj/program/toplist',
    params: data
  })
}

// 推荐类型
export function getRecommendCate() {
  return $http({
    url: '/dj/category/recommend'
  })
}

// 获取电台列表
export function getAudioList(data: {
  limit: number,
  offset: number,
  type: string,
}) {
  return $http({
    url: '/dj/toplist',
    params: data
  })
}