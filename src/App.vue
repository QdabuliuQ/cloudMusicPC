<template>
  <musicNavBar></musicNavBar>
  <router-view style="margin-top: 55px" />
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import musicNavBar from "components/common/musicNavBar.vue";

export default defineComponent({
  name: "App",

  components: {
    musicNavBar,
  },
  setup() {},
});
</script>

<style lang="less">
@import (css) "./assets/less/elementStyle.less";

html,
body {
  margin: 0;
  padding: 0;
  color: #fff;
}
img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.overTwoLine {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.darkNotice {
  background-color: rgb(30, 30, 30) !important;
  border: 1px solid #000 !important;
  
  .el-notification__content {
    color: #fff !important;
  }
}
</style>
