interface bannerInt {
  imageUrl: string,
  typeTitle: string,
  url: string,
  [propName: string]: any
}

interface sheetInt {
  picUrl: string,
  id: number,
  name: string,
  playcount: number,
  [propName: string]: any
}

interface privateInt {
  name: string,
  picUrl: string,
  id: string | number,
  [propName: string]: any
}

export interface newSongsInt {
  mp3Url: string,
  name: string,
  id: string | number,
  [propName: string]: any
}

interface recommendMvInt {
  name: string,
  picUrl: string,
  id: string | number,
  playCount: number,
  artists: artistsInt[],
}

interface artistsInt {
  name: string,
  id: string | number
}

interface programInt {
  name: string,
  channels: string[],
  id: string | number,
  coverUrl: string,
  dj: { nickname: string, userId: string | number, [propName: string]: any },
  [propName: string]: any
}

export class InitData {
  bannerList: bannerInt[] = []
  sheetList: sheetInt[] = []
  bannerHeight: number = 195
  privateList: privateInt[] = []
  newSongsList: newSongsInt[] = []
  recommendMvList: recommendMvInt[] = []
  programsList: programInt[] = []

  login: boolean = false
}