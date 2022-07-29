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
  color: #dcdcdc;
  min-width: 1500px !important;
}
img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
}
.overTwoLine {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.el-loading-spinner .path {
  stroke: @themeColor !important;
}
.el-loading-spinner .el-loading-text {
  color: @themeColor !important;
}
.infoPopperClass {
  border: 1px solid #414243 !important;
}
.infoPopperClass.is-light {
  background-color: #424242 !important;
  border: 1px solid #414243 !important;
  font-size: 13px;
  .el-popconfirm {
    color: #fff;
  }
  .el-popper__arrow::before {
    background-color: #424242 !important;
  }
  .el-button.is-text {
    color: #fff;
    &:hover {
      background-color: @hoverColor;
    }
  }
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: @themeColor !important;
  border: 1px solid @themeColor !important;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: @themeColor !important;
}
.el-checkbox__input .el-checkbox__label {
  font-size: 13px !important;
}
.el-checkbox .el-checkbox__inner:hover {
  border: 1px solid @themeColor !important;
}
.el-checkbox .el-checkbox__inner {
  background-color: #5f5f5f;
  border: 1px solid #747474;
}
.darkNotice {
  background-color: rgb(30, 30, 30) !important;
  border: 1px solid #000 !important;

  .el-notification__content {
    color: #fff !important;
  }
}
.v-contextmenu {
  background-color: #464646 !important;
  border: 1px solid #464646 !important;
  color: #fff !important;
  .v-contextmenu-inner {
    padding: 10px 0;
  }
  .v-contextmenu-item {
    font-size: 13px !important;
    padding: 10px 80px 10px 12px;
    color: #dcdcdc !important;
  }
  .contextItem {
    display: flex;
    align-items: center;
    .contextIcon {
      width: 20px;
      margin-right: 10px;
    }
  }
  .v-contextmenu-submenu__title {
    padding: 10px 80px 10px 12px;
    position: relative;
    .v-contextmenu-submenu__arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .v-contextmenu-item--disabled {
    background-color: #505050 !important;
    color: @fontColor !important;
  }
  .v-contextmenu-item--hover {
    background-color: rgb(57, 57, 57) !important;
    color: #fff !important;
  }
}
</style>
