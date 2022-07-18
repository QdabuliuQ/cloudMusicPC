import $http from "../http";

export function getHotSearch() {
  return $http({
    url: '/search/hot/detail'
  })
}

export function getSearchDefault() {
  return $http({
    url: '/search/default'
  })
}

export function getSearchRecommend(data: {
  keywords: string
}) {
  return $http({
    url: '/search/suggest',
    params: data
  })
}