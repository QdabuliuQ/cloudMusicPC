<template>
  <div id="commentArea">
    <div class="commentBox">
      <textarea v-model="comment"></textarea>
    </div>
    <div class="commentBtnContainer">
      <div class="btnList">
        <el-popover
          ref="emojiPopoverRef"
          placement="bottom-start"
          :width="300"
          trigger="click"
          popper-class="dialogPopperClass"
          :hide-after="0"
        >
          <template #reference>
            <img
              style="width: 29px"
              src="~images/shareDialog/emoji.png"
              alt=""
            />
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
        <el-popover
          v-if="isLogin"
          ref="userPopoverRef"
          placement="bottom"
          :width="150"
          trigger="click"
          popper-class="dialogPopperClass"
          :hide-after="0"
        >
          <template #reference>
            <img
              style="width: 29px"
              src="~images/shareDialog/aite.png"
              alt=""
            />
          </template>
          <div class="userListContainer">
            <el-scrollbar height="150px">
              <div
                v-if="userList.length"
                @click="userClick(item.nickname)"
                v-for="item in userList"
                :key="item.userId"
                class="userItem"
              >
                <el-avatar
                  style="margin-right: 5px"
                  :size="25"
                  :src="item.avatarUrl"
                />
                <div class="name">
                  {{ item.nickname }}
                </div>
              </div>
              <div v-if="isMore" @click="loadMore" class="loadMore">
                加载更多
              </div>
            </el-scrollbar>
          </div>
        </el-popover>
      </div>
      <div @click="commentEvent" class="sendBtn">评论</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import emoji from "@/static/emoji";
import { getFollowList } from "@/network/UserInfo/userFollow";
import useLogin from "@/hooks/useLogin";
import bus from "vue3-eventbus";

export default defineComponent({
  emits: ["commentEvent"],
  name: "commentArea",
  setup(props, context) {
    const emojiPopoverRef = ref();
    const userPopoverRef = ref();
    const data = reactive({
      comment: "",
      isMore: true,
      offset: 0,
      cid: 0,
      userList: <any>[],
      isLogin: useLogin(false)
    });

    const commentEvent = () => {
      if (useLogin() && data.comment != "") {
        let reg = /\u56de[^\u56de]*\uff1a/g;
        // 回复
        
        if (reg.test(data.comment)) {
          console.log(reg.test(data.comment), data.cid);
          let format = data.comment.replaceAll(reg, "").trim();
          context.emit('commentEvent', {
            content: format, 
            cid: data.cid
          })
          data.cid = 0
        } else {
          context.emit('commentEvent', {
            content: data.comment.trim(), 
            cid: 0
          })
          data.cid = 0
        }
        data.comment = ''
        
      }
    };
    // 用户点击
    const userClick = (i: string) => {
      data.comment += `@${i} `;
      emojiPopoverRef.value.hide();
    };
    // 点击表情
    const emojiClick = (i: string) => {
      data.comment += i;
      emojiPopoverRef.value.hide();
    };
    // 加载用户数据
    const loadMore = () => {
      getData();
    };
    // 获取用户列表
    const getData = () => {
      getFollowList({
        limit: 10,
        offset: data.offset * 10,
        uid: useLogin(false)
          ? decodeURIComponent(
              window.atob(localStorage.getItem("id") as string)
            )
          : "",
      }).then((res: any) => {
        data.isMore = res.data.more;
        data.offset++;
        data.userList = [...data.userList, ...res.data.follow];
      });
    };

    bus.on("replyComment", (e: { id: string | number; name: string }) => {
      data.comment = `回复${e.name}：`;
      data.cid = e.id as number;
    });

    onMounted(() => {
      getData();
    });
    return {
      emoji,
      emojiPopoverRef,
      userPopoverRef,
      commentEvent,
      emojiClick,
      userClick,
      loadMore,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#commentArea {
  width: 100%;
  .commentBox {
    padding: 10px 12px;
    border-radius: 8px;
    background-color: @eventBgc;
    margin-bottom: 8px;
    textarea {
      resize: none;
      width: 100%;
      height: 80px;
      background-color: transparent;
      outline: none;
      border: 0;
      color: #fff;
      font-size: 15px;
    }
  }
  .commentBtnContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    .btnList {
      img {
        cursor: pointer;
        margin-right: 10px;
      }
    }
    .sendBtn {
      font-size: 13px;
      padding: 10px 24px;
      background-color: @eventBgc;
      border-radius: 10px;
      transition: 0.2s all linear;
      cursor: pointer;
      &:hover {
        background-color: @themeColor;
        color: #fff;
      }
    }
  }
}
</style>