import loginDialog from './private/loginDialog.vue'
import {  createApp  } from "vue";

const app = createApp(loginDialog);
const dom = document.createElement("div");
const instant:any = app.mount(dom); 
document.body.appendChild(dom)

export default instant.openLoginDialog;