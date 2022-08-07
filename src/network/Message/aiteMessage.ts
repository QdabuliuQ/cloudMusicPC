import $http from "../http";

export function getAiteList(data: {
  limit: number
  offset: number
}) {
  return $http({
    url: '/msg/forwards',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}