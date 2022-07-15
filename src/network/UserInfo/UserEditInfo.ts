import $http from "../http";

// 修改用户信息
export function editInfo(data: {
  gender: string
  birthday: number
  nickname: string
  province: number
  city: number
  signature: string
}) {
  return $http({
    url: '/user/update',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}
