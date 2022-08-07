import $http from "../http";

export function getNoticeList(data: {
  limit: number
  lasttime: number
}) {
  return $http({
    url: '/msg/notices',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}