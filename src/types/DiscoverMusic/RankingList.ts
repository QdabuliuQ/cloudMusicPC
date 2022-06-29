interface officalListInt {
  name: string,
  coverImgUrl: string,
  id: string | number,
  tracks: tracksInt[]
}

interface tracksInt {
  first: string,
  second: string
}

interface globaListInt {
  name: string,
  coverImgUrl: string,
  id: string | number,
  playCount: string | number,
}

export class InitData {
  officalList: officalListInt[] = []
  globaList: globaListInt[] = []
}