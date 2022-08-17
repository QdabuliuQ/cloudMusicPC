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

.el-select {
  --el-select-font-size: 13px !important;
  .el-input__wrapper {
    .el-input__inner {
      font-size: 13px;
    }
  }
}
html,
body {
  margin: 0;
  padding: 0;
  color: var(--textColor);
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
.darkNotice {
  background-color: rgb(30, 30, 30) !important;
  border: 1px solid #000 !important;

  .el-notification__content {
    color: var(--textColor) !important;
  }
}
.v-contextmenu {
  background-color: var(--eventBgc) !important;
  border: 1px solid var(--borderColor) !important;
  color: var(--textColor) !important;
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
    color: var(--textColor);
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
    background-color: var(--hoverColor) !important;
    color: var(--textColor) !important;
  }
}
.emojiContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  text-align: center;
  font-size: 16px;
  .emojiItem {
    cursor: pointer;
    padding: 3px 3px 5px;
    &:hover {
      background-color: var(--hoverColor);
    }
  }
}
.userListContainer {
    .userItem {
      font-size: 12px;
      display: flex;
      align-items: center;
      padding: 6px 0;
      cursor: pointer;
      &:hover {
        background-color: var(--hoverColor);
      }
      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .loadMore {
      padding: 7px 0;
      width: 100%;
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
      cursor: pointer;
      &:hover {
        background-color: var(--hoverColor);
      }
    }
  }
</style>
