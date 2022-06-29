import $http from '../http'

// 歌单分类
export function getSheetCaregory() {
  return $http({
    url: '/playlist/catlist',
  })
}

interface sheetListDataInt {
  cat: string,
  limit: number,
  offset: number
}
// 歌单列表
export function getSheetList(data:sheetListDataInt) {
  return $http({
    url: '/top/playlist',
    params: data
  })
}
