export interface navInt {
  name: string,
  path: string
}

export class InitData {
  navList: navInt[] = [
    {name: '歌曲' , path: '/RecentSongs'},
    {name: '视频' , path: '/RecentVideos'},
    {name: '声音' , path: '/RecentPrograms'},
    {name: '歌单' , path: '/RecentSheets'},
    {name: '专辑' , path: '/RecentAlbums'},
    {name: '播客' , path: '/RecentAudios'},
  ]
}