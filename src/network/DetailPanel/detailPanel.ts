import $http from "../http";

// 是否收藏歌单
export function collectSheet(data: {
  t: number,
  id: string
}) {
  return $http({
    url: '/playlist/subscribe',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}