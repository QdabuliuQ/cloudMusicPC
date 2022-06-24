import $http from "./http";

// 获取分类歌手
export function getSingerList(data: {
  type: string | number,
  area: string | number,
  initial: string | number,
  offset: string | number,
  limit: string | number,
}) {
  return $http({
    url: '/artist/list',
    params: data
  })
}