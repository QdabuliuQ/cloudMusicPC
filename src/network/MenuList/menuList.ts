import $http from "../http";

// 获取用户歌单
export function getUserSheet(data: {
  uid: string,
  limit : number,
  offset: number,
}) {
  return $http({
    url: '/user/playlist',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 新建歌单
export function addUserSheet(data: {
  name: string,
  privacy : number
}) {
  return $http({
    url: '/playlist/create',
    params: {
      ...data,
      tyoe: 'SHARED',
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 删除歌单
export function deleteSheet(data: {
  id: number,
}) {
  return $http({
    url: '/playlist/delete',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}

//