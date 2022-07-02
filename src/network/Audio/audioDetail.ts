import $http from "../http";

// 获取电台详情
export function getAudioDetail(data: {
  rid: string
}) {
  return $http({
    url: '/dj/detail',
    params: data
  })
}