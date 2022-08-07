import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import eventBus from 'vue3-eventbus'
import loginDialog from "@/components/loginDialog"
import shareDialog from "@/components/shareDialog"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import vue3PreviewImage from 'vue3-preview-image'
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import { VueMasonryPlugin } from 'vue-masonry'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$toLogin = loginDialog
app.config.globalProperties.$toShare = shareDialog

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

app.config.globalProperties.$highKey = function (str: string, key: string) {
  return str.replace(key, `<b style="color: #75aeff">${key}</b>`);
}

app.config.globalProperties.$formatTime = function (msTime: number) {
  let time = msTime / 1000
  let minute = Math.floor(time / 60) % 60;
  let second = Math.floor(time) % 60;
  return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
}

app.config.globalProperties.$getTime = function (timer: number, h?: boolean) {
  var time = new Date(timer);
  var year = time.getFullYear();//年
  var mon = time.getMonth() + 1;//0 
  var day = time.getDate();//24
  var hour = time.getHours();//时
  var min = time.getMinutes();//分
  var sec = time.getSeconds();//秒
  if (h) {
    return `${year}-${mon < 10 ? '0' + mon : mon}-${day < 10 ? '0' + day : day}`
  } else {
    return `${year}-${mon < 10 ? '0' + mon : mon}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
  }
}

app.config.globalProperties.$fileType = function (fileName: any) {  // 判断文件类型
  let suffix = ''; // 后缀获取
  let result: any = ''; // 获取类型结果
  if (fileName) {
    const flieArr = fileName.split('.'); // 根据.分割数组
    suffix = flieArr[flieArr.length - 1]; // 取最后一个
  }
  if (!suffix) return false; // fileName无后缀返回false
  suffix = suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作
  // 匹配图片
  const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif']; // 图片格式
  result = imgList.find(item => item === suffix);
  if (result) return 'image';
  // 匹配音频
  const radioList = ['mp3'];
  result = radioList.find(item => item === suffix);
  if (result) return 'radio';
}

app.use(store).use(router).use(ElementPlus).use(contextmenu).use(vue3PreviewImage).use(eventBus).use(VueMasonryPlugin).mount('#app')
