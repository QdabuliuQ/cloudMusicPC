import $http from "../http";

// 获取话题详情
export function getTopicDetail(data: {
  actid: string
}) {
  return $http({
    url: '/topic/detail',
    params: data
  })
}

// 话题动态
export function getTopicEvent(data: {
  actid: number
}) {
  return $http({
    url: '/topic/detail/event/hot',
    params: data
  })
}