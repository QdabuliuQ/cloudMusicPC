import messageDialog from "./private/messageDialog.vue";

import {  createApp  } from "vue";

const app = createApp(messageDialog);
const dom = document.createElement("div");
const instant:any = app.mount(dom); 
document.body.appendChild(dom)

export default instant.openMessageDialog;