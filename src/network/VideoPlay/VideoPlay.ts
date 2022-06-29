import $http from "../http";

// 获取视频详情
export function getVideoDetail(data: {
  id: string
}) {
  return $http({
    url: '/video/detail',
    params: data
  })
}

// 获取视频评论
export function getVideoComment(data: {
  id: string | number,
  limit: number,
  offset: number | string,
  before: number | string,
}) {
  return $http({
    url: '/comment/video',
    params: data
  })
}

// 相关视频
export function getRelateVideo(data: {
  id: string
}) {
  return $http({
    url: '/related/allvideo',
    params: data
  })
}

// 获取视频url
export function getVideoUrl(data: {
  id: string
}) {
  return $http({
    url: '/video/url',
    params: data
  })
}