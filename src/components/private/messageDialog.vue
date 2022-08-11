<template>
  <div id="shareDialog">
    <el-dialog
      custom-class="shareDialogClass"
      :width="'450px'"
      v-model="visible"
      :modal="false"
      draggable
    >
      <div class="diglogTitle">分享给{{ uName }}(好友)</div>
      <div class="diglogTextBox">
        <textarea maxlength="200" v-model="comment"></textarea>
        <div class="functionList">
          <el-popover
            ref="emojiPopoverRef"
            placement="bottom"
            :width="300"
            trigger="click"
            popper-class="dialogPopperClass"
            :hide-after="0"
          >
            <template #reference>
              <img src="~images/shareDialog/emoji.png" alt="" />
            </template>
            <div class="emojiContainer">
              <div
                @click="emojiClick(item)"
                v-for="(item, index) in emoji"
                :key="index"
                class="emojiItem"
              >
                {{ item }}
              </div>
            </div>
          </el-popover>
        </div>
      </div>
      <div class="dialogInfoBox">
        <el-avatar
          v-if="infoImage"
          style="margin-left: 7px"
          shape="square"
          :size="30"
          :fit="'cover'"
          :src="infoImage"
        />
        <span class="target">{{ filterType(type) }}</span>
        <div class="name">
          {{ infoName }}
        </div>
      </div>
      <div class="dialogBtnBox">
        <div @click="shareContentEvent" class="shareBtn">分享</div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  watch,
  nextTick,
} from "vue";
import {
  ElDialog,
  ElPopover,
  ElScrollbar,
  ElAvatar,
  ElNotification,
} from "element-plus";
import emoji from "@/static/emoji";
import {
  sendSongToContactor,
  sendSheetToContactor,
  sendAlbumToContactor,
} from "@/network/Message/privateMessage";
import useLogin from "@/hooks/useLogin";

export default defineComponent({
  name: "messageDialog",
  components: {
    ElDialog,
    ElPopover,
    ElScrollbar,
    ElAvatar,
  },
  setup() {
    const searchInputRef = ref();
    const emojiPopoverRef = ref();
    const userPopoverRef = ref();
    const data = reactive({
      isLogin: useLogin(false),
      visible: false,
      emoji: <any>[],
      comment: "",
      infoImage: "",
      infoName: "",
      type: "",
      id: "",
      uid: "",
      uName: "",
    });

    watch(
      () => data.visible,
      (n) => {
        if (!n) {
          data.comment = "";
          data.infoImage = "";
          data.infoName = "";
          data.id = "";
        }
      }
    );

    // 点击表情
    const emojiClick = (i: string) => {
      data.comment += i;
      emojiPopoverRef.value.hide();
    };

    const filterType = (e: string) => {
      switch (e) {
        case "song":
          return "歌曲";
        case "playlist":
          return "歌单";
        case "album":
          return "专辑";
      }
    };

    // 加载用户数据
    const loadMore = () => {};

    // 打开弹窗
    const openMessageDialog = (
      id: string,
      type: string,
      name: string,
      image: string,
      uid: string,
      uName: string
    ) => {
      data.visible = true;
      data.type = type;
      data.id = id;
      data.infoName = name;
      data.infoImage = image;
      data.uid = uid;
      data.uName = uName;
    };

    const shareContentEvent = () => {
      if (data.isLogin) {
        // 判断是否登录
        if (data.comment.trim() != "") {
          // 判断输入内容是否为空
          if (data.type == "song") {
            // 判断类型
            sendSongToContactor({
              user_ids: data.uid,
              id: data.id,
              msg: data.comment,
            }).then((res: any) => {
              if (res.data.code == 200) {
                ElNotification({
                  message: "发送消息成功",
                  type: "success",
                  customClass: "darkNotice",
                });
                data.visible = false;
              } else {
                ElNotification({
                  message: "发送消息失败",
                  type: "error",
                  customClass: "darkNotice",
                });
              }
            });
          } else if (data.type == "playlist") {
            sendSheetToContactor({
              user_ids: data.uid,
              playlist: data.id,
              msg: data.comment,
            }).then((res: any) => {
              if (res.data.code == 200) {
                ElNotification({
                  message: "发送消息成功",
                  type: "success",
                  customClass: "darkNotice",
                });
                data.visible = false;
              } else {
                ElNotification({
                  message: "发送消息失败",
                  type: "error",
                  customClass: "darkNotice",
                });
              }
            });
          } else if (data.type == "album") {
            sendAlbumToContactor({
              user_ids: data.uid,
              id: data.id,
              msg: data.comment,
            }).then((res: any) => {
              if (res.data.code == 200) {
                ElNotification({
                  message: "发送消息成功",
                  type: "success",
                  customClass: "darkNotice",
                });
                data.visible = false;
              } else {
                ElNotification({
                  message: "发送消息失败",
                  type: "error",
                  customClass: "darkNotice",
                });
              }
            });
          }
        } else {
          ElNotification({
            message: "输入内容不能为空",
            type: "warning",
            customClass: "darkNotice",
          });
        }
      } else {
        useLogin();
      }
    };

    onMounted(() => {
      data.emoji = emoji;
    });

    return {
      ...toRefs(data),
      openMessageDialog,
      loadMore,
      emojiClick,
      filterType,
      shareContentEvent,
      emojiPopoverRef,
      userPopoverRef,
      searchInputRef,
    };
  },
});
</script>

<style lang='less'>
.dialogPopperClass {
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
        background-color: @hoverColor;
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
        background-color: @hoverColor;
      }
    }
  }
  .cateList {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .activeCateItem {
      color: @themeColor;
      font-weight: bold;
    }
    .cateItem {
      text-align: center;
      flex: 1;
      cursor: pointer;
    }
  }
  .searchResultContainer {
    margin-top: 15px;
  }
}

.dialogPopperClass.is-light {
  background-color: #292929 !important;
  border: 1px solid #292929 !important;
}
.shareDialogClass {
  background-color: #3f3f3f !important;
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 24px;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__headerbtn:hover .el-dialog__close {
    color: @themeColor;
  }
  .diglogTitle {
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
  }
  .diglogTextBox {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #565555;
    textarea {
      width: 100%;
      height: 80px;
      border: 0;
      outline: none;
      resize: none;
      background-color: transparent;
      color: #fff;
      font-size: 15px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .functionList {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        cursor: pointer;
        margin-right: 6px;
      }
    }
  }
  .dialogInfoBox {
    padding: 7px 10px;
    display: flex;
    align-items: center;
    border-left: 1px solid #565555;
    border-right: 1px solid #565555;
    border-bottom: 1px solid #565555;
    .name {
      font-size: 13px;
      width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .target {
      font-size: 12px;
      color: @themeColor;
      border: 1px solid @themeColor;
      padding: 4px 8px;
      transform: scale(0.8);
      margin-left: 6px;
    }
  }
  .dialogBtnBox {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    .shareBtn {
      padding: 7px 20px;
      color: #fff;
      border-radius: 30px;
      font-size: 12px;
      background-color: @themeColor;
      cursor: pointer;
    }
  }
  .dialogInfoSearchBox {
    padding: 7px 14px;
    border-left: 1px solid #565555;
    border-right: 1px solid #565555;
    border-bottom: 1px solid #565555;
    input {
      width: 100%;
      height: 28px;
      background: transparent;
      color: #fff;
      border: 0;
      outline: none;
    }
  }
}
</style>