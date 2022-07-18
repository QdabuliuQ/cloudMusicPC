import $http from "../http";

// 更新歌单信息
export function uploadSheetInfo(data: {
  id: string
  name: string
  desc?: string
  tags?: string
}) {
  return $http({
    url: '/playlist/update',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}