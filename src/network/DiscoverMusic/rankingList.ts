import $http from '../http'

// 获取榜单
export function getRankingList() {
  return $http({
    url: '/toplist/detail',
  })
}