interface songInt {
  name: string,
  ar: {id: number, name: string}[],
  al: {id: number, name: string, picUrl: string},
  dt: number,
}

export class InitData {
  offset: number = 0
  songList: songInt[] = []
  disableScroll: boolean = false
}