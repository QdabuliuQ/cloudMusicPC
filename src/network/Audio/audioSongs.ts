import $http from "../http";

// 获取播客声音
export function getAudioSongs(data: {
  rid: string,
  limit: number,
  offset: number,
}) {
  return $http({
    url: '/dj/program',
    params: data
  })
}