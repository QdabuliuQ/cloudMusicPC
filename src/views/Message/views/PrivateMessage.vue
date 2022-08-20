<template>
  <loading v-if="!objectList.length && more" />
  <empty-content v-else-if="!objectList.length && !more" />
  <div v-else id="PrivateMessage">
    <div class="leftObjectList">
      <el-scrollbar style="width: 100%" height="100%">
        <div
          :infinite-scroll-immediate="false"
          :infinite-scroll-delay="700"
          :infinite-scroll-disabled="!more"
          v-infinite-scroll="loadData"
        >
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
        </div>
      </el-scrollbar>
    </div>
    <div
      v-if="objectList.length"
      v-loading="loading"
      class="rightMessageInfo"
    >
      <div class="chatContainer">
        <div class="chatList">
          <el-scrollbar
            ref="chatScrollContainerRef"
            style="padding: 0 15px"
            height="100%"
          >
            <div v-if="moreChat" class="loadMoreData">
              <div @click="loadMoreData" class="moreBtn">加载更多</div>
            </div>
            <div
              class="messageItem"
              v-for="(item, index) in messageList"
              :id="'item' + item.time"
              :key="item.id"
            >
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
                :index="index"
                :activeVoiceIndex="activeVoiceIndex"
                @controlVoice="controlVoice"
                v-else-if="item.msg.type == 1018"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverNotice
                v-else-if="item.msg.type == 12"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
              <popoverTopic
                v-else-if="item.msg.type == 8"
                :userInfo="item.fromUser"
                :msg="item.msg"
              />
            </div>
          </el-scrollbar>
        </div>
        <div class="textarea">
          <div style="">
            <div class="inputContainer">
              <textarea @keyup.enter="sendEvent" maxlength="200" v-model="text"></textarea>
            </div>
            <div class="btnContainer">
              <el-popover
                ref="emojiPopoverRef"
                placement="top"
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
              <div @click="sendEvent" class="sendBtn">发送</div>
            </div>
          </div>
        </div>
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
  nextTick,
} from "vue";
import {
  getPrivateMessageList,
  getChatList,
  sendMessage,
} from "@/network/Message/privateMessage";
import { InitData } from "@/types/Message/PrivateMessage";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import emoji from "@/static/emoji";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
const popoverImage = defineAsyncComponent(() => import("./popoverImage.vue"));
const popoverText = defineAsyncComponent(() => import("./popoverText.vue"));
const popoverAlbum = defineAsyncComponent(() => import("./popoverAlbum.vue"));
const popoverSong = defineAsyncComponent(() => import("./popoverSong.vue"));
const popoverSheet = defineAsyncComponent(() => import("./popoverSheet.vue"));
const popoverComment = defineAsyncComponent(
  () => import("./popoverComment.vue")
);
const popoverProgram = defineAsyncComponent(
  () => import("./popoverProgram.vue")
);
const popoverMv = defineAsyncComponent(() => import("./popoverMv.vue"));
const popoverAudio = defineAsyncComponent(() => import("./popoverAudio.vue"));
const popoverVoice = defineAsyncComponent(() => import("./popoverVoice.vue"));
const popoverNotice = defineAsyncComponent(() => import("./popoverNotice.vue"));
const popoverTopic = defineAsyncComponent(() => import("./popoverTopic.vue"));

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
    popoverNotice,
    popoverTopic,
    loading,
    emptyContent,
  },
  setup() {
    const emojiPopoverRef = ref();
    const chatScrollContainerRef = ref();
    const messageVoiceRef = ref();
    const router = useRouter();
    const data = reactive(new InitData());

    // 加载聊天
    const loadMoreData = () => {
      data.loading = true;
      getChatContent(false);
    };
    // 发送消息
    const sendEvent = (e: any) => {
      e.preventDefault()
      if (data.text != "") {
        sendMessage({
          user_ids:
            data.objectList[data.activeIndex].fromUser.userId.toString(),
          msg: data.text,
        })
          .then((res: any) => {
            if (res.data.code == 200) {
              res.data.newMsgs[0].msg = JSON.parse(res.data.newMsgs[0].msg)
              data.messageList.push(res.data.newMsgs[0])
              data.objectList[data.activeIndex].lastMsg = data.text
              nextTick(() => {
                scrollBottom()
              })
              data.text = ''
            } else {
              ElNotification({
                message: "发送过于频繁，晚点再试试吧",
                type: "warning",
                customClass: "darkNotice",
              });
            }
          })
          .catch(() => {
            ElNotification({
              message: "发送过于频繁，晚点再试试吧",
              type: "warning",
              customClass: "darkNotice",
            });
          });
      }
    };
    // 点击表情
    const emojiClick = (i: string) => {
      data.text += i;
      emojiPopoverRef.value.hide();
    };
    // 滚动到底部
    const scrollBottom = () => {
      chatScrollContainerRef.value.setScrollTop(
        chatScrollContainerRef.value.wrap$.scrollHeight
      );
    };
    // 获取聊天内容
    const getChatContent = (scroll: boolean) => {
      getChatList({
        uid: data.objectList[data.activeIndex].fromUser.userId.toString(),
        limit: 30,
        before: data.before,
      }).then((res: any) => {
        data.before = res.data.msgs[res.data.msgs.length - 1].time;
        data.moreChat = res.data.more;
        for (const item of res.data.msgs) {
          item.msg = JSON.parse(item.msg);
        }
        res.data.msgs.reverse();
        if (!data.scrollTime) {
          data.scrollTime = res.data.msgs[0].time;
        }

        data.messageList = [...res.data.msgs, ...data.messageList];

        if (scroll) {
          // 滚动至底部
          setTimeout(() => {
            data.loading = false;
            nextTick(() => {
              console.log(66);

              scrollBottom();
            });
          }, 100);
        } else {
          setTimeout(() => {
            nextTick(() => {
              let target = document.getElementById("item" + data.scrollTime);
              let container = chatScrollContainerRef.value.wrap$;
              let result =
                (target?.getBoundingClientRect().top as number) -
                container.getBoundingClientRect().top;
              chatScrollContainerRef.value.setScrollTop(result);
              data.loading = false;
              data.scrollTime = res.data.msgs[0].time;
              console.log(data.scrollTime);
            });
          }, 100);
        }
      });
    };
    // 获取聊天列表
    const getData = (loadList: boolean) => {
      getPrivateMessageList({
        offset: data.offset * 10,
        limit: 30,
      }).then((res: any) => {
        data.more = res.data.more;
        data.offset++;
        for (const item of res.data.msgs) {
          item.lastMsg = JSON.parse(item.lastMsg).msg;
        }
        data.objectList = [...data.objectList, ...res.data.msgs];
        data.objectList[0].newMsgCount = 0;
        if (loadList) {
          getChatContent(true);
        }
      });
    };
    getData(true);

    // 切换聊天对象
    const toggleObject = (e: number) => {
      if (e != data.activeIndex) {
        data.before = -1;
        data.moreChat = true;
        data.loading = true;
        data.activeIndex = e;
        if (data.objectList[data.activeIndex].newMsgCount) {
          data.objectList[data.activeIndex].newMsgCount = 0;
        }
        data.messageList = [];
        getChatContent(true);
      }
    };
    // 加载聊天房间
    const loadData = () => {
      getData(false);
    };
    // 播放语音
    const controlVoice = (e: any) => {
      data.activeVoiceIndex = e.i;
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
      data.activeVoiceIndex = -1;
      data.voiceUrl = "";
    };

    return {
      emojiPopoverRef,
      emoji,
      chatScrollContainerRef,
      messageVoiceRef,
      router,
      loadMoreData,
      sendEvent,
      emojiClick,
      loadData,
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
    // color: #000000a8;
  }
  .leftObjectList {
    width: 260px;
    height: 100%;
    // background-color: #373737;
    .activeObjectItem {
      background-color: var(--chatBgc) !important;
    }
    .objectItem {
      padding: 13px 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      transition: 0.2s all linear;
      &:hover {
        background-color: var(--chatBgc);
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
    background-color: var(--chatBgc);
    display: flex;
    .chatContainer {
      flex: 1;
      .chatList {
        width: 100%;
        height: 68%;
        .el-scrollbar {
          width: calc(100% - 30px);
        }
        .loadMoreData {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          .moreBtn {
            font-size: 12px;
            padding: 5px 15px 7px 17px;
            border-radius: 8px;
            background-color: #585858;
            cursor: pointer;
          }
        }
        .messageItem {
          padding: 7.5px 0;
          &:first-child {
            padding-top: 30px;
          }
          &:last-child {
            padding-bottom: 30px;
          }
          .popoverInfoContainer {
            padding: 0 14px;
            font-size: 13px;
            color: var(--textColor);
            .msgContainer {
              word-break: break-all;
              max-width: 500px;
              padding: 5px 0;
              line-height: 25px;
            }
          }
          .selfPopover {
            background-color: var(--popoColor);
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          .unselfPopover {
            background-color: var(--unpopoColor);
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
        height: 32%;
        box-sizing: border-box;
        border-top: 1px solid var(--borderColor);
        .inputContainer {
          padding: 10px;
          textarea {
            width: 100%;
            height: 85px;
            background-color: transparent;
            border: 0;
            outline: none;
            resize: none;
            color: var(--textColor);
            font-size: 14px;
          }
        }
        .btnContainer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          img {
            margin-left: 10px;
            cursor: pointer;
            width: 30px;
          }
          .sendBtn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 15px;
            font-size: 12px;
            color: #fff;
            cursor: pointer;
            border-radius: 6px;
            background-color: var(--el-color-primary);
          }
        }
      }
    }
    .userPanel {
      width: 200px;
      height: 100%;
      box-sizing: border-box;
      border-left: 1px solid var(--borderColor);
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