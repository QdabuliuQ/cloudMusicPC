import $http from "../http";

// 热门话题
export function getHotTopic(data: {
  limit: number,
  offset: number,
}) {
  return $http({
    url: '/hot/topic',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 搜索
export function getSearchRes(data: {
  keywords: string,
  limit: number,
  offset: number,
  type: number,
}) {
  return $http({
    url: '/search',
    params: data
  })
}
