import $http from "../http";

export function getFollowList(data:{
  limit: number,
  offset: number
}) {
  return $http({
    url: '/user/follows',
    params: {
      ...data,
      uid: localStorage.getItem('id')
    }
  })
}