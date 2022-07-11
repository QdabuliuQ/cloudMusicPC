import shareDialog from "./private/shareDialog.vue";

import {  createApp  } from "vue";

const app = createApp(shareDialog);
const dom = document.createElement("div");
const instant:any = app.mount(dom); 
document.body.appendChild(dom)

export default instant.openShareDialog;