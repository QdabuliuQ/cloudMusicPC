import $http from "./http";

// 新歌速递
export function getNewSongs(data: {type: string | number}) {
  return $http({
    url: '/top/song',
    params: data
  })
}