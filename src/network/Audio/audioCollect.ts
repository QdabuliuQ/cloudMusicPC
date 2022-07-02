import $http from "../http";

// 获取收藏列表
export function getAudioCollect(data: {
  id: string,
  time: number,
  limit: number
}) {
  return $http({
    url: '/dj/subscriber',
    params: data
  })
}