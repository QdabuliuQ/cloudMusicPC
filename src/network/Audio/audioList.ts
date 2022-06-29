import $http from "../http";

// 分类信息
export function getAudioCataData(data: {
  limit: number,
  offset: number,
  cateId: number,
}){
  return $http({
    url: '/dj/radio/hot',
    params: data
  })
}