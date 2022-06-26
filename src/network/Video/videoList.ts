import $http from "../http"

// 获取所有视频
export function getVideoList(data: { id: string | number, offset: string | number }) {
  return $http({
    url: '/video/group',
    params: data
  })
}

// 获取分类列表
export function getVideoCate() {
  return $http({
    url: '/video/group/list',
  })
}