export interface columnInt {
  title: string,
  key: string,
  slot: string,
  width: string
}

export class InitData {
  offset: number = 1
  limit: number = 30
  maxSize: string = ''
  size: string = ''
  width: string = ''
  total: number = 0
  songList: {
    songName: string,
    album: string,
    artist: string,
    songId: number,
    fileSize: number,
    addTime: number
  }[] = []

  columns: columnInt[] = [
    {title: '音乐标题', width: '35%', key: 'songName', slot: 'songName'},
    {title: '歌手', width: '13%', key: 'artist', slot: 'artist'},
    {title: '专辑', width: '13%', key: 'album', slot: 'album'},
    {title: '大小', width: '13%', key: 'fileSize', slot: 'fileSize'},
    {title: '上传时间', width: '15%', key: 'addTime', slot: 'addTime'},
    {title: '操作', width: '10%', key: 'delete', slot: 'delete'}
  ]

}

