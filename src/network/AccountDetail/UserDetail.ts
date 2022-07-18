import $http from "../http";

export function followUser(data: {
  id: string,
  t: number
}) {
  return $http({
    url: '/follow',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

export function userDjList(data: {
  uid: string,
}) {
  return $http({
    url: '/user/dj',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}