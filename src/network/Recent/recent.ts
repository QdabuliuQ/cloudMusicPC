import $http from "../http";

// 最近歌曲
export function getRecentSongs() {
  return $http({
    url: '/record/recent/song',
    params: {
      limit: 100,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 最近视频
export function getRecentVideos() {
  return $http({
    url: '/record/recent/video',
    params: {
      limit: 100,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 最近声音
export function getRecentPrograms() {
  return $http({
    url: '/record/recent/voice',
    params: {
      limit: 100,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 最近歌单
export function getRecentSheets() {
  return $http({
    url: '/record/recent/playlist',
    params: {
      limit: 100,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 最近专辑
export function getRecentAlbums() {
  return $http({
    url: '/record/recent/album',
    params: {
      limit: 100,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}

// 最近专辑
export function getRecentAudios() {
  return $http({
    url: '/record/recent/dj',
    params: {
      limit: 100,
      timestamp: Date.now(),
      cookie: localStorage.getItem('cookie')
    }
  })
}
