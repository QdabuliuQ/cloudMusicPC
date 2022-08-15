import $http from "../http";

// 获取用户等级信息
export function getLevelInfo() {
  return $http({
    url: '/user/level',
    params: {
      cookie: localStorage.getItem('cookie')
    }
  })
}