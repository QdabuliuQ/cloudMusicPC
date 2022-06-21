interface bannerInt {
  imageUrl: string,
  typeTitle: string,
  url: string,
  [propName:string]:any
}

interface sheetInt {
  picUrl: string,
  id: number,
  name: string,
  playcount: number,
  [propName:string]:any
}

interface privateInt {
  name: string,
  picUrl: string,
  id: string | number,
  [propName:string]:any
}

interface newSongsInt {
  mp3Url: string,
  name: string,
  id: string | number,
  [propName:string]:any
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

export class InitData {
  bannerList: bannerInt[] = []
  sheetList: sheetInt[] = []
  bannerHeight: number = 195
  privateList: privateInt[] = []
  newSongsList: newSongsInt[] = []
  recommendMvList: recommendMvInt[] = []
}