<template>
  <div id="PrivateMessage">
    <div class="leftObjectList">
      <el-scrollbar style="width: 100%" height="100%">
        <div
          @click="toggleObject(index)"
          :class="[
            activeIndex == index ? 'activeObjectItem' : '',
            'objectItem',
          ]"
          v-for="(item, index) in objectList"
          :key="item.lastMsgId"
        >
          <el-badge
            :hidden="item.newMsgCount ? false : true"
            :value="item.newMsgCount"
          >
            <el-avatar
              :size="40"
              :fit="'contain'"
              :src="item.fromUser.avatarUrl"
            />
          </el-badge>
          <div style="margin-left: 10px" class="objectInfoData">
            <div class="objectName">{{ item.fromUser.nickname }}</div>
            <div class="objectData">{{ item.lastMsg }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div v-if="objectList.length" class="rightMessageInfo">
      <div class="chatContainer">
        <div class="chatList">
          <el-scrollbar style="padding: 0 15px" height="100%">
            <div class="messageItem" v-for="item,index in messageList" :key="item.id">
              <popoverImage
                v-if="item.msg.type == 16"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverText
                v-else-if="item.msg.type == 6"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverAlbum
                v-else-if="item.msg.type == 2"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverSong
                v-else-if="item.msg.type == 1"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverSheet
                v-else-if="item.msg.type == 4"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverComment
                v-else-if="item.msg.type == 15"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverProgram
                v-else-if="item.msg.type == 5"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverMv
                v-else-if="item.msg.type == 7"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverAudio
                v-else-if="item.msg.type == 13"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverVoice
                :index='index'
                :activeVoiceIndex='activeVoiceIndex'
                @controlVoice="controlVoice"
                v-else-if="item.msg.type == 1018"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
            </div>
          </el-scrollbar>
        </div>
        <div class="textarea"></div>
      </div>
      <div class="userPanel">
        <div class="userInfoBox">
          <div
            style="cursor: pointer"
            @click="
              router.push(
                '/UserDetail?id=' + objectList[activeIndex].fromUser.userId
              )
            "
          >
            <el-avatar
              :size="70"
              :src="objectList[activeIndex].fromUser.avatarUrl"
            />
          </div>
          <div
            @click="
              router.push(
                '/UserDetail?id=' + objectList[activeIndex].fromUser.userId
              )
            "
            style="cursor: pointer; margin-top: 5px; font-size: 14px"
          >
            {{ objectList[activeIndex].fromUser.nickname }}
          </div>
          <div
            :title="objectList[activeIndex].fromUser.signature"
            v-if="objectList[activeIndex].fromUser.signature != ''"
            class="objectSignature"
          >
            {{ objectList[activeIndex].fromUser.signature }}
          </div>
        </div>
      </div>
    </div>
    <video
      controls=""
      class="voiceAudio"
      ref="messageVoiceRef"
      @ended="voiceEndEvent"
      :src="voiceUrl"
    ></video>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  defineAsyncComponent,
} from "vue";
import {
  getPrivateMessageList,
  getChatList,
} from "@/network/Message/privateMessage";
import { InitData } from "@/types/Message/PrivateMessage";
import { useRouter } from "vue-router";
import bus from "vue3-eventbus";
const popoverImage = defineAsyncComponent(
  () => import("@/components/private/popoverImage.vue")
);
const popoverText = defineAsyncComponent(
  () => import("@/components/private/popoverText.vue")
);
const popoverAlbum = defineAsyncComponent(
  () => import("@/components/private/popoverAlbum.vue")
);
const popoverSong = defineAsyncComponent(
  () => import("@/components/private/popoverSong.vue")
);
const popoverSheet = defineAsyncComponent(
  () => import("@/components/private/popoverSheet.vue")
);
const popoverComment = defineAsyncComponent(
  () => import("@/components/private/popoverComment.vue")
);
const popoverProgram = defineAsyncComponent(
  () => import("@/components/private/popoverProgram.vue")
);
const popoverMv = defineAsyncComponent(
  () => import("@/components/private/popoverMv.vue")
);
const popoverAudio = defineAsyncComponent(
  () => import("@/components/private/popoverAudio.vue")
);
const popoverVoice = defineAsyncComponent(
  () => import("@/components/private/popoverVoice.vue")
);

export default defineComponent({
  name: "PrivateMessage",
  components: {
    popoverImage,
    popoverText,
    popoverAlbum,
    popoverSong,
    popoverSheet,
    popoverComment,
    popoverProgram,
    popoverMv,
    popoverAudio,
    popoverVoice,
  },
  setup() {
    const messageVoiceRef = ref();
    const router = useRouter();
    const data = reactive(new InitData());

    // 获取聊天内容
    const getChatContent = () => {
      getChatList({
        uid: data.objectList[data.activeIndex].fromUser.userId.toString(),
        limit: 20,
        before: data.before,
      }).then((res: any) => {
        for (const item of res.data.msgs) {
          item.msg = JSON.parse(item.msg);
        }
        res.data.msgs.reverse();
        data.messageList = [...res.data.msgs, ...data.messageList];
        console.log(data.messageList);
      });
    };
    // 获取聊天列表
    const getData = () => {
      getPrivateMessageList({
        offset: data.offset * 10,
        limit: 10,
      }).then((res: any) => {
        for (const item of res.data.msgs) {
          item.lastMsg = JSON.parse(item.lastMsg).msg;
        }
        data.objectList = [...data.objectList, ...res.data.msgs];
        getChatContent();
      });
    };
    getData();

    // 切换聊天对象
    const toggleObject = (e: number) => {
      data.activeIndex = e;
      data.messageList = [];
      getChatContent();
    };
    // 播放语音
    const controlVoice = (e: any) => {
      data.activeVoiceIndex = e.i
      // 不同音频
      if (data.voiceUrl == "") {
        // 直接播放
        data.voiceUrl = e.url;
        messageVoiceRef.value.oncanplay = () => {
          messageVoiceRef.value.play();
        };
      } else if (e.url != data.voiceUrl && data.voiceUrl != "") {
        // 切换
        setTimeout(() => {
          messageVoiceRef.value.pause();
          data.voiceUrl = e.url;
          // 是否正在播放
          messageVoiceRef.value.currentTime = 0;
          messageVoiceRef.value.play();
        }, 200);
      } else if (e.url == data.voiceUrl) {
        // 相同音频
        if (!messageVoiceRef.value.paused) {
          messageVoiceRef.value.pause();
        } else {
          messageVoiceRef.value.play();
        }
      }
    };
    // 语音播放结束
    const voiceEndEvent = () => {
      data.activeVoiceIndex = -1
      data.voiceUrl = "";
    };

    return {
      messageVoiceRef,
      router,
      voiceEndEvent,
      controlVoice,
      toggleObject,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#PrivateMessage {
  height: 475px;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  .voiceAudio {
    position: absolute;
    top: -9999px;
    // display: none;
  }
  .leftObjectList {
    width: 260px;
    height: 100%;
    // background-color: #373737;
    .activeObjectItem {
      background-color: @hoverColor !important;
    }
    .objectItem {
      padding: 13px 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      transition: 0.2s all linear;
      &:hover {
        background-color: @hoverColor;
      }
      .el-badge {
        display: flex;
        align-items: center;
        .el-badge__content {
          border: 0 !important;
        }
        .el-badge__content.is-fixed {
          top: 7px;
        }
      }
      .objectName {
        font-size: 13px;
      }
      .objectData {
        width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: @fontColor;
        margin-top: 5px;
      }
    }
  }
  .rightMessageInfo {
    flex: 1;
    height: 100%;
    background-color: @hoverColor;
    display: flex;
    .chatContainer {
      flex: 1;
      .chatList {
        width: 100%;
        height: 70%;
        .el-scrollbar {
          width: calc(100% - 30px);
        }
        .messageItem {
          margin: 15px 0;
          &:first-child {
            margin-top: 30px;
          }
          &:last-child {
            margin-bottom: 30px;
          }
          .popoverInfoContainer {
            padding: 0 14px;
            font-size: 13px;
            color: #fff;
            .msgContainer {
              word-break: break-all;
              max-width: 500px;
              padding: 5px 0;
              line-height: 25px;
            }
          }
          .selfPopover {
            background-color: rgb(73, 91, 109);
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          .unselfPopover {
            background-color: #545454;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          .unselfContainer {
            display: flex;
          }
          .selfContainer {
            display: flex;
            justify-content: flex-end;
          }
        }
      }
      .textarea {
        width: 100%;
        height: 30%;
        box-sizing: border-box;
        border-top: 1px solid #535252;
      }
    }
    .userPanel {
      width: 200px;
      height: 100%;
      box-sizing: border-box;
      border-left: 1px solid #535252;
      display: flex;
      .userInfoBox {
        margin: auto;
        div {
          text-align: center;
        }
        .objectSignature {
          width: 80%;
          margin: 5px auto;
          font-size: 12px;
          color: @fontColor;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 10; /* 这里是超出几行省略 */
          overflow: hidden;
        }
      }
    }
  }
}
</style>