import $http from "../http";

// 获取最新mv列表
export function getNewMv(data: {
  limit: number
}) {
  return $http({
    url: '/mv/first',
    params: data
  })
}

// 获取mv列表
export function getMvList(data: {
  area: string,
  order: string,
  type: string,
  limit: number,
  offset: number,
}) {
  return $http({
    url: '/mv/all',
    params: data
  })
}

// 获取mv排行
export function getMvRank(data: {
  limit: number,
  area: string,
  offset: number
}) {
  return $http({
    url: '/top/mv',
    params: data
  })
}