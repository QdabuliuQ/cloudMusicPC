import $http from "./http";


// 新碟上架
export function getNewDisc(data: {
  limit: string | number,
  offset: string | number,
  area: string,
}) {
  return $http({
    url: '/album/new',
    params: data
  })
}