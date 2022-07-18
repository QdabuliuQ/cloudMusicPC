import { getCurrentInstance } from "vue";
import bus from "vue3-eventbus";

export default function(show: boolean = true) {
  const _this: any = getCurrentInstance()

  let id: string | undefined = localStorage.getItem('id') as string
  let data: any = localStorage.getItem('data')
  let cookie: string | undefined = localStorage.getItem('cookie') as string

  if (id && data && cookie) {
    let _id = (JSON.parse(decodeURIComponent(window.atob(data)))).userId
    if (decodeURIComponent(window.atob(id)) == _id) {
      return true
    } else {
      console.log('没登录');
      return false
      
    }
  } else {
    if (show) {
      bus.emit('loginDialog')
    }
    return false
  }
}