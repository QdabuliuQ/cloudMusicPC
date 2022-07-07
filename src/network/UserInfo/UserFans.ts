import $http from "../http";

// 获取粉丝
export function getUserFans(data: {
  uid: string,
  limit: number,
  offset: number
}) {
  return $http({
    url: '/user/followeds',
    params: data
  })
}