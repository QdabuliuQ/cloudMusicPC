import $http from "../http";

export function getVideoData(data: {
  vid: string
}) {
  return $http({
    url: '/video/detail/info',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 获取视频详情
export function getVideoDetail(data: {
  id: string
}) {
  return $http({
    url: '/video/detail',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
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
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
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

// 点赞资源
export function likeResource(data: {
  type: number,
  t: number,
  id: string,
}) {
  return $http({
    url: '/resource/like',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 评论点赞
export function commentLike(data: {
  type: number,
  t: number,
  id?: string,
  threadId?: string,
  cid: string
}) {
  return $http({
    url: '/comment/like',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}