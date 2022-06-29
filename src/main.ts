import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import eventBus from 'vue3-eventbus'

const app = createApp(App)
app.config.globalProperties.$countFormat = function (num: string | number) {
  // 此处为防止字符串形式的数值进来，因为toFixed方法只能用于数值型数
  num = Number(num)
  if (Math.abs(num) > 100000000) {
    return (num / 100000000).toFixed(2) + '亿'
  } else if (Math.abs(num) > 10000) {
    return (num / 10000).toFixed(2) + '万'
  } else {
    return num
  }
}

app.config.globalProperties.$formatTime = function (msTime: number) {
  let time = msTime / 1000
  let day = Math.floor(time / 60 / 60 / 24);
  let hour = Math.floor(time / 60 / 60) % 24;
  let minute = Math.floor(time / 60) % 60;
  let second = Math.floor(time) % 60;
  return `${minute < 10 ? '0' + minute : minute}: ${second < 10 ? '0' + second : second}`
}

app.config.globalProperties.$getTime = function (timer: number) {
  var time = new Date(timer);
  var year = time.getFullYear();//年
  var mon = time.getMonth() + 1;//0 
  var day = time.getDate();//24
  var hour = time.getHours();//时
  var min = time.getMinutes();//分
  var sec = time.getSeconds();//秒
  return `${year}-${mon < 10 ? '0' + mon : mon}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
}

app.use(store).use(router).use(ElementPlus).use(eventBus).mount('#app')
