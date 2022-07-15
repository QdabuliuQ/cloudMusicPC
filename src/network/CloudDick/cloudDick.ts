import $http from "../http";

// 获取歌曲
export function getCloudSongs(data: {
  limit: number,
  offset: number
}) {
  return $http({
    url: '/user/cloud',
    params: {
      ...data,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 删除歌曲
export function deleteCloudSongs(data: {
  id: number,
}) {
  return $http({
    url: '/user/cloud/del',
    params: {
      ...data,
      cookie: localStorage.getItem('cookie')
    }
  })
}