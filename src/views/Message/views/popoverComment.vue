<template>
  <div class="popoverComment">
    <div v-if="uid != userInfo.userId" class="unselfContainer">
      <popoverUser :userInfo="userInfo" />
      <div
        style="margin-left: 10px"
        v-if="msg"
        class="popoverInfoContainer unselfPopover"
      >
        <div class="msgContainer">{{ msg.title }}: {{ msg.msg }}</div>
        <div class="commentInfo">
          <div class="topInfo">
            <img src="~images/common/char.png" alt="" />
            <span @click="router.push('/UserDetail?id='+msg.comment.user.userId)">@ {{ msg.comment.user.nickname }}</span>
            {{ msg.comment.content }}
          </div>
          <div class="bottomInfo">
            {{ msg.comment.resourceName }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="selfContainer">
      <div
        style="margin-right: 10px"
        v-if="msg"
        class="popoverInfoContainer selfPopover"
      >
        <div class="msgContainer">{{ msg.title }}: {{ msg.msg }}</div>
        <div class="commentInfo">
          <div class="topInfo">
            <div class="icon">
              <img src="~images/common/char.png" alt="" />
            </div>
            <div class="text">
              <span @click="router.push('/UserDetail?id='+msg.comment.user.userId)">@ {{ msg.comment.user.nickname }}</span>
              {{
                msg.comment.content
              }}
            </div>
          </div>
          <div class="bottomInfo">
            {{ msg.comment.resourceName }}
          </div>
        </div>
      </div>
      <popoverUser :userInfo="userInfo" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import popoverUser from "./popoverUser.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "popoverComment",
  props: ["userInfo", "msg"],
  components: {
    popoverUser,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      uid: decodeURIComponent(
        window.atob(localStorage.getItem("id") as string)
      ),
    });
    return {
      router,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.popoverComment {
  .commentInfo {
    padding: 6px 10px;
    background-color: #3d3d3d;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
    .topInfo {
      display: flex;
      max-width: 500px;
      box-sizing: border-box;
      padding: 5px 0;
      border-bottom: 1px solid #525252;
      .icon {
        margin-right: 5px;
      }
      .text {
        line-height: 20px;
        word-break: break-all;
      }
      img {
        width: 20px;
      }
      span {
        color: var(--nameColor);
        margin-right: 5px;
      }
    }
    .bottomInfo {
      padding: 5px 0;
      font-size: 12px;
      color: @fontColor;
    }
  }
}
</style>